const form = document.querySelector(".add-list-form")

form.addEventListener("submit", async(e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const listName = formData.get("listName")
  const body = {listName};
  try {
    const res = await fetch("/api/lists", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beearer ${localStorage.getItem(
          "DFTM_USER_TOKEN"
        )}`,
      },
    });
    if(res.status === 401) {
      window.location.href = "/log-in";
      return;
    }
    if(!res.ok) {
      throw res;
    }
    form.reset();
    await fetchList(userId);
  } catch (err) {
    handleErrors(err);
  }
});