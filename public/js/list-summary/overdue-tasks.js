document.addEventListener("DOMContentLoaded", async (event) => {
  //Access the user access token to pass into the header to authorize the user during our requests.
  const token = localStorage.getItem("DFTM_ACCESS_TOKEN");


  //Decide how to figure out which listID we're pulling from.

  //We select all tasks with the class of task, which should be set for every task.
  const selectedTask = document.querySelectorAll("task")
  //For each task, we set up an event listener to find which task is being selected.
  let listId;
  let taskId;

  //Add functionality to load the correct task's information when a task is selected on the page.
  selectedTask.forEach(task => {
    task.addEventListener("click", event => {
      taskId = event.target.id
    })
  })

  //If a task has been selected, we grab the information about the task from our api.
  //Extract the listId from our task.
  if(taskId){
    const taskList = await fetch(`/api/tasks/${taskId}`, {
      headers: {
        "Authorization": `Bearer: ${token}`
      }
    })

    listId = taskList.listId

  }

  //If there is no list/task selected, we want to display our default inbox information.
  if(!listId){
    listId = 1

  }

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

    //Filter through all the tasks, to find which tasks are completed by accessing the column isComplete and checking the boolean value
    const overdueTasks = tasks.filter( task => {
      task.dueDate < new Date()

    })

    //We take the element with the class overdue-tasks-span and set the innerHTML of the div to display the number of tasks which have been filtered to show which tasks have due dates less than today's date.
    const allTasks = document.querySelector(".overdue-tasks-span")
    allTasks.innerHTML = overdueTasks.length;


  } catch (e){
    console.log(e)

  }
})
