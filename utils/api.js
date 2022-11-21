import axios from "axios";
import Constants from "expo-constants";

const geopifyApiKey = Constants.manifest?.extra?.geopifyApiKey;

export const autocompleteApi = axios.create({
  method: "get",
  url: "https://api.geoapify.com/v1/geocode/autocomplete?text=",
  headers: { "X-API-KEY": geopifyApiKey },
});

autocompleteApi
  .get(`Moscow`)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
