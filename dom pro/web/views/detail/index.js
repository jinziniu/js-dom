import {load} from "/web/util/LoadView.js"

load("topbar-news") //加载topbar //sidemenu


async function render(){
let id = new URL(location.href).searchParams.get("id")

let {title,author,content} = await fetch(`http://localhost:5000/news/${id}`).then(res=>res.json())
document.querySelector(".title").innerHTML= title
document.querySelector(".author").innerHTML= author

document.querySelector(".content").innerHTML= content
}

render()