import axios from "axios";

export const fetchCities = async (IDs, query, limits) => {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`;

  const options = {
    method: "GET",
    url: url,
    params: {
      countryIds: IDs,
      namePrefix: query,
      limit: limits,
    },
    headers: {
      "x-rapidapi-key": "4ac5e3352fmshe6ac515ca3b8ccap1f0045jsnf0a504a87bbe",
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    return { data: [] };
  }
};
