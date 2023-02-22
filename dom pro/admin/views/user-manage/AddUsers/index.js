/*
 * @作者: kerwin
 */
//引入模块

import {load} from "/admin/util/LoadView.js"

load("sidemenu-addUser") //加载topbar //sidemenu

let photo = ""
addUserForm.onsubmit = async function(evt){
    evt.preventDefault()

    await fetch("http://localhost:5000/users",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username:username.value,
            password:password.value,
            introduction:introduction.value,
            photo
        })
    }).then(res=>res.json())

    location.href = "/admin/views/user-manage/UserList/index.html"
}

photofile.onchange = function(evt){
    // console.log(evt.target.files[0])
    //===>base64

    let reader = new FileReader()

    reader.readAsDataURL(evt.target.files[0])

    reader.onload = function(e){
        // console.log(e.target.result)
        photo = e.target.result
    }
}