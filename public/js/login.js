const loginFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const user_name = document.getElementById('user_name').value.trim();
  const password = document.getElementById('password').value.trim();
  if (user_name && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ user_name, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        console.log(user_name, password)
      // If successful, redirect the browser to the homepage/dashboard
        document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};


document.getElementById('log-in-btn').addEventListener('click', loginFormHandler);