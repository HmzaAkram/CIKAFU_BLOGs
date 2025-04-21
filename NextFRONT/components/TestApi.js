import { useEffect } from 'react';

const TestApi = () => {
  useEffect(() => {
    fetch('http://localhost:8000/api/ping')
      .then(res => res.json())
      .then(data => console.log('Response from Laravel:', data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div>
      <h1>Testing API</h1>
    </div>
  );
};

export default TestApi;
