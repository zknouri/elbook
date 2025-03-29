import * as model from "./model.js";
import paginationView from "./views/paginationView.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";

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

  // 4) render pagination
  paginationView.render(0, model.state.search.numberResultsFound);
};

const controlPagination = async function (offset) {
  // 1) load new pagination results
  await model.loadSerchResults(model.state.query, offset);

  // 2) render new pagination results
  resultsView.render(
    model.state.search.results,
    model.state.search.numberResultsFound
  );

  // 3) render new pagination
  paginationView.render(offset, model.state.search.numberResultsFound);
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};

init();
