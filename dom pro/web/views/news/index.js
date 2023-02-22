

import {load} from "/web/util/LoadView.js"

load("topbar-news") //加载topbar //sidemenu

let list = []

search.oninput=async function(){
    if(!search.value) {
        document.querySelector(".list-group").getElementsByClassName.display="none"
        return
    }document.querySelector(".list-group").getElementsByClassName.display="block"
    let res = await fetch(`http://localhost:5000/news?title_like=`+search.value).then(res=>res.json())
   document.querySelector(".list-group").innerHTML= res.map(item=>`
   <li class="list-group-item"><a href="/web/views/detail/index.html?id=${item.id}">${item.title}</li>
   `).join("")
}

search.onblur = function(){
    setTimeout(()=>{
        document.querySelector(".list-group").style.display = "none"
    },300)
    }

   async function render(){
      await  renderList()
        renderTab()
    }


async function renderList(){

  list =  await fetch("http://localhost:5000/news").then(res=>res.json())

list.reverse()
  //console.log(list.slice(0,4))
let cardcontaniner = document.querySelector(".cardContainer")
cardcontaniner.innerHTML = list.slice(0,4).map(item=>`

<div class="card" data-id="${item.id}">
 <div style="background-image:url(${item.cover});"class="imgcover"></div>
    
    <div class="card-body">
      <h5 class="card-title " style = "font-size:16px" >${item.title}</h5>
      <p class="card-text"style = "font-size:12px" color:grey>author:${item.author}</p>
  
    </div>
  </div>
`

).join("")

for(let item of document.querySelectorAll(".card")){
    console.log(item.dataset.id)
    item.onclick=function(){
        location.href=`/web/views/detail/index.html?id=${item.dataset.id}`
    }
}

}


function renderTab(){
    let categoryObj =_.groupBy(list,item=>item.category)
    console.log(categoryObj)
let tabs = [tab0 ,tab1,tab2]

tabs.forEach((item,index)=>{
    item.innerHTML=categoryObj[index]?.map(item=>
 `
 <div class="listitem" data-id ="${item.id}">
 
 <img src="${item.cover}" data-id="${item.id}"/>
 <div data-id="${item.id}">${item.title}</div>
 <p class="card-text"style = "font-size:12px color:gre"data-id="${item.id}" y>author:${item.author}</p>
 ` 
 
 
 ).join("")||""
 item.onclick=function(evt){
 
    location.href=`/web/views/detail/index.html?id=${evt.target.dataset.id}`
}

})



}

render()

