const arrowLeft = document.querySelector(".arrow .arrow-left");
const arrowRight = document.querySelector(".arrow .arrow-right");
const carouselSlider = document.querySelector(".carousel-posts");

const circle1 = document.querySelector(".circle-1");
const circle2 = document.querySelector(".circle-2");
const circle3 = document.querySelector(".circle-3");

const carouselGroup1 = document.querySelector(".group-1");
const carouselGroup2 = document.querySelector(".group-2");
const carouselGroup3 = document.querySelector(".group-3");

let carouselSwing = 0;
let sign = "";

let group1 = [];
let group2 = [];
let group3 = [];
let k = 0;

let postsArray = [];
/*Call API*/
async function runGetPostsFirst() {
  try {
    postsArray = await getPosts("https://landblog.thefed.no/wp-json/wp/v2/posts?_embed&per_page=100");
    carouselGroup1.classList.toggle("loader");
    arrowRight.style.display = "block";
    createGroups();
  } catch (error) {
    carouselGroup1.innerHTML = message("error", error);
    carouselGroup1.classList.toggle("loader");
  }
}
runGetPostsFirst();

//https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
window.onresize = createGroups;

/*Distribute the new posts between groups - dependent on window's width*/
function createGroups() {
  if (window.innerWidth <= 1000 && window.innerWidth > 750) {
    k = 1;
  } else if (window.innerWidth <= 750) {
    k = 2;
  } else {
    k = 0;
  }
  carouselGroup1.innerHTML = "";
  carouselGroup2.innerHTML = "";
  carouselGroup3.innerHTML = "";
  for (let i = 0; i < postsArray.length; i++) {
    let image = postsArray[i]._embedded["wp:featuredmedia"][0].source_url;
    let title = postsArray[i].title.rendered;
    let date = dateFormat(postsArray[i].date); /*Call date function from the file functions.js*/
    let id = postsArray[i].id;

    if (i < 3 - 1 * k) {
      createHTML(carouselGroup1, image, title, date, id);
    } else if (i < 6 - 2 * k) {
      createHTML(carouselGroup2, image, title, date, id);
    } else if (i < 9 - 3 * k) {
      createHTML(carouselGroup3, image, title, date, id);
    }
  }
}
/*create HTML based on which group its regarding */
function createHTML(group, image, title, date, id) {
  group.innerHTML += `
  <div class="carousel-post border">
  <a href="/pages/specific-post.html?id=${id}">
  <div class="post-img" style = "background-image: url('${image}'")></div>
  <div class="post-text">
    <h2>${title}</h2>
    <p class="date">${date}</p>
  </div></a>
</div> `;
}

/*Calculate slide direction */
arrowLeft.addEventListener("click", carouselSlide);
arrowRight.addEventListener("click", carouselSlide);

function carouselSlide(event) {
  if (event.target.classList.contains("arrow-left")) {
    sign = 1;
  } else {
    sign = -1;
  }
  carouselSwing = carouselSwing + sign * 116.7;
  carouselSlider.style.marginLeft = `${carouselSwing}%`;
  carouselCounter(carouselSwing);
}

/* Arrows hide or display dependent on the margin-left value */
function carouselCounter(carouselSwing) {
  if (carouselSwing === 0) {
    arrowLeft.style.display = "none";
    circle1.classList.add("circle-active");
    circle2.classList.remove("circle-active");
  } else if (carouselSwing === -233.4) {
    arrowRight.style.display = "none";
    circle2.classList.remove("circle-active");
    circle3.classList.add("circle-active");
  } else {
    arrowLeft.style.display = "block";
    arrowRight.style.display = "block";
    circle2.classList.add("circle-active");
    circle1.classList.remove("circle-active");
    circle3.classList.remove("circle-active");
  }
}
