// Register handler function
const registerHandler = async (event) => {
  event.preventDefault();

  // Connect variable names to HTML elements
  const email = document.querySelector('#email').value.trim();
  const username = document.querySelector('#create-username').value.trim();
  const password = document.querySelector('#create-password').value.trim();

  // Connect success and error messages to HTML elements
  const successMessage = document.querySelector('#register-success');
  const errorMessage = document.querySelector('#register-failed');

  console.log('Email:', email); // Log email value
  console.log('Username:', username); // Log username value
  console.log('Password:', password); // Log password value

  // Fetch API to create a new user
  if (email && username && password) {
    try {
      console.log('Making POST request to /api/users/signup'); // Log before making the request
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Response:', response); // Log the response object

      if (response.ok) {
        // Display success message if user registration succeeds
        successMessage.style.display = 'block';
      } else {
        // Display error message if registration fails
        errorMessage.style.display = 'block';
      }
    } catch (error) {
      // Handle errors if fetch request fails
      console.error('Error:', error);
    }
  } else {
    console.log('Missing email, username, or password'); // Log if any field is missing
  }
};

// Attach register handler function to submit event of the registration form
document
  .querySelector('#create-profile-form')
  .addEventListener('submit', registerHandler);
