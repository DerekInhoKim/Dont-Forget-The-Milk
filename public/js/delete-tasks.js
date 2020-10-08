document.addEventListener("DOMContentLoaded", e => {


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
