const bannerContainer = document.querySelector(".banner-container");
const featuredPost = document.querySelector(".featured-post");
const longBoxes = document.querySelector(".long-boxes");
const shortBoxes = document.querySelector(".short-boxes");
const loadMoreCta = document.querySelector(".load-more");

let sortType = "Newest Post";
/* Call api */
async function runGetPostsFirst() {
  try {
    let postsArray = await getPosts("https://landblog.thefed.no/wp-json/wp/v2/posts?_embed&per_page=100");
    longBoxes.classList.toggle("loader");
    createHTML(postsArray, "10posts");
  } catch (error) {
    longBoxes.innerHTML = message("error", error);
    longBoxes.classList.toggle("loader");
  }
}
runGetPostsFirst();

function createHTML(postArray, indicator) {
  let k = 0;
  if (indicator === "10posts") {
    k = 0;
  } else {
    k = 10;
  }
  for (k; k < postArray.length; k++) {
    let postDate = dateFormat(postArray[k].date);
    let featuredImg = postArray[k]._embedded["wp:featuredmedia"][0].source_url;
    let title = postArray[k].title.rendered;
    let introduction = postArray[k].excerpt.rendered;
    let id = postArray[k].id;
    if (k === 0) {
      bannerContainer.style.backgroundImage = `url(${featuredImg})`;
      featuredPost.innerHTML = `
                <a href="specific-post.html?id=${id}">
                    <p class="date-corner date">${postDate}</p>
                    <p class="sort-type">${sortType}: </p>
                    <h1>${title}</h1>
                </a>
            `;
      createLongBoxes(k, featuredImg, postDate, title, introduction, id);
    } else if (k < 4) {
      createLongBoxes(k, featuredImg, postDate, title, introduction, id);
    } else if (k <= 9) {
      createShortBoxes(k, featuredImg, postDate, title, id);
      if (k === 9) {
        break;
      }
    } else {
      createShortBoxes(k, featuredImg, postDate, title, id);
    }
  }
}

function createLongBoxes(k, featuredImg, postDate, title, introduction, id) {
  for (let i = k; i === k; i++) {
    longBoxes.innerHTML += `
        <div class="long-box border">
            <div class=" box-img long-box-img" style= "background-image: url('${featuredImg}'") ></div>
            <div class="box-text long-box-text">
                <p class="date-corner date">${postDate}</p>
                <h2>${title}</h2>
                <p>${introduction}</p>
                <a class="cta" href="specific-post.html?id=${id}">Read More</a>
            </div>
        </div>`;
  }
}

function createShortBoxes(k, featuredImg, postDate, title, id) {
  for (let i = k; i === k; i++) {
    shortBoxes.innerHTML += `
    <div class="short-box border">
        <a href="specific-post.html?id=${id}">
        <div class="post-img" style="background-image: url('${featuredImg}'"></div>
        <div class="short-box-text">
            <h3>${title}</h3>
            <p class="date">${postDate}</p>
        </div>
        </a>
    </div>`;
  }
}

loadMoreCta.addEventListener("click", function (e) {
  createHTML(postsArray, "load");
  loadMoreCta.style.display = "none";
});

/* Activate or deactivate sorting cta's */
let lastEvent = document.querySelector(".new-cta");
const ctaSortingWrapper = document.querySelector(".cta-sorting");
ctaSortingWrapper.addEventListener("click", function (event) {
  /*Control first if the click is on one of the objects and not the margin outside of the container*/
  if (event.target.classList.contains("cta")) {
    if (!event.target.classList.contains("active")) {
      event.target.classList.toggle("active");
      event.target.classList.toggle("not-active");
      lastEvent.classList.toggle("active");
      lastEvent.classList.toggle("not-active");
      lastEvent = event.target;
      cleanPage();
      loadMoreCta.style.display = "block";
      if (lastEvent.classList.contains("a-z-cta")) {
        azCTA();
      } else if (lastEvent.classList.contains("z-a-cta")) {
        zaCTA();
      } else if (lastEvent.classList.contains("new-cta")) {
        newCTA();
      } else {
        oldCTA();
      }
    }
  }
});
/*Sort posts */
function newCTA() {
  postsArray.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  sortType = "Newest Post";
  createHTML(postsArray, "10posts");
}
function oldCTA() {
  postsArray = postsArray.sort(function (b, a) {
    return new Date(b.date) - new Date(a.date);
  });
  sortType = "Oldest Post";
  createHTML(postsArray, "10posts");
}
function zaCTA() {
  //https://www.w3resource.com/javascript-exercises/javascript-array-exercise-25.php
  postsArray = postsArray.sort(function sortByTitle(a, z) {
    if (a.title.rendered < z.title.rendered) {
      return 1;
    }
    if (a.title.rendered > z.title.rendered) {
      return -1;
    }
    return 0;
  });
  sortType = "Descending Title Order";
  createHTML(postsArray, "10posts");
}
function azCTA() {
  postsArray = postsArray.sort(function sortByTitle(a, z) {
    if (a.title.rendered < z.title.rendered) {
      return -1;
    }
    if (a.title.rendered > z.title.rendered) {
      return 1;
    }
    return 0;
  });
  sortType = "Ascending Title Order";
  createHTML(postsArray, "10posts");
}

function cleanPage() {
  longBoxes.innerHTML = "";
  shortBoxes.innerHTML = "";
}
