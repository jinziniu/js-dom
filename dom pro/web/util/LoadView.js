



async function load(id){
   
 
        let topbarText = await fetch("/web/components/topbar/index.html").then(res=>res.text())

        document.querySelector(".topbar").innerHTML = topbarText
      if(id){

         document.querySelector(`#${id}`).style.color ="#0a58ca"
      }

       
}
export {load}
