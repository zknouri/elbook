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
  work: {},
  author: {},
  authorWorks: {
    numberOfWorks: "",
    authorName: "",
    works: [],
    offset: 0,
  },
};

export const loadSerchResults = async function (
  query,
  offset = state.search.offset
) {
  const data = await AJAX(
    `${API_URL}/search.json?q=${query}&limit=${state.search.limit}&offset=${offset}`
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
      key: entry.key,
      authorKey: entry.author_key,
    });
  });
};

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

export const loadWork = async function (key) {
  const data = await AJAX(`${API_URL}${key}.json`);

  const work = state.search.results.filter((result) => result.key === key)[0];
  state.work = createWorkObject(work, data);
};

export const loadAuthor = async function (key) {
  const data = await AJAX(`${API_URL}/authors/${key}.json`);

  state.author = createAuthorObject(data);
};

export const loadAuthorWorks = async function (
  key,
  offset = state.authorWorks.offset
) {
  const data = await AJAX(
    `${API_URL}${key}/works.json?limit=${state.search.limit}&offset=${offset}`
  );
  state.authorWorks.authorName = state.author.authorName;
  state.authorWorks.numberOfWorks = data.size;
  state.authorWorks.works.splice(0, state.authorWorks.works.length);

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
