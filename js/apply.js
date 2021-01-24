const header = document.getElementById("header");
const about = document.getElementById("about");
const contact = document.getElementById("contact");
const education = document.getElementById("education");
const add = document.getElementById("add");
const skill = document.getElementById("skill");
const work = document.getElementById("work");
const general = document.getElementById("general");
const resume = document.getElementById("resume");
const formRight = document.getElementById("formRight");

// function to show menu

function showMenu() {
    document.getElementById('menu1').classList.toggle('show-mobile');
}

function aboutForm() {
    window.location.href = '#header'
    about.classList.add('focus');
    contact.classList.remove('focus');
    education.classList.remove('focus');
    skill.classList.remove('focus');
    work.classList.remove('focus');
    general.classList.remove('focus');
    resume.classList.remove('focus');

    let out = '';
    out += `<form action="#" method="POST" autocomplete="off">`;
    out += `<fieldset>`;
    out += `<legend><h2>About</h2></legend>`;
    out += `<div class="border"></div>`;
    out += `<div class="row">`;
    out += `<div class="col">`;
    out += `<label for="firstName">First Name : </label>`;
    out += `<input type="text" id="firstName" name="firstName" placeholder="First Name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'First Name'" required>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="lastName">Last Name : </label>`;
    out += `<input type="text" id="lastName" name="lastName" placeholder="Last Name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Last Name'" required>`;
    out += `</div>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<div class="col">`;
    out += `<label for="dob">Date of Birth : </label>`;
    out += `<input type="date" id="dob" name="dob" required>`;
    out += `</div>`;
    out += `</div>`;
    out += `<p>Gender : </p>`;
    out += `<div class="row">`;
    out += `<input type="radio" id="male" name="gender" value="male" required>`;
    out += `<label for="male">Male</label>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<input type="radio" id="female" name="gender" value="female" required>`;
    out += `<label for="female">Female</label>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<input type="radio" id="other" name="gender" value="other" required>`;
    out += `<label for="other">Other</label>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<input type="submit" value="Save & Continue" class="btn" onclick="contact.click()">`;
    out += `</div>`;
    out += `</fieldset>`;
    out += `</form>`;

    formRight.innerHTML = out;
}

function contactForm() {
    window.location.href = '#header'
    about.classList.remove('focus');
    contact.classList.add('focus');
    education.classList.remove('focus');
    skill.classList.remove('focus');
    work.classList.remove('focus');
    general.classList.remove('focus');
    resume.classList.remove('focus');

    let out = '';
    out += `<form action="#" method="POST" autocomplete="off">`;
    out += `<fieldset>`;
    out += `<legend><h2>Contact Information</h2></legend>`;
    out += `<div class="border"></div>`;
    out += `<div class="row">`;
    out += `<div class="col">`;
    out += `<label for="email">Email Address : </label>`;
    out += `<input type="email" id="email" name="email" placeholder="Email Address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Email Address'" required>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="phone">Phone Number : </label>`;
    out += `<input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="Phone Number" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Phone Number'" required>`;
    out += `</div>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="address">Address : </label>`;
    out += `<input type="text" id="address" name="address" placeholder="Address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Address'" required>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<div class="col">`;
    out += `<label for="city">City : </label>`;
    out += `<input type="text" id="city" name="city" placeholder="City" onfocus="this.placeholder = ''" onblur="this.placeholder = 'City'" required>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="state">State : </label>`;
    out += `<input type="text" id="state" name="state" placeholder="State" onfocus="this.placeholder = ''" onblur="this.placeholder = 'State'" required>`;
    out += `</div>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<div class="col">`;
    out += `<label for="country">Country : </label>`;
    out += `<input type="text" id="country" name="country" placeholder="Country" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Country'" required>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="pin">Pin Code : </label>`;
    out += `<input type="tel" id="pin" name="pin" pattern="[1-9]{6}" placeholder="Pin Code" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Pin Code'" required>`;
    out += `</div>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<input type="submit" value="Save & Continue" class="btn" onclick="education.click()">`;
    out += `</div>`;
    out += `</fieldset>`;
    out += `</form>`;

    formRight.innerHTML = out;
}

