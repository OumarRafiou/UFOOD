import { ENDPOINT_SECURE } from "./API_ENDPOINT";

export const signUp = async function (name, email, password) {
  try {
    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const req = new Request(`${ENDPOINT_SECURE}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const res = await fetch(req);
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();

      if (res.ok) {
        return data;
      } else {
        throw new Error(
          data.message || "An error occurred during the signUp process."
        );
      }
    } else {
      const text = await res.text();

      if (res.ok) {
        return text;
      } else {
        throw new Error(text || "An error occurred during the signUp process.");
      }
    }
  } catch (error) {
    throw error;
  }
};
