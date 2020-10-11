(() => {
  const tasks = document.querySelectorAll(".task")
tasks.forEach(task => {
  task.addEventListener("click", async event => {
    event.stopImmediatePropagation()
    const dueDateSpan = document.querySelector(".date-span")
    const listSpan = document.querySelector(".list-span")
    const description = document.querySelector(".task-description")
    const completed = document.querySelector(".completed-span")
    const taskId = event.target.id
    const taskJson = await fetch(`./api/tasks/${taskId}`)
    const taskInfo = await taskJson.json()
    // console.log(taskInfo)
    // console.log(taskInfo.tasks.isComplete)
    if(taskInfo.tasks.dueDate === null || taskInfo.tasks.dueDate === "") {
      dueDateSpan.innerHTML = " No Due Date"
    } else {
      const splitDateArr = taskInfo.tasks.dueDate.split("T")
      const displayDate = splitDateArr[0]
      dueDateSpan.innerHTML = ` ${displayDate}`
    }
    if(taskInfo.tasks.List.listName === undefined) {
      listName.innerHTML = " No List Name"
    } else {
      listSpan.innerHTML = ` ${taskInfo.tasks.List.listName}`
    }
    if(taskInfo.tasks.description === null || taskInfo.tasks.description === "") {
      description.innerHTML = " No Description"
    } else {
      description.innerHTML = ` ${taskInfo.tasks.description}`
    }
    if(taskInfo.tasks.isComplete === false) {
      completed.innerHTML = " Incomplete"
    } else {
      completed.innerHTML = " Complete"
    }

  })
})

})();
