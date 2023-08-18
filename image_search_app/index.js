const accesskey ="Y-FrA-q2haITFGA__cyoSCUaWeSzYSJc6Mui-SS8tHw";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
        if(page === 1){
         searchResultsEl.innerHTML = "";
        }

        const results = data.results;

        results.map((result)=>{
            const imageWrappper = document.createElement("div");
            imageWrappper.classList.add("search-result");
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;
            imageWrappper.appendChild(image);
            imageWrappper.appendChild(imageLink);
            searchResultsEl.appendChild(imageWrappper);
        });

        page++;

        if (page > 1){
            showMoreButtonEl.style.display = "block";
        }
}

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    page =1;
    searchImages();
});

showMoreButtonEl.addEventListener("click", ()  => {
    searchImages();
});