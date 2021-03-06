window.onload = function () {
  showAllNews();
  alert('carregou');
};

function getData() {
  return STEAM['appnews']['newsitems'];
}

function showAllNews() {
  let listNews = document.getElementById("list-news");
  listNews.innerHTML = `
    ${getData().map((news) => `
      <li>${news["title"]} / ${news["feedlabel"]}</li>
      `).join("")}
  `
}

function parseDate(date) {
  return new Date(date * 1000).toLocaleDateString("pt-br");
}

function filterNewsByDate(date) { //validar data
  return getData().filter(eachNews => {
    return parseDate(eachNews["date"]) === date;
  });
}

function filterNewsByTitle(title) { //validar dados se existe
  return getData().filter(eachNews => {
    return eachNews["title"] === title;
  });
}//procurar busca parcial, contem string

const btnFilter = document.querySelector("input[name='filter']");
btnFilter.addEventListener("click", function (event) {
  event.preventDefault();
  let valueInputDate = document.querySelector("input[name='byDate']").value;
  let valueInputTitle = document.querySelector(".input-by-title").value;
  let newArray = [];
  if (valueInputDate) {
    newArray = filterNewsByDate(valueInputDate);
  } else if (valueInputTitle) {
    newArray = filterNewsByTitle(valueInputTitle);
  }
  filterNews(newArray);
});

function showResult(filterNews) {
  let listNews = document.querySelector("#list-news");
  listNews.innerHTML = `
    ${filterNews.map((eachNews) => `
      <li>${eachNews["title"]} / ${eachNews["feedlabel"]}</li>
      `).join("")}
  `
}

function filterNews(filterNews) {
  let filteredNews = document.querySelector("#show-filtered-news");
  filteredNews.innerHTML = `
    ${filterNews.map((eachNews) => `
      <li>${eachNews["title"]} / ${eachNews["feedlabel"]}</li>
       `).join("")}
  `
}

function showSortNews() {
  let sortNews = document.querySelector(".show-sort-news");
  sortNews.innerHTML = `
    ${sortNews.map((eachNews) => `
      <li>${eachNews["title"]} / ${parseDate(eachNews["date"])}</li>
      `).join("")}
  `
}

function sortNewest() {//challenge
  return getData().sort((a, b) => {
    if (parseDate(b["date"]) < parseDate(a["date"])) {
      return -1;
    } if (parseDate(a["date"]) > parseDate(b["date"])) {
      return 1;
    }
    return 0;
  });
}