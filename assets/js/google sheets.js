const scriptURL = 'https://script.google.com/macros/s/AKfycbyxk4s73UM4WQdqjm9kXZTZOwP-biYJdeMLJHEriQ46kran4W01afNzVxHN_iByrmEJ/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})