'use client'; // agar Next.js 13+ use kar raha hai

import { useEffect } from 'react';

export default function TestApi() {
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/ping') // <-- Laravel API
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error('Error:', err));
  }, []);

  return <div>Check console for API response</div>;
}
