import { getPhotographers } from "../utils/getData.js"
//Mettre le code JavaScript lié à la page photographer.html

const getID = () => {
    const url = new URL(window.location.href)
    const params = url.searchParams
    const id = params.get('id')
    return id
}

const getPhotographer = async () => {
    const photographerId = getID();
    const data = await getPhotographers();

    const photographers = data.photographers
    const medias = data.media

    console.log(photographers)
    console.log(medias)

    // trouver dans data tout ce qui est en relation avec le photographerId
    // boucler sur data.photographer
    // boucler sur data.medias
    const photographerDetail = photographers.find(photographer => photographer.id == photographerId)
    // display header(photographerDetail) <== factory
    
}

getPhotographer()