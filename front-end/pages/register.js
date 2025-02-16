import { useState } from 'react';

export default function Register({ authToken, role }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newRole, setNewRole] = useState('PLAYER');

  console.log("authToken", authToken)
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!authToken) {
      alert('You must be logged in as a parent user');
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          username,
          password,
          role: newRole
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert('User created successfully');
      } else {
        alert(data.message || 'Failed to register');
      }
    } catch (err) {
      console.error(err);
      alert('Error during registration');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Create a new sub-account</h1>
      <p>Your role is: {role}</p>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div>
          <label>Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <div>
          <label>Role:
            <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
              <option value="PLAYER">PLAYER</option>
              <option value="OPERATOR">OPERATOR</option>
              <option value="RESELLER">RESELLER</option>
              <option value="UPPER_RESELLER">UPPER_RESELLER</option>
              <option value="MOTHER_COMPANY">MOTHER_COMPANY</option>
            </select>
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