function educationForm() {
    window.location.href = '#header'
    about.classList.remove('focus');
    contact.classList.remove('focus');
    education.classList.add('focus');
    skill.classList.remove('focus');
    work.classList.remove('focus');
    general.classList.remove('focus');
    resume.classList.remove('focus');

    let out = '';
    out += `<form action="#" method="POST" autocomplete="off">`;
    out += `<fieldset>`;
    out += `<legend><h2>Education Details</h2></legend>`;
    out += `<div class="border"></div>`;
    out += `<div class="col">`;
    out += `<label for="course">Course : </label>`;
    out += `<input type="text" id="course" name="course" placeholder="Course" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Course'" required>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="specialization">Specialization : </label>`;
    out += `<input type="text" id="specialization" name="specialization" placeholder="Specialization" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Specialization'" required>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="college">College/School : </label>`;
    out += `<input type="text" id="college" name="college" placeholder="College/School" onfocus="this.placeholder = ''" onblur="this.placeholder = 'College/School'" required>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="university">University : </label>`;
    out += `<input type="text" id="university" name="university" placeholder="University" onfocus="this.placeholder = ''" onblur="this.placeholder = 'University'" required>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<div class="col">`;
    out += `<label for="start">Start Date : </label>`;
    out += `<input type="date" id="start" name="start" placeholder="Start Date" required>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="end">End Date : </label>`;
    out += `<input type="date" id="end" name="end" placeholder="End Date" required>`;
    out += `</div>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="marks">Percentage/CGPA : </label>`;
    out += `<input type="text" id="marks" name="marks" placeholder="Percentage/CGPA" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Percentage/CGPA'" required>`;
    out += `</div>`;
    out += `<p id='add' onclick="addNew()"><i class='fa fa-plus-circle'></i> Add another detail</p>`;
    out += `<div class="row">`;
    out += `<input type="submit" value="Save & Continue" class="btn" onclick="skill.click()">`;
    out += `</div>`;
    out += `</fieldset>`;
    out += `</form>`;

    formRight.innerHTML = out;
}

function addNew() {
    let out = '';
    out += `<h3>Add another details</h3>`;
    out += `<div class="border"></div>`;
    out += `<div class="col">`;
    out += `<label for="course">Course : </label>`;
    out += `<input type="text" id="course" name="course" placeholder="Course" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Course'" required>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="specialization">Specialization : </label>`;
    out += `<input type="text" id="specialization" name="specialization" placeholder="Specialization" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Specialization'" required>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="college">College/School : </label>`;
    out += `<input type="text" id="college" name="college" placeholder="College/School" onfocus="this.placeholder = ''" onblur="this.placeholder = 'College/School'" required>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="university">University : </label>`;
    out += `<input type="text" id="university" name="university" placeholder="University" onfocus="this.placeholder = ''" onblur="this.placeholder = 'University'" required>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<div class="col">`;
    out += `<label for="start">Start Date : </label>`;
    out += `<input type="date" id="start" name="start" placeholder="Start Date" required>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="end">End Date : </label>`;
    out += `<input type="date" id="end" name="end" placeholder="End Date" required>`;
    out += `</div>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="marks">Percentage/CGPA : </label>`;
    out += `<input type="text" id="marks" name="marks" placeholder="Percentage/CGPA" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Percentage/CGPA'" required>`;
    out += `</div>`;
    out += `<p id='add' onclick="addNew()"><i class='fa fa-plus-circle'></i> Add another detail</p>`;

    let x = document.getElementsByTagName('fieldset')[0];
    let p = x.getElementsByTagName('p')[0];
    p.outerHTML = out;
}

function skillForm() {
    window.location.href = '#header'
    about.classList.remove('focus');
    contact.classList.remove('focus');
    education.classList.remove('focus');
    skill.classList.add('focus');
    work.classList.remove('focus');
    general.classList.remove('focus');
    resume.classList.remove('focus');

    let out = '';
    out += `<form action="#" method="POST" autocomplete="off">`;
    out += `<fieldset>`;
    out += `<legend><h2>Skills & Interest</h2></legend>`;
    out += `<div class="border"></div>`;
    out += `<div class="row">`;
    out += `<div class="col">`;
    out += `<label for="skills">Skills : </label>`;
    out += `<input type="text" id="skills" name="skills" placeholder="Skills" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Skills'" required>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="hobies">Hobbies : </label>`;
    out += `<input type="text" id="hobies" name="hobies" placeholder="Hobbies" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Hobbies'" required>`;
    out += `</div>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<div class="col">`;
    out += `<label for="interest">Interest : </label>`;
    out += `<input type="text" id="interest" name="interest" placeholder="Interest" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Interest'" required>`;
    out += `</div>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<input type="submit" value="Save & Continue" class="btn" onclick="work.click()">`;
    out += `</div>`;
    out += `</fieldset>`;
    out += `</form>`;

    formRight.innerHTML = out;
}

