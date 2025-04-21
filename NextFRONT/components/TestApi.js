"use client";

import { useEffect } from 'react';

const TestApi = () => {
  useEffect(() => {
    fetch('http://localhost:8000/api/ping')
      .then(res => res.json())
      .then(data => {
        console.log("Ping Response:", data);
      })
      .catch(err => {
        console.error("API Error:", err);
      });
  }, []);

  return <div>Check console for API response</div>;
};

export default TestApi;
