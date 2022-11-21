import axios from "axios";
import Constants from "expo-constants";

// const geocodeApi = axios.create({
//   baseURL: "https://api.geoapify.com/v1/geocode/",
//   headers: {
//     "Content-Type": "application/json",
//     "x-api-key": Constants.manifest.extra.geopifyApiKey,
//   },
// });

const placesApi = axios.create({
  baseURL: "https://api.geoapify.com/v2/places?",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": Constants.manifest.extra.geopifyApiKey,
  },
});

// export function fetchLocation(text) {
//   return geocodeApi
//     .get(
//       `search?text=${text}`
//     )
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

export function fetchCatering(journeyLocation) {
  return placesApi
    .get(
      `https://api.geoapify.com/v2/places?categories=catering&filter=place:${journeyLocation}&limit=20`
    )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export default placesApi;
