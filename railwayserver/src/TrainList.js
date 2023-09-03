import React, { useEffect, useState } from 'react';

function App() {
  const [trainData, setTrainData] = useState({});
  const [error, setError] = useState(null);
  const authorizationToken = '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTM3MjIwNTMsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiOGZlZDE4NmYtMTIwNS00ODNjLTg2YzUtNDZjNzI1NjdkMGU2Iiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjcwMzAifQ.XyhJ1ycN06s-O1u0uCAyOQe7vFQxvCGK6ALMJQKNxuk';

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = 'http://20.244.56.144:80/train/trains';

    // Define the headers with the Authorization Token
    const headers = {
      Authorization: `Bearer ${authorizationToken}`,
    };

    // Make the GET request using the fetch API
    fetch(apiUrl, { method: 'GET', headers: headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const firstTrain = data[0];
          const formattedData = {
            trainName: firstTrain.name,
            trainNumber: firstTrain.number,
            departureTime: {
              Hours: 21,
              Minutes: 35,
              Seconds: 0,
            },
            seatsAvailable: {
              sleeper: 3,
              AC: 1,
            },
            price: {
              sleeper: 2,
              AC: 5,
            },
            delayedBy: 15,
          };
          setTrainData(formattedData);
        } else {
          throw new Error('No valid train data found in the response.');
        }
      })
      .catch((error) => {
        setError(error);
        console.error('Error fetching data:', error);
      });
  }, []);

  if (error) {
    return (
      <div className="App">
        <h1>Error</h1>
        <p>There was an error fetching data: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Train Details</h1>
      <pre>{JSON.stringify(trainData, null, 2)}</pre>
    </div>
  );
}

export default App;
