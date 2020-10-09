document.addEventListener("DOMContentLoaded", event => {
  const userId = localStorage.getItem("DFTM_USER_ID");
  const token = localStorage.getItem("DFTM_ACCESS_TOKEN");
  const completeTab = document.querySelector(".incomplete-task-tab");
  const taskListContainer = document.querySelector(".task-list-container");

  completeTab.addEventListener("click", async event => {

    // TODO TALK WITH RYAN ABOUT ADDING NEW TASKS WITH BUTTONS AND DELETING OLD TASKS FROM THE SCREEN
    // const makeTasks = async () => {
      const allTasksJson = await fetch(`/api/users/${userId}/lists/incompletedTasks`, {
        headers: {
          // "Content-Type": "application/json",
          // "Accept": "application/json",
          "Authorization": `Bearer: ${token}`
        }
      })

      const allTasksObj = await allTasksJson.json()
      const allTasksArr = allTasksObj.incompleteTasks
      console.log(allTasksArr)
      allTasksArr.forEach(task => {

        const taskContainer = document.createElement('div');
        taskContainer.dataset.taskId = task.id
        taskContainer.classList.add("task-container");
        const taskItem = document.createElement('div');
        taskItem.classList.add("task");
        taskItem.setAttribute("id", `${task.id}`);
        taskItem.innerHTML = task.taskName
        taskContainer.appendChild(taskItem);
        // taskContainer.appendChild(buttonContainer);
        taskListContainer.appendChild(taskContainer);

        // add click event listeners on all of the tasks

        const script = document.createElement('script');
        script.setAttribute('src', './js/test.js');
        script.classList.add('script');
        taskListContainer.appendChild(script);
      })


    // }
    // makeTasks()
  })
})
