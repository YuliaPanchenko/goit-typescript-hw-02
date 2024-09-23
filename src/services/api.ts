import axios from "axios";

const API_KEY = "QPr4h1RkC7EADmqtvFooYswOJC37zxtDKZ3NK3ZARFc";
const baseURL = "https://api.unsplash.com/search/photos";

export const requestAllImages = async () => {
  const { data } = await axios.get(`${BASE_URL}/photos/?client_id=${API_KEY}`);
  return data;
};

export const requestAImagesBySearchValue = async (searchValue, page = 1) => {
  const params = {
    query: searchValue,
    page: page,
    per_page: 10,
    client_id: API_KEY,
  };

  const response = await axios.get(baseURL, { params });
  return response.data;
};

// export const requestAImagesBySearchValue = async (searchValue, page = 1) => {
//   const { data } = await axios.get(BASE_URL, {
//     params: {
//       query: searchValue,
//       page: page,
//       per_page: 10,
//       client_id: API_KEY,
//     },
//   });
//   return {
//     results: data.results,
//     total_pages: data.total_pages,
//   };
// };
