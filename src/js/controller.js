import * as model from "./model.js";
import authorView from "./views/authorView.js";
import authorWorksView from "./views/authorWorksView.js";
import paginationView from "./views/paginationView.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import workView from "./views/workView.js";

/**
 * Search Results Controller
 */
const controlSearchResults = async function () {
  try {
    // 1) Get search query from searchView
    const query = searchView.getQuery();

    // 2) Render loading spinner
    resultsView.showLoadingSpinner();

    // 3) Loading search results in model
    await model.loadSearchResults(query);

    // 4) Rendering search results in resultsView
    resultsView.render(
      model.state.search.results,
      model.state.search.numberResultsFound
    );

    // 4) render search results pagination
    paginationView.renderResultsPagination(
      0,
      model.state.search.numberResultsFound
    );
  } catch (error) {
    resultsView.renderError(error);
  }
};

/**
 * Results Pagination Controller
 * @param {number} offset - Data offset for pagination
 */
const controlResultsPagination = async function (offset) {
  // 1) Render loading spinner
  resultsView.showLoadingSpinner();

  // 2) load new pagination results
  await model.loadSearchResults(model.state.query, offset);

  // 3) render new pagination results
  resultsView.render(
    model.state.search.results,
    model.state.search.numberResultsFound
  );

  // 4) render new pagination
  paginationView.renderResultsPagination(
    offset,
    model.state.search.numberResultsFound
  );
};

/**
 * Work Controller
 * @param {string} key - Work key from resultsView
 */
const controlWork = async function (key) {
  // 1) Render loading spinner
  workView.showLoadingSpinner();

  // 2) load Work data in model
  await model.loadWork(key);

  // 3) Render Work data in WorkView
  workView.render(model.state.work);
};

/**
 * Author Controller
 * @param {string} key - Author key from resultsView or workView
 */
const controlAuthor = async function (key) {
  // 1) Render loading spinner
  authorView.showLoadingSpinner();

  // 2) Load Author data in model
  await model.loadAuthor(key);

  // 3) Render Author data in AuthorView
  authorView.render(model.state.author);
};

/**
 * Author Works Pagination Controller
 * @param {number} offset - Data offset for pagination
 */
const controlAuthorWorksPagination = async function (offset) {
  // 1) Render loading spinner
  authorWorksView.showLoadingSpinner();

  // 2) load new pagination results
  await model.loadAuthorWorks(model.state.author.key, offset);

  // 3) render new pagination results
  authorWorksView.render(
    model.state.authorWorks,
    model.state.authorWorks.numberOfWorks
  );

  // 4) render new pagination
  paginationView.renderAuthorWorksPagination(
    offset,
    model.state.authorWorks.numberOfWorks
  );
};

/**
 * Author Works Controller
 * @param {string} key - Author key from authorWorksView
 */
const controlAuthorWorks = async function (key) {
  // 1) Render loading spinner
  authorWorksView.showLoadingSpinner();

  // 2) Load Author Works
  await model.loadAuthorWorks(key);

  // 3) Render Author Works data in AuthorWorksView
  authorWorksView.render(model.state.authorWorks);

  // 4) Render author works pagination
  paginationView.renderAuthorWorksPagination(
    0,
    model.state.authorWorks.numberOfWorks
  );
};

/**
 * Initialise Event Handlers
 */
const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerResultsPagination(controlResultsPagination);
  workView.addHandlerWork(controlWork);
  authorView.addHandlerAuthor(controlAuthor);
  authorWorksView.addHandlerAuthorWorks(controlAuthorWorks);
  paginationView.addHandlerAuthorWorksPagination(controlAuthorWorksPagination);
};

init();
