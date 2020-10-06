// need to add event listener for dom content to be loaded
// need to add click event listeners to all lists names
// list names should carry the list id so that it can be used in the fetch API request to show its corresponding tasks
// path should be http://localhoast:8080/users/userid/lists/listid
// once the tasks are received the tasks from the database need to display them dynamically

//*********************************************************************

// QUESTIONS: what was the URL before clicking on a list
// After dynamically making the HTML page may need to redirect user to a different end-point...
// for example, something like /users/id/list/id/task-view


//**********************************************************************

document.addEventListener('DOMContentLoaded', e => {

  // set up the variable for the list id that will be used to navigate to the correct endpoint
  // obtain the userId from the access token that is in the user's local storage because it's needed in the path for the GET request

  let listId;
  let userId = localStorage.getItem('DFTM_CURRENT_USER_ID')

  // check to make sure that the access token is still valid
  // if not, then the user id will not be found and the user should be redirected to the log in page

  if(!userId) {
    // TODO: re-route to the log-in page
  }

  // find and add a click event listener to all the lists so that the list id can be extracted and used in the path for the GET request

  const lists = document.querySelectorAll('.listElement');

  lists.forEach(list => {
    list.addEventListener('click', e => {
      listId = e.target.id
    });
  });


  // now that we have all the needed data for the GET request, make the GET request using the fetch API
  // in the header of the GET request, the authorization header is added with a value of a bearer token in order to authenticate the user
  // request is in a try...catch block in order to handle any errors that are sent from the back-end

  try {
    const res = await fetch(`http://localhost:8080/users/${userId}/lists/${listId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "DFTM_ACCESS_TOKEN"
        )}`
      }
    })

    if(!res.ok) {
      throw res;
    }

    // TODO: dynamically generate HTML and then redirect user to a new endpoint that renders the newly generated HTML

    const tasks = await res.json()
  } catch(err) {
    const errorJSON = await err.json()
    const { errors } = errorJSON
    if(err.status >= 400 && err.status < 600) {
      // TODO: Do something with the errors
    }
  }

});
