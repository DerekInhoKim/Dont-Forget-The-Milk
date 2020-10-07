document.addEventListener("DOMContentLoaded", event => {
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

      const filteredTasks = eachTask.filter(task => {
        task.isComplete === false
      })

      filteredTasks.forEach( task => {
        //Select the container for the list of tasks
        const taskListContainer = document.querySelector(".task-list-container")

        //TODO Create a div element with the correct classes and id's for the task. (Meet with Ryan)
        const taskContainer = document.createElement("div")
        taskContainer.setAttribute("class", "task-container")
        const taskElement = document.createElement("div")
        taskElement.setAttribute("class", "task")
        taskElement.setAttribute("id", `${task.id}`)
        taskElement.innerHTML = task.taskName
        taskContainer.appendChild(taskElement)
        taskContainer.appendChild(taskListContainer)
      })
    })

  })

})
