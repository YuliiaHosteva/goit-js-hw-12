import{S as b,a as w,i as c}from"./assets/vendor-c145bea9.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const p=document.querySelector(".form"),f=document.querySelector(".gallery"),g=document.querySelector(".text-input"),d=document.querySelector(".load-more-btn"),S=new b(".gallery a",{captionsData:"alt",captionDelay:250}),u=document.querySelector(".loader");u.style.display="none";const q="41611095-6f6895f75fda0efc7328923df";let a=1;const m=40;function $(){u.style.display="block"}function y(){u.style.display="none"}async function h(t,s){const i={key:q,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:m},n=new URLSearchParams(i);$();try{const e=await w.get(`https://pixabay.com/api/?${n}`);y();const{hits:o,totalHits:r}=e.data;if(o.length===0){c.error({title:"Error",message:"We're sorry, but you've reached the end of search results.",messageColor:"#FAFAFB",backgroundColor:"#4285F4",position:"topRight"});return}s===1&&(f.innerHTML="");const v=o.reduce((l,L)=>l+k(L),"");if(f.insertAdjacentHTML("beforeend",v),S.refresh(),s*m>=r)d.style.display="none",c.error({title:"Error",message:"We're sorry, but you've reached the end of search results.",position:"topRight"});else{d.style.display="block";const l=document.querySelector(".gallery img").getBoundingClientRect().height;window.scrollBy({top:l*2,behavior:"smooth"})}}catch(e){y(),c.error({title:"Error",message:e.message,position:"topRight"})}}p.addEventListener("submit",t=>{t.preventDefault();const s=g.value.trim();a=1,h(s,a),p.reset()});d.addEventListener("click",()=>{a+=1;const t=g.value.trim();h(t,a)});function k(t){return`<li>
      <a href="${t.largeImageURL}">
        <img src="${t.webformatURL}" alt="${t.tags}">
      </a>
      <div class="info">
        <div class="image-info">
          <span>Likes</span>
          <span class="image-value">${t.likes}</span>
        </div>
        <div class="image-info">
          <span>Views</span>
          <span class="image-value">${t.views}</span>
        </div>
        <div class="image-info">
          <span>Comments</span>
          <span class="image-value">${t.comments}</span>
        </div>
        <div class="image-info">
          <span>Downloads</span>
          <span class="image-value">${t.downloads}</span>
        </div>
      </div>
    </li>`}
//# sourceMappingURL=commonHelpers.js.map
