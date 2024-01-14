import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

const fetchUsersBtn = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const textInput = document.querySelector('.text-input');
const loadMoreBtn = document.querySelector('.load-more-btn');
const modal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const loader = document.querySelector('.loader');
loader.style.display = 'none';

const API_KEY = '41611095-6f6895f75fda0efc7328923df';
let currentPage = 1;
const perPage = 40;

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

async function searchImages(query, currentPage) {
  const requestParams = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: perPage,
  };

  const searchParams = new URLSearchParams(requestParams);

  showLoader();

  try {
    const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
    hideLoader();

    const { hits, totalHits } = response.data;
    if (hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#FAFAFB',
        backgroundColor: '#4285F4',
        position: 'topRight'
      });
      return;
    }

    if (currentPage === 1) {
      gallery.innerHTML = '';
    }

    const imagesHTML = hits.reduce((html, image) => {
      return html + imageCard(image);
    }, '');

    gallery.insertAdjacentHTML('beforeend', imagesHTML);
    modal.refresh();

    if (currentPage * perPage >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.error({
        title: 'Error',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      loadMoreBtn.style.display = 'block';
      const scrollImages = document
        .querySelector('.gallery img')
        .getBoundingClientRect().height;
      window.scrollBy({
        top: scrollImages * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topRight',
    });
  }
}

fetchUsersBtn.addEventListener('submit', event => {
  event.preventDefault();

  const searchQuery = textInput.value.trim();
  currentPage = 1;
  searchImages(searchQuery, currentPage);
  fetchUsersBtn.reset();
});

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  const searchQuery = textInput.value.trim();
  searchImages(searchQuery, currentPage);
});

function imageCard(images) {
  return `<li>
      <a href="${images.largeImageURL}">
        <img src="${images.webformatURL}" alt="${images.tags}">
      </a>
      <div class="info">
        <div class="image-info">
          <span>Likes</span>
          <span class="image-value">${images.likes}</span>
        </div>
        <div class="image-info">
          <span>Views</span>
          <span class="image-value">${images.views}</span>
        </div>
        <div class="image-info">
          <span>Comments</span>
          <span class="image-value">${images.comments}</span>
        </div>
        <div class="image-info">
          <span>Downloads</span>
          <span class="image-value">${images.downloads}</span>
        </div>
      </div>
    </li>`

}
