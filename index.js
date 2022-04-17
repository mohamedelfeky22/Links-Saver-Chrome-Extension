const saveInput=document.getElementById("save-input");
const saveLink=document.getElementById("save-link");
const renderedLinks=document.getElementById("rendered-links");
const deleteLinks=document.getElementById("delete-links");
const saveTab=document.getElementById("save-tab");
let savedLinks=[]; 

//read save links from local storage
let savedLinksFromLocalStorage=JSON.parse(localStorage.getItem("savedLinks"))

if(savedLinksFromLocalStorage)
{
  savedLinks=savedLinksFromLocalStorage;
  renderLinks(savedLinks)
}

saveInput.addEventListener("click",function(){
  savedLinks.push(saveLink.value)
  localStorage.setItem("savedLinks",JSON.stringify(savedLinks))
  renderLinks(savedLinks);
  saveLink.value="";
})
function renderLinks(links)
{
  var listItems=[];
  for(let i=0;i<links.length;i++)
  {
    listItems +=`
    <li>
    <a href="${savedLinks[i]}" target="_blank">
    ${savedLinks[i]}
    </a>
    </li>`;
  }
  //render once  better for performance
  renderedLinks.innerHTML =listItems;
}


saveTab.addEventListener("click",function(){
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    savedLinks.push(tabs[0].url)
    localStorage.setItem("savedLinks",JSON.stringify(savedLinks))
    renderLinks(savedLinks);
  });
 
})

deleteLinks.addEventListener("dblclick",function(){
  savedLinks=[];
  localStorage.clear();
  renderLinks(savedLinks);
})