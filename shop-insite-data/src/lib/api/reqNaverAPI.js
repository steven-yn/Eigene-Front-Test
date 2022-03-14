import axios from 'axios';

const req = {
  post(url, payload) {
    console.log(payload, 'Request Payload');
    return axios.post(url, {
      header: {
        client_id: `${process.env.REACT_APP_ID}`,
        client_secret: `${process.env.REACT_APP_SECRET}`,
      },
      body: payload,
    });
  },
};

export default req;
