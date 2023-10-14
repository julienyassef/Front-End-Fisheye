// Cette fonction asynchrone récupère les données des photographes à partir du JSON.
export const getPhotographers = async () => {
    try {
        // récupérer des données à partir du JSON
        const response = await fetch('./data/photographers.json'); 
        // Transformer la réponse de la requête en données JSON
        const photographersData = await response.json();
        return photographersData;
    } catch (error) {
        console.error('Une erreur est survenue :', error);
        return { photographers: [] };
    }
};

// Cette fonction récupère un photographe en fonction de son ID
export const getPhotographerFromID = async (id) => {
    // Récupérer toutes les données des photographes
    const data = await getPhotographers();
     // Extraire le tableau des photographes à partir des données
    const photographers = data.photographers;
    // Rechercher le photographe dont l'ID correspond à la valeur passée en paramètre
    const photographer = photographers.find(photographer => photographer.id == id);
    return photographer;
}
