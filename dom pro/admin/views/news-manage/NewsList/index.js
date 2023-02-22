import {load,isLogin} from "/admin/util/LoadView.js"

load("sidemenu-newsList") //加载topbar //sidemenu
let list = []
let myPreviewModal = new bootstrap.Modal(document.getElementById('previewModal'))
let myDelModal = new bootstrap.Modal(document.getElementById('delModal'))

let categoryList = ["newest","typical","inform"]
let updateId = 0


async function render(){
     let username = JSON.parse(isLogin()).username
        list = await fetch(`http://localhost:5000/news?author=${username}`).then(res=>res.json())
        // console.log(list)
    listbody.innerHTML = list.map(item=>`
<tr>
<th scope="row">${item.title}</th>
<td>
            ${categoryList[item.category]}
        </td>
<td>

<button type="button" class="btn btn-success btn-sm btn-preview"  data-myid="${item.id}">preview</button>
<button type="button" class="btn btn-primary btn-edit"  data-myid="${item.id}">edit</button>
<button type="button" class="btn btn-danger  btn-del" data-myid="${item.id}">delete</button>

</button>
</td>
</tr>`).join("")

} 
    listbody.onclick=function(evt){
        if(evt.target.className.includes("btn-preview")){
            
            myPreviewModal.toggle()
           //console.log("预览",evt.target.dataset.myid)
           let obj = list.filter(item=>item.id==evt.target.dataset.myid)[0]
         console.log(obj)
           renderPreviewModal(obj)
        }
        if(evt.target.className.includes("btn-edit")){
        console.log("edit")
        location.href="/admin/views/news-manage/EditNews/index.html?id="+evt.target.dataset.myid 
    }
        if(evt.target.className.includes("btn-del")){
        // console.log("删除",)
             updateId= evt.target.dataset.myid
             myDelModal.toggle()
             }
  
}

    
    
function renderPreviewModal(obj){
previewModalTitle.innerHTML  = obj.title
previewModalContent.innerHTML  = obj.content
}


delConfirm.onclick=async function(){
    await fetch(`http://localhost:5000/news/${updateId}`,{
        method:"delete"
    })
    myDelModal.toggle()

    render()
}




render()