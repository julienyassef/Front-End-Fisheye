class Lightbox {
    static init() {
        document.addEventListener('DOMContentLoaded', () => {
            
           
            // const links = document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".mp4"]')

            // console.log('Selected links:', links);

            // links.forEach(link => link.addEventListener('click', e => {
            //     e.preventDefault()
            //     console.log('Image clicked');
            //     new Lightbox(e.currentTarget.getAttribute('href'));
            // }));

            const links = document.querySelectorAll('a');
            console.log('Selected links:', links);

                links.forEach(link => {
                if (link.href.endsWith('.png') || link.href.endsWith('.jpg') || link.href.endsWith('.jpeg') || link.href.endsWith('.mp4')) {
                    link.addEventListener('click', e => {
                        e.preventDefault();
                        console.log('Image clicked');
                        new Lightbox(e.currentTarget.getAttribute('href'));
        });
    }
});

        });
    }
    
    constructor(url) {
        const element = this.buildDOM(url);
        console.log(element)
        document.body.appendChild(element);
       
       
    }

    buildDOM(url) {
        const dom = document.createElement('div');
        dom.classList.add('lightbox');
        dom.innerHTML = `<button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container">
          <img src="${url}" alt="">
        </div>`;
        
        return dom
    }
}


Lightbox.init();
