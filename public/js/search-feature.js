const searchForm= document.getElementById("search-form");
searchForm.addEventListener("keydown", async (e) => {

  if(e.keyCode === 13) {
    e.preventDefault();
    alert(`KEY VALUE IS ${e.keyCode}`);

    const formData = new FormData(searchForm);
    const searchStr = formData.get("searchStr");
    // const body = { searchStr };
    console.log("SEARCH STRING ", searchStr);

    try {
      const res = await fetch(`/api/search/${searchStr}`);

      if(!res.ok) {
        throw res;
      }

      const { matchingTasks } = await res.json();
      // console.log("RES JSON: ", resJSON);

      const header = document.getElementById("")
      const taskListContainer = document.querySelector(".task-list-container");
      const tasksHtml = matchingTasks.map(taskObj => {
        const task = taskObj.taskName;
        return `<div class="task-container">
                  <div class="task" id=${taskObj.id}> ${task} </div>
                </div>`
      });

      taskListContainer.innerHTML = tasksHtml.join("")

      const script = document.createElement('script')
      script.setAttribute('src', './js/test.js')
      taskListContainer.appendChild(script)

    } catch (err) {
      console.error(err);
    }

  }

});
