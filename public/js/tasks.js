document.addEventListener('DOMContentLoaded', e => {
  if(localStorage.getItem('CURRENT_LIST')) {
    localStorage.removeItem('CURRENT_LIST')
  }

  // set up the variable for the list id that will be used to navigate to the correct endpoint
  // obtain the userId from the access token that is in the user's local storage, because it's needed for authentication

  let listId;

  // find and add a click event listener to all the lists so that the list id can be extracted and used in the path for the GET request
  // to obtain and display all tasks associated with the given list

  const lists = document.querySelectorAll('.list-cat-container');

  lists.forEach(list => {
    list.addEventListener('click', async(e) => {
      e.stopImmediatePropagation();

      // localStorage.setItem("DFTM_USER_ID", 1)
      let userId = localStorage.getItem("DFTM_USER_ID")


      // check to make sure that the access token is still valid
      // if not, then the user id will not be found and the user should be redirected to the log in page

      if(!userId) {
        window.location.href = "/sign-in"
      }

      listId = e.target.id

      if(localStorage.getItem('CURRENT_LIST')) {
        localStorage.removeItem('CURRENT_LIST')
      }

      localStorage.setItem('CURRENT_LIST', listId)

      try {

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

        // make a get request to the end-point below
        // check authorization of user by adding an authorization header in the GET request


        const res = await fetch(`/api/lists/${listId}/tasks`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
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

        // not finished... am going to add update and delete buttons




        // extract tasks from the server response and dynamically generate HTML that is used to display the tasks

        const {tasks}  = await res.json()

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
          // deleteButton.setAttribute("id", task.id)
          // updateButton.setAttribute("id", task.id)
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
          taskContainer.dataset.taskId = task.id
          const taskItem = document.createElement('div')
          taskItem.classList.add("task");
          taskItem.setAttribute("id", `${task.id}`)
          taskItem.innerHTML = task.taskName
          taskContainer.appendChild(taskItem)
          taskContainer.appendChild(buttonContainer)
          taskListContainer.appendChild(taskContainer)
        });

        // Set up event listeners on tasks so that information can be displayed after clicking on them

        const script = document.createElement('script')
        script.setAttribute('src', './js/test.js')
        script.classList.add('script')
        taskListContainer.appendChild(script)

        // set up event listeners on delete buttons

        const scriptForDeleteButtons = document.createElement('script')
        scriptForDeleteButtons.setAttribute('src', './js/delete-tasks.js')
        scriptForDeleteButtons.classList.add('script')
        taskListContainer.appendChild(scriptForDeleteButtons)

        // deal with any errors that arise

      } catch(err) {
        // handleErrors(err)
        console.error(err)
      }

    });
  });
});
