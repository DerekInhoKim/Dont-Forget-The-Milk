
import { errorNotifications } from "./error-notifications.js";

const siteTour = document.querySelector(".registration-form__demo-button");

siteTour.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = "demo@dftm.com";
  const password = "demo123";
  const demoBody = { email, password };

  try {
    const res = await fetch("/api/users/token", {
      method: "POST",
      body: JSON.stringify(demoBody),
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      throw res;
    }

    const { token, user: { id } } = await res.json();

    localStorage.setItem("DFTM_USER_TOKEN", token);
    localStorage.setItem("DFTM_USER_ID", id);

    window.location.href = "/";
  } catch (error) {
    errorNotifications(error);
  }
});

const signInForm = document.querySelector(".sign-in-form");

signInForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(signInForm);

  const email = formData.get("email");
  const password = formData.get("password");

  const body = { email, password };

  try {
    const res = await fetch ("/api/users/token", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      throw res;
    }

    const { token, user: { id } } = await res.json();

    localStorage.setItem("DFTM_USER_TOKEN", token);
    localStorage.setItem("DFTM_USER_ID", id);

    window.location.href = "/";
  } catch (error) {
    errorNotifications(error);
  }
});
