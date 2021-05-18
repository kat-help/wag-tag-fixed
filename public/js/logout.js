
const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    });
    console.log("++++++++++++++++")
    if (response.ok) {
      document.location.replace('/');
    } else {
        console.log(response)
      alert(response.statusText);
    }
  };
  
  document.getElementById('logoutBtn').addEventListener('click', logout);
  
