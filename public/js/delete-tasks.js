document.addEventListener("DOMContentLoaded", e => {

  // delete a task on the back-end and render the change on the front-end
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

      const data  = await res.json()
      console.log(data.deletedTask)
      const deletedTask = document.querySelector(`[data-task-id="${data.deletedTask}"]`)

      deletedTask.remove()

    } catch(err) {
      console.error(err)
    }

  }

  // Update tasks on the back-end and render the change on the front-end

  let taskId;
  const updateTaskForm = document.querySelector(".edit-task-form")
  console.log(updateTaskForm)
  updateTaskForm.addEventListener("submit", async(e) => {

    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(updateTaskForm)
    const taskName = formData.get("taskName")
    const dueDate = formData.get("dueDate")
    const description = formData.get("description")

    const body = {taskName, dueDate, description, taskId}

    try{
      const res = await fetch(`api/tasks/${taskId}/update-task`, {
        method: "POST",
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
      if (!res.ok) {
        throw res;
      }

      const { task } = await res.json()

      // clear old script tags

      const oldTaskContainer = document.getElementById("task-list-container")

      let scriptElement = document.querySelector('.script')
      if(scriptElement) {
        oldTaskContainer.removeChild(scriptElement)
      }


      const taskListContainer = document.querySelector(".task-list-container")
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
      taskContainer.dataset.taskId = task.id
      taskContainer.classList.add("task-container")
      const taskItem = document.createElement('div')
      taskItem.classList.add("task");
      taskItem.setAttribute("id", `${task.id}`)
      taskItem.innerHTML = task.taskName
      taskContainer.appendChild(taskItem)
      taskContainer.appendChild(buttonContainer)
      taskListContainer.appendChild(taskContainer)

      // add click event listeners on all of the tasks

      const script = document.createElement('script')
      script.setAttribute('src', './js/test.js')
      script.classList.add('script')
      taskListContainer.appendChild(script)

    }catch(err) {
      console.error(err)
    }




  })


  // functionality for deleting a task on the front end

  const tasksContainer = document.querySelector('.task-list-container');
  console.log(tasksContainer)

  tasksContainer.addEventListener("click", e=> {
    e.preventDefault();
    e.stopPropagation();
    if(e.target.className.startsWith('delete')) {
      console.log('hello')
      deleteTask(e.target.dataset.id)
    } else if (e.target.className.startsWith('update')) {
      taskId = e.target.dataset.id
    }
    return;
  })
})
