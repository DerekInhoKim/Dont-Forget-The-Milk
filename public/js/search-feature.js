const searchForm= document.getElementById("search-form");
searchForm.addEventListener("keydown", async (e) => {

  if(e.keyCode === 13) {
    e.preventDefault();
    alert(`KEY VALUE IS ${e.keyCode}`);

    const formData = new FormData(searchForm);
    const searchStr = formData.get("searchStr")
    console.log("SEARCH STRING ", searchStr);

    try {
      const res = await fetch(`/api/search/${searchStr}`);
      
      console.log(res);

      if(!res.ok) {
        throw res
      }

      const resJSON = await res.text();
      console.log(resJSON);

    } catch (err) {
      // console.error(err);
      
    }

  }

});