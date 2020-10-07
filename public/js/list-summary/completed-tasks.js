document.addEventListener("DOMContentLoaded", async (event) => {
  //Access the user access token to pass into the header to authorize the user during our requests.
  const token = localStorage.getItem("DFTM_ACCESS_TOKEN");


  //Decide how to figure out which listID we're pulling from.

  //We select all tasks with the class of task, which should be set for every task.
  const selectedTask = document.querySelectorAll("task")
  //For each task, we set up an event listener to find which task is being selected.
  let listId;
  let taskId;

  selectedTask.forEach(task => {
    task.addEventListener("click", event => {
      taskId = event.target.id
    })
  })

  if(taskId){
    const tasksList = await fetch(`/api/tasks/${taskId}`, {
      headers: {
        "Authorization": `Bearer: ${token}`
      }
    })

    listId = tasksList.listId

  }

  //If there is no list selected, we want to display our default inbox information.
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
    const completedTasks = tasks.filter( task => {
      task.isComplete === true
    })

    //We take the element with the class completed tasks-span and set the innerHTML of the div to display the number of tasks which have been filtered to show which ones are complete.
    const allTasks = document.querySelector(".completed-tasks-span")
    allTasks.innerHTML = completedTasks.length;


  } catch (e){
    console.log(e)

  }
})
