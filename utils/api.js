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
      )}`
    )
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

const placesApi = axios.create({
  baseURL: "https://api.geoapify.com/v2/places?",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": Constants.manifest.extra.geopifyApiKey,
  },
});

export function fetchPlaces(placeId, category) {
  return placesApi
    .get(
      `https://api.geoapify.com/v2/places?categories=${category}&filter=place:${placeId}&limit=20`
    )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export default autocompleteApi;
