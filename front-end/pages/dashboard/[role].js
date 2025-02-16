import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
export default function Dashboard({ authToken, role }) {
  const router = useRouter();
  const { role: pageRole } = router.query;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token && !authToken) {
      alert('Not logged in');
      router.push('/login');
    } else {
      fetchProfile();
    }
  }, [authToken]);

  const fetchProfile = async () => {
    try {
      const res = await fetch('http://localhost:4000/users/me', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data);
      } else {
        alert('Failed to load profile');
      }
    } catch (err) {
      console.error(err);
      alert('Error loading profile');
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard ({pageRole})</h1>
      <p>Username: {profile.username}</p>
      <p>Role: {profile.role}</p>
      <p>Comission: {profile.commissionBalance}</p>
      {profile.role !== 'MASTER' && (
        <p>Chips Balance: {profile.chipsBalance}</p>
      )}
      {profile.role === 'PLAYER' && (
        <p>
          Go to <Link href='/bet'>Bet Page</Link> to place a bet.
        </p>
      )}
      {profile.role !== 'PLAYER' && (
        <p>
          Go to <Link href='/transactions'>Transactions Page</Link> to transfer
          chips.
        </p>
      )}
      <p>
        Create sub-accounts? <Link href='/register'>Register Page</Link>
      </p>
    </div>
  );
}
