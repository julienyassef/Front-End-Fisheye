const pagePhotographerTemplate = (data) => {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    const getUserCardDOM = () => {

        
        const photographHeader = document.createElement( 'article' );
            photographHeader.classList.add('photograph-header')
        
        const photographHeaderProfil = document.createElement( 'div' );
            photographHeaderProfil.classList.add('photograph-header__profil')

        const h1 = document.createElement( 'h1' );
            h1.textContent = name;
            h1.classList.add('photograph-header__profil__name');
            h1.setAttribute('aria-label', `Nom du photographe : ${name}`);

         const profilContent = document.createElement( 'div' );
            profilContent.classList.add('photograph-header__profil__content')
   

        const pLocality = document.createElement( 'h2' );
            pLocality.textContent = `${city}, ${country}`;
            pLocality.classList.add('photograph-header__profil__content__locality');
            pLocality.setAttribute('aria-label', `situation géographique du photographe : ${city}, ${country}`);

        const pTagline = document.createElement( 'p' );
            pTagline.textContent = tagline;
            pTagline.classList.add('photograph-header__profil__content__tgaline');
            pTagline.setAttribute('aria-label', `Slogan du photographe : ${pTagline}`);

        const contactButton = document.createElement('button');
            contactButton.textContent = 'Contactez-moi';
            contactButton.classList.add('photograph-header__contact_button');
            contactButton.addEventListener('click', displayModal);

        const img = document.createElement( 'img' );
            img.src = picture;
            img.alt = name;
            img.classList.add('photograph-header__photo')
        
        
      
            photographHeader.appendChild(photographHeaderProfil)
                photographHeaderProfil.appendChild(h1)
                photographHeaderProfil.appendChild(profilContent)
                    profilContent.appendChild(pLocality)
                    profilContent.appendChild(pTagline)
            photographHeader.appendChild(contactButton);
            photographHeader.appendChild(img)
       
           

        return (photographHeader);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}


export default pagePhotographerTemplate