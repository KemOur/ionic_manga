let form = document.querySelector('#form')
let error = document.querySelector(".error")
let search = document.querySelector('#search')
const selectElement = document.querySelector('#select');

selectElement.addEventListener('change', (event) => {
    //result.textContent = `t'as sélectionné: ${event.target.value}`;
    //console.log(event.target.value)
    const result = document.querySelector('#list');
    let type = event.target.value;
    console.log(type)// affichage du type: anime, manga ou person

form.addEventListener("submit",  (event)=> {
    // Bloque l'envoi du formulaire
    event.preventDefault();
    if (search.value === ""){
        error.innerHTML = "Le champs est vide!"
        error.style.display = "block"
    }else {
        result.innerHTML= ""
        error.style.display= "none"
        axios
            .get(
                `https://api.jikan.moe/v3/search/${type}?q=${search.value}`
            ).then((response) => {
            console.log(response.data)
            let data = response.data.results
            //console.log(data[0].title)
            //console.log(data)
            for (const manga of data) {
                if (type === "anime") {
                    //console.log(manga.title)
                    let div = document.createElement("div");
                    //ma condition pour afficher soit un dessin animé soît une personnage ou autre!
                    div.innerHTML = `
                                <ion-card>
                                    <img src="${manga.image_url}" style="width: 100%"/>
                                    <ion-card-header>
                                        <ion-card-title>${manga.title}</ion-card-title>
                                                <ion-item>
                                                  <ion-label>Épisodes</ion-label>
                                                  <ion-badge color="dark" slot="end">
                                                    ${manga.episodes}
                                                    </ion-badge>
                                                 </ion-item>
                                              </ion-card-header>
                                            <a target="_blank" href="${manga.url}"/>
                                            <ion-card-content>
                                        ${manga.synopsis}
                                    </ion-card-content>
                                </ion-card>`;
                    let list = document.querySelector("#list");
                    list.append(div);

                } else if (type === "person") {
                    console.log('personnes')
                    let div = document.createElement("div");
                    div.innerHTML = `<ion-item>
                                            <ion-avatar slot="start">
                                            <img src="${manga.image_url}"/>
                                              </ion-avatar>
                                              <ion-label>
                                                <ion-card-title>${manga.name}</ion-card-title>
                                                <ion-card-title>${manga.alternative_names}</ion-card-title>
                                              </ion-label>
                                            </ion-item>`;
                    let list = document.querySelector("#list");
                    list.append(div);
                } else if (type === "character") {
                    console.log('personnages')
                    let div = document.createElement("div");
                    div.innerHTML = `<ion-card>
                                            <img src="${manga.image_url}" style="width: 100%"/>
                                            <ion-card-header>                             
                                                <ion-card-title>${manga.name}</ion-card-title>
                                                <ion-card-content>
                                                ${manga.alternative_names}
                                                </ion-card-content>
                                                </ion-card-header>
                                        </ion-card>`;
                    let list = document.querySelector("#list");
                    list.append(div);
                } else if (type === "manga") {
                    console.log('manga')
                    let div = document.createElement("div");
                    div.innerHTML = `<ion-card>
                                            <img src="${manga.image_url}" style="width: 100%"/>
                                            <ion-card-header>
                                                <ion-item>   
                                                <ion-label>Volumes</ion-label>
                                                <ion-badge color="success">${manga.volumes}</ion-badge>
                                                 </ion-item>                                     
                                                <ion-card-title>${manga.title}</ion-card-title>
                                                </ion-card-header>
                                                <a target="_blank" href="${manga.url}"/>
                                                <ion-card-content>
                                                ${manga.synopsis}
                                            </ion-card-content>
                                        </ion-card>`;
                    let list = document.querySelector("#list");
                    list.append(div);
                }
            }
        })
    }
        })

    })