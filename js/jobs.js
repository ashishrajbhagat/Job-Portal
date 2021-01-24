// Global variables

const header = document.getElementById("header");
const output = document.getElementById("output");
const searchByKeyword = document.getElementById("searchByKeyword");
const searchByLocation = document.getElementById("searchByLocation");
const reset = document.getElementById("reset");
const filter = document.getElementById("filter");
const filterCompany = document.getElementById("filterCompany");
const filterType = document.getElementById("filterType");
const filterLocation = document.getElementById("filterLocation");
const filterSalary = document.getElementById("filterSalary");
const filterExperience = document.getElementById("filterExperience");
const salaryValue = document.getElementById("salaryValue");
const experienceValue = document.getElementById("experienceValue");
const filterRightTop = document.getElementById("filterRightTop");
const count = document.getElementById("count");
const filterLeft = document.getElementById("filterLeft");
const sort = document.getElementById("sort");
const dsc = document.getElementById("dsc");
const asc = document.getElementById("asc");

let data = [];
let keywordSuggestion = [];
let locationSuggestion = [];

// sticky Header

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

// function to show menu

function showFilter() {
    document.getElementById('showFilter').classList.toggle('showFilter');
}

// fetch all jobs from Local Storage

function fetchData() {
    data = JSON.parse(localStorage.getItem("data"));
    data.sort(sortDsc('date'));
    for (i = 0; i < data.length; i++) {
        keywordSuggestion.push(data[i].company);
        keywordSuggestion.push(data[i].role);
        keywordSuggestion.push(data[i].category);
        locationSuggestion.push(data[i].location.city);
        locationSuggestion.push(data[i].location.state);
        locationSuggestion.push(data[i].location.country);
    }
    keywordSuggestion = removeDuplicates(keywordSuggestion.sort());
    locationSuggestion = removeDuplicates(locationSuggestion.sort());
    autosuggest(searchByKeyword, keywordSuggestion);
    autosuggest(searchByLocation, locationSuggestion);
    searchJobs();
}

fetchData();

// function to remove duplicate elements from array

function removeDuplicates(arr) {
    return arr.filter(function (item, pos) {
        return arr.indexOf(item) == pos;
    });
}

// function to convert date

function convertDate(date) {
    let d = new Date(date);
    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
}

// Auto Suggest input box

