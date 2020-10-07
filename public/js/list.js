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
      <div class="card" id="list=${id}">
        <div class="card-header">
          ${listName}
            <option id> > </option>
            <option id="${id}" >Remove list</option>
            <option id="${id}" > Renam list</option>
          </select>
        </div>
      </div>
    `
  );
  listsContainer.innerHTML = listsHtml.join("");

};





document.addEventListener("DOMContentLoaded", async()=> {
  try{
    await fetchList();
  } catch(e) {
    console.error(e);
  }



});