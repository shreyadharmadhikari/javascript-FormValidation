let errorsObj = {
  fullNameErr: true,
  emailErr: true,
  genderErr: true,
  skillErr: true,
  roleErr: true,
  dobErr: true,
  resumeErr: true,
  aboutErr: true,
  pwErr: true,
  confirmPwErr: true,
};

const setError = (errorMsgEle, inputEle, msg) => {
  errorMsgEle.innerText = msg;
  errorMsgEle.classList.add("error-visible");
  inputEle.classList.add("error"); // for border shake
};

const setSuccess = (errorMsgEle, inputEle) => {
  // errorMsgEle.style.visibility = "hidden";
  errorMsgEle.classList.remove("error-visible");
  inputEle.classList.remove("error");
  inputEle.style.border = "1px solid #78C841";
};

const fullNameInput = document.getElementById("fullName");

fullNameInput.addEventListener("blur", fullNameValidator);

function fullNameValidator() {
  let inputVal = fullNameInput.value;
  let regex = /^[a-zA-Z]+(?:\s+[a-zA-Z]+){0,3}$/;
  let errorMsgEle = document.getElementById("fullNameErr");
  if (inputVal === "") {
    setError(errorMsgEle, fullNameInput, "Full name is required!");
    errorsObj.fullNameErr = true;
  } else {
    if (regex.test(inputVal)) {
      setSuccess(errorMsgEle, fullNameInput);
      errorsObj.fullNameErr = false;
    } else {
      setError(
        errorMsgEle,
        fullNameInput,
        "Only letters and spaces are allowed!",
      );
      errorsObj.fullNameErr = true;
    }
  }
}

const emailInput = document.getElementById("email");

emailInput.addEventListener("blur", emailInputValidator);

