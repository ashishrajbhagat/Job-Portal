// Global variables

const header = document.getElementById("header");
const searchByKeyword = document.getElementById('searchByKeyword');
const searchByLocation = document.getElementById('searchByLocation');
const count = document.getElementById('count');
const jobCategory = document.getElementById('jobCategory');
const companyList = document.getElementById('companyList');

let data = [];
let keywordSuggestion = [];
let locationSuggestion = [];
let categoryList = [];
let companiesList = [];

// Sticky Header

window.onscroll = function () {
  myHeader();
};

function myHeader() {
  if (window.pageYOffset > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// function to show menu

function showMenu() {
  document.getElementById('menu1').classList.toggle('show-mobile');
}

// Fetch data from JSON

async function loadFromJson() {
  const response = await fetch('../json/data.json');
  data = await response.json();

  localStorage.setItem("data", JSON.stringify(data));
}

// Fetch data from Local Storage

function fetchData() {
  data = JSON.parse(localStorage.getItem("data"));
  if (data === null) {
    loadFromJson();
  }

  for (i = 0; i < data.length; i++) {
    keywordSuggestion.push(data[i].company);
    keywordSuggestion.push(data[i].role);
    keywordSuggestion.push(data[i].category);

    locationSuggestion.push(data[i].location.city);
    locationSuggestion.push(data[i].location.state);
    locationSuggestion.push(data[i].location.country);

    categoryList.push(data[i].category);
    companiesList.push(data[i].company);
  }

  keywordSuggestion = removeDuplicates(keywordSuggestion.sort());
  locationSuggestion = removeDuplicates(locationSuggestion.sort());
  categoryList = removeDuplicates(categoryList.sort());
  companiesList = removeDuplicates(companiesList.sort());

  autosuggest(searchByKeyword, keywordSuggestion);
  autosuggest(searchByLocation, locationSuggestion);
  showCategory(categoryList);
  showCompanies(companiesList);
}

fetchData();

// function to remove duplicate elements from array

function removeDuplicates(arr) {
  return arr.filter(function (item, pos) {
    return arr.indexOf(item) == pos;
  })
}

// function to show category list on home page

function showCategory(categoryList) {
  let out = '';
  for (var i = 0; i < categoryList.length; i++) {
    out += `<li><a href="jobs.html?searchByKeyword=` + categoryList[i] + `&searchByLocation=">` + categoryList[i] + `</a></li>`;
  }
  jobCategory.innerHTML = out;
}

// function to show company list on home page

function showCompanies(companiesList) {
  let out = '';
  for (var i = 0; i < companiesList.length; i++) {
    out += `<li><a href="jobs.html?searchByKeyword=` + companiesList[i] + `&searchByLocation=">` + companiesList[i] + `</a></li>`;
  }
  if (companyList) companyList.innerHTML = out;
}

// Auto Suggest input box

function autosuggest(input, arr) {
  var currentActive;
  input.addEventListener('input', function () {
    const value = input.value.toLowerCase();
    closeSuggestionBox();
    currentActive = -1;
    let suggestionBox = document.createElement("UL");
    input.parentNode.appendChild(suggestionBox);
    suggestionBox.setAttribute("class", "suggestionBox");
    suggestionBox.setAttribute("id", "suggestionBox");

    const suggestions = arr.filter(function (item) {
      return item.toLowerCase().startsWith(value);
    });

    for (let i = 0; i < suggestions.length; i++) {
      if (i === 5) break;
      const suggestionBoxItem = document.createElement("LI");
      suggestionBoxItem.innerHTML = suggestions[i];
      suggestionBoxItem.addEventListener("click", function (e) {
        input.value = this.innerText;
        closeSuggestionBox();
      });
      suggestionBox.appendChild(suggestionBoxItem);
    }

    if (value === '')
      closeSuggestionBox();

  });

  input.addEventListener("keydown", function (e) {
    let suggestionBox, suggestionBoxItem;
    suggestionBox = document.getElementById("suggestionBox");
    if (suggestionBox) suggestionBoxItem = suggestionBox.getElementsByTagName("li");
    if (e.key == 'ArrowDown') {
      currentActive++;
      addActive(suggestionBoxItem);
    } else if (e.key == 'ArrowUp') {
      currentActive--;
      addActive(suggestionBoxItem);
    } else if (e.key == 'Enter') {
      e.preventDefault();
      if (suggestionBoxItem && currentActive > -1)
        input.value = suggestionBoxItem[currentActive].innerText;
      closeSuggestionBox();
    }
  });

  function addActive(suggestionBoxItem) {
    if (!suggestionBoxItem) return false;
    for (var i = 0; i < suggestionBoxItem.length; i++) {
      suggestionBoxItem[i].classList.remove("active");
    }
    if (currentActive >= suggestionBoxItem.length) currentActive = 0;
    if (currentActive < 0) currentActive = (suggestionBoxItem.length - 1);
    suggestionBoxItem[currentActive].classList.add("active");
  }

  function closeSuggestionBox(elmnt) {
    let suggestionBox = document.getElementsByClassName("suggestionBox");
    for (let i = 0; i < suggestionBox.length; i++) {
      if (elmnt != suggestionBox[i] && elmnt != input) {
        suggestionBox[i].parentNode.removeChild(suggestionBox[i]);
      }
    }
  }

  document.addEventListener("click", function (event) {
    closeSuggestionBox(event.target);
  });
}

// function for speech recognition

function startDictation(str) {
  if (window.hasOwnProperty('webkitSpeechRecognition')) {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = function (e) {
      if (str === 'keyword')
        searchByKeyword.value = e.results[0][0].transcript;
      else if (str === 'location')
        searchByLocation.value = e.results[0][0].transcript;
      recognition.stop();
    };
    recognition.onerror = function (e) {
      recognition.stop();
    }
  }
}