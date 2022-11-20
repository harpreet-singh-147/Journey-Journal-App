import axios from "axios";
import Constants from "expo-constants";

const geocodeApi = axios.create({
  baseURL: "https://api.geoapify.com/v1/geocode/",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": Constants.manifest.extra.geopifyApiKey,
  },
});

const placesApi = axios.create({
  baseURL: "https://api.geoapify.com/v2/",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": Constants.manifest.extra.geopifyApiKey,
  },
});

export function fetchLocation() {
  return geocodeApi
    .get(
      `https://api.geoapify.com/v2/places?categories=catering&filter=place:5108d5fd29731fd53f5991833ba352934a40f00101f9016f150a0000000000920308536b65676e657373&limit=20
    `
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}

// export function fetchCatering() {
//   return placesApi
//     .get(
//       `https://api.geoapify.com/v2/places?categories=catering&filter=place:5108d5fd29731fd53f5991833ba352934a40f00101f9016f150a0000000000920308536b65676e657373&limit=20
//     `
//     )
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

export default geopifyApi;
