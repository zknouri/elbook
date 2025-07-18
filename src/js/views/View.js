// export default class View {
//   #parentEl;
//   #pageTitle;
//   #markup;
//   #data;

//   constructor(parentEl, pageTitle, markup) {
//     this.#parentEl = parentEl;
//     this.#pageTitle = pageTitle;
//     this.#markup = markup;
//   }

//   render(data) {
//     this.#data = data;
//     this.clear();
//     this.#resultsPagination.forEach((el) => el.classList.add("hidden"));
//     this.#authorWorksPagination.forEach((el) => el.classList.add("hidden"));
//     const markup = this.#generateMarkup(this.#data);
//     this.#parentEl.insertAdjacentHTML("afterbegin", markup);
//     this.#workPageLayout();
//     this.addHandlerHideShowWorkInfos();
//     this.#body.querySelector(".loading-spinner").classList.add("hidden");
//   }

//   #clear() {
//     this.#parentEl.innerHTML = "";
//     this.#pageTitle.querySelector("h1").innerHTML = "";
//   }

//   clear() {
//     this.#clear();
//   }
// }
