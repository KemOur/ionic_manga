/*
document.querySelector('#').addEventListener('input', function () {
let url = "https://api.jikan.moe/v3/search/anime?q=${search.value}"
    fetch(url).then((response) =>{
        response.json().then((data)=>{
            console.log(data)
        })
    })
})

*/

let form = document.querySelector('#form')
let search = document.querySelector('#search')

let select = document.querySelector('#select')
let manga = document.querySelector('#manga')
let anime = document.querySelector('#anime')
let personne = document.querySelector('#personne')
let personnage = document.querySelector('#personnage')


form.addEventListener("submit",  (event)=> {
    // Bloque l'envoi du formulaire
    event.preventDefault();
            axios
                .get(
                    `https://api.jikan.moe/v3/search/anime?q=${search.value}`
                ).then((response) => {
                console.log(response.data)
                let data = response.data.results
                //console.log(data[0].title)
                //console.log(data)
                for(const manga of data) {
                    //console.log(manga.title)
                    let div = document.createElement("div");
                    //ma condition pour afficher soit un dessin animé soît une personnage ou autre!
                    div.innerHTML = `<ion-card>
                                    <img src="${manga.image_url}" style="width: 100%"/>
                                    <ion-card-header>
                                        <ion-card-subtitle>
                                        <a target="_blank" href="${manga.episodes}"></a>
                                        </ion-card-subtitle>
                                        <ion-card-title>${manga.title}</ion-card-title>
                                    </ion-card-header>
                                    <ion-card-content>
                                        ${manga.synopsis}
                                    </ion-card-content>
                                </ion-card>`;
                    let list = document.querySelector("#list");
                    list.append(div);

                }

     })
     })