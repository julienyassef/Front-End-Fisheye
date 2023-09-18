class Lightbox {
    static init() {
        const links = document.querySelectorAll('.media-photographer__a')
        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            // console.log('Image clicked');
            new Lightbox(e.currentTarget.getAttribute('href'));
        }));
    }
    
    constructor(url) {
        const element = this.buildDOM(url);
        // console.log(element)
        document.body.appendChild(element);
       
       
    }

    buildDOM(url) {
        // tester si dans la const 'url' il y a le terme '.mp4' à la fin
        // si oui :
        // création d'une balise video ;)

        // sinon :
        const dom = document.createElement('div');
        dom.classList.add('lightbox');
        dom.innerHTML = `<button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container">
          <img src="${url}" alt="">
        </div>`;

       
        
        // console.log(url)
        return dom
    }
}

export default Lightbox