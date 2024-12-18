import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzZiYTc0ZGY0MDk2ODBhYzE3OGQ4YWJhMzUxM2I4YiIsIm5iZiI6MTczMTM1MjYyNi4xMjMwMDAxLCJzdWIiOiI2NzMyNTgzMjY4OTVmMzgyMmU0NjBkYmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ODNH2OZ7qbcThtMJq2CRWWRPjBmL3aQIcvrECLIGNYc`,
  },
});

export default api;