const searchForm= document.getElementById("search-form");
searchForm.addEventListener("keydown", async (e) => {

  if(e.keyCode === 13) {
    e.preventDefault();
    const formData = new FormData(searchForm);
    const searchStr = formData.get("searchStr");
    // console.log("SEARCH STRING ", searchStr);

    try {
      const res = await fetch(`/api/search/${searchStr}`);

      if(!res.ok) {
        throw res;
      }

      const { matchingTasks } = await res.json();

      if(matchingTasks.length ===  0) {
        // alert("Sorry, no matches found =(");
        // return;
        const modal = document.getElementById("pop-up");
        modal.style.display= "block";
      }

      const header = document.getElementById("list-header")
      header.innerHTML = `Search : ${searchStr}`;

      const taskListContainer = document.querySelector(".task-list-container");
      const tasksHtml = matchingTasks.map(taskObj => {
        const task = taskObj.taskName;
        return `<div class="task-container">
                  <div class="task" id=${taskObj.id}> ${task} </div>
                </div>`
      });

      taskListContainer.innerHTML = tasksHtml.join("")

      const script = document.createElement('script');
      script.setAttribute('src', './js/test.js');
      taskListContainer.appendChild(script);

    } catch (err) {
      console.error(err);
    }
  }
});
