
const signupFormHandler = async (event) => {
    event.preventDefault();

    console.log(`>>>>>>> this was clicked`)
    const first_name = document.getElementById('new-first_name').value.trim();
    const last_name = document.getElementById('new-last_name').value.trim();
    const email = document.getElementById('new-email').value.trim();
    const password = document.getElementById('new-password').value.trim();
    const user_name = document.getElementById('new-user_name').value.trim();

    if (first_name && last_name && email && password && user_name) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ first_name, last_name, email, password, user_name }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            console.log(first_name, last_name, email, password, user_name)
        // If successful, redirect the browser to the homepage/dashboard
            document.location.replace('/profile');
        } else {
        alert(response.statusText);
        }
    }
};

document.querySelector('.signup-form').addEventListener('click', signupFormHandler);
