export const filterBy = () => {
  const menu = document.getElementById("menu-trier");
  const options = menu.querySelectorAll(".select-container__menu__option");
  const contenu = document.querySelectorAll(".media-photographer__card");
  const contenuContainer = document.querySelector(".media-photographer");
  const optionPopularity = menu.querySelector(".select-container__menu__option__popularity");
  const optionDate = menu.querySelector(".select-container__menu__option__date");
  const optionTitle = menu.querySelector(".select-container__menu__option__title");
  const arrow = document.querySelector(".select-container__arrow-svg");
  const borders = document.querySelectorAll(".select-container__menu__border");

  arrow.addEventListener("click", () => {
  
      if (arrow.classList.contains("select-container__arrow-svg")) {
        arrow.classList.add("select-container__arrow-svg__active");
        arrow.classList.remove("select-container__arrow-svg");
        optionDate.classList.add("select-container__option__active");
        optionTitle.classList.add("select-container__option__active");
        borders.forEach((border) => {
          border.classList.add("select-container__menu__border__active");
        });
      } else if (arrow.classList.contains("select-container__arrow-svg__active")) {
        arrow.classList.remove("select-container__arrow-svg__active");
        arrow.classList.add("select-container__arrow-svg");
        optionDate.classList.remove("select-container__option__active");
        optionTitle.classList.remove("select-container__option__active");
        borders.forEach((border) => {
          border.classList.remove("select-container__menu__border__active");
        });
      }
  });

//  optionPopularity.classList.remove("select-container__option__deled");

  options.forEach((select) => {
    select.addEventListener("click", () => {
      const criteria = select.textContent.toLowerCase();

      if (criteria === "titre") {
        arrow.classList.remove("select-container__arrow-svg__active");
        optionDate.classList.remove("select-container__option__active");
        optionPopularity.classList.toggle("select-container__option__deled");
        borders.forEach((border) => {
          border.classList.remove("select-container__menu__border__active");
        });
      } 
    });
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const criteria = option.textContent.toLowerCase();// pour avoir le texte de l'option en miniscule

      const contenuSorted = Array.from(contenu).sort((a, b) => {
        if (criteria === "popularité") {
          const popularityA = parseInt(
            a.querySelector(".media-photographer__card__content__like__nbr").textContent
          );
          const popularityB = parseInt(
            b.querySelector(".media-photographer__card__content__like__nbr").textContent
          );
          return popularityB - popularityA;
        } else if (criteria === "date") {
          const dateA = a.getAttribute("date");
          const dateB = b.getAttribute("date");
          return new Date(dateB) - new Date(dateA);
        } else if (criteria === "titre") {
          const titleA = a
            .querySelector(".media-photographer__card__content__description")
            .textContent.toLowerCase();
          const titleB = b
            .querySelector(".media-photographer__card__content__description")
            .textContent.toLowerCase();
          return titleA.localeCompare(titleB);
        }
        return 0;
      });
      // Remplacez le contenu existant par le contenu trié
      contenu.forEach((element) => element.remove());
      contenuSorted.forEach((element) => contenuContainer.appendChild(element));
    });
  });
};
