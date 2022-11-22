import axios from "axios";
import Constants from "expo-constants";

const geopifyApiKey = Constants.manifest?.extra?.geopifyApiKey;

const autocompleteApi = axios.create({
  baseURL: "https://api.geoapify.com/v1/geocode/",
  method: "get",
  headers: {
    "x-api-key": geopifyApiKey,
  },
});

export function fetchAutoCompleteApi(cityValue) {
  return autocompleteApi
    .get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        cityValue
      )}`,
    )
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}



export default autocompleteApi;
