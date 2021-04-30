const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmpassword');
const form = document.getElementById('form');
console.log(firstName);

// Function to update class and message for errors
const errorMessage = (input, message) => {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group error';
  const small = formGroup.querySelector('small');
  small.innerText = message;
};
// Function To Show Success
const showSuccess = (input) => {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group success';
};
// Function to check if email is valid
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Validating First Name
  if (firstName.value === '') {
    errorMessage(firstName, 'This Field is Required');
  } else {
    showSuccess(firstName);
  }
  // Validating Last Name
  if (lastName.value === '') {
    errorMessage(lastName, 'This Field is Required');
  } else {
    showSuccess(lastName);
  }
  // Validating  Email
  if (email.value === '') {
    errorMessage(email, 'This Field is Required');
  } else {
    showSuccess(email);
  }
  // Validating Password
  if (password.value === '') {
    errorMessage(password, 'This Field is Required');
  } else if (password.value.length <= 8) {
    errorMessage(password, 'Password Must be Greater than 8');
  } else {
    showSuccess(password);
  }
  // Validating Confirm Password
  if (confirmPassword.value === '') {
    errorMessage(confirmPassword, 'This Field is Required');
  } else if (confirmPassword.value !== password.value) {
    errorMessage(
      confirmPassword,
      'Your password and confirmation password do not match. '
    );
  } else {
    showSuccess(confirmPassword);
  }
});
