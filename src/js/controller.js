import * as model from "./model.js";
import authorView from "./views/authorView.js";
import authorWorksView from "./views/authorWorksView.js";
import paginationView from "./views/paginationView.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import workView from "./views/workView.js";

const controlSearchResults = async function () {
  // 1) Get search query from searchView
  const query = searchView.getQuery();

  // 2) Loading search results in model
  await model.loadSerchResults(query);

  // 3) Rendering search results in resultsView
  resultsView.render(
    model.state.search.results,
    model.state.search.numberResultsFound
  );

  // 4) render search results pagination
  paginationView.renderResultsPagination(
    0,
    model.state.search.numberResultsFound
  );
};

const controlResultsPagination = async function (offset) {
  // 1) load new pagination results
  await model.loadSerchResults(model.state.query, offset);

  // 2) render new pagination results
  resultsView.render(
    model.state.search.results,
    model.state.search.numberResultsFound
  );

  // 3) render new pagination
  paginationView.renderResultsPagination(
    offset,
    model.state.search.numberResultsFound
  );
};

const controlWork = async function (key) {
  // 1) load Work data in model
  await model.loadWork(key);
  // 2) Render Work data in WorkView
  workView.render(model.state.work);
};

const controlAuthor = async function (key) {
  // 1) Load Author data in model
  await model.loadAuthor(key);
  // 2) Render Author data in AuthorView
  authorView.render(model.state.author);
};

const controlAuthorWorksPagination = async function (offset) {
  // 1) load new pagination results
  await model.loadAuthorWorks(model.state.author.key, offset);

  // 2) render new pagination results
  authorWorksView.render(
    model.state.authorWorks,
    model.state.authorWorks.numberOfWorks
  );

  // 3) render new pagination
  paginationView.renderAuthorWorksPagination(
    offset,
    model.state.authorWorks.numberOfWorks
  );
};

const controlAuthorWorks = async function (key) {
  // 1) Load Author Works
  await model.loadAuthorWorks(key);

  // 2) Render Author Works data in AuthorWorksView
  authorWorksView.render(model.state.authorWorks);

  // 3) render author works pagination
  paginationView.renderAuthorWorksPagination(
    0,
    model.state.authorWorks.numberOfWorks
  );
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerResultsPagination(controlResultsPagination);
  workView.addHandlerWork(controlWork);
  authorView.addHandlerAuthor(controlAuthor);
  authorWorksView.addHandlerAuthorWorks(controlAuthorWorks);
  paginationView.addHandlerAuthorWorksPagination(controlAuthorWorksPagination);
};

init();