function autosuggest(input, arr) {
    let currentActive;
    input.addEventListener("input", function () {
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

        if (value === "") closeSuggestionBox();
    });

    input.addEventListener("keydown", function (e) {
        let suggestionBox, suggestionBoxItem;
        suggestionBox = document.getElementById("suggestionBox");
        if (suggestionBox) suggestionBoxItem = suggestionBox.getElementsByTagName("li");
        if (e.key == "ArrowDown") {
            currentActive++;
            addActive(suggestionBoxItem);
        } else if (e.key == "ArrowUp") {
            currentActive--;
            addActive(suggestionBoxItem);
        } else if (e.key == "Enter") {
            e.preventDefault();
            if (suggestionBoxItem && currentActive > -1)
                input.value = suggestionBoxItem[currentActive].innerText;
            closeSuggestionBox();
        }
    });

    function addActive(suggestionBoxItem) {
        if (!suggestionBoxItem) return false;
        for (let i = 0; i < suggestionBoxItem.length; i++) {
            suggestionBoxItem[i].classList.remove("active");
        }
        if (currentActive >= suggestionBoxItem.length) currentActive = 0;
        if (currentActive < 0) currentActive = suggestionBoxItem.length - 1;
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
    if (window.hasOwnProperty("webkitSpeechRecognition")) {
        let recognition = new webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.start();
        recognition.onresult = function (e) {
            if (str === "keyword") searchByKeyword.value = e.results[0][0].transcript;
            else if (str === "location")
                searchByLocation.value = e.results[0][0].transcript;
            recognition.stop();
        };
        recognition.onerror = function (e) {
            recognition.stop();
        };
    }
}

function featuredJobs(found) {
    let topJobs = [];
    for (let i = 0; i < 10; i++) {
        topJobs.push(data[i]);
    }
    showFilterLeft(topJobs, found);
    showFilterRight(topJobs, found);
    sorting(topJobs, found);
}

function searchJobs() {
    const param = new URLSearchParams(window.location.search);
    let searchString1 = param.get('searchByKeyword');
    let searchString2 = param.get('searchByLocation');
    let found = 1;
    if (searchString1 === null && searchString2 === null) {
        found = 0;
        featuredJobs(found);
        return;
    }
    found = 1;
    searchString1 = searchString1.toLowerCase();
    searchString2 = searchString2.toLowerCase();
    const filteredData = data.filter((item) => {
        return (
            (
                item.company.toLowerCase().includes(searchString1) ||
                item.category.toLowerCase().includes(searchString1) ||
                item.role.toLowerCase().includes(searchString1)
            ) &&
            (
                item.location.city.toLowerCase().includes(searchString2) ||
                item.location.state.toLowerCase().includes(searchString2) ||
                item.location.country.toLowerCase().includes(searchString2)
            )
        );
    });
    showFilterLeft(filteredData, found);
    showFilterRight(filteredData, found);
    sorting(filteredData, found);
}

function showFilterLeft(filteredData, found) {
    let company = [];
    let type = [];
    let location = [];
    let experience = [];
    for (let i = 0; i < filteredData.length; i++) {
        company.push(filteredData[i].company);
        type.push(filteredData[i].type);
        location.push(filteredData[i].location.city);
        experience.push(parseInt(filteredData[i].experience));
    }

    company = removeDuplicates(company.sort());
    type = removeDuplicates(type.sort());
    experience = removeDuplicates(experience.sort());
    location = removeDuplicates(location.sort());

    let out = "";
    out += "<option value='' selected disabled>Select Company</option>";
    for (let i = 0; i < company.length; i++) {
        out += "<option value='" + company[i] + "'>" + company[i] + "</option>";
    }
    filterCompany.innerHTML = out;

    out = "";
    out += "<option value='' selected disabled>Select Type</option>";
    for (let i = 0; i < type.length; i++) {
        out += "<option value='" + type[i] + "'>" + type[i] + "</option>";
    }
    filterType.innerHTML = out;

    out = "";
    out += "<option value='' selected disabled>Select Location</option>";
    for (let i = 0; i < location.length; i++) {
        out += "<option value='" + location[i] + "'>" + location[i] + "</option>";
    }
    filterLocation.innerHTML = out;

    filterSalary.oninput = function () {
        salaryValue.innerHTML = this.value;
    }

    filterExperience.oninput = function () {
        experienceValue.innerHTML = this.value;
    }

    reset.addEventListener('click', function () {
        salaryValue.innerHTML = filterSalary.min;
        experienceValue.innerHTML = filterExperience.min;
        showFilterRight(filteredData, found)
    });
    filter.addEventListener('click', function () { filterJobs(filteredData, found) });
}

function showFilterRight(filteredData, found) {
    let out = '';
    if (found === 1 && filteredData.length > 1) {
        count.innerHTML = "<span>" + filteredData.length + "</span> Jobs found";
        out += "<option value='' selected disabled>Sort By</option>";
        out += "<option value='Date'>Date</option>";
        out += "<option value='Salary'>Salary</option>";
        sort.innerHTML = out;
        sort.style.display = 'inline';
        dsc.style.display = 'inline';
        asc.style.display = 'inline';
    }
    else if (found === 1) {
        count.innerHTML = "<span>" + filteredData.length + "</span> Job found";
        sort.style.display = 'none';
        dsc.style.display = 'none';
        asc.style.display = 'none';
    }
    else {
        count.innerHTML = "Featured jobs";
        out += "<option value='' selected disabled>Sort By</option>";
        out += "<option value='Date'>Date</option>";
        out += "<option value='Salary'>Salary</option>";
        sort.innerHTML = out;
        sort.style.display = 'inline';
        dsc.style.display = 'inline';
        asc.style.display = 'inline';
    }

    out = '';
    for (let i = 0; i < filteredData.length; i++) {
        out += "<li class='outputList'>";
        out += "<img src='" + filteredData[i].logo + "' alt='Logo of " + filteredData[i].company + "'>";
        out += "<h3><i class='fa fa-user'></i>" + filteredData[i].role + "</h3>";
        out += "<small><i class='fa fa-calendar'></i>" + convertDate(filteredData[i].date[0]) + "</small>";
        out += "<h4><i class='fa fa-building'></i>" + filteredData[i].company + "</h4>";
        out += "<span><i class='fa fa-map-marker'></i> " + filteredData[i].location.city + ", " + filteredData[i].location.state + "</span>";
        out += "<p><i class='fa fa-rupee'></i> Salary : " + filteredData[i].salary.start + " LPA - " + filteredData[i].salary.end + " LPA</p>";
        if (filteredData[i].experience === 0) {
            out += "<p><i class='fa fa-history'></i>Experience : Entry level</p>";
        } else {
            out += "<p><i class='fa fa-history'></i>Experience : " + filteredData[i].experience + "+ years</p>";
        }
        out += `<div class='view'><a href='description.html?jobId=` + filteredData[i].jobId + `' title='Click to view details'>View Details</a></div>`;
        out += "</li>";
    }
    output.innerHTML = out;
}

// Searching of jobs by filter

function filterJobs(data1, found) {
    found = 1;
    const searchString1 = filterCompany.value.toLowerCase();
    const searchString2 = filterType.value.toLowerCase();
    const searchString3 = filterLocation.value.toLowerCase();
    const searchString4 = filterSalary.value.toLowerCase();
    const searchString5 = filterExperience.value.toLowerCase();
    const filteredData = data1.filter((item) => {
        return (
            item.company.toLowerCase().includes(searchString1) &&
            item.type.toLowerCase().includes(searchString2) &&
            item.location.city.toLowerCase().includes(searchString3) &&
            ((item.salary.start >= searchString4) || (item.salary.end >= searchString4)) &&
            (item.experience >= searchString5)
        );
    });
    showFilterRight(filteredData, found);
}

// function to sort in ascending order

function sortAsc(str) {
    if (str === 'date') {
        return function (a, b) {
            let d1 = new Date(a.date[0]);
            let d2 = new Date(b.date[0]);
            return d1.getTime() - d2.getTime();
        }
    }
    else if (str === 'salary') {
        return function (a, b) {
            return a.salary.start - b.salary.start;
        }
    }
}

// function to sort in descending order

function sortDsc(str) {
    if (str === 'date') {
        return function (a, b) {
            let d1 = new Date(a.date[0]);
            let d2 = new Date(b.date[0]);
            return d2.getTime() - d1.getTime();
        }
    }
    else if (str === 'salary') {
        return function (a, b) {
            return b.salary.end - a.salary.end;
        }
    }
}

// function to execute sorting

function sorting(filteredData, found) {
    dsc.addEventListener('click', function () {
        let str = sort.value.toLowerCase();
        showFilterRight(filteredData.sort(sortDsc(str)), found);
    });
    asc.addEventListener('click', function () {
        let str = sort.value.toLowerCase();
        showFilterRight(filteredData.sort(sortAsc(str)), found);
    });
}