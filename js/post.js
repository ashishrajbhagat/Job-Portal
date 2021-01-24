const header = document.getElementById("header");

const companyForm = document.getElementById("companyForm");
const roleForm = document.getElementById("roleForm");
const locationForm = document.getElementById("locationForm");
const qualificationForm = document.getElementById("qualificationForm");
const skillsForm = document.getElementById("skillsForm");
const responsibilityForm = document.getElementById("responsibilityForm");
const dateForm = document.getElementById("dateForm");

const companyList = document.getElementById("companyList");
const roleList = document.getElementById("roleList");
const locationList = document.getElementById("locationList");
const qualificationList = document.getElementById("qualificationList");
const skillsList = document.getElementById("skillsList");
const responsibilityList = document.getElementById("responsibilityList");
const dateList = document.getElementById("dateList");

const companyName = document.getElementById("companyName");
const logo = document.getElementById("logo");
const website = document.getElementById("website");
const category = document.getElementById("category");
const suggestedCategory = document.getElementById("suggestedCategory");
const role = document.getElementById("role");
const type = document.getElementsByName("type");
const experience = document.getElementById("experience");
const minSalary = document.getElementById("minSalary");
const maxSalary = document.getElementById("maxSalary");
const city = document.getElementById("city");
const state = document.getElementById("state");
const country = document.getElementById("country");
const degree = document.getElementById("degree");
const specialization = document.getElementById("specialization");
const skills = document.getElementById("skills");
const responsibility = document.getElementById("responsibility");
const startDate = document.getElementById("startDate");
const lastDate = document.getElementById("lastDate");
const post = document.getElementById("post");
const myModal = document.getElementById("myModal");
const closeModal = document.getElementById("closeModal");
const message = document.getElementById("message");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");

// function to show menu

function showMenu() {
    document.getElementById('menu1').classList.toggle('show-mobile');
}

// function to display the form

function showCompany() {
    window.location.href = "#header";
    companyList.classList.add("focus");
    roleList.classList.remove("focus");
    locationList.classList.remove("focus");
    qualificationList.classList.remove("focus");
    skillsList.classList.remove("focus");
    responsibilityList.classList.remove("focus");
    dateList.classList.remove("focus");

    companyForm.style.display = "block";
    roleForm.style.display = "none";
    locationForm.style.display = "none";
    qualificationForm.style.display = "none";
    skillsForm.style.display = "none";
    responsibilityForm.style.display = "none";
    dateForm.style.display = "none";
}

showCompany();

function showRole() {
    window.location.href = "#header";
    companyList.classList.remove("focus");
    roleList.classList.add("focus");
    locationList.classList.remove("focus");
    qualificationList.classList.remove("focus");
    skillsList.classList.remove("focus");
    responsibilityList.classList.remove("focus");
    dateList.classList.remove("focus");

    companyForm.style.display = "none";
    roleForm.style.display = "block";
    locationForm.style.display = "none";
    qualificationForm.style.display = "none";
    skillsForm.style.display = "none";
    responsibilityForm.style.display = "none";
    dateForm.style.display = "none";
}

function showLocation() {
    window.location.href = "#header";
    companyList.classList.remove("focus");
    roleList.classList.remove("focus");
    locationList.classList.add("focus");
    qualificationList.classList.remove("focus");
    skillsList.classList.remove("focus");
    responsibilityList.classList.remove("focus");
    dateList.classList.remove("focus");

    companyForm.style.display = "none";
    roleForm.style.display = "none";
    locationForm.style.display = "block";
    qualificationForm.style.display = "none";
    skillsForm.style.display = "none";
    responsibilityForm.style.display = "none";
    dateForm.style.display = "none";
}

function showQualification() {
    window.location.href = "#header";
    companyList.classList.remove("focus");
    roleList.classList.remove("focus");
    locationList.classList.remove("focus");
    qualificationList.classList.add("focus");
    skillsList.classList.remove("focus");
    responsibilityList.classList.remove("focus");
    dateList.classList.remove("focus");

    companyForm.style.display = "none";
    roleForm.style.display = "none";
    locationForm.style.display = "none";
    qualificationForm.style.display = "block";
    skillsForm.style.display = "none";
    responsibilityForm.style.display = "none";
    dateForm.style.display = "none";
}

function showSkills() {
    window.location.href = "#header";
    companyList.classList.remove("focus");
    roleList.classList.remove("focus");
    locationList.classList.remove("focus");
    qualificationList.classList.remove("focus");
    skillsList.classList.add("focus");
    responsibilityList.classList.remove("focus");
    dateList.classList.remove("focus");

    companyForm.style.display = "none";
    roleForm.style.display = "none";
    locationForm.style.display = "none";
    qualificationForm.style.display = "none";
    skillsForm.style.display = "block";
    responsibilityForm.style.display = "none";
    dateForm.style.display = "none";
}

function showResponsibility() {
    window.location.href = "#header";
    companyList.classList.remove("focus");
    roleList.classList.remove("focus");
    locationList.classList.remove("focus");
    qualificationList.classList.remove("focus");
    skillsList.classList.remove("focus");
    responsibilityList.classList.add("focus");
    dateList.classList.remove("focus");

    companyForm.style.display = "none";
    roleForm.style.display = "none";
    locationForm.style.display = "none";
    qualificationForm.style.display = "none";
    skillsForm.style.display = "none";
    responsibilityForm.style.display = "block";
    dateForm.style.display = "none";
}

