

import {load} from "/admin/util/LoadView.js"

load("sidemenu-userList") //加载topbar //sidemenu

let myEditModal = new bootstrap.Modal(document.getElementById('editModal'))
let myDelModal = new bootstrap.Modal(document.getElementById('delModal'))
let list = []
let updateId = 0

let photodata = ""

async function render(){

    list = await fetch("http://localhost:5000/users").then(res=>res.json())
    console.log(list)
    listbody.innerHTML = list.map(item=>`
            <tr>
                <th scope="row">${item.username}</th>
                <td>
                    <img src="${item.photo}" style="width:50px;border-radius:50%"/>
                </td>
                <td>
                <button type="button" class="btn btn-primary btn-sm btn-edit" ${item.default?"disabled":""} data-myid="${item.id}" >编辑</button>
                <button type="button" class="btn btn-danger btn-sm btn-del" ${item.default?"disabled":""} data-myid="${item.id}">删除</button>

                </td>
            </tr>
    `).join("")
}

listbody.onclick = function(evt){
    // console.log("1111",evt.target)

    if(evt.target.className.includes("btn-edit")){
        // console.log("edit",evt.target.dataset.myid)
        updateId = evt.target.dataset.myid
        // console.log()
        //显示modal
        myEditModal.toggle()
        //预填modal
        let {username,password,introduction,photo} = list.filter(item=>item.id==updateId)[0]

        document.querySelector("#username").value = username
        document.querySelector("#password").value = password
        document.querySelector("#introduction").value = introduction

        photodata = photo
    }else if(evt.target.className.includes("btn-del")){
        // console.log("del")
        myDelModal.toggle()
        updateId = evt.target.dataset.myid
    }
}

editConfirm.onclick =async function(){
    // console.log(document.querySelector("#username").value)
    // console.log(document.querySelector("#password").value)
    // console.log(document.querySelector("#introduction").value)
    // console.log(photodata)
    await fetch(`http://localhost:5000/users/${updateId}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username:document.querySelector("#username").value,
            password:document.querySelector("#password").value,
            introduction:document.querySelector("#introduction").value,
            photo:photodata
        })
    }).then(res=>res.json())

    myEditModal.toggle()

    // location.reload()
    render()
}

photofile.onchange = function(evt){
    // console.log(evt.target.files[0])
    //===>base64

    let reader = new FileReader()

    reader.readAsDataURL(evt.target.files[0])

    reader.onload = function(e){
        // console.log(e.target.result)
        photodata = e.target.result
    }
}

//删除
delConfirm.onclick =async function(){
    await fetch(`http://localhost:5000/users/${updateId}`,{
        method:"delete"
    }).then(res=>res.json())
    myDelModal.toggle()
    render()
}

render()