import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [authToken, setAuthToken] = useState(null);
  const [isEffectRun, setIsEffectRun] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
  const token = window.localStorage.getItem("token")
    if (token) {
      setAuthToken(token);
    }
    setIsEffectRun(true);
  }, []);
  return (
    isEffectRun ? <Component
      {...pageProps}
      authToken={authToken}
      setAuthToken={setAuthToken}
      role={role}
      setRole={setRole}
    /> : null
  );
}

export default MyApp;
