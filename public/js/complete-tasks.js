//Select the button that is associated with our complete task tab
const completeTabButton = document.querySelector(".complete-task-tab")

//Add an event listener to know when someone clicks on the button
completeTabButton.addEventListener("click", async event => {
  const token = localStorage.getItem("DFTM_ACCESS_TOKEN");

  const allLists = await fetch(`/api/list`, {
    headers: {
      "Authorization": `Bearer: ${token}`
    }
  })

  allLists.forEach(list => {
    const eachTask = await fetch(`/api/lists/${list.id}`, { //This request will get all the tasks for a list.
      headers: {
        "Authorization": `Bearer: ${token}`
      }
    })

    eachTask.forEach( task => {
      //TODO Create a div element with the correct classes and id's for the task.
      const taskContainer = document.querySelector(".task-container")
      taskContainer.appendChild("NEWLY CREATED TASK DIV GOES HERE")
    })
  })

})
