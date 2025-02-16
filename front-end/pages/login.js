import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login({ setAuthToken, setRole }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      console.log('data', data);
      if (res.ok) {
        setAuthToken(data.token);
        localStorage.setItem('token', data.token);
        setRole(data.role);
        router.push('/dashboard/admin'); // or decide where to route based on role
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error during login');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username:
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
