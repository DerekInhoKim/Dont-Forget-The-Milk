const searchForm= document.getElementById("search-form");
searchForm.addEventListener("keydown", (e) => {

  if(e.keyCode === 13) {
    e.preventDefault();
    // console.log("VALUE! ", e.keyCode);
    alert(`KEY VALUE IS ${e.keyCode}`);
    console.log()

    const formData = new FormData(searchForm);
    const searchStr = formData.get("searchStr")
    console.log("SEARCH STRING ", searchStr);

    try {
      const res = await fetch("/api/search")
      
      if(!res.ok) {
        throw res
      }


    } catch (err) {
      console.error(err);
    }

  }

  // e.preventDefault();
  // console.log("KEY CODE: ", e.keyCode);
});