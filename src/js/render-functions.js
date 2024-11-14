//import library file plus file goIT tell us
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let lightbox = null; //this variable need in work with library

//creating list with photos
export async function renderPhotos(photos) {
  const photoList = document.querySelector('.photo-list'); //declaration ul tag
  // photoList.innerHTML = ''; //clearing window from previous photos

  //creating markup with photos
  const markup = await photos
    .map(photo => {
      //after created list with markup for photos (just copied from lms: there is the same example)
      return `
      <li class="photo-item">
        <a href="${photo.largeImageURL}" class="gallery-item">
          <img src="${photo.webformatURL}" alt="${photo.tags}" width="360" height="152" />
        </a>
        <div class="info">
          <div class="info-item">
            <p>Likes</p>
            <p>${photo.likes}</p>
          </div>
          <div class="info-item">
            <p>Views</p>
            <p>${photo.views}</p>
          </div>
          <div class="info-item">
            <p>Comments</p>
            <p>${photo.comments}</p>
          </div>
          <div class="info-item">
            <p>Downloads</p>
            <p>${photo.downloads}</p>
          </div>
        </div>
      </li>`;
    })
    .join('');
  //adding markup to DOM
  photoList.insertAdjacentHTML('beforeend', markup);
  //I don't understand this to the end, libraries killing me:(
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery-item', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}
