

class Lightbox {
    static init() {
        document.addEventListener('DOMContentLoaded', () => {
            const firstImage = mediaOfPhotographer.find(media => media.image);
            const photographerName = namePhotographer[photographerId];

            // Vérifiez si une première image a été trouvée
            if (firstImage) {
                const lightboxImage = document.querySelector('.lightbox__container img');
                lightboxImage.src = `Sample Photos/${photographerName}/${firstImage.image}`;
                lightboxImage.alt = firstImage.title;
                lightboxImage.classList.add("lightbox__container__img");
            }

            const links = document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".mp4"]');
            links.forEach(link => link.addEventListener('click', e => {
                e.preventDefault();
                new Lightbox(e.currentTarget.getAttribute("href"));
            }));
        });
    }

    constructor(url) {
        const element = this.buildDOM(url);
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
        
        return dom;
    }
}

Lightbox.init();
