const { AuthenticationDetails, CognitoUser, CognitoUserPool } = require('amazon-cognito-identity-js');

// Amazon Cognito 사용자 풀 구성
const poolData = {
  UserPoolId: process.env.USER_POOL_ID, // 사용자 풀 ID
  ClientId: process.env.CLIENT_ID // 클라이언트 ID
};
const userPool = new CognitoUserPool(poolData);


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    const userData = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        const token = session.getIdToken().getJwtToken();
        const { sub: id, email, name, role } = session.getIdToken().payload;

        res.status(200).json({
          status: true,
          message: 'Login successful',
          data: {
            token,
            profile: { id, email, name, role }
          }
        });
      },
      onFailure: (err) => {
        res.status(401).json({
          status: false,
          message: 'Login failed, incorrect username or password',
          data: []
        });
      },
      newPasswordRequired: () => {
        res.status(401).json({
          status: false,
          message: 'Login failed, new password required',
          data: []
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || 'Internal server error',
      data: []
    });
  }
};

module.exports = {
  login
};
