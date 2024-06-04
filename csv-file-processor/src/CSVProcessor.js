// src/CSVProcessor.js

import React, { useState } from 'react';
import Papa from 'papaparse';

const CSVProcessor = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setData(result.data);
          setError('');
        },
        error: (err) => {
          setError('Failed to parse CSV file');
          console.error(err);
        },
      });
    }
  };

  return (
    <div>
      <h2>CSV File Processor</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            {data.length > 0 && Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVProcessor;