function emailInputValidator() {
  let inputVal = emailInput.value;
  console.log(inputVal);
  let errorMsgEle = document.getElementById("emailError");
  let regex =
    /^[a-zA-Z0-9]+(?:[\.!#\$%&'\*+\-\/\=\?\^_\{\|\}~]?[a-zA-Z0-9])*@[a-zA-Z0-9]+(?:\.[a-zA-Z]{2,63}){1,5}$/;
  if (inputVal === "") {
    setError(errorMsgEle, emailInput, "Email field is required!");
    errorsObj.emailErr = true;
  } else {
    if (regex.test(inputVal)) {
      setSuccess(errorMsgEle, emailInput);
      errorsObj.emailErr = false;
    } else {
      setError(errorMsgEle, emailInput, "Email format is invalid!");
      errorsObj.emailErr = true;
    }
  }
}

const genderEle = document.getElementById("gender");

genderEle.addEventListener("click", genderValidation);

function genderValidation() {
  const genderErr = document.getElementById("genderError");

  // Select the checked radio button from the group
  const selectedGender = document.querySelector('input[name="gender"]:checked');

  if (!selectedGender) {
    setError(genderErr, genderEle, "You must select one option!");
    errorsObj.genderErr = true;
  } else {
    setSuccess(genderErr, genderEle);
    errorsObj.genderErr = false;
  }
}

const skillInputCheckboxes = [
  ...document.getElementsByClassName("skillsInput"),
];
const skillsErrEle = document.getElementById("skillsErr");
const skillsFieldset = document.getElementById("skills");
console.log(skillInputCheckboxes);
let checkBox = [];
skillInputCheckboxes.forEach((ele) => {
  ele.addEventListener("change", () => checkboxValidation(ele));
});

function checkboxValidation(ele) {
  if (ele.checked) {
    checkBox.push(ele.value);
    console.log("checked: true");
  } else {
    checkBox = checkBox.filter((val) => val !== ele.value);
  }
  console.log(checkBox);
  if (checkBox.length === 0) {
    setError(
      skillsErrEle,
      skillsFieldset,
      "Please select at least one skill to proceed",
    );
    errorsObj.skillErr = true;
  } else {
    setSuccess(skillsErrEle, skillsFieldset);
    errorsObj.skillErr = false;
  }
}

const jobRoleDropdown = document.getElementById("jobRole");

jobRoleDropdown.addEventListener("change", jobRoleDropdownValidation);

function jobRoleDropdownValidation() {
  let selectedOption = jobRoleDropdown.value;
  let jobRoleErr = document.getElementById("jobRoleErr");

  if (selectedOption === "other") {
    let otherText = document.getElementById("otherRole");
    otherText.style.display = "block";
  } else {
    if (selectedOption !== "") {
      setSuccess(jobRoleErr, jobRoleDropdown);

      errorsObj.roleErr = false;
    } else {
      setError(
        jobRoleErr,
        jobRoleDropdown,
        "Please select desired role option",
      );
      errorsObj.roleErr = true;
    }
  }
}

const otherJobRole = document.getElementById("otherJobRole");

otherJobRole.addEventListener("blur", () => {
  let text = otherJobRole.value;
  let otherErr = document.getElementById("otherRoleErr");
  console.log(text);
  if (!text) {
    setError(otherErr, otherJobRole, "Please enter the Role details");
    errorsObj.roleErr = true;
  } else {
    setSuccess(otherErr, otherJobRole);
    errorsObj.roleErr = false;
  }
});

const dateInput = document.getElementById("dob");

dateInput.addEventListener("blur", dateInputValidation);

function dateInputValidation() {
  let dateErr = document.getElementById("dobErr");
  if (dateInput.checkValidity()) {
    setSuccess(dateErr, dateInput);
    errorsObj.dobErr = false;
  } else {
    setError(dateErr, dateInput, "Date of birth is required!");
    errorsObj.dobErr = true;
  }
}

const resumeFile = document.getElementById("resume");

resumeFile.addEventListener("change", resumeUploadValidation);

function resumeUploadValidation() {
  const resumeErr = document.getElementById("resumeErr");
  const fileUploaded = resumeFile.files[0];

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  //  EMPTY FILE CASE (this was missing UI feedback)
  if (!fileUploaded) {
    setError(resumeErr, resumeFile, "Resume is required!");
    errorsObj.resumeErr = true;
    return;
  }

  //  FILE TYPE CHECK
  if (!allowedTypes.includes(fileUploaded.type)) {
    setError(resumeErr, resumeFile, "Only PDF or Word files are allowed!");
    errorsObj.resumeErr = true;
    resumeFile.value = "";
    return;
  }

  //  FILE SIZE CHECK (1MB)
  if (fileUploaded.size > 1024 * 1024) {
    setError(resumeErr, resumeFile, "Maximum file size allowed is 1MB!");
    errorsObj.resumeErr = true;
    resumeFile.value = "";
    return;
  }

  //  SUCCESS
  setSuccess(resumeErr, resumeFile);
  errorsObj.resumeErr = false;
}

const aboutUser = document.getElementById("aboutUser");

aboutUser.addEventListener("blur", aboutUserValidation);

function aboutUserValidation() {
  let textEntered = aboutUser.value;
  let aboutErr = document.getElementById("aboutUserErr");

  if (textEntered.length < 20) {
    setError(aboutErr, aboutUser, "Describe yourself in atleast 20 characters");
    errorsObj.aboutErr = true;
  } else if (textEntered.length <= 200) {
    setSuccess(aboutErr, aboutUser);
    errorsObj.aboutErr = false;
  } else {
    setError(
      aboutErr,
      aboutUser,
      "Describe yourself in less than 200 characters",
    );
  }
}

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

password.addEventListener("input", passwordValidation);

function passwordValidation() {
  let passwordEntered = password.value;
  const passwordErrEle = document.getElementById("passwordErr");
  let regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,18}$/;

  if (regex.test(passwordEntered)) {
    setSuccess(passwordErrEle, password);
    errorsObj.pwErr = false;
  } else {
    setError(
      passwordErrEle,
      password,
      "Password must contain one capital letter, one digit and one special character and minimum length of 8",
    );
    errorsObj.pwErr = true;
  }
}

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

confirmPW.addEventListener("input", confirmPWValidation);

function confirmPWValidation() {
  let confirmPwVal = confirmPW.value;
  let passwordEntered = password.value;
  let confirmPWErr = document.getElementById("confirmPWErr");

  if (
    confirmPwVal === "" ||
    confirmPwVal === undefined ||
    confirmPwVal === null
  ) {
    setError(confirmPWErr, confirmPW, "This field is required!");
    errorsObj.confirmPwErr = true;
  } else if (confirmPwVal === passwordEntered) {
    setSuccess(confirmPWErr, confirmPW);
    errorsObj.confirmPwErr = false;
  } else {
    setError(confirmPWErr, confirmPW, "Both passwords must match!!!");
    errorsObj.confirmPwErr = true;
  }
}

const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", (e) => {
  let errorLength = Object.keys(errorsObj).length;
  console.log(errorLength);
  let counter = 0;

  e.preventDefault();

  fullNameValidator();
  emailInputValidator();
  genderValidation();
  dateInputValidation();
  jobRoleDropdownValidation();

  skillInputCheckboxes.forEach((checkBox) => checkboxValidation(checkBox));
  resumeUploadValidation();
  aboutUserValidation();
  passwordValidation();
  confirmPWValidation();

  for (let k in errorsObj) {
    if (errorsObj[k] === false) {
      counter += 1;
      console.log(k, errorsObj[k]);
    }
  }

  console.log(counter);

  if (counter === errorLength) {
    document.body.innerHTML = `<h1 style="text-align: center; top; 10%; color: green">Form submitted successfully</h1>`;
  }
});
