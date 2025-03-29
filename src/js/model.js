import { API_URL, RES_PER_PAGE } from "./config";
import { AJAX } from "./helpers";

export const state = {
  search: {
    numberResultsFound: 0, // Number of results found
    query: "",
    results: [],
    limit: RES_PER_PAGE, // Results per page
    page: 1,
    offset: 0, // Results to hide
  },
};

export const loadSerchResults = async function (
  query,
  offset = state.search.offset
) {
  const data = await AJAX(
    `${API_URL}${query}&limit=${state.search.limit}&offset=${offset}`
  );

  state.query = query;
  state.search.numberResultsFound = data.num_found;

  state.search.results.splice(0, state.search.results.length);

  data.docs.map((entry) => {
    state.search.results.push({
      title: entry.title,
      author: entry.author_name,
      editions: entry.edition_count,
      year: entry.first_publish_year,
      languages: entry.language,
      cover: entry.cover_edition_key,
    });
  });
};
