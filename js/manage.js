const header = document.getElementById("header");
const searchByCompany = document.getElementById("searchByCompany");
const searchByRole = document.getElementById("searchByRole");
const searchButton = document.getElementById("searchButton");
const result = document.getElementById("result");
const myModal = document.getElementById('myModal');
const closeModal = document.getElementById('closeModal');
const message = document.getElementById('message');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
let data = [];
let company = [];

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

// fetch data from Local Storage

function fetchData() {
    data = JSON.parse(localStorage.getItem("data"));
    for (i = 0; i < data.length; i++) {
        company.push(data[i].company);
    }
    company = removeDuplicates(company.sort());
    autosuggest(searchByCompany, company);
    searchJob();
}

fetchData();

// function to remove duplicate elements from array

function removeDuplicates(arr) {
    return arr.filter(function (item, pos) {
        return arr.indexOf(item) == pos;
    });
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
                showRole();
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
            showRole();
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

function startDictation() {
    if (window.hasOwnProperty("webkitSpeechRecognition")) {
        let recognition = new webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.start();
        recognition.onresult = function (e) {
            searchByCompany.value = e.results[0][0].transcript;
            showRole();
            recognition.stop();
        };
        recognition.onerror = function (e) {
            recognition.stop();
        };
    }
    showRole();
}

function showRole() {
    let value = searchByCompany.value.toLowerCase();
    if (value == '') return false;
    const filteredData = data.filter((item) => {
        return item.company.toLowerCase().includes(value);
    });
    let role = [];
    for (let i = 0; i < filteredData.length; i++) {
        role.push(filteredData[i].role);
    }
    role.sort();
    let out = '';
    out += "<option value='-1' selected disabled>Select Role</option>";
    for (let i = 0; i < filteredData.length; i++) {
        out += "<option value='" + role[i] + "'>" + role[i] + "</option>";
    }
    searchByRole.innerHTML = out;
}

function searchJob() {
    const param = new URLSearchParams(window.location.search);
    let searchString1 = param.get('searchByCompany');
    let searchString2 = param.get('searchByRole');
    if (searchString2 === null) {
        return;
    } else {
        searchString1 = searchString1.toLowerCase();
        searchString2 = searchString2.toLowerCase();
    }
    const filteredData = data.filter((item) => {
        return (item.company.toLowerCase().startsWith(searchString1.toLowerCase()) &&
            item.role.toLowerCase().startsWith(searchString2.toLowerCase()));
    });

    let clickedData = [];
    clickedData.push(JSON.stringify(filteredData[0]));
    let out = '';
    out += `<h2><i class="fa fa-user"></i>` + filteredData[0].role + `</h2>`;
    out += `<h3><i class="fa fa-building"></i>` + filteredData[0].company + `</h3>`;
    out += `<img src="` + filteredData[0].logo + `" alt="Company Logo">`;
    out += `<p class="startDate"><i class="fa fa-calendar"></i>Posted on : ` + convertDate(filteredData[0].date[0]) + `</p>`;
    out += `<p class="endDate"><i class="fa fa-calendar"></i>Last date : ` + convertDate(filteredData[0].date[1]) + `</p>`;
    out += `<p class="loc"><i class="fa fa-map-marker"></i>` + filteredData[0].location.city + ", " + filteredData[0].location.state + `</p>`;
    out += `<p class="exp"><i class="fa fa-history"></i>` + filteredData[0].experience + `+ years</p>`;
    out += `<p class="sal"><i class="fa fa-rupee"></i>` + filteredData[0].salary.start + ` LPA - ` + filteredData[0].salary.end + ` LPA</p>`;
    out += `<div class="link1"><a href="description.html?jobId=` + filteredData[0].jobId + `"'><i class="fa fa-eye"></i>View</a></div>`;
    out += `<div class="link2"><a href="post.html?jobId=` + filteredData[0].jobId + `"'><i class="fa fa-edit"></i>Edit</a></div>`;
    out += `<div class="link3"><i class="fa fa-trash"></i><input type="button" value="Delete" onclick='openModal(); deleteJob(` + filteredData[0].jobId + `)'></div>`;
    result.innerHTML = out;
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

// open confirmation modal

function openModal() {
    btn3.style.display = 'none';
    myModal.style.display = "block";
    btn1.focus();
    document.body.classList.add("stop-scrolling");
}

// close confirmation modal

closeModal.onclick = function () {
    myModal.style.display = "none";
    document.body.classList.remove("stop-scrolling");
}

btn1.onclick = function () {
    myModal.style.display = "none";
    document.body.classList.remove("stop-scrolling");
}

// delete job

function deleteJob(id) {
    let index = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].jobId === id) {
            index = i;
            break;
        }
    }

    btn2.onclick = async function () {
        message.style.display = 'none';
        btn1.style.display = 'none';
        btn2.style.display = 'none';

        document.getElementById('process').style.display = 'block';
        document.getElementById('process').innerHTML = 'Deleting <i class="fa fa-spin fa-spinner"></i>';
        await sleep(1000);

        document.getElementById('process').style.display = 'none';
        message.style.display = 'block';
        btn1.style.display = 'inline';

        data.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(data));
        message.innerHTML = 'Deleted! Want to delete more?';
        btn1.value = 'No';
        btn1.focus();
        btn3.style.display = 'inline-block';
        explore();
    }
}

function explore() {
    btn1.addEventListener('click', function () {
        if (btn1.value === 'No') {
            location.href = 'index.html';
        }
    });
}

btn3.addEventListener('click', function () {
    myModal.style.display = "none";
    document.body.classList.remove("stop-scrolling");
    location.href = 'manage.html';
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }