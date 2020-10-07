

document.addEventListener('DOMContentLoaded', e => {


  // set up the variable for the list id that will be used to navigate to the correct endpoint
  // obtain the userId from the access token that is in the user's local storage, because it's needed for authentication

  let listId;

  // localStorage.setItem("DFTM_USER_ID", 1)
  let userId = localStorage.getItem("DFTM_USER_ID")



  // find and add a click event listener to all the lists so that the list id can be extracted and used in the path for the GET request
  // to obtain and display all tasks associated with the given list

  const lists = document.querySelectorAll('.listElement');

  lists.forEach(list => {
    list.addEventListener('click', async(e) => {


      e.stopImmediatePropagation();

      // check to make sure that the access token is still valid
      // if not, then the user id will not be found and the user should be redirected to the log in page

      if(!userId) {
        window.location.href = "/sign-in"
      }

      listId = e.target.id

      console.log(listId)


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


        const res = await fetch(`http://localhost:8080/api/lists/${listId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "DFTM_ACCESS_TOKEN"
            )}`
          }
        })

        if(!res.ok) {
          throw res;
        }
        // extract tasks from the response and dynamically generate HTML that is used to display the tasks

        const { tasks } = await res.json()

        const taskListContainer = document.querySelector(".task-list-container")
        tasks.forEach(task => {
          console.log(task)
          const taskContainer = document.createElement('div')
          taskContainer.classList.add("task-container")
          const taskItem = document.createElement('div')
          taskItem.classList.add("task");
          taskItem.setAttribute("id", `${task.id}`)
          taskItem.innerHTML = task.taskName
          taskContainer.appendChild(taskItem)
          taskListContainer.appendChild(taskContainer)
        });

        // Set up event listeners so that information can be displayed after clicking on a task

        const script = document.createElement('script')
        script.setAttribute('src', './js/test.js')
        script.classList.add('script')
        taskListContainer.appendChild(script)

        // deal with any errors that arise

      } catch(err) {
        // handleErrors(err)
        console.error(err)
      }

    });
  });
});
