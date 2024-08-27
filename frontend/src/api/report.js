import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const getReports = async () => {
  const response = await axios.get(`${API_URL}/reports/expenses`);
  return response.data;
};

export const createReport = async (report) => {
  const response = await axios.post(`${API_URL}/reports`, report);
  return response.data;
};

export const getReportsByDate = async (date) => {
  const response = await axios.get(`${API_URL}/reports/${date}`);
  return response.data;
};
