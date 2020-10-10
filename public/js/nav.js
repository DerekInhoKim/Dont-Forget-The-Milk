
document.querySelector(".logout-btn").addEventListener("click", async () => {
  try {
    const res = await fetch("/api/users/token", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      throw res;
    }
    localStorage.removeItem("DFTM_USER_TOKEN");
    localStorage.removeItem("DFTM_USER_ID");

    window.location.href = "/sign-in";
  } catch (error) {
    errorNotifications(error);
  }
});
