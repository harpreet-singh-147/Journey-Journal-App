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

// geopifyApi
//   .get(
//     `/places?categories=commercial.supermarket&filter=rect%3A10.716463143326969%2C48.755151258420966%2C10.835314015356737%2C48.680903341613316&limit=20`
//   )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

export function fetchCatering() {
  return placesApi
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

export default geopifyApi;
