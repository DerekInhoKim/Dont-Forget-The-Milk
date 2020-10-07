// import {handleErrors} from "../../utils.js"

const fetchList = async() => {
  const res = await fetch('/api/lists', 
  {
    headers: {
      Authorization: `nn`
    }
  }
  );
  if(res.status === 401) {
    window.location.href = "/log-in";
    return;
  }

  const {lists} = await res.json();
  const listsContainer = document.querySelector(".list-container");
  const listsHtml = lists.map(
    ({ listName, id}) => `
      <div class="card">
        <div class="card-header" id="list-${id}">
          ${listName}
          <select>
            <option id="${id}" class="delete-button" >Remove list</option>
            <option id="${id}" class="edit-button"> Renam list</option>
          </select>
        </div>
      </div>
    `
  );
  listsContainer.innerHTML = listsHtml.join("");

};

const handleDelete = (listId) => {
  return async () => {
    try{
      const res = await fetch(`/api/lists/${listId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("")}`
        }
      });
      if(!res.ok) {
        throw res;
      }
      document.querySelector(`#list-${id}`).remove();
    } catch(err) {
      console.error(err);
    }
  }
}

const handleEdit = (listId) => {
  
}

document.addEventListener("DOMContentLoaded", async()=> {
  try{
    await fetchList();

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