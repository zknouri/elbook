import icons from "url:../../img/icons.svg";
import missingCover from "url:../../img/missing-cover.jpg";
import { iso6393 } from "iso-639-3";

class ResultsView {
  #parentEl = document.querySelector(".results");
  #body = document.querySelector("body");
  #header = document.querySelector(".header");
  #smallHeaderLogo = document.querySelector(".header__logo");
  #resultsNumber = document.querySelector(".results__number");
  #pageTitle = document.querySelector(".page-title");
  #authorWorksPagination = document.querySelectorAll(
    ".author-works-pagination"
  );
  #data;

  #clear() {
    this.#parentEl.innerHTML = "";
    this.#pageTitle.querySelector("h1").innerHTML = "";
  }

  #resultsPageLayout(resultsNumber) {
    this.#body.style.justifyContent = "normal";
    this.#body.style.alignItems = "normal";
    this.#body.style.marginLeft = "20%";
    this.#header.classList.add("header-small");
    this.#smallHeaderLogo.classList.add("header__logo-small");
    this.#resultsNumber.innerHTML = `${resultsNumber} results.`;
    this.#authorWorksPagination.forEach((el) => el.classList.add("hidden"));
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
          <div class="cover"><img src="${
            result.cover
              ? `https://covers.openlibrary.org/b/olid/${result.cover}-L.jpg" alt="${result.title}`
              : `${missingCover}`
          }" alt="" /></div>
          <div class="infos">
            <div class="flex" title="Title">
              <a href="" class="title" data-key="${result.key}"><h2>${
      result.title
    }</h2></a>
            </div>
            
              ${
                result.author
                  ? `<div class="flex" title="Author"><svg class="info__svg">
                <use href="${icons}#icon-person"></use>
              </svg>
              <span class="infos-text">${result.author
                .map((author, i) =>
                  author
                    ? `<a href="" class="author" data-author-key="${result.authorKey[i]}"><h3>${author}</h3></a>`
                    : ""
                )
                .join(" - ")}</span></div>`
                  : ""
              }
            
            
            ${
              result.year
                ? `<div class="flex" title="Publish year"><svg><use href="${icons}#icon-calendar"></use></svg> <span class="infos-text">${result.year}</span></div>`
                : ""
            }
            
            
            ${
              result.editions
                ? `<div class="flex" title="Number of Editions"><svg><use href="${icons}#icon-book"></use></svg> <span class="infos-text">${result.editions} Editions</span></div>`
                : ""
            }
            
            
              ${
                result.languages
                  ? `<div class="flex" title="languages"><svg><use href="${icons}#icon-language"></use></svg><span class="infos-text languages">${result.languages
                      .map(
                        (lang) =>
                          iso6393.find((iso) => iso.iso6392B === lang)?.name
                      )
                      .join(", ")}</span></div>`
                  : ""
              }
            
          </div>
        </li>
    `;
  }
}

export default new ResultsView();
