import{a as h,S as g,i as s}from"./assets/vendor-C4-ZuMk8.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function l(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(t){if(t.ep)return;t.ep=!0;const i=l(t);fetch(t.href,i)}})();async function v(o){const e=await h.get("https://pixabay.com/api/",{params:o});return console.log(e.config.url),e.data}let d=null;async function w(o){const e=document.querySelector(".photo-list"),l=await o.map(r=>`
      <li class="photo-item">
        <a href="${r.largeImageURL}" class="gallery-item">
          <img src="${r.webformatURL}" alt="${r.tags}" width="360" height="152" />
        </a>
        <div class="info">
          <div class="info-item">
            <p>Likes</p>
            <p>${r.likes}</p>
          </div>
          <div class="info-item">
            <p>Views</p>
            <p>${r.views}</p>
          </div>
          <div class="info-item">
            <p>Comments</p>
            <p>${r.comments}</p>
          </div>
          <div class="info-item">
            <p>Downloads</p>
            <p>${r.downloads}</p>
          </div>
        </div>
      </li>`).join("");e.insertAdjacentHTML("beforeend",l),d?d.refresh():d=new g(".gallery-item",{captionsData:"alt",captionDelay:250})}const b=document.querySelector(".form"),L=document.querySelector(".search-input"),u=document.querySelector(".loader"),a=document.querySelector(".load-button"),S=document.querySelector(".photo-list");let n=1,f=15,m=0,p="";b.addEventListener("submit",async o=>{o.preventDefault(),p=L.value.trim(),n=1,S.innerHTML="",a.style.display="none",await y()});a.addEventListener("click",async()=>{await y();const o=document.querySelector(".photo-item");if(o){const e=o.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}});async function y(){if(!p)return;u.style.display="block";const o={key:"46706614-1dc051161d475bf769026fdc5",q:p,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:f,page:n};try{const e=await v(o);if(u.style.display="none",e.hits.length===0){s.error({title:"Error",message:"No images found. Try again with a different query."});return}m=e.totalHits,await w(e.hits),n++,n*f>=m?(a.style.display="none",s.info({title:"End of results",message:"We're sorry, but you've reached the end of search results."})):a.style.display="block"}catch(e){u.style.display="none",s.error({title:"Error",message:`Something went wrong. Error: ${e.message}`})}}s.settings({timeout:1e4,position:"topRight",resetOnHover:!0,icon:"material-icons",transitionIn:"flipInX",transitionOut:"flipOutX"});
//# sourceMappingURL=index.js.map
