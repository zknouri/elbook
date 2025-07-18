import { API_URL, RES_PER_PAGE } from "./config";
import { AJAX } from "./helpers";

/**
 * State Object
 * @type {Object} - Application data
 */
export const state = {
  search: {
    numberResultsFound: 0, // Number of results found
    query: "", // To go back to results page(Not implemented)
    results: [], // Search Results data entries
    limit: RES_PER_PAGE, // Results per page
    page: 1, // Default page number
    offset: 0, // Results to hide
  },
  work: {}, // Work data entries
  author: {}, // Author data entries
  authorWorks: {
    numberOfWorks: "", // Number of works related to the Author
    authorName: "", // Store author name
    works: [], // Author works data entries
    offset: 0, // Data offset for pagination
  },
};

/**
 * Load Search Results data from Book Search APIs
 * @param {string} query - Search query
 * @param {number} offset - Data offset for pagination
 */
export const loadSearchResults = async function (
  query,
  offset = state.search.offset
) {
  const data = await AJAX(
    `${API_URL}/search.json?q=${query}&limit=${state.search.limit}&offset=${offset}`
  );

  // Save our query for future use
  state.query = query;
  // Store the number of results found
  state.search.numberResultsFound = data.num_found;

  // Clear results Array entries
  state.search.results.splice(0, state.search.results.length);

  // Push entries
  data.docs.map((entry) => {
    state.search.results.push({
      title: entry.title,
      author: entry.author_name,
      editions: entry.edition_count,
      year: entry.first_publish_year,
      languages: entry.language,
      cover: entry.cover_edition_key,
      key: entry.key,
      authorKey: entry.author_key,
    });
  });
};

/**
 * Create and return Work Object by merging work data from Book Search APIs with work data from Work & Edition APIs
 * @param {Object} work - filtered work data from serach results(see loadSearchResults())
 * @param {Object} data - Work data from loadWork()
 * @returns {Object} - Work object(Merged data)
 */
const createWorkObject = function (work, data) {
  return {
    ...work,
    description: data?.description?.value
      ? data.description.value
      : data.description,
    subjects: data.subjects,
    subjectPeople: data.subject_people,
    subjectTimes: data.subject_times,
  };
};

/**
 * Create and return Author Object from Authors API data
 * @param {Object} data - Author data from laodAuthor()
 * @returns {Object} - Author Object
 */
const createAuthorObject = function (data) {
  return {
    authorName: data.name,
    personalName: data.personal_name,
    alternateNames: data.alternate_names,
    bio: data.bio?.value ? data.bio.value : data.bio,
    birthDate: data.birth_date,
    deathDate: data.death_date,
    photo: data.photos?.[0],
    key: data.key,
    idNumbers: data.remote_ids,
    links: data.links,
  };
};

/**
 * Loads work data from Work & Edition APIs
 * @param {string} key Work key from resultsView
 */
export const loadWork = async function (key) {
  const data = await AJAX(`${API_URL}${key}.json`);

  // filter the work data from search results data(by work key)
  const work = state.search.results.filter((result) => result.key === key)[0];
  state.work = createWorkObject(work, data);
};

/**
 * load Author data from Authors API
 * @param {string} key - Author key from resultsView or workView
 */
export const loadAuthor = async function (key) {
  const data = await AJAX(`${API_URL}/authors/${key}.json`);

  state.author = createAuthorObject(data);
};

/**
 * load Author Works data from Author API(works)
 * @param {string} key - Author key from authorWorksView
 * @param {number} offset - Data offset for pagination
 */
export const loadAuthorWorks = async function (
  key,
  offset = state.authorWorks.offset
) {
  const data = await AJAX(
    `${API_URL}${key}/works.json?limit=${state.search.limit}&offset=${offset}`
  );

  // Store author name for Author works page header
  state.authorWorks.authorName = state.author.authorName;
  // Store the number of works related to the author
  state.authorWorks.numberOfWorks = data.size;
  // Clear works Array entries
  state.authorWorks.works.splice(0, state.authorWorks.works.length);

  // Push entries
  data.entries.map((el) =>
    state.authorWorks.works.push({
      workTitle: el?.title,
      workDescription: el?.description?.value
        ? el.description.value
        : el.description,
      workKey: el?.key,
      workCover: el.covers?.[0],
      workSubjects: el?.subjects,
      workAuthor: state.author.authorName,
      workLinkedAuthors: el.authors,
      workLinks: el?.links,
      workPublishDate: el?.first_publish_date,
      subjectPlaces: el?.subject_places,
      subjectTimes: el?.subject_times,
      subjectPeople: el?.subject_people,
    })
  );
};
