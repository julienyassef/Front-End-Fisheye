// Cette fonction asynchrone récupère les données des photographes à partir du JSON.
const getPhotographers = async () => {
    try {
        // récupérer des données à partir du JSON
        const response = await fetch('data/photographers.json'); 
        // la réponse de la requête est transformée en données JSON 
        const photographersData = await response.json();
        return photographersData;
    } catch (error) {
        console.error('Une erreur est survenue :', error);
        return { photographers: [] };
    }
};
// function qui affiche les donnés des phtographes dans le DOM
    const displayData = async(photographers) => {
        // sélection une div en html pour mettre le tableau
        const photographersSection = document.querySelector(".photographer_section");

        // parcourt chaque photographe dans le tableau des donnés
        photographers.forEach((photographer) => {
            // Utilise un modèle de card pour créer une card pour chaque photographe.
            const photographerModel = photographerTemplate(photographer);
            // Obtient le contenu DOM de la card  à partir du modèle créé dans l'autre fichier js.
            // console.log(photographerModel)
            const userCardDOM = photographerModel.getUserCardDOM();
            // console.log(userCardDOM)
            //ajout la carte dans le DOM
            photographersSection.appendChild(userCardDOM);
        });
    }

    const init = async() => {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
