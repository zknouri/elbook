import icons from "url:../../img/icons.svg";
import missingAuthorImage from "url:../../img/missing-author-image.jpg";

class AuthorView {
  #parentEl = document.querySelector(".results");
  #resultsPagination = document.querySelectorAll(".resutls-pagination");
  #authorWorksPagination = document.querySelectorAll(
    ".author-works-pagination"
  );
  #resultsNumber = document.querySelector(".results__number");
  #searchField = document.querySelector(".search__field");
  #body = document.querySelector("body");
  #data;

  /**
   * Render Author view
   * @param {Object} data - Author data to be rendered
   */
  render(data) {
    this.#data = data;
    this.#clear();

    const markup = this.#generateMarkup(this.#data);
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
    this.#authorPageLayout();
    this.#addHandlerHideShowAuthorInfos();
  }

  /**
   * Render loading spinner
   */
  showLoadingSpinner() {
    this.#clear();
    this.#body.querySelector(".loading-spinner").classList.remove("hidden");
  }

  /**
   * Update Author page layout
   */
  #authorPageLayout() {
    this.#parentEl.querySelector(".doc").style.display = "block";
    this.#resultsNumber.innerHTML = "";
    this.#searchField.value = "";
    this.#resultsPagination.forEach((el) => el.classList.add("hidden"));
    this.#authorWorksPagination.forEach((el) => el.classList.add("hidden"));
    this.#body.querySelector(".loading-spinner").classList.add("hidden");
  }

  /**
   * Add Event listener to the Author Name link
   * @param {void} handler - Author Controller
   */
  addHandlerAuthor(handler) {
    this.#parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      const author = e.target.closest(".author");
      if (!author) return;

      const authorKey = author.dataset.authorKey;

      handler(authorKey);
    });
  }

  /**
   * Clear results container
   */
  #clear() {
    this.#parentEl.innerHTML = "";
  }

  /**
   * Add Event Listener for hiding or showing Author page content(Bio, Alternate Names, ID Numbers)
   */
  #addHandlerHideShowAuthorInfos() {
    this.#parentEl.addEventListener("click", function (e) {
      const authorBio = e.target.closest(".author-bio");
      const altNames = e.target.closest(".author-alternate-names");
      const idNUmbers = e.target.closest(".author-id-numbers");

      if (
        e.target.localName === "h4" ||
        e.target.localName === "use" ||
        e.target.localName === "svg"
      ) {
        if (authorBio) {
          authorBio.querySelector("p").classList.toggle("hidden");
          authorBio.querySelector("h4").innerHTML = `
                <svg class="collapse__svg">
                  <use href="${icons}#icon-arrow-${
            authorBio.querySelector("p").className.includes("hidden")
              ? "hide"
              : "show"
          }"></use>
                </svg>
                Biography
              `;
        } else if (altNames) {
          altNames.querySelector("p").classList.toggle("hidden");
          altNames.querySelector("h4").innerHTML = `
                <svg class="collapse__svg">
                  <use href="${icons}#icon-arrow-${
            altNames.querySelector("p").className.includes("hidden")
              ? "hide"
              : "show"
          }"></use>
                </svg>
                Alternative Names
              `;
        } else if (idNUmbers) {
          idNUmbers.querySelector("ul").classList.toggle("hidden");
          idNUmbers.querySelector("h4").innerHTML = `
                <svg class="collapse__svg">
                  <use href="${icons}#icon-arrow-${
            idNUmbers.querySelector("ul").className.includes("hidden")
              ? "hide"
              : "show"
          }"></use>
                </svg>
                ID Numbers
              `;
        } else return;
      }
    });
  }

  /**
   * Generte Author Markup
   * @param {Object} author - Data
   * @returns - Markup
   */
  #generateMarkup(author) {
    return `
      <li class="doc">
        <div class="author-box">
          <div class="author-photo">
            <img src="${
              author.photo
                ? `https://covers.openlibrary.org/b/id/${author.photo}-M.jpg" alt="${author.authorName}`
                : `${missingAuthorImage}`
            }" />
              
          </div>
          <div class="author-info">
            <div class="flex" title="Title">
                <svg class="info__svg">
                  <use href="${icons}#icon-person"></use>
                </svg>
                <span class="infos-text">
                  <h2>${author.authorName} (${
      author.personalName ? author.personalName : author.authorName
    })</h2>
                </span>
              </div>

              <div class="flex" title="Works">
                <svg class="info__svg">
                  <use href="${icons}#icon-library"></use>
                </svg>
                <span class="infos-text">
                  <a href="" class="works" data-key="${
                    author.key
                  }"><h3>Works</h3></a>
                </span>
              </div>
              
              
              ${
                author.birthDate
                  ? `<div class="flex" title="Birth-Death"><svg class="info__svg"><use href="${icons}#icon-calendar"></use></svg><span class="infos-text"><p>${
                      author.birthDate
                    } - ${
                      author.deathDate ? author.deathDate : ""
                    }</p></span></div>`
                  : ""
              }
                
              
              
                ${
                  author.links
                    ? author.links
                        ?.map(
                          (link) => `
                    <div class="flex" title="${link.title}">
                      <svg class="info__svg">
                        <use href="${icons}#icon-link"></use>
                      </svg>
                      <span class="infos-text">
                        <a href="${link.url}">${link.title}</a>
                      </span>
                    </div>`
                        )
                        .join("")
                    : ""
                }
              <div class="flex" title="Wikidata link">
                
                ${
                  author.idNumbers
                    ? `<svg class="wikidata__svg"><use href="${icons}#icon-wikidata"></use></svg><span class="infos-text"><a href="https://www.wikidata.org/wiki/${author.idNumbers?.wikidata}">${author.authorName} - Wikidata</a></span>`
                    : ""
                }
                  
                
              </div>
          </div>
        </div>

        ${
          author.bio
            ? `<div class="author-bio">
          <h4>
            <svg class="collapse__svg">
              <use href="${icons}#icon-arrow-show"></use>
            </svg> 
            Biography
          </h4>
          <p>${author.bio}</p>
        </div>`
            : ""
        }
        
        ${
          author.alternateNames
            ? `<div class="author-alternate-names">
          <h4>
            <svg class="collapse__svg">
              <use href="${icons}#icon-arrow-hide"></use>
            </svg> 
            Alternative Names
          </h4>
          <p class="hidden">
            ${author.alternateNames.map((altName) => `${altName}`).join(" - ")}
          </p>
        </div>`
            : ""
        }
        
        ${
          author.idNumbers
            ? `<div class="author-id-numbers">
          <h4>
            <svg class="collapse__svg">
              <use href="${icons}#icon-arrow-hide"></use>
            </svg> 
            ID Numbers
          </h4>
          <ul class="lists hidden">
            ${Object.entries(author.idNumbers)
              .map(
                (el) =>
                  `<li class="lists__li"><span class="lists__span">${el[0].toUpperCase()}</span>: ${
                    el[1]
                  }</li>`
              )
              .join("")}
          </ul>
        </div>`
            : ""
        }
        
      </li>
    `;
  }
}

export default new AuthorView();
