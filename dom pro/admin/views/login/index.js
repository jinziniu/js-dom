
const loginform = document.querySelector("#loginform")
loginform.onsubmit = async function(evt){
    loginwarning.style.display = "none"
    // alert("1111")
    // console.log("submit")
    evt.preventDefault()

    console.log(username.value,password.value)

    //正常 post请求

    //json-server get 获取 post添加， put修改 delete删除

    let res = await fetch(`http://localhost:5000/users?username=${username.value}&password=${password.value}`).then(res=>res.json())

    console.log(res[0])
    if(res.length>0){
        localStorage.setItem("token",JSON.stringify({
            ...res[0],
            password:"****"
        }))
        location.href="/admin/views/home/index.html"
        
    }else{
        //失败
        console.log("失败")
        loginwarning.style.display = "block"

    }
}