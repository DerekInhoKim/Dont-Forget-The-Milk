// import {handleErrors} from "../../utils.js"

const fetchList = async(userId) => {
  const res = await fetch(`/api/lists/${userId}`, 
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
  const listsContainer = document.querySelector(".list-container");
  const listsHtml = lists.map(
    ({ listName, id}) => `
      <div class="card">
        <div class="list-header" id="${id}">
          ${listName}
          <div class="dropdown">
            <button id="button-drop" class="button-drop">></button>
            <div id="drop-content" style="display:none">
              <button id="remove-${id}" class="delete-button" >Remove list</button>
              <button id="edit-${id}" class="edit-button"> Renam list</button>
          </div>
        </div>
        </div>
      </div>
    `
  );
  listsContainer.innerHTML = listsHtml.join("");

};

// const handleDelete = (listId) => {
//   return async () => {
//     try{
//       const res = await fetch(`/api/lists/${listId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("")}`
//         }
//       });
//       if(!res.ok) {
//         throw res;
//       }
//       document.querySelector(`#list-${id}`).remove();
//     } catch(err) {
//       console.error(err);
//     }
//   }
// }

// const handleEdit = (listId) => {
  
// }

document.addEventListener("DOMContentLoaded", async()=> {
  try{
    // localStorage.setItem('DFTM_USER_ID', 3)
    let userId = localStorage.getItem('DFTM_USER_ID');
    // if(!userId) {
    //   window.location.href = '/sign-in';
    // }
    await fetchList(userId);

    const dropButton = document.getElementById("button-drop");
    const click = document.getElementById("drop-content");

    dropButton.addEventListener('click', (event) => {
      if (click.style.display === "none") {
        click.style.display = "block";
      } else {
        click.style.display = "none";
      }
    });

    const deleteButtons = document.querySelectorAll(".delete-button");
    if (deleteButtons) {
      deleteButtons.forEach((button) => {
        button.addEventListener("click", handleDelete(button.id));
      });
    }

    const editButtons = document.querySelectorAll(".edit-button");
    if (editButtons) {
      editButtons.forEach((button) => {
        button.addEventListener("click", handleEdit(button.id));
      });

  }
  } catch(e) {
    console.error(e);
  }

});