const usersBox = document.getElementById("users-box");
const usersUl = document.querySelector("#users-box ul");
const table = document.querySelector("table");

function fetchUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = user.username;
        li.setAttribute("data-id", user.id);
        li.style.cursor = "pointer";
        li.classList.add("list-group-item");
        usersUl.appendChild(li);
      });
    });
}

function showDetailedPostInfo(e) {
  const row = e.target.parentElement.parentElement;
  const id = row.querySelector("th").getAttribute("data-id");
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((post) => {
      showModal(post.id, post.userId, post.title, post.body);
    });
}

function showModal(id, userId, title, body) {
  const modal = document.querySelector(".modal");

  const modalContent = document.querySelector(".modal-content");
  document.querySelector(".modal-title").textContent = `Post #${id}`;
  document.querySelector(
    ".modal-body p:nth-of-type(1)"
  ).textContent = `User ID: ${userId}`;
  document.querySelector(
    ".modal-body p:nth-of-type(2)"
  ).textContent = `Title: ${title}`;
  document.querySelector(".modal-footer p").textContent = `Body: ${body}`;

  const modalInstance = new bootstrap.Modal(modal);
  modalInstance.show();
}

usersBox.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const userId = e.target.getAttribute("data-id");
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      .then((response) => response.json())
      .then((posts) => {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        let id = 1;

        posts.forEach((post) => {
          const btn = document.createElement("button");
          btn.onclick = showDetailedPostInfo;
          btn.setAttribute("type", "button");
          btn.classList.add("btn", "btn-primary");
          btn.textContent = "Details";

          const tr = document.createElement("tr");
          tbody.appendChild(tr);

          const th = document.createElement("th");
          th.setAttribute("scope", "row");
          th.setAttribute("data-id", post.id);
          th.textContent = id++;
          tr.appendChild(th);

          const title = document.createElement("td");
          title.textContent = post.title;
          tr.appendChild(title);

          const body = document.createElement("td");
          body.textContent = post.body;
          tr.appendChild(body);

          const details = document.createElement("td");
          details.appendChild(btn);
          tr.appendChild(details);

          table.style.display = "table";
        });
      });
  }
});

fetchUsers();
