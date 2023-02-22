import {load,isLogin} from "/admin/util/LoadView.js"

load("sidemenu-newsList")

let updateId =   new URL(location.href).searchParams.get("id")

let content=""
let cover =""
const { createEditor, createToolbar } = window.wangEditor



const editorConfig = {
    placeholder: 'Type here...',
    onChange(editor) {
      const html = editor.getHtml()
      console.log('editor content', html)
      // 也可以同步到 <textarea>
      content=html
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})

coverfile.onchange = function(evt){
    // console.log(evt.target.files[0])
    //===>base64

    let reader = new FileReader()

    reader.readAsDataURL(evt.target.files[0])

    reader.onload = function(e){
        // console.log(e.target.result)
        cover = e.target.result

    }
}


editNewsForm.onsubmit =async function(evt){
     evt.preventDefault()
    await fetch(`http://localhost:5000/news/${updateId}`,{
        headers:{
            "content-type":"application/json"
        },
        method:"PATCH",
        body:JSON.stringify({
            title:title.value,
            content,
            category:category.value,
            cover,
          
        })
    }).then(res=>res.json())
    location.href = "/admin/views/news-manage/NewsList/index.html"
}



async function render(){
let {title,category,content:mycontent,cover:mycover} = await fetch(`http://localhost:5000/news/${updateId}`).then(res=>res.json())

document.querySelector("#title").value = title
document.querySelector("#category").value = category

editor.setHtml(mycontent)

content=mycontent

cover = mycover

}

render()

