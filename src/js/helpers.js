/**
 *  App Identification Headers
 */
const headers = new Headers({
  "User-Agent": "elbook/1.0 (youremail@gmail.com)",
});
const options = {
  method: "GET",
  headers: headers,
};

/**
 * AJAX API calls
 * @param {string} url - API url
 * @returns - Data
 */
export const AJAX = async function (url) {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
