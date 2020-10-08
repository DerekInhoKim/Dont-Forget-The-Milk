document.addEventListener("DOMContentLoaded", event => {
  //Access the user access token to pass into the header to authorize the user during our requests.
  const token = localStorage.getItem("DFTM_ACCESS_TOKEN");

  const allTasks = document.querySelectorAll("task")


  allTasks.forEach( task => {
    task.addEventListener("click", async event => {
      const dueDateSpan = document.querySelector(".date-span")
      const listSpan = document.querySelector(".list-span")
      const description = document.querySelector(".task-description")

      const task = await fetch("/api/tasks", {
        headers: {
          "Authorization": `Bearer: ${token}`
        }
      })

      const taskRes = await task.json()
      const taskInfo = taskRes.list.Tasks

    })
  })


})
