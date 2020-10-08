document.addEventListener("DOMContentLoaded", e => {


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


    // dynamically generate the html to display the tasks

    const taskListContainer = document.querySelector(".task-list-container")
    tasks.forEach(task => {

      let buttonContainer = document.createElement('div')
      let deleteButtonContainer = document.createElement('div')
      let updateButtonContainer = document.createElement('div')
      buttonContainer.classList.add("buttons-container")
      deleteButtonContainer.classList.add("delete-button-container")
      updateButtonContainer.classList.add("update-button-container")

      let deleteButton = document.createElement('button')
      let updateButton = document.createElement('button')

      deleteButton.setAttribute("type", "submit")
      updateButton.setAttribute("type", "submit")
      deleteButton.dataset.id = task.id
      updateButton.dataset.id = task.id
      deleteButton.classList.add("delete-task-btn")
      updateButton.classList.add("update-task-btn")
      deleteButton.innerHTML = "Delete"
      updateButton.innerHTML = "Update"

      deleteButtonContainer.appendChild(deleteButton)
      updateButtonContainer.appendChild(updateButton)

      buttonContainer.appendChild(deleteButtonContainer)
      buttonContainer.appendChild(updateButtonContainer)

      const taskContainer = document.createElement('div');
      taskContainer.classList.add("task-container")
      const taskItem = document.createElement('div')
      taskItem.classList.add("task");
      taskItem.setAttribute("id", `${task.id}`)
      taskItem.innerHTML = task.taskName
      taskContainer.appendChild(taskItem)
      taskContainer.appendChild(buttonContainer)
      taskListContainer.appendChild(taskContainer)
    });


    // add click event listeners on all of the tasks

    const script = document.createElement('script')
    script.setAttribute('src', './js/test.js')
    script.classList.add('script')
    taskListContainer.appendChild(script)
  }


  //-------------------------------------------------------------------------------------------

  const deleteTask = async function (taskId) {
    let listId = localStorage.getItem("CURRENT_LIST")
    const body = {taskId}


    try{
      const res = await fetch(`/api/lists/${listId}/tasks/delete-task`, {
        method: 'DELETE',
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem(
            "DFTM_ACCESS_TOKEN"
          )}`,
        }
      })

      if (res.status === 401) {
        window.location.href = "/log-in";
        return;
      }

      if(!res.ok) {
        throw res;
      }

      await fetchTasks()

    } catch(err) {
      console.error(err)
    }

  }

  // functionality for deleting a task

  const tasksContainer = document.querySelector('.task-list-container');
  console.log(tasksContainer)

  tasksContainer.addEventListener("click", e=> {
    e.preventDefault();
    e.stopPropagation();
    if(e.target.className.startsWith('delete')) {
      console.log(e.target.dataset.id)
      deleteTask(e.target.dataset.id)
    } else if (e.target.className.startsWith('update')) {
      updateTask(e.target.dataset.id)
    }
    return;
  })
})
