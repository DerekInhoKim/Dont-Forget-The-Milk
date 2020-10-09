
import { errorNotifications } from "./error-notifications.js";


// (() => {
//   const authorizedUser = localStorage.getItem("DFTM_USER_ID");

//   if (authorizedUser) {
//     window.location.href = "/";
//   } else {
//     return;
//   }
// })();

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
