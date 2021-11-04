const baseUrl = "https://the-lazy-media-api.vercel.app/";
const api = "api/games"
const baseEndpoin = `${baseUrl}${api}?page=1`;
const latestEndpoin = `${baseUrl}${api}/news/?page=1`;
const popularEndpoin = `${baseUrl}${api}/pc?page=1`;


const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
 const fetchHeader ={
    headers:{
             'X-Auth-Token': null
     }
 }
function getlist(){
    title.innerHTML= "List Berita";
    fetch (baseEndpoin,fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson);
            let data = "";
            resJson.forEach(res => {
                data += `
                <div class="col s6" >
                  <div class="card row " >
                    <div class="card-image  col s4"  >
                    <img src="${res.thumb}" style="width:100px; height:125px;">
                    </div>
                    <a href="#${res.key}" data-id="${res.key}" class="title col s8" ><strong>${res.title}</strong></a>
                    <div class="card-content">
                    <span class= " col s8" >${res.time}</span>
                    </div>
                    </div>
                  </div>
                </div>
                `
            });
            contents.innerHTML = '<ul class="collection">'+data+'</ul>'
            const detail = document.querySelectorAll('.secondary-content');
            detail.forEach(btn => {
                btn.onclick=(event) => {
                    loadPage(event.target.dataset.id);
                }
            })

        }).catch (err => {
            console.error(err);
        })
}

function showTeamInfo(page){
    let url = baseUrl+"api/detail/"+ page;
    
    fetch(url,fetchHeader)
    .then(response => response.json())
    .then(resJson => {
        console.log(resJson);
        let text = "";
        resJson.results.content.forEach(isi => {
            text += isi ;
        });
        
     


        contents.innerHTML =`
        <h2 class="header">${resJson.results.title}</h2>
        <div class="card horizontal">
          <div class="card-image">
            <img src="${resJson.results.thumb}"  height="450px">
          </div>
          <div class="card-stacked">
            <div class="card-content">
            <p> Author     : ${resJson.results.author} <br></p>
            <p> tanggal    : ${resJson.results.date} <br></p>
            <span> Content    : <span><br>
            <p>${text} <br><p>
            
         
            </div>
          </div>
        </div>        
      </div>
     `;
   
    });
}

function getlistlatest(){
    title.innerHTML= "Berita Terbaru";
    fetch (latestEndpoin,fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson);
            let data = "";
            resJson.forEach(res => {
                data += `
                <div class="col s6" >
                  <div class="card row " >
                  
                    <div class="card-image  col s4"  >
                    <img src="${res.thumb}" style="width:100px; height:125px;">

                    </div>
                    
                    <a href="#${res.key}" data-id="${res.key}" class="title col s8" ><strong>${res.title}</strong></a>
                    <div class="card-content">
                    <span class= " col s8" >${res.time}</span>
                    </div>
                    
                  </div>
                </div>
                `
            });
            contents.innerHTML = '<ul class="collection">'+data+'</ul>'
            const detail = document.querySelectorAll('.secondary-content');
            detail.forEach(btn => {
                btn.onclick=(event) => {
                    loadPage(event.target.dataset.id);
                }
            })
        }).catch (err => {
            console.error(err);
        })
}

function getlistpopular(){
    title.innerHTML= "Berita game";
    fetch (popularEndpoin,fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson);
            let data = "";
            resJson.forEach(res => {
                data += `
                <div class="col s6" >
                  <div class="card row " >
                  
                    <div class="card-image  col s4"  >
                    <img src="${res.thumb}" style="width:100px; height:125px;">

                    </div>
                    
                    <a href="#${res.key}" data-id="${res.key}" class="title col s8" ><strong>${res.title}</strong></a>
                    <div class="card-content">
                    <span class= " col s8" >${res.time}</span>
                    </div>
                    
                  </div>
                </div>
                `
            });
            contents.innerHTML = '<ul class="collection">'+data+'</ul>'
            const detail = document.querySelectorAll('.secondary-content');
            detail.forEach(btn => {
                btn.onclick=(event) => {
                    loadPage(event.target.dataset.id);
                }
            })
        }).catch (err => {
            console.error(err);
        })
}

function loadPage(page){
    switch(page){
        case "Berita":
            getlist();
            break;
        case "latest":
            getlistlatest();
            break;
        case "game":
            getlistpopular();
            break;
        case page:
            showTeamInfo(page);
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click",evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if(page === ""||page==="!") page = "Berita";
    loadPage (page);
    
});