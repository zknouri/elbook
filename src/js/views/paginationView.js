class PaginationView {
  #parentEl = document.querySelectorAll(".pagination");

  render(offset, numberResultsFound) {
    this.#clear();
    const markup = this.#generateMarkup(offset, numberResultsFound);
    this.#parentEl.forEach((el) => {
      el.classList.remove("hidden");
      if (markup === undefined) {
        el.classList.add("hidden");
        return;
      }
      el.insertAdjacentHTML("afterbegin", markup);
    });
  }

  addHandlerPagination(handler) {
    this.#parentEl.forEach((el) => {
      el.addEventListener("click", function (e) {
        const target = e.target.closest(".page--offset");
        if (!target) return;

        const offset = +target.dataset.offset;

        handler(offset);
      });
    });
  }

  #clear() {
    this.#parentEl.forEach((el) => (el.innerHTML = ""));
  }

  #generateMarkup(offset, numberResultsFound) {
    const currentPage = offset > 0 ? offset / 10 : 1;
    const numberPages = Math.ceil(numberResultsFound / 10);

    // Page 1 - One page
    if (offset === 0 && numberPages === 1) {
      return `
        <span class="pagination__current">1</span>
        `;
    }

    // Page 1 - Two pages
    if (offset === 0 && numberPages === 2) {
      return `
        <span class="pagination__current">1</span>
        <a class="page--offset" href="#" data-offset="${offset + 10}">2</a>
        `;
    }

    // Page 1 - Two pages, offset 10
    if (offset === 10 && numberPages === 2) {
      return `
        <a class="page--offset" href="#" data-offset="${offset - 10}">1</a>
        <span class="pagination__current">2</span>
        `;
    }

    // Page 1 - Three pages
    if (offset === 0 && numberPages === 3) {
      return `
        <span class="pagination__current">1</span>
        <a class="page--offset" href="#" data-offset="${offset + 10}">2</a>
        <a class="page--offset" href="#" data-offset="${offset + 20}">3</a>
        `;
    }

    // Page 1 - Three pages, offset 10
    if (offset === 10 && numberPages === 3) {
      return `
        <a class="page--offset" href="#" data-offset="${offset - 10}">1</a>
        <span class="pagination__current">2</span>
        <a class="page--offset" href="#" data-offset="${offset + 10}">3</a>
        `;
    }

    // Page 1 - Three pages, offset 10
    if (offset === 20 && numberPages === 3) {
      return `
        <a class="page--offset" href="#" data-offset="${offset - 20}">1</a>
        <a class="page--offset" href="#" data-offset="${offset - 10}">2</a>
        <span class="pagination__current">3</span>
        `;
    }

    // Page 1 - more that three pages
    if (offset === 0 && numberPages > 3) {
      return `
        <span class="pagination__current">1</span>
        <a class="page--offset" href="#" data-offset="${offset + 10}">2</a>
        <a class="page--offset" href="#" data-offset="${offset + 20}">3</a>
        <a class="page--offset" href="#" data-offset="${
          offset + 10
        }">Next -></a>
        <a class="page--offset" href="#" data-offset="${
          (numberPages - 1) * 10
        }">Last ->></a>
        `;
    }

    // Page > 1 - offset 10
    if (offset === 10 && numberResultsFound - offset > 10 && numberPages > 3) {
      return `
        <a class="page--offset" href="#" data-offset="${
          offset - 10
        }">${currentPage}</a>
        <span class="pagination__current">${currentPage + 1}</span>
        <a class="page--offset" href="#" data-offset="${offset + 10}">${
        currentPage + 2
      }</a>
        <a class="page--offset" href="#" data-offset="${
          offset + 10
        }">Next -></a>
        <a class="page--offset" href="#" data-offset="${
          (numberPages - 1) * 10
        }">Last ->></a>
        `;
    }

    // Pages > 1
    if (offset > 1 && numberResultsFound - offset > 10 && numberPages > 3) {
      return `
        <a class="page--offset" href="#" data-offset="${0}"> <<- First</a>
        <a class="page--offset" href="#" data-offset="${
          offset - 10
        }"> <- Previsous</a>
        <a class="page--offset" href="#" data-offset="${
          offset - 10
        }">${currentPage}</a>
        <span class="pagination__current">${currentPage + 1}</span>
        <a class="page--offset" href="#" data-offset="${offset + 10}">${
        currentPage + 2
      }</a>
        <a class="page--offset" href="#" data-offset="${
          offset + 10
        }">Next -></a>
        <a class="page--offset" href="#" data-offset="${
          (numberPages - 1) * 10
        }">Last ->></a>
        `;
    }

    // last page
    if (numberResultsFound - offset <= 10 && numberPages !== 0) {
      return `
        <a class="page--offset" href="#" data-offset="${0}"> <<- First</a>
        <a class="page--offset" href="#" data-offset="${
          offset - 10
        }"> <- Previsous</a>
        <a class="page--offset" href="#" data-offset="${
          offset - 10
        }">${currentPage}</a>
        <span class="pagination__current">${currentPage + 1}</span>
        `;
    }

    // No Results
    if (numberPages === 0) {
      return;
    }
  }
}

export default new PaginationView();
