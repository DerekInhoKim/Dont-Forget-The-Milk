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

  //If there is no list/task selected, we want to display a number for total tasks.
  if(!listId){
    const allLists = await fetch(`/api/lists`, { //Returns a list of all lists.
      headers: {
        "Authorization": `Bearer: ${token}`
      }
    })

    let counter = 0; //Set up a counter, to count the number of tasks.
    allLists.forEach(list => {
      const eachTask = await fetch(`/api/lists/${list.id}`, { //This request will get all the tasks for a list.
        headers: {
          "Authorization": `Bearer: ${token}`
        }
      })

      //Filter the tasks to find only the tasks that are complete
      const completeTasks = eachTask.filter(task => {
        task.isComplete === true
      })

      //Add the number of tasks to the counter
      counter += completeTasks.length
    })
    //Set the innerHTML of our completeTaskSpan to equal the count of all tasks from each list which have been filtered
    completeTasksSpan.innerHTML = counter;


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
    const completedTasksSpan = document.querySelector(".completed-tasks-span")
    completedTasksSpan.innerHTML = completedTasks.length;


  } catch (e){
    console.log(e)

  }
})
