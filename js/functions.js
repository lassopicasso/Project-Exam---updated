/*Dropdown menu*/
const page = document.querySelector("html");
const menu = document.querySelector(".dropdown-menu");
page.addEventListener("click", hamburger);

function hamburger(event) {
  if (event.target.classList.contains("dropdown-nav")) {
  } else {
    if (event.target.classList.contains("fa-bars") || !menu.classList.contains("hide-menu")) {
      menu.classList.toggle("hide-menu");
    }
  }
}

/*Date Formatter */
function dateFormat(date) {
  date = new Date(date);
  //https://stackoverflow.com/questions/12498619/convert-iso-8601-time-date-into-plain-english
  let day = date.getDate();
  let month = date.toLocaleString("default", { month: "long" }); //https://stackoverflow.com/questions/1643320/get-month-name-from-date/18648314#18648314

  let year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

/* Message if error occurs */
function message(messageType = "success", message = "") {
  return `<div class="alert ${messageType}"> 
            <h3>So sorry, an error occured.</h3>
            <p>The following error occured - ${message}</p>
            <p>Please refresh the page or try again later.</p>
        </div>`;
}

/*Create New Posts Array aka library*/
async function getPosts(url) {
  postsArray = [];
  const response = await fetch(url);
  const posts = await response.json();
  if (posts.length > 1) {
    for (let i = 0; i < posts.length; i++) {
      postsArray.push(posts[i]);
      postsArray.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    }
  } else {
    postsArray = posts;
  }
  return postsArray;
}
