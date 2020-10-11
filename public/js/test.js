(() => {
  const tasks = document.querySelectorAll(".task")
tasks.forEach(task => {
  task.addEventListener("click", async event => {
    event.stopImmediatePropagation()
    const dueDateSpan = document.querySelector(".date-span")
    const listSpan = document.querySelector(".list-span")
    const description = document.querySelector(".task-description")
    const taskId = event.target.id
    const taskJson = await fetch(`./api/tasks/${taskId}`)
    const taskInfo = await taskJson.json()
    // console.log(taskInfo)
    // console.log(taskInfo.tasks.List)
    if(taskInfo.tasks.dueDate === null) {
      dueDateSpan.innerHTML = "No Due Date"
    } else {
      dueDateSpan.innerHTML = taskInfo.tasks.dueDate
    }
    if(taskInfo.tasks.List.listName === undefined) {
      listName.innerHTML = "No List Name"
    } else {
      listSpan.innerHTML = taskInfo.tasks.List.listName
    }
    if(taskInfo.tasks.description === null) {
      description.innerHTML = "No Description"
    } else {
      description.innerHTML = taskInfo.tasks.description
    }

  })
})
})();
