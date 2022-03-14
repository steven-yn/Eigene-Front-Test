require('dotenv').config();
import express from 'express';
import path from 'path';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const postData = async (payload) => {
  try {
    const res = await axios({
      method: 'post',
      url: 'https://openapi.naver.com/v1/datalab/shopping/category/keyword/age',
      headers: {
        'X-Naver-Client-Id': payload.header.client_id,
        'X-Naver-Client-Secret': payload.header.client_secret,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(payload.body),
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.error(err);
  }
};

app.use('/api/naver', async (req, res) => {
  const result = await postData(req.body);
  res.send(result);
});

app.use(express.static(path.join(__dirname, '../../shop-insite-data/build')));

app.get('*', (req, res) => {
  res.sendFile(
    path.join(__dirname + '../../shop-insite-data/build/index.html'),
  );
});

app.listen(PORT, () => {
  console.log('Hello ! My Nickname is yoonOcean -> http://localhost:5000');
});
