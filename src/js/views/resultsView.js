import icons from "url:../../img/icons.svg";

class ResultsView {
  #parentEl = document.querySelector(".results");
  #body = document.querySelector("body");
  #header = document.querySelector(".header");
  #smallHeaderLogo = document.querySelector(".header__logo");
  #resultsNumber = document.querySelector(".results__number");
  #data;

  #clear() {
    this.#parentEl.innerHTML = "";
  }

  #resultsPageLayout(resultsNumber) {
    this.#body.style.justifyContent = "normal";
    this.#body.style.alignItems = "normal";
    this.#body.style.marginLeft = "10%";
    this.#header.classList.add("header-small");
    this.#smallHeaderLogo.classList.add("header__logo-small");
    this.#resultsNumber.innerHTML = `${resultsNumber} results.`;
  }

  render(data, resultsNumber) {
    this.#data = data;
    this.#clear();
    const markup = this.#generateMarkup();
    this.#resultsPageLayout(resultsNumber);
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  #generateMarkup() {
    return this.#data.map(this.#generateMarkupPreview).join("");
  }

  #generateMarkupPreview(result) {
    return `
        <li class="doc">
          <div class="cover"><img src="https://covers.openlibrary.org/b/olid/${result.cover}-L.jpg" alt="" /></div>
          <div class="infos">
            <div class="flex">
              <a href="" class="title"><h2>${result.title}</h2></a>
            </div>
            <div class="flex">
              <svg class="info__svg">
                <use href="${icons}#icon-person"></use>
              </svg>
              <a href="" class="author"><h3>${result.author}</h3></a>
            </div>
            <div class="flex">
              <svg>
                  <use href="${icons}#icon-calendar"></use>
              </svg> ${result.year} 
            </div>
            <div class="flex">
              <svg>
                  <use href="${icons}#icon-book"></use>
              </svg> ${result.editions} Editions 
            </div>
            <div class="flex">
              <svg>
                  <use href="${icons}#icon-language"></use>
              </svg> ${result.languages} 
            </div>
            </div>
        </li>
    `;
  }
}

export default new ResultsView();
