

import {load} from "/web/util/LoadView.js"

load("topbar-products") //加载topbar //sidemenu

async function render(){
    let list = await fetch("http://localhost:5000/products").then(res => res.json())
    console.log(list)


    let indicatorHTML =document.querySelector(".carousel-indicators")
   indicatorHTML.innerHTML= list.map((item,index,)=>` <button type="button"
    data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}
    " class="active" aria-current="true" aria-label="${item.title}"></button>`
   ).join("")

let innerCaroselHtml = document.querySelector(".carousel-inner")
innerCaroselHtml.innerHTML = list.map((item,index) => `
    <div class="carousel-item ${index===0?"active":""}"> 
    
    
 <div style="background-image: url(${item.cover});width: 100%;height:calc(100vh - 50px);background-size: cover;"></div>
    <div class="carousel-caption d-none d-md-block">
      <h5>${item.title}</h5>
      <p>${item.introduction}</p> 
    </div>
  </div>
    `).join("")
}
render()