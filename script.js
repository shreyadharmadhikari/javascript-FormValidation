const fullNameInput = document.getElementById("fullName");

let errorsObj = {
  fullNameErr: false,
  emailErr: false,
  genderErr: false,
  skillErr: false,
  roleErr: false,
  dobErr: false,
  resumeErr: false,
  aboutErr: false,
  pwErr: false,
  confirmPwErr: false,
};

fullNameInput.addEventListener("blur", (e) => {
  let inputVal = e.target.value;
  let errorMsg = "";
  let regex = /^[a-zA-Z]+(?:\s+[a-zA-Z]+){0,3}$/;
  let errorMsgEle = document.getElementById("fullNameErr");
  if (inputVal === "") {
    errorMsg = "Full name is required!";
    errorMsgEle.innerText = errorMsg;
    errorMsgEle.style.visibility = "visible";
    e.target.style.borderColor = "#FF4646";
    e.target.style.background = "#FFF";
    errorsObj.fullNameErr = true;
  } else {
    if (regex.exec(inputVal) !== null) {
      errorMsg = "";
      errorMsgEle.style.visibility = "hidden";
      e.target.style.borderColor = "#78C841";
      e.target.style.background = "#FFF";
      errorsObj.fullNameErr = false;
    } else {
      errorMsg = "Only letters and spaces are allowed!";
      errorMsgEle.innerText = errorMsg;
      errorMsgEle.style.visibility = "visible";
      e.target.style.borderColor = "#FF4646";
      e.target.style.background = "#FFF";
      errorsObj.fullNameErr = true;
    }
  }
});

const emailInput = document.getElementById("email");

