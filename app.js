const express = require('express');
const app = express();
const { sequelize } = require('./models');
const postsRouter = require('./routes/posts');

// Sequelize 모델을 로드합니다.
require('./models');

// Sequelize 연결을 설정합니다.
sequelize
  .sync()
  .then(() => {
    console.log('데이터베이스 연결 성공!');
  })
  .catch(err => {
    console.error('데이터베이스 연결 실패:', err);
  });

// JSON 파싱을 위한 미들웨어 설정
app.use(express.json());

// 라우팅 설정
app.use('/posts', postsRouter);

// 서버를 시작합니다.
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});