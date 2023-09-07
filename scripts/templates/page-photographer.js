const pagePhotographerTemplate = (data) => {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    const getUserCardDOM = () => {

        
        const photographHeaderInfo = document.createElement( 'div' );
            photographHeaderInfo.classList.add('photograph-header__info')

        const h1 = document.createElement( 'h1' );
            h1.textContent = name;
            h1.classList.add('photograph-header__info__name');
            h1.setAttribute('aria-label', `Nom du photographe : ${name}`);

         const photographHeaderInfoContent = document.createElement( 'div' );
            photographHeaderInfoContent.classList.add('photograph-header__info__content')
   

        const pLocality = document.createElement( 'p' );
            pLocality.textContent = `${city}, ${country}`;
            pLocality.classList.add('photograph-header__info__content__locality');
            pLocality.setAttribute('aria-label', `situation géographique du photographe : ${city}, ${country}`);

        const pTagline = document.createElement( 'p' );
            pTagline.textContent = tagline;
            pTagline.classList.add('photograph-header__info__content__tgaline');
            pTagline.setAttribute('aria-label', `Slogan du photographe : ${pTagline}`);

        const img = document.createElement( 'img' );
            img.src = picture;
            img.alt = name;
            img.classList.add('photograph-header__photo-photographer')
        
        
      
            photographHeaderInfo.appendChild(h1)
            photographHeaderInfo.appendChild(photographHeaderInfoContent)
            photographHeaderInfoContent.appendChild(pLocality)
            photographHeaderInfoContent.appendChild(pTagline)


            photographHeaderInfo.appendChild(img)
       
           

        return (photographHeaderInfo);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}


export default pagePhotographerTemplate