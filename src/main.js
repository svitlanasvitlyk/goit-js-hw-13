import { fetchPhotos } from './js/pixabay-api';
import { renderPhotos } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const fetchSubmit = document.querySelector('.form');
const searchInput = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const loadButton = document.querySelector('.load-button');
const photoList = document.querySelector('.photo-list');

let page = 1;
let perPage = 15;
let totalHits = 0;
let searchRequest = '';

fetchSubmit.addEventListener('submit', async event => {
  event.preventDefault();
  searchRequest = searchInput.value.trim();
  page = 1; // need to plus one page to our page that we see
  photoList.innerHTML = ''; // cleaning results that was before
  loadButton.style.display = 'none'; // button hiding if we are input new search
  await loadPhotos();
});

loadButton.addEventListener('click', async () => {
  // const previousScrollHeight = document.documentElement.scrollHeight;
  await loadPhotos(); // adding new page to existed one

  const photoItem = document.querySelector('.photo-item');
  if (photoItem) {
    const itemHeight = photoItem.getBoundingClientRect().height;
    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });
  }
});

async function loadPhotos() {
  if (!searchRequest) return;

  loader.style.display = 'block';
  const searchParams = {
    key: '46706614-1dc051161d475bf769026fdc5',
    q: searchRequest,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page,
  };

  try {
    const photos = await fetchPhotos(searchParams);
    loader.style.display = 'none';
    if (photos.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found. Try again with a different query.',
      });
      return;
    }

    totalHits = photos.totalHits;
    await renderPhotos(photos.hits); // adding new photos
    page++; // going to next page

    // checking about more results
    if (page * perPage >= totalHits) {
      loadButton.style.display = 'none';
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadButton.style.display = 'block';
    }
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: `Something went wrong. Error: ${error.message}`,
    });
  }
}

// iziToast Settings
iziToast.settings({
  timeout: 10000,
  position: 'topRight',
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});
