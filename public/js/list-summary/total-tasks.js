document.addEventListener("DOMContentLoaded", async (event) => {
  //TODO fill in blanks in USER_ID and ACCESS_TOKEN from auth.
  const userId = localStorage.getItem("USER_ID");
  const token = localStorage.getItem("ACCESS_TOKEN");


  //TODO decide how to figure out which listID we're pulling from.

  //We select all tasks with the class of task, which should be set for every task.
  const selectedTask = document.querySelectorAll("task")
  //For each task, we set up an event listener to find which task is being selected.
  selectedTask.forEach(task => {
    task.addEventListener("click", event => {

    })
  })

  const listId;

  //If there is no list selected, we want to display our default inbox information.
  if(!listId){
    listId = 1
  }

  try {
    //We grab all the tasks, from the sepcific list, of a specific user.
    const res = await fetch(`/users/${userId}/lists/${listId}/tasks`, {
      headers: {
        "Authorization": `Bearer: ${token}`
      }
    })

    //if the user's authrozation is not valid, they will be redirected to log-in
    if(res.status === 401) {
      window.location.href = "/log-in"
    }

    const { tasks } = await res.json()

    //We take the div with the class of allTasksContainer and set the innerHTML of the div to display the number of all tasks.
    const allTasks = document.querySelector(".allTasksContainer")
    allTasks.innerHTML = tasks.length;


  } catch (e){
    console.log(e)

  }
})
