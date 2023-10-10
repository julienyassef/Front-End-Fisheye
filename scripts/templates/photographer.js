const photographerTemplate = (data) => {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    const getUserCardDOM = () => {
        const article = document.createElement( 'article' );
            article.classList.add('card-photographer')

    // création partie link clicable avec photo et nom
        const linkPagePhotographer = document.createElement( 'a' );
            linkPagePhotographer.classList.add('card-photographer__link')
            linkPagePhotographer.href = `./photographer.html?id=${id}`;
            linkPagePhotographer.setAttribute('aria-label', `Page du photographe : ${name}`); 
            
        const img = document.createElement( 'img' );
            img.src = picture;
            img.alt = name;
            img.classList.add('card-photographer__photo')
            img.setAttribute('aria-label', `Photo du photographe : ${name}`);
        
        const h2 = document.createElement( 'h2' );
            h2.textContent = name;
            h2.classList.add('card-photographer__name');
            h2.setAttribute('aria-label', `Nom du photographe : ${name}`);

    // création partie info photographe
        const divTextContent = document.createElement( 'div' );
            divTextContent.classList.add('card-photographer__content');    

        const h3 = document.createElement( 'h3' );
            h3.textContent = `${city}, ${country}`;
            h3.classList.add('card-photographer__locality');
            h3.setAttribute('aria-label', `situation géographique du photographe : ${city}, ${country}`);

        const pTagline = document.createElement( 'p' );
            pTagline.textContent = tagline;
            pTagline.classList.add('card-photographer__tgaline');
            pTagline.setAttribute('aria-label', `Slogan du photographe : ${tagline}`);

        const pPrice = document.createElement( 'p' );
            pPrice.textContent = `${price}€ / jour`;
            pPrice.classList.add('card-photographer__price');
            pPrice.setAttribute('aria-label', `Tarif du photographe à la journée : ${price}€`);

    //  Ajout des élèments à la structure HTML
        article.appendChild(linkPagePhotographer);
            linkPagePhotographer.appendChild(img);
            linkPagePhotographer.appendChild(h2)

        article.appendChild(divTextContent);
            divTextContent.appendChild(h3);
            divTextContent.appendChild(pTagline);
            divTextContent.appendChild(pPrice);

        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}


export default photographerTemplate