const tasks = document.querySelectorAll('.tasks_container li')
tasks.forEach((task) => {
  task.addEventListener('click', (e) => {
    alert(e.target.id)
  })
})
