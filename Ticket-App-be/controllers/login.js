require('dotenv').config();

const { Request, Response } = require('express');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const pg = require('pg');

// Amazon Cognito 관련 정보 설정
const poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// PostgreSQL 데이터베이스 관련 정보 설정
const dbConfig = {
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT)
};
const client = new pg.Client(dbConfig);

// PostgreSQL 연결 함수
async function connectToDB() {
    try {
        await client.connect();
        console.log('PostgreSQL 데이터베이스에 연결되었습니다.');
    } catch (error) {
        console.error('PostgreSQL 데이터베이스 연결 오류:', error);
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password
    });

    const userData = {
        Username: username,
        Pool: userPool
    };

    try {
        // PostgreSQL 데이터베이스 연결
        await connectToDB();

        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (session) => {
                console.log('로그인 성공');
                res.json({ message: '로그인 성공', accessToken: session.getAccessToken().getJwtToken() });
            },
            onFailure: (err) => {
                console.error('로그인 실패:', err);
                res.status(401).json({ message: '로그인 실패' });
            }
        });
    } catch (error) {
        console.error('오류 발생:', error);
        res.status(500).json({ message: '서버 오류' });
    }
};
