
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';

const searchForm = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.js-load-more');


const API_KEY = '36648365-1842e8a4007d2e95d6a089902';
const URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&safesearch=true';

let page = '';
let value = '';

searchForm.addEventListener('submit', submitForm);
loadMoreBtn.addEventListener('click', clickLoadMore);

let gallery = new SimpleLightbox('.gallery-item', {
  captionsData: 'alt',
  captionDelay: 250,
});

function submitForm(e) {
  e.preventDefault();

  galleryList.innerHTML = '';

  value = e.target.elements.searchQuery.value.trim();

  page = 1;
  if (value === '') {
    Notify.warning('Write something for search!');
    loadMoreBtn.classList.add('is-hidden');
    return;
  }

  searchForm.reset();

  fetchPhotos(value)
    .then(({ hits, totalHits }) => {
      if (totalHits > 0) {
        totalFound(totalHits);
      }
      if (totalHits < 40) {
        loadMoreBtn.classList.add('is-hidden');
      } else {
        loadMoreBtn.classList.remove('is-hidden');
      }
      onMarkupPhotos(hits);
      gallery.refresh();
    })
    .catch(error => console.log(error));
}

function clickLoadMore(e) {
  fetchPhotos(value)
    .then(({ hits, totalHits }) => {
      console.log(hits);
      console.log(totalHits);
      console.log(page);

      if (page * 40 >= totalHits) {
        loadMoreBtn.classList.add('is-hidden');
        Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
      onMarkupPhotos(hits);
      gallery.refresh();
    })
    .catch(err => console.log(err));
}

function onMarkupPhotos(photos) {
  if (photos.length === 0) {
    return notFound();
  }

  const markupPhotos = photos
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <div class="photo-card">
              <a class="gallery-item" href="${largeImageURL}"> 
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
              </a>
              <ul class="info">
                <li class="info-item">
                  <p class="info-text"><b>Likes: </b>${likes}</p>
                </li>
                <li class="info-item">
                  <p class="info-text"><b>Views: </b>${views}</p>
                </li>
                <li class="info-item">
                  <p class="info-text"><b>Comments: </b>${comments}</p>
                </li>
                <li class="info-item">
                  <p class="info-text"><b>Downloads: </b>${downloads}</p>
                </li>
              </ul>
      </div>`;
      }
    )
    .join('');

  galleryList.insertAdjacentHTML('beforeend', markupPhotos);
}

async function fetchPhotos(query) {
  const response = await axios.get(
    `${URL}&key=${API_KEY}&q=${query}&page=${page}&per_page=40`
  );
  const result = await response.data;

  page += 1;

  return result;
}

function notFound() {
  return Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function totalFound(totalHits) {
  return Notify.success(`Hooray! We found ${totalHits} images.`);
}