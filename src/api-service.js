// export default class PhotosApiSErvice{
//     constructor() {
//         this.searchQuery = '';
//         this.page = 1;
// }

//     fetchPhotos(searchQuery) {
//       const url = `https://pixabay.com/api/?key=36648365-1842e8a4007d2e95d6a089902&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=5`;
//       return fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                  this.incrementPage();
//                 return data.photos;
//         })
//     }

//     resetPage() {
//         this.page = 1;
//     }
    
//     incrementPage() {
//         this.page += 1;
//     }

//     get query() {
//         return this.searchQuery;
//     }
//     set query(newQuery) {
//         this.searchQuery = newQuery;
//     }
// }

