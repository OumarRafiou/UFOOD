import { ENDPOINT_SECURE } from "./API_ENDPOINT";
import Cookies from "js.cookie";

export const getRestaurantsNameByID = async (restoId) => {
  try {
    const token = Cookies.get("connectionToken").token;
    const req = new Request(`${ENDPOINT_SECURE}/restaurants/${restoId}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const response = await fetch(req);
    const data = await response.json();
    return data.name;
  } catch (error) {
    return [];
  }
};

export const getAllRestaurants = async () => {
  try {
    const token = Cookies.get("connectionToken").token;
    const req = new Request(`${ENDPOINT_SECURE}/restaurants?limit=9999`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const response = await fetch(req);
    const data = await response.json();
    return data.items;
  } catch (error) {
    return [];
  }
};