emailInput.addEventListener("blur", (e) => {
  console.log("listening...");
  let inputVal = e.target.value;
  console.log(inputVal);
  let errorMsg = "";
  let errorMsgEle = document.getElementById("emailError");
  let regex =
    /^[a-zA-Z0-9]+(?:[\.!#\$%&'\*+\-\/\=\?\^_\{\|\}~]?[a-zA-Z0-9])*@[a-zA-Z0-9]+(?:\.[a-zA-Z]{2,63}){1,5}$/;
  if (inputVal === "") {
    errorMsg = "Email field is required!";
    errorMsgEle.innerText = errorMsg;
    errorMsgEle.style.visibility = "visible";
    e.target.style.borderColor = "#FF4646";
    e.target.style.background = "#FFF";
    errorsObj.emailErr = true;
  } else {
    if (regex.exec(inputVal) !== null) {
      errorMsg = "";
      errorMsgEle.style.visibility = "hidden";
      e.target.style.borderColor = "#78C841";
      e.target.style.background = "#FFF";
      errorsObj.emailErr = false;
    } else {
      errorMsg = "Email format is invalid!";
      errorMsgEle.innerText = errorMsg;
      errorMsgEle.style.visibility = "visible";
      e.target.style.borderColor = "#FF4646";
      e.target.style.background = "#FFF";
      errorsObj.emailErr = true;
    }
  }
});

const genderEle = document.getElementById("gender");

genderEle.addEventListener("click", (e) => {
  let genderVal = e.target.value;
  const genderErr = document.getElementById("genderError");
  if (genderVal === "") {
    genderErr.innerText = "You must select one option!";
    genderErr.style.visibility = "visible";
    genderEle.style.border = "1px solid #FF4646";
    errorsObj.genderErr = true;
  } else {
    genderErr.innerText = "";
    genderErr.style.visibility = "hidden";
    genderEle.style.border = "1px solid #78C841";
    errorsObj.genderErr = false;
  }
});

const skillInputCheckboxes = [
  ...document.getElementsByClassName("skillsInput"),
];
const skillsErrEle = document.getElementById("skillsErr");
const skillsFieldset = document.getElementById("skills");
console.log(skillInputCheckboxes);
let checkBox = [];
skillInputCheckboxes.forEach((ele) => {
  ele.addEventListener("change", () => {
    if (ele.checked) {
      checkBox.push(ele.value);
      console.log("checked: true");
    } else {
      checkBox = checkBox.filter((val) => val !== ele.value);
    }
    console.log(checkBox);
    if (checkBox.length === 0) {
      skillsErrEle.innerText = "Please select atleast one skill to proceed";
      skillsErrEle.style.visibility = "visible";
      skillsFieldset.style.border = "1px solid #FF4646";
      errorsObj.skillErr = true;
    } else {
      skillsErrEle.innerText = "";
      skillsFieldset.style.border = "1px solid #78C841";
      errorsObj.skillErr = false;
    }
  });
});

const jobRoleDropdown = document.getElementById("jobRole");

jobRoleDropdown.addEventListener("change", (e) => {
  let selectedOption = e.target.value;
  let jobRoleErr = document.getElementById("jobRoleErr");

  if (selectedOption === "other") {
    let otherText = document.getElementById("otherRole");
    otherText.style.display = "block";
  } else {
    if (selectedOption !== "") {
      jobRoleDropdown.style.border = "1px solid #78C841";
      jobRoleErr.style.visibility = "hidden";
      errorsObj.roleErr = false;
    } else {
      jobRoleDropdown.style.border = "1px solid #FF4646";
      jobRoleErr.innerText = "Please select role option";
      jobRoleErr.style.visibility = "visible";
      errorsObj.roleErr = true;
    }
  }
});

const otherJobRole = document.getElementById("otherJobRole");

otherJobRole.addEventListener("blur", (e) => {
  let text = otherJobRole.value;
  let otherErr = document.getElementById("otherRoleErr");
  console.log(text);
  if (!text) {
    otherJobRole.style.border = "1px solid #FF4646";
    otherErr.innerText = "Please enter the Role details";
    otherErr.style.visibility = "visible";
    errorsObj.roleErr = true;
  } else {
    otherJobRole.style.border = "1px solid #78C841";
    otherErr.style.visibility = "hidden";
    errorsObj.roleErr = false;
  }
});

const dateInput = document.getElementById("dob");

dateInput.addEventListener("blur", (e) => {
  let dateErr = document.getElementById("dobErr");
  if (e.target.checkValidity()) {
    dateInput.style.border = "1px solid #78C841";
    dateErr.style.visibility = "hidden";
    errorsObj.dobErr = false;
  } else {
    dateInput.style.border = "1px solid #FF4646";
    dateErr.innerText = "Date of birth is required!";
    dateErr.style.visibility = "visible";
    errorsObj.dobErr = true;
  }
});

const resumeFile = document.getElementById("resume");

resumeFile.addEventListener("change", (e) => {
  let resumeErr = document.getElementById("resumeErr");
  let fileUploaded = e.target.files[0];

  let allowedTypes = ["application/pdf", "application/msword"];

  if (!fileUploaded) {
    return;
  }

  if (!allowedTypes.includes(fileUploaded.type)) {
    resumeErr.innerText = "Only pdf and word files are allowed!";
    resumeErr.style.visibility = "visible";
    errorsObj.resumeErr = true;
    resumeFile.value = "";
  }
  if (fileUploaded.size > 1024 * 1024) {
    resumeErr.innerText = "Maximum file size allowed is 1MB!";
    resumeErr.style.visibility = "visible";
    errorsObj.resumeErr = true;
    resumeFile.value = "";
  }
});

const aboutUser = document.getElementById("aboutUser");

aboutUser.addEventListener("blur", (e) => {
  let textEntered = e.target.value;
  let aboutErr = document.getElementById("aboutUserErr");

  if (textEntered.length < 20) {
    aboutErr.innerText = "Describe yourself in atleast 20 characters";
    aboutErr.style.visibility = "visible";
    aboutUser.style.border = "1px solid #FF4646";
    errorsObj.aboutErr = true;
  } else if (textEntered.length <= 200) {
    aboutErr.innerText = "";
    aboutErr.style.visibility = "hidden";
    aboutUser.style.border = "1px solid #78C841";
    errorsObj.aboutErr = false;
  } else {
    aboutErr.innerText = "Describe yourself in less than 200 characters";
    aboutErr.style.visibility = "visible";
    aboutUser.style.border = "1px solid #FF4646";
    errorsObj.aboutErr = true;
  }
});

const password = document.getElementById("password");

const showPw = document.getElementById("showPw");
showPw.addEventListener("click", (e) => {
  if (password.type === "password") {
    password.type = "text";
    showPw.src = "hide_eye.png";
  } else {
    password.type = "password";
    showPw.src = "show_eye.png";
  }
});

password.addEventListener("input", (e) => {
  let passwordEntered = e.target.value;
  const passwordErrEle = document.getElementById("passwordErr");
  let regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,18}$/;

  if (regex.test(passwordEntered)) {
    password.style.border = "1px solid #78C841";
    errorsObj.pwErr = false;
    passwordErrEle.innerText = "";
    passwordErrEle.style.visibility = "hidden";
  } else {
    passwordErrEle.innerText =
      "Password must contain one capital letter, one digit and one special character and minimum length of 8";
    passwordErrEle.style.visibility = "visible";
    password.style.border = "1px solid #FF4646";
    errorsObj.pwErr = true;
  }
});

const showCPw = document.getElementById("showCPw");
showCPw.addEventListener("click", (e) => {
  if (confirmPW.type === "password") {
    confirmPW.type = "text";
    showCPw.src = "hide_eye.png";
  } else {
    confirmPW.type = "password";
    showCPw.src = "show_eye.png";
  }
});

const confirmPW = document.getElementById("confirmPW");

confirmPW.addEventListener("input", (e) => {
  let confirmPwVal = e.target.value;
  let passwordEntered = password.value;
  let confirmPWErr = document.getElementById("confirmPWErr");

  if (confirmPwVal === passwordEntered) {
    confirmPWErr.style.visibility = "hidden";
    confirmPW.style.border = "1px solid #78C841";
    errorsObj.confirmPwErr = false;
  } else {
    confirmPWErr.innerText = "Both passwords must match!!!";
    confirmPWErr.style.visibility = "visible";
    confirmPW.style.border = "1px solid #FF4646";
    errorsObj.confirmPwErr = true;
  }
});

const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", (e) => {
  let errorLength = Object.keys(errorsObj).length;
  console.log(errorLength);
  let counter = 0;

  e.preventDefault();

  for (let k in errorsObj) {
    if (errorsObj[k] === false) {
      counter += 1;
    }
  }

  console.log(counter);

  if (counter === errorLength) {
    document.body.innerHTML = `<h1 style="text-align: center">Form submitted successfully</h1>`;
  }
});
