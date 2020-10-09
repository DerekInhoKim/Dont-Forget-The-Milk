// const { all } = require("sequelize/types/lib/operators");

document.addEventListener("DOMContentLoaded", async (event) => {
  //Access the user access token to pass into the header to authorize the user during our requests.
  const token = localStorage.getItem("DFTM_ACCESS_TOKEN");
  const totalTasksSpan = document.querySelector(".total-task-span")


  //Decide how to figure out which listID we're pulling from.

  //We select all tasks with the class of task, which should be set for every task.
  const selectedTask = document.querySelectorAll("task")
  let listId;
  let taskId;
  let counter; //Set up a counter, to count the number of tasks.

  //If there is no list/task selected, we want to display a number for total tasks.

  const allLists = await fetch(`/api/lists`, { //Returns a list of all lists.
    headers: {
      "Authorization": `Bearer: ${token}`
    }
  })

  const listsRes = await allLists.json()
  counter = 0;
  listsRes.allLists.forEach( async list => {
    const eachTask = await fetch(`/api/lists/${list.id}`, { //This request will get all the tasks for a list.
      headers: {
        "Authorization": `Bearer: ${token}`
      }
    })

    const taskRes = await eachTask.json()
    const allTasks = taskRes.list
    allTasks.forEach(task => {
      counter++
    })

    totalTasksSpan.innerHTML = counter;
  })
    //Set the innerHTML of our totalTaskSpan to equal the count of all tasks added from each list

  //For each task, we set up an event listener to find which task is being selected.
  selectedTask.forEach(task => {
    task.addEventListener("click", async event => {
      event.stopImmediatePropagation
      taskId = event.target.id

      const tasksList = await fetch(`/api/tasks/${taskId}`, {
        headers: {
          "Authorization": `Bearer: ${token}`
        }
      })

      listId = tasksList.listId

      try {
        //We grab all the tasks, from the specific list
        const res = await fetch(`/api/lists/${listId}`, {
          headers: {
            "Authorization": `Bearer: ${token}`
          }
        })

        //if the user's authrozation is not valid, they will be redirected to log-in
        if(res.status === 401) {
          window.location.href = "/log-in"
        }

        const { tasks } = await res.json()

        //We take the element with the class total-task-span and set the innerHTML of the div to display the number of all tasks.
        totalTasksSpan.innerHTML = tasks.length;


      } catch (e){
        console.log(e)

      }
    })
  })


})
