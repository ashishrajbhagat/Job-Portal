const header = document.getElementById("header");
const main = document.getElementById("main");

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

let data = JSON.parse(localStorage.getItem("data"));

// function to convert date

function convertDate(date) {
  let d = new Date(date);
  var months = [
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

// function to show details
function showDetails() {
  const param = new URLSearchParams(window.location.search);
  let id = param.get('jobId');

  if (id === null) return;

  id = parseInt(id);
  let filteredData = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].jobId === id) {
      filteredData = data[i];
      break;
    }
  }

  let desc = "";
  desc += "<section class='container intro'>";
  desc += "<h1>" + filteredData.role + "</h2>";
  desc += "<h2><a href='" + filteredData.website + "'>" + filteredData.company + "</a></h2>";
  desc += "<img src='" + filteredData.logo + "' alt='Company Logo'>";
  desc += "</section>";
  desc += "<section class='container details'>";
  desc +=
    "<h2 class='d1'>Category : <span>" +
    filteredData.category +
    "</span></h2>";
  desc +=
    "<h2 class='d2'>Type : <span>" + filteredData.type + "</span></h2>";
  desc +=
    "<h2 class='d3'>Job Location : <span>" +
    filteredData.location.city +
    ", " +
    filteredData.location.state +
    ", " +
    filteredData.location.country +
    "</span></h2>";
  desc +=
    "<h2 class='d4'>Expected Salary : <span><b>" +
    filteredData.salary.start +
    "</b> LPA - <b>" +
    filteredData.salary.end +
    "</b> LPA</span></h2>";
  desc += "</section>";
  desc += "<section class='container dates'>";
  desc +=
    "<h3><i class='fa fa-calendar'></i>Job posted on : <span>" +
    convertDate(filteredData.date[0]) +
    "</span></h3>";
  desc +=
    "<h3><i class='fa fa-calendar'></i>Last date to apply : <span>" +
    convertDate(filteredData.date[1]) +
    "</span></h3>";
  desc += "</section>";
  desc += "<section class='container responsibility'>";
  desc += "<h2>Job Description</h2>";
  desc += "<span class='border'></span>";
  desc += "<ul>";

  for (let i = 0; i < filteredData.responsibility.length; i++) {
    desc += "<li>" + filteredData.responsibility[i] + "</li>";
  }

  desc += "</ul>";
  desc += "</section>";
  desc += "<section class='container experience'>";
  desc += "<h2>Experience Required</h2>";
  desc += "<span class='border'></span>";

  if (filteredData.experience > 0) {
    desc += "<p>&mdash; Minimum <b>" + filteredData.experience + "</b> years of experience required in same or relative field.</p>";
  } else {
    desc += "<p>Entry level</p>";
  }

  desc += "</section>";
  desc += "<section class='container qualification'>";
  desc += "<h2>Qualification Required</h2>";
  desc += "<span class='border'></span>";
  desc += "<h3>Degree : <span>" + filteredData.qualifications.degree + "</span></h3>";
  desc += "<h3>Specialization : <span>" + filteredData.qualifications.specialization + "</span></h3>";
  desc += "</section>";
  desc += "<section class='container skills'>";
  desc += "<h2>Skills Required</h2>";
  desc += "<span class='border'></span>";
  desc += "<p>" + filteredData.skills + "</p>";
  desc += "<a href='apply.html' class='btn'>Apply Now</a>";
  desc += "</section>";

  main.innerHTML = desc;
}

showDetails();