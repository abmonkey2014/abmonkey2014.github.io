function switchApp(appName){const apps=document.querySelectorAll(".appWindow");apps.forEach(app=>app.style.display="none");const selected=document.getElementById(appName+"App");if(selected)selected.style.display="block";}
function getPageFromURL(){
    let path = window.location.pathname.split('/').filter(p=>p);
    const pagesIndex = path.indexOf("pages");
    if(pagesIndex >= 0 && path.length > pagesIndex+1){
        const subPath = path.slice(pagesIndex+1).join("/");
        return subPath;
    }
    return null;
}
window.addEventListener("load", () => {
    const pagePath = getPageFromURL();
    if(pagePath){
        fetch(`pages/${pagePath}`).then(r=>r.text()).then(html=>{
            const div=document.createElement("div");
            div.className="appWindow";
            div.id=pagePath.replace(/[/.]/g,"_")+"App";
            div.innerHTML=html;
            document.getElementById("appsContainer").appendChild(div);
            switchApp(div.id.replace("_App",""));
        }).catch(err=>console.error("Error loading page:",err));
    } else { switchApp("desktop"); }
});
