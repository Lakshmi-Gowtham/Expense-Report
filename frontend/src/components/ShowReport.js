// src/components/ShowReport.js
import React, { useEffect, useState } from 'react';

function ShowReport() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:4000/reports/expenses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token to headers
          },
        });

        const data = await response.json();
        console.log('the data is :',data);

        if (response.ok) {
          setReports(data);
        } else {
          console.error('Failed to fetch reports:', data.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>Reports</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
            <th>Date</th>
            <th>User ID</th>
            <th>User Email</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.name}</td>
              <td>{report.quantity}</td>
              <td>{report.price}</td>
              <td>{report.totalPrice}</td>
              <td>{report.date}</td>
              <td>{report.userId}</td>
              <td>{report.userEmail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowReport;
