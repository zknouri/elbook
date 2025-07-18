import icons from "url:../../img/icons.svg";
import missingCover from "url:../../img/missing-cover.jpg";

class AuthorWorksView {
  #parentEl = document.querySelector(".results");
  #pageTitle = document.querySelector(".page-title");
  #resultsNumber = document.querySelector(".results__number");
  #body = document.querySelector("body");
  #data;

  /**
   * Render Author related Works view
   * @param {Object} data - Author related Works data to be rendered
   */
  render(data) {
    this.#data = data;
    this.#clear();
    const markup = this.#generateMarkup(this.#data);
    this.#renderPageTitle(this.#data.authorName);
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
    this.#addHandlerHideShowAuthorWorksInfos();
    this.#resultsNumber.innerHTML = `${this.#data.numberOfWorks} results.`;
    this.#body.querySelector(".loading-spinner").classList.add("hidden");
  }

  /**
   * Render loading spinner
   */
  showLoadingSpinner() {
    this.#clear();
    this.#body.querySelector(".loading-spinner").classList.remove("hidden");
  }

  /**
   * Render Page Title
   * @param {string} authorName - Author name for page title
   */
  #renderPageTitle(authorName) {
    this.#pageTitle.querySelector(
      "h1"
    ).innerHTML = `Works related to ${authorName}`;
  }

  /**
   * Add Event listener to Author Works link
   * @param {void} handler - Author Works Controller
   */
  addHandlerAuthorWorks(handler) {
    this.#parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      const title = e.target.closest(".works");
      if (!title) return;
      const key = title.dataset.key;
      handler(key);
    });
  }

  /**
   * Clear results container
   */
  #clear() {
    this.#parentEl.innerHTML = "";
    this.#pageTitle.querySelector("h1").innerHTML = "";
  }

  /**
   * Add Event Listener for hiding or showing Author Works content(Description, Subjects, Subject Times, Subject Peoplen Subject Places)
   */
  #addHandlerHideShowAuthorWorksInfos() {
    this.#parentEl.addEventListener("click", function (e) {
      const description = e.target.closest(".description");
      const subjects = e.target.closest(".subjects");
      const subjectP = e.target.closest(".subject-people");
      const subjectT = e.target.closest(".subject-times");
      const subjectPl = e.target.closest(".subject-places");

      if (
        e.target.localName === "h4" ||
        e.target.localName === "use" ||
        e.target.localName === "svg"
      ) {
        if (description) {
          description.querySelector("p").classList.toggle("hidden");
          description.querySelector("h4").innerHTML = `
                <svg class="collapse__svg">
                  <use href="${icons}#icon-arrow-${
            description.querySelector("p").className.includes("hidden")
              ? "hide"
              : "show"
          }"></use>
                </svg>
                Description
              `;
        } else if (subjects) {
          subjects.querySelector("p").classList.toggle("hidden");
          subjects.querySelector("h4").innerHTML = `
                <svg class="collapse__svg">
                  <use href="${icons}#icon-arrow-${
            subjects.querySelector("p").className.includes("hidden")
              ? "hide"
              : "show"
          }"></use>
                </svg>
                Subjects
              `;
        } else if (subjectP) {
          subjectP.querySelector("p").classList.toggle("hidden");
          subjectP.querySelector("h4").innerHTML = `
                <svg class="collapse__svg">
                  <use href="${icons}#icon-arrow-${
            subjectP.querySelector("p").className.includes("hidden")
              ? "hide"
              : "show"
          }"></use>
                </svg>
                Subject People
              `;
        } else if (subjectT) {
          subjectT.querySelector("p").classList.toggle("hidden");
          subjectT.querySelector("h4").innerHTML = `
                <svg class="collapse__svg">
                  <use href="${icons}#icon-arrow-${
            subjectT.querySelector("p").className.includes("hidden")
              ? "hide"
              : "show"
          }"></use>
                </svg>
                Subject Times
              `;
        } else if (subjectPl) {
          subjectPl.querySelector("p").classList.toggle("hidden");
          subjectPl.querySelector("h4").innerHTML = `
                <svg class="collapse__svg">
                  <use href="${icons}#icon-arrow-${
            subjectPl.querySelector("p").className.includes("hidden")
              ? "hide"
              : "show"
          }"></use>
                </svg>
                Subject Places
              `;
        } else return;
      }
    });
  }

  /**
   * Generate Author Works Markup
   * @param {Object} data - Author Works
   * @returns - Markup
   */
  #generateMarkup(data) {
    return data.works
      .map(
        (work) => `
      <li class="doc">
          <div class="cover"><img src="${
            work.workCover && work.workCover !== -1
              ? `https://covers.openlibrary.org/b/id/${work.workCover}-M.jpg" alt="${work.workTitle}`
              : `${missingCover}`
          }" alt="" /></div>
          <div class="infos">
            <div class="flex" title="Title">
              <h2>${work.workTitle}</h2>
            </div>
            
            ${
              work.workPublishDate
                ? `<div class="flex" title="Publish year"><svg><use href="${icons}#icon-calendar"></use></svg> <span class="infos-text">${work.workPublishDate}</span></div>`
                : ""
            }

            ${
              work.workLinks
                ? work.workLinks
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
            
          ${
            work.workDescription
              ? `<div class="description">
              <h4><svg class="collapse__svg">
                <use href="${icons}#icon-arrow-hide"></use>
              </svg>Description</h4>
              <p class="hidden">${work.workDescription}</p>
            </div>`
              : ""
          }

          ${
            work.workSubjects
              ? `<div class="subjects">
              <h4><svg class="collapse__svg">
                <use href="${icons}#icon-arrow-hide"></use>
              </svg>Subjects</h4>
              <p class="hidden">${work.workSubjects
                .map((sub) => sub)
                .join(", ")}</p>
            </div>`
              : ""
          }

          ${
            work.subjectPeople
              ? `<div class="subject-people">
              <h4><svg class="collapse__svg">
                <use href="${icons}#icon-arrow-hide"></use>
              </svg>Subject People</h4>
              <p class="hidden">${work.subjectPeople
                .map((subP) => subP)
                .join(", ")}</p>
            </div>`
              : ""
          }

          ${
            work.subjectTimes
              ? `<div class="subject-times">
              <h4><svg class="collapse__svg">
                <use href="${icons}#icon-arrow-hide"></use>
              </svg>Subject Times</h4>
              <p class="hidden">${work.subjectTimes
                .map((subT) => subT)
                .join(", ")}</p>
            </div>`
              : ""
          }
            
          ${
            work.subjectPlaces
              ? `<div class="subject-places">
              <h4><svg class="collapse__svg">
                <use href="${icons}#icon-arrow-hide"></use>
              </svg>Subject Places</h4>
              <p class="hidden">${work.subjectPlaces
                .map((subPl) => subPl)
                .join(", ")}</p>
            </div>`
              : ""
          }
            
          </div>
        </li>
      `
      )
      .join("");
  }
}

export default new AuthorWorksView();
