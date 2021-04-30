const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmpassword');
const form = document.getElementById('form');

// All Functions

// Function To Show Error
const showError = (input, message) => {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group error';
  const small = formGroup.querySelector('small');
  small.innerText = message;
};
//Function to Show Success
const showSuccess = (input) => {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group success';
};
//Function to Check email
const checkEmail = (input) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Please Provide a Valid Email');
  }
};
// Function to check if required fields have data
const checkRequired = (inputArray) => {
  inputArray.forEach((input) => {
    if (input.value == '') {
      console.log(input.id);
      showError(input, `${getFieldId} is required`);
    } else {
      showSuccess(input);
    }
  });
};
// Function to check length of input field
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${getFieldId} needs to at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldId} needs to be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
};
// Function to check if password and confirm password match
const checkPasswordMatch = (password, confirmPassword) => {
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "Passwords don't match");
  }
};

// Function to get the id of the input field with proper case
const getFieldId = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};
// This is an event listener for the form on submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([firstName, lastName, email, password, confirmPassword]);
  checkEmail(email);
  checkLength(password, 8, 16);
  checkPasswordMatch(password, confirmPassword);
});
