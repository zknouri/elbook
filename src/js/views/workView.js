import icons from "url:../../img/icons.svg";
import missingCover from "url:../../img/missing-cover.jpg";
import { iso6393 } from "iso-639-3";

class WorkView {
  #parentEl = document.querySelector(".results");
  #resultsPagination = document.querySelectorAll(".resutls-pagination");
  #authorWorksPagination = document.querySelectorAll(
    ".author-works-pagination"
  );
  #resultsNumber = document.querySelector(".results__number");
  #searchField = document.querySelector(".search__field");
  #data;

  render(data) {
    this.#data = data;
    this.#clear();
    this.#resultsPagination.forEach((el) => el.classList.add("hidden"));
    this.#authorWorksPagination.forEach((el) => el.classList.add("hidden"));
    const markup = this.#generateMarkup(this.#data);
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
    this.#workPageLayout();
    this.addHandlerHideShowWorkInfos();
  }

  #workPageLayout() {
    this.#resultsNumber.innerHTML = "";
    this.#searchField.value = "";
  }

  addHandlerWork(handler) {
    this.#parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      const title = e.target.closest(".title");
      if (!title) return;
      const key = title.dataset.key;
      handler(key);
    });
  }

  addHandlerHideShowWorkInfos() {
    this.#parentEl.addEventListener("click", function (e) {
      const subjects = e.target.closest(".subjects");
      const subjectTimes = e.target.closest(".subject-times");
      const subjectPeople = e.target.closest(".subject-people");

      if (
        e.target.localName === "h4" ||
        e.target.localName === "use" ||
        e.target.localName === "svg"
      ) {
        if (subjects) {
          subjects.querySelector("p").classList.toggle("hidden");
          subjects.querySelector("h4").innerHTML = `
                <svg class="collapse__svg">
                  <use href="${icons}#icon-arrow-${
            subjects.querySelector("p").className.includes("hidden")
              ? "hide"
              : "show"
          }"></use>
                </svg>Subjects
              `;
        } else if (subjectPeople) {
          subjectPeople.querySelector("p").classList.toggle("hidden");
          subjectPeople.querySelector("h4").innerHTML = `
            <svg class="collapse__svg">
                  <use href="${icons}#icon-arrow-${
            subjectPeople.querySelector("p").className.includes("hidden")
              ? "hide"
              : "show"
          }"></use>
            </svg>Subject People
          `;
        } else if (subjectTimes) {
          subjectTimes.querySelector("p").classList.toggle("hidden");
          subjectTimes.querySelector("h4").innerHTML = `
            <svg class="collapse__svg">
                  <use href="${icons}#icon-arrow-${
            subjectTimes.querySelector("p").className.includes("hidden")
              ? "hide"
              : "show"
          }"></use>
            </svg>Subject Times
          `;
        } else {
          return;
        }
      }
    });
  }

  #clear() {
    this.#parentEl.innerHTML = "";
  }

  #generateMarkup(work) {
    return `
        <li class="doc">
          <div class="cover"><img src="${
            work.cover
              ? `https://covers.openlibrary.org/b/olid/${work.cover}-L.jpg" alt="${work.author}`
              : `${missingCover}`
          }" />
          
              
              ${
                work.author
                  ? `<div class="flex" title="Author"><svg class="info__svg"><use href="${icons}#icon-person"></use></svg><span class="infos-text">${work.author
                      .map((author, i) =>
                        author
                          ? `<a href="" class="author" data-author-key="${work.authorKey[i]}"><h3>${author}</h3></a>`
                          : ""
                      )
                      .join(" - ")}</span></div>`
                  : ""
              }
            
            
            ${
              work.year
                ? `<div class="flex" title="Publish year"><svg><use href="${icons}#icon-calendar"></use></svg> <span class="infos-text">${work.year}</span></div>`
                : ""
            }
            
            
              ${
                work.editions
                  ? `<div class="flex" title="Number of Editions"><svg><use href="${icons}#icon-book"></use></svg> <span class="infos-text">${work.editions} Editions</span></div>`
                  : ""
              }
            
            
              ${
                work.languages
                  ? `<div class="flex" title="languages"><svg><use href="${icons}#icon-language"></use></svg> <span class="infos-text languages">${work.languages
                      .map(
                        (lang) =>
                          iso6393.find((iso) => iso.iso6392B === lang)?.name
                      )
                      .join(", ")}</span></div>`
                  : ""
              }
            
          </div>
          
          
          <div class="infos">
            <div class="flex" title="Title">
              <h2>${work.title}</h2>
            </div>
            ${
              work.description
                ? `<div class="description">
              <p>${work.description}</p>
            </div>`
                : ""
            }

            ${
              work.subjects
                ? `<div class="subjects">
              <h4><svg class="collapse__svg">
                <use href="${icons}#icon-arrow-hide"></use>
              </svg>Subjects</h4>
              <p class="hidden">${work.subjects
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
            
            </div>
        </li>
    `;
  }
}

export default new WorkView();
