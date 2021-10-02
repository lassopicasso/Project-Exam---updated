const bannerContainer = document.querySelector(".banner-container");
const featuredPost = document.querySelector(".featured-post");
const featuredSmallImg = document.querySelector(".left-box .featured-small-img");
const leftBox = document.querySelector(".left-box");
const rightBox = document.querySelector(".right-box");

const postContent = document.querySelector(".post-content");

const disableScroll = document.querySelector("body");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

/*Get specific post*/
async function fetchGame() {
  try {
    let game = await getPosts(`https://landblog.thefed.no/wp-json/wp/v2/posts/${id}?_embed&per_page=100`);
    featuredPost.innerHTML = "";
    postContent.style.display = "flex";
    createHTML(game);
  } catch (error) {
    featuredPost.innerHTML = message("error", error);
  }
}
fetchGame();

/*Create HTML and meta */

function createHTML(game) {
  let title = game.title.rendered;
  let featuredImg = game._embedded["wp:featuredmedia"][0].source_url;
  let dateCorner = dateFormat(game.date);

  //Page Title
  document.title = title;
  //Banner
  bannerContainer.style.backgroundImage = `url(${featuredImg})`;
  featuredPost.innerHTML = `
                              <p class="date-corner date">${dateCorner}</p>
                              <h1>${title}</h1>
                          
  `;
  //Right Box
  rightBox.innerHTML = `
    <div class="introduction long-box-text">
    <p class="date-corner date">${dateCorner}</p>
    ${game.content.rendered}
    </div>
    `;

  document.querySelector(".wp-block-group__inner-container").classList.add("imgContainer");

  const imgContainer = document.querySelector(".wp-block-group");
  imgContainer.addEventListener("click", largeImg);

  //Left Box
  featuredSmallImg.style.backgroundImage = `url(${featuredImg})`;
  const originYearText = document.querySelector(".wp-block-group__inner-container p").innerHTML;
  const originYear = originYearText.slice(originYearText.length - 4);
  //https://stackoverflow.com/questions/5873810/how-can-i-get-last-characters-of-a-string
  const author = game._embedded.author[0].name;
  leftBox.innerHTML += `<ul>
      <li><span class="left-box-span-text">Author:</span> ${author}</li>
      <li><span class="left-box-span-text">Post date:</span> ${dateCorner}</li>
      <li><span class="left-box-span-text origin-year">Origin year:</span> ${originYear}</li>
      </ul>`;
}

/* Focus Image */
let focusImg = "";
const footerImg = document.querySelector("footer");
function largeImg(event) {
  disableScroll.style.overflow = "hidden";

  focusImg = event.target.src;
  //https://stackoverflow.com/questions/254302/how-can-i-determine-the-type-of-an-html-element-in-javascript
  if (event.target.nodeName === "IMG") {
    footerImg.innerHTML += `<div class ="focus-img-container">
                                <div class="focus-img-background"></div>
                                <div class="focus-img border" style= 'background-image: url(${focusImg})'>
                                <i class="far fa-times-circle"></i></div>
                            </div>
                                `;

    let cross = document.querySelector(".fa-times-circle");
    const wrapper = document.querySelector(".focus-img-background");
    cross.addEventListener("click", unfocus);
    wrapper.addEventListener("click", unfocus);
  }
}
/*Unfocus Image */
function unfocus() {
  disableScroll.style.overflow = "visible";
  const imgFocus = document.querySelector(".focus-img-container");
  imgFocus.remove();
}