function showDate() {
    window.location.href = "#header";
    companyList.classList.remove("focus");
    roleList.classList.remove("focus");
    locationList.classList.remove("focus");
    qualificationList.classList.remove("focus");
    skillsList.classList.remove("focus");
    responsibilityList.classList.remove("focus");
    dateList.classList.add("focus");

    companyForm.style.display = "none";
    roleForm.style.display = "none";
    locationForm.style.display = "none";
    qualificationForm.style.display = "none";
    skillsForm.style.display = "none";
    responsibilityForm.style.display = "none";
    dateForm.style.display = "block";
}

// fetch all jobs from Local Storage

let data = JSON.parse(localStorage.getItem("data"));

// auto fill the input fields if user try to edit any job

function autoFill() {
    const param = new URLSearchParams(window.location.search);
    let id = param.get("jobId");
    if (id === null) {
        startDate.value = new Date().toISOString().substr(0, 10);
        return;
    }
    id = parseInt(id);
    for (let i = 0; i < data.length; i++) {
        if (data[i].jobId === id) {
            companyName.value = data[i].company;
            // logo.value = "",
            website.value = data[i].website;
            category.value = data[i].category;
            role.value = data[i].role;
            for (let i = 0; i < type[0].options.length; i++) {
                if (type[0].options[i].value === data[i].type) {
                    type[0].options[i].selected = true;
                    break;
                }
            }
            experience.value = data[i].experience;
            minSalary.value = data[i].salary.start;
            maxSalary.value = data[i].salary.end;
            city.value = data[i].location.city;
            state.value = data[i].location.state;
            country.value = data[i].location.country;
            degree.value = data[i].qualifications.degree;
            specialization.value = data[i].qualifications.specialization;
            skills.value = data[i].skills;
            responsibility.value = data[i].responsibility;
            startDate.value = data[i].date[0].substr(0, 10);
            lastDate.value = data[i].date[1].substr(0, 10);
        }
    }
}

autoFill();

// function to show suggested categories

function showCategories() {
    let categories = [];
    for (let i = 0; i < data.length; i++) {
        categories.push(data[i].category);
    }
    categories = removeDuplicates(categories.sort());

    let out = "";
    out += "Suggested categories : ";
    for (let i = 0; i < categories.length; i++) {
        out +=
            "<span onclick='category.value=this.innerText'  tabindex='0'>" +
            categories[i] +
            "</span>";
    }
    suggestedCategory.innerHTML = out;
}

showCategories();

// function to remove duplicate elements from array

function removeDuplicates(arr) {
    return arr.filter(function (item, pos) {
        return arr.indexOf(item) == pos;
    });
}

// function to create id

function getId() {
    let allId = [];
    let id = 0;
    for (let i = 0; i < data.length; i++) {
        allId.push(parseInt(data[i].jobId));
    }
    allId.sort(function (a, b) {
        return a - b;
    });
    for (let i = 0; i < allId.length; i++) {
        if (allId[i] != i + 1) {
            id = i + 1;
            break;
        }
    }
    if (id === 0) {
        id = data.length + 1;
    }
    return id;
}

// open confirmation modal

post.onclick = function () {
    btn3.style.display = "none";
    myModal.style.display = "block";
    btn1.focus();
    document.body.classList.add("stop-scrolling");
};

// close confirmation modal

closeModal.onclick = function () {
    myModal.style.display = "none";
    document.body.classList.remove("stop-scrolling");
};

btn1.onclick = function () {
    myModal.style.display = "none";
    document.body.classList.remove("stop-scrolling");
};

btn2.onclick = async function () {
    let newJob = {
        jobId: getId(),
        company: companyName.value,
        logo: "../images/company/default.png",
        website: website.value,
        category: category.value,
        role: role.value,
        type: type[0].options[type[0].selectedIndex].value,
        experience: experience.value,
        salary: {
            start: minSalary.value,
            end: maxSalary.value,
        },
        location: {
            city: city.value,
            state: state.value,
            country: country.value,
        },
        qualifications: {
            degree: degree.value.split(","),
            specialization: specialization.value.split(","),
        },
        skills: skills.value.split(","),
        responsibility: responsibility.value.split("\n"),
        date: [new Date().toISOString(), lastDate.value + "T23:59:59Z"],
    };

    message.style.display = 'none';
    btn1.style.display = 'none';
    btn2.style.display = 'none';

    document.getElementById('process').style.display = 'block';
    document.getElementById('process').innerHTML = 'Posting <i class="fa fa-spin fa-spinner"></i>';
    await sleep(1000);

    document.getElementById('process').style.display = 'none';
    message.style.display = 'block';
    btn1.style.display = 'inline';

    const param = new URLSearchParams(window.location.search);
    let jobId = param.get("jobId");
    if (jobId != null) {
        jobId = parseInt(jobId);
        for (let i = 0; i < data.length; i++) {
            if (data[i].jobId === jobId) {
                index = i;
                newJob.jobId = jobId;
                newJob.logo = data[i].logo;
                break;
            }
        }
        data.splice(index, 1);
    }

    data.push(newJob);
    localStorage.setItem("data", JSON.stringify(data));
    message.innerHTML = "Success! Want to post more?";
    btn1.value = "No";
    btn1.focus();
    btn2.style.display = "none";
    btn3.style.display = "inline-block";
    explore();
};

function explore() {
    btn1.addEventListener("click", function () {
        if (btn1.value === "No") {
            location.href = "index.html";
        }
    });
}

btn3.addEventListener("click", function () {
    myModal.style.display = "none";
    document.body.classList.remove("stop-scrolling");
    location.href = "post.html";
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }