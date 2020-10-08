document.addEventListener('DOMContentLoaded', e => {

  const addTask = document.querySelector(".add-task-btn")
  const form = document.querySelector(".add-task-form")

  // update the list of tasks to show the newly created task

  const fetchTasks = async() => {

    let listId = localStorage.getItem('CURRENT_LIST')
    const res = await fetch(`http://localhost:8080/api/lists/${listId}/tasks`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem(
          "DFTM_USER_TOKEN"
        )}`
      }
    })

    if (res.status === 401) {
      window.location.href = "/log-in";
      return;
    }

    if(!res.ok) {
      throw res;
    }

    // clear old tasks

    let oldTaskContainer = document.getElementById("task-list-container");
    let oldTasks = document.querySelectorAll(".task-container");
    if(oldTasks) {
      oldTasks.forEach(task => {
        oldTaskContainer.removeChild(task);

      })

    }

    // clear old script tags

    let scriptElement = document.querySelector('.script')
    if(scriptElement) {
      oldTaskContainer.removeChild(scriptElement)
    }

    const { tasks } = await res.json()

    console.log(tasks)

    const taskListContainer = document.querySelector(".task-list-container")
    tasks.forEach(task => {

      const taskContainer = document.createElement('div')
      taskContainer.classList.add("task-container")
      const taskItem = document.createElement('div')
      taskItem.classList.add("task");
      taskItem.setAttribute("id", `${task.id}`)
      taskItem.innerHTML = task.taskName
      taskContainer.appendChild(taskItem)
      taskListContainer.appendChild(taskContainer)
    });



    const script = document.createElement('script')
    script.setAttribute('src', './js/test.js')
    script.classList.add('script')
    taskListContainer.appendChild(script)
  }


  const addTaskForm = document.querySelector(".add-task-form")
  // send a post request to create a new task

  addTaskForm.addEventListener("submit", async(e) => {

    e.preventDefault()
    e.stopPropagation();



    let listId = localStorage.getItem('CURRENT_LIST')
    const formData = new FormData(addTaskForm)
    const newTask = formData.get("new-task")
    console.log(formData)
    const body = { newTask, listId }
    try{
      const res = await fetch(`api/lists/${listId}/tasks/create-task`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem(
            "TWITTER_LITE_ACCESS_TOKEN"
          )}`,
        }
      })

      if (res.status === 401) {
        window.location.href = "/log-in";
        return;
      }
      if (!res.ok) {
        throw res;
      }

      addTaskForm.reset();
      await fetchTasks()


    } catch(err) {
      console.error(err)
    }
  })
})
