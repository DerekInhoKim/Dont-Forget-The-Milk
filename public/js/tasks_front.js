// need to add event listener for dom content to be loaded
// need to add click event listeners to all lists names
// list names should carry the list id so that it can be used in the fetch API request to show its corresponding tasks
// path should be http://localhoast:8080/users/userid/lists/listid
// once the tasks are received the tasks from the database need to display them dynamically

//*********************************************************************

// what was the URL before clicking on a list?
// After dynamically making the HTML page may need to redirect user to a different end-point...
// for example, something like /users/id/list/id/task-view


//**********************************************************************

window.addEventListener('DOMContentLoaded', async (e) => {
  console.log('hello')
  // set up the variable for the list id that will be used to navigate to the correct endpoint
  // obtain the userId from the access token that is in the user's local storage because it's needed in the path for the GET request

  let listId;
  localStorage.setItem('DFTM_CURRENT_USER_ID', 1)
  let userId = localStorage.getItem('DFTM_CURRENT_USER_ID')

  // check to make sure that the access token is still valid
  // if not, then the user id will not be found and the user should be redirected to the log in page

  if(!userId) {
    window.location.href = '/log-in'
  }

  // find and add a click event listener to all the lists so that the list id can be extracted and used in the path for the GET request

  const lists = document.querySelectorAll('.listElement');

  lists.forEach(list => {
    list.addEventListener('click', async (e) => {

      if(!userId) {
        window.location.href = '/log-in'
      }

      listId = e.target.id
        // now that we have all the needed data for the GET request, make the GET request using the fetch API
        // in the header of the GET request, the authorization header is added with a value of a bearer token in order to authenticate the user
        // request is in a try...catch block in order to handle any errors that are sent from the back-end
      window.location.href = `lists/${listId}`

    });
  });

});
