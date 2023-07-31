import axios from 'axios';


const calendarApi = axios.create({
      baseURL:"http://localhost:3000",
      withCredentials: true
});

// //todo: configurar interceptores
calendarApi.interceptors.request.use(config=>{
      config.headers={
            ...config.headers,
            'x-token':localStorage.getItem('token')
      };
      return config;
});

export default calendarApi;