function workForm() {
    window.location.href = '#header'
    about.classList.remove('focus');
    contact.classList.remove('focus');
    education.classList.remove('focus');
    skill.classList.remove('focus');
    work.classList.add('focus');
    general.classList.remove('focus');
    resume.classList.remove('focus');

    let out = '';
    out += `<form action="#" method="POST" autocomplete="off">`;
    out += `<fieldset>`;
    out += `<legend><h2>Work History</h2></legend>`;
    out += `<div class="border"></div>`;
    out += `<div class="col">`;
    out += `<label for="position">Position : </label>`;
    out += `<input type="text" id="position" name="position" placeholder="Position" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Position'" required>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="company">Company : </label>`;
    out += `<input type="text" id="company" name="company" placeholder="Company" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Company'" required>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<div class="col">`;
    out += `<label for="since">Since : </label>`;
    out += `<input type="date" id="since" name="since" required>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<label for="till">Till : </label>`;
    out += `<input type="date" id="till" name="till" required>`;
    out += `</div>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<input type="submit" value="Save & Continue" class="btn" onclick="general.click()">`;
    out += `</div>`;
    out += `</fieldset>`;
    out += `</form>`;

    formRight.innerHTML = out;
}

function generalForm() {
    window.location.href = '#header'
    about.classList.remove('focus');
    contact.classList.remove('focus');
    education.classList.remove('focus');
    skill.classList.remove('focus');
    work.classList.remove('focus');
    general.classList.add('focus');
    resume.classList.remove('focus');

    let out = '';
    out += `<form action="#" method="POST" autocomplete="off">`;
    out += `<fieldset>`;
    out += `<legend><h2>General Question</h2></legend>`;
    out += `<div class="border"></div>`;
    out += `<div class="row">`;
    out += `<div class="col">`;
    out += `<p>Are you willing to relocate? </p>`;
    out += `<div class="row">`;
    out += `<input type="radio" id="yesRelocate" name="relocate" value="yesRelocate" required>`;
    out += `<label for="yesRelocate">Yes</label>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<input type="radio" id="noRelocate" name="relocate" value="noRelocate" required>`;
    out += `<label for="noRelocate">No</label>`;
    out += `</div>`;
    out += `</div>`;
    out += `<div class="col">`;
    out += `<p>Are you willing to work in night shift? </p>`;
    out += `<div class="row">`;
    out += `<input type="radio" id="yesNight" name="night" value="yesNight" required>`;
    out += `<label for="yesNight">Yes</label>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<input type="radio" id="noNight" name="night" value="noNight" required>`;
    out += `<label for="noNight">No</label>`;
    out += `</div>`;
    out += `</div>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<input type="submit" value="Save & Continue" class="btn" onclick="resume.click()">`;
    out += `</div>`;
    out += `</fieldset>`;
    out += `</form>`;

    formRight.innerHTML = out;
}

function resumeForm() {
    window.location.href = '#header'
    about.classList.remove('focus');
    contact.classList.remove('focus');
    education.classList.remove('focus');
    skill.classList.remove('focus');
    work.classList.remove('focus');
    general.classList.remove('focus');
    resume.classList.add('focus');

    let out = '';
    out += `<form action="#" method="POST" autocomplete="off">`;
    out += `<fieldset>`;
    out += `<legend><h2>Resume</h2></legend>`;
    out += `<div class="border"></div>`;
    out += `<div class="col">`;
    out += `<label for="resume">Upload Resume : </label>`;
    out += `<input type="file" id="resume" name="resume" required>`;
    out += `</div>`;
    out += `<div class="row">`;
    out += `<input type="submit" value="Submit" class="btn">`;
    out += `</div>`;
    out += `</fieldset>`;
    out += `</form>`;

    formRight.innerHTML = out;
}