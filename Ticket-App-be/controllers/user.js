const AWS = require('aws-sdk');
const { Pool } = require('pg');

require('dotenv').config(); // .env 파일에서 환경 변수 로드

// AWS 및 PostgreSQL 설정
const cognito = new AWS.CognitoIdentityServiceProvider();
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// 회원가입 함수
exports.signup = async (req, res) => {
  const { username, password, email } = req.body;

  // 코그니토를 통한 회원가입
  const signUpParams = {
    ClientId: process.env.CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email }
    ]
  };

  try {
    // 코그니토 회원가입
    await cognito.signUp(signUpParams).promise();

    // 코그니토 회원가입 성공 시에만 PostgreSQL에 사용자 정보 저장
    const queryText = 'INSERT INTO users (username, email) VALUES ($1, $2)';
    await pool.query(queryText, [username, email]);

    res.status(200).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Error signing up user' });
  }
};
