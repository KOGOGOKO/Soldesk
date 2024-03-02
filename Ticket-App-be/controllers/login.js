const AWS = require('aws-sdk');

require('dotenv').config(); // .env 파일에서 환경 변수 로드

// AWS 설정
const cognito = new AWS.CognitoIdentityServiceProvider();

// 로그인 함수
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // 코그니토를 통한 로그인
  const loginParams = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password
    }
  };

  try {
    // 코그니토로 인증 시도
    const data = await cognito.initiateAuth(loginParams).promise();
    const accessToken = data.AuthenticationResult.AccessToken;

    // 로그인 성공 시 액세스 토큰을 클라이언트에게 응답으로 전송
    res.status(200).json({ accessToken });
  } catch (error) {
    // 로그인 실패 시 에러 메시지를 클라이언트에게 응답으로 전송
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};
