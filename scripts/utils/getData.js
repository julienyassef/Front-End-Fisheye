// Cette fonction asynchrone récupère les données des photographes à partir du JSON.
export const getPhotographers = async () => {
    try {
        // récupérer des données à partir du JSON
        const response = await fetch('./data/photographers.json'); 
        // la réponse de la requête est transformée en données JSON 
        const photographersData = await response.json();
        return photographersData;
    } catch (error) {
        console.error('Une erreur est survenue :', error);
        return { photographers: [] };
    }
};

export const getPhotographerFromID = async (id) => {
    const data = await getPhotographers();
    const photographers = data.photographers;
    const photographer = photographers.find(photographer => photographer.id == id);
    return photographer;
}
