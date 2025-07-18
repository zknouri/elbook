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
  #errorMessage =
    "No results were found for your query. Please try again or check your query!";
  #data;
  #numberOfResults;

  /**
   * Clear results container
   */
  #clear() {
    this.#parentEl.innerHTML = "";
    this.#pageTitle.querySelector("h1").innerHTML = "";
  }

  /**
   * Render Search Results view
   * @param {Object} data - Search Results data to be rendered
   * @param {number} resultsNumber - Number of results
   * @returns - Error if there no results found
   */
  render(data, resultsNumber) {
    this.#numberOfResults = resultsNumber;
    if (this.#numberOfResults === 0) return this.renderError();
    this.#data = data;
    this.#clear();
    const markup = this.#generateMarkup();
    this.#resultsPageLayout(this.#numberOfResults);
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Update Results page layout
   */
  #resultsPageLayout() {
    this.#body.classList.add("results__body");
    this.#header.classList.add("header-small");
    this.#smallHeaderLogo.classList.add("header__logo-small");
    this.#smallHeaderLogo.classList.remove("header__logo");
    this.#resultsNumber.innerHTML = `${this.#numberOfResults} results.`;
    this.#authorWorksPagination.forEach((el) => el.classList.add("hidden"));
    this.#body.querySelector(".loading-spinner").classList.add("hidden");
  }

  /**
   * Render loading spinner
   */
  showLoadingSpinner() {
    const markup = `
    <div class="loading-spinner">
      <svg class="spinner__svg">
        <use href="${icons}#icon-loading"></use>
      </svg>
    </div>
    `;
    this.#clear();
    this.#body.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Render Error Message
   * @param {string} message - To be Rendered
   */
  renderError(message = this.#errorMessage) {
    const markup = `
    <li class="doc">
      <div class="flex" style="align-items: center;">
        <svg class="info__svg">
          <use href="${icons}#icon-alert"></use>
        </svg>
        <p>${message}</p>
        </div>
    </li>
    `;
    this.#clear();
    this.#resultsPageLayout();
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
    this.#body.querySelector(".loading-spinner").classList.add("hidden");
  }

  /**
   * Generate Markup by joining an Array of list items
   * @returns - Markup
   */
  #generateMarkup() {
    return this.#data.map(this.#generateMarkupPreview).join("");
  }

  /**
   * Generate one List item for each result
   * @param {Object} result - Search Results
   * @returns - List item Markup
   */
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
