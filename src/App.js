import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setusers] = useState();
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setusers(data))
  }, [])
  const hendaluser = (event) => {
    event.preventDefault();
    const password = event.target.password.value;
    const email = event.target.email.value;
    const user = { email, password };

    // post data to server
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newUser = [...users, data];
        setusers(newUser);
      })
  }

  return (
    <div className="App">
      <form onSubmit={hendaluser}>
        <input type="email" name="email" required />
        <input type="password" name="password" required />
        <input type="submit" value="add user" />
      </form>
      <h1>user:{users?.length}</h1>
      <ul>
        {users?.map(u => (<li key={u.id}>id:{u.id} email:{u.email}</li>))}
      </ul>
    </div>
  );
}

export default App;
