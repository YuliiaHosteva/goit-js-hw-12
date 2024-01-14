import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const fetchUsersBtn = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const textInput = document.querySelector('.text-input')
const modal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const loader = document.querySelector('.loader');
  loader.style.display = 'none';


fetchUsersBtn.addEventListener('submit', (event) => {
  event.preventDefault();
  const usersValue = textInput.value;

  gallery.innerHTML = '';
  textInput.value = '';
  loader.style.display = 'block';

  const searchParams = new URLSearchParams({
  key: '41611095-6f6895f75fda0efc7328923df',
  q: usersValue,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true
});

  fetch(`https://pixabay.com/api/?${searchParams}`)
    .then((response) => {
      loader.style.display = 'none';
      
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
  .then((data) => {
      if (data.hits.length === 0) {
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#FAFAFB',
          backgroundColor: '#EF4040',
          position: 'topRight'
        });
        return;
    }
      const imagesHTML = data.hits.reduce((html, image) => {
      return html + imageCard(image);
      }, '');
    
    gallery.innerHTML = imagesHTML;
    modal.refresh();

    })
  .catch((error) => {
		  showAlert(error.toString());
  })
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
    </li>
  `;
};