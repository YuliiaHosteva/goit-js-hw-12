import{S as u,i as d}from"./assets/vendor-9310f15c.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const f=document.querySelector(".form"),l=document.querySelector(".gallery"),c=document.querySelector(".text-input"),p=new u(".gallery a",{captionsData:"alt",captionDelay:250}),i=document.querySelector(".loader");i.style.display="none";f.addEventListener("submit",s=>{s.preventDefault();const o=c.value;l.innerHTML="",c.value="",i.style.display="block";const a=new URLSearchParams({key:"41611095-6f6895f75fda0efc7328923df",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0});fetch(`https://pixabay.com/api/?${a}`).then(r=>{if(i.style.display="none",!r.ok)throw new Error(r.status);return r.json()}).then(r=>{if(r.hits.length===0){d.error({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"});return}const e=r.hits.reduce((t,n)=>t+m(n),"");l.innerHTML=e,p.refresh()}).catch(r=>{showAlert(r.toString())})});function m(s){return`<li>
      <a href="${s.largeImageURL}">
        <img src="${s.webformatURL}" alt="${s.tags}">
      </a>
      <div class="info">
        <div class="image-info">
          <span>Likes</span>
          <span class="image-value">${s.likes}</span>
        </div>
        <div class="image-info">
          <span>Views</span>
          <span class="image-value">${s.views}</span>
        </div>
        <div class="image-info">
          <span>Comments</span>
          <span class="image-value">${s.comments}</span>
        </div>
        <div class="image-info">
          <span>Downloads</span>
          <span class="image-value">${s.downloads}</span>
        </div>
      </div>
    </li>
  `}
//# sourceMappingURL=commonHelpers.js.map
