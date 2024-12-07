/* eslint-disable */
import { ENDPOINT_SECURE } from "./API_ENDPOINT";
import { ID } from "./API_ENDPOINT";
import Cookies from "js.cookie";

export const getFavoriteById = async (id) => {
  try {
    const token = Cookies.get("connectionToken").token;
    const req = new Request(`${ENDPOINT_SECURE}/favorites/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const response = await fetch(req);
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

export const postNewList = async (payload) => {
  if (!payload.name) {
    window.alert("Name cannot be empty");
    return null;
  }
  try {
    const token = Cookies.get("connectionToken").token;
    const request = new Request(`${ENDPOINT_SECURE}/favorites`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const response = await fetch(request);
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

export const putList = async (payload, id) => {
  try {
    const token = Cookies.get("connectionToken").token;
    const request = new Request(`${ENDPOINT_SECURE}/favorites/${id}`, {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    await fetch(request);
  } catch (error) {
    return [];
  }
};

export const deleteList = async (id) => {
  try {
    const token = Cookies.get("connectionToken").token;
    const request = new Request(`${ENDPOINT_SECURE}/favorites/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    await fetch(request);
  } catch (error) {}
};

export const postAddRestoInList = async (listID, restoID) => {
  try {
    const token = Cookies.get("connectionToken").token;
    const request = new Request(
      `${ENDPOINT_SECURE}/favorites/${listID}/restaurants`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: restoID }),
      }
    );
    await fetch(request);
  } catch (error) {}
};

export const deleteRestoFromList = async (listID, restoID) => {
  try {
    const token = Cookies.get("connectionToken").token;
    const request = new Request(
      `${ENDPOINT_SECURE}/favorites/${listID}/restaurants/${restoID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    await fetch(request);
  } catch (error) {}
};
