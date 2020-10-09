// import {handleErrors} from "../../utils.js"

const fetchList = async(userId) => {
  const res = await fetch(`/api/users/${userId}/lists`, 
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "DFTM_USER_TOKEN"
      )}`,
    }
  }
  );
  if(res.status === 401) {
    window.location.href = "/sign-in";
    return;
  }

  const {lists} = await res.json();
  const listsContainer = document.querySelector(".list-cat-container");
  const listsHtml = lists.map(
    ({ listName, id}) => `
      <div class="lists">
        <div class="list-header" data-list-id="${id}">
          ${listName}
          <div class="dropdown">
            <button id="button-drop" class="button-drop fa fa-bars"></button>
            <div class="drop-content" style="display:none">
              <button data-editlist-id="${id}" class="edit-button">Edit<i class="fa fa-close"></i></button>
              <button data-deletelist-id="${id}" class="delete-button fa fa-trash" ></button>
          </div>
        </div>
        </div>
      </div>
    `
  );
  listsContainer.innerHTML = listsHtml.join("");
  const dropButtons = document.querySelectorAll(".button-drop");
  // const click = document.getElementById("drop-content");

  dropButtons.forEach(dropButton => {

    dropButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      let click = event.target.parentNode.querySelector('.drop-content')
      console.log(click)
      if (click.style.display === "none") {
        click.style.display = "block";
      } else {
        click.style.display = "none";
      }
    });
  })

};

// When pressing Delete Button on the list
const handleDelete = async (listId) => {
  // return async () => {
    try{
      const res = await fetch(`/api/lists/${listId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "DFTM_USER_TOKEN"
          )}`,
        }
      });
      if(!res.ok) {
        throw res;
      }
      document.querySelector(`[data-list-id="${listId}"]`).remove();
    } catch(err) {
      console.error(err);
    }
  // };
};

const handleEdit = (listId) => {
  console.log(listId)
}

document.addEventListener("DOMContentLoaded", async()=> {
  try{
    // localStorage.setItem('DFTM_USER_ID', 3)
    let userId = localStorage.getItem('DFTM_USER_ID');
    if(!userId) {
      window.location.href = '/sign-in';
    }
    await fetchList(userId);

    
    const deleteButtons = document.querySelectorAll(".delete-button");
    if (deleteButtons) {
      deleteButtons.forEach((button) => {
        console.log(button.dataset.deletelistId)
        button.addEventListener("click", e=>  handleDelete(button.dataset.deletelistId))
      });
    }

    const editButtons = document.querySelectorAll(".edit-button");
    if (editButtons) {
      editButtons.forEach((button) => {
        button.addEventListener("click", handleEdit(button.id));
      });


    //add a list button
      const addListButton = document.getElementById("add-list-button");
      addListButton.addEventListener("click",e => {
        event.stopPropagation();
        let click = document.querySelector(".list-drop-content");
        if (click.style.display === "none") {
          click.style.display = "block";
        } else {
          click.style.display = "none";
        }
      
      });


      //ADDIN LIST 

      const form = document.querySelector(".add-list-form")

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const listName = formData.get("listName")
        const body = { listName };
        try {
          const res = await fetch(`/api/users/${userId}/lists`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Beearer ${localStorage.getItem(
                "DFTM_USER_TOKEN"
              )}`,
            },
          });
          if (res.status === 401) {
            window.location.href = "/log-in";
            return;
          }
          if (!res.ok) {
            throw res;
          }
          form.reset();
          console.log(userId);
          await fetchList(userId);
        } catch (err) {
          handleErrors(err);
        }
      });

  }
  } catch(e) {
    console.error(e);
  }

});