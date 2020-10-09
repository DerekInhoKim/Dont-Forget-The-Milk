const currentUser = localStorage.getItem("DFTM_USER_ID");


const logOutButton = document.querySelector(".logout-btn");

logOutButton.addEventListener("click", () => {
  console.log(currentUser);

  if (currentUser) {
  localStorage.removeItem("DFTM_USER_TOKEN");
  localStorage.removeItem("DFTM_USER_ID");

  window.location.href = "/sign-in";
  };
});
