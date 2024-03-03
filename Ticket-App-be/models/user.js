const db = require('../db')
const AWS = require('aws-sdk');
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();



// Create user to db
// const createUser = async (params) => {
//   const { firstname, lastname, phone, email, password } = params

//   return await db`
//   INSERT INTO user_accounts (firstname, lastname, phone, email, password)
//   VALUES (${firstname}, ${lastname}, ${phone}, ${email}, ${password})
//   `
// }
const createUser = async (params) => {
  const { firstname, lastname, phone, email, password } = params;

  // Cognito에 사용자 추가
  const signUpParams = {
    ClientId: process.env.CLIENT_ID, // 클라이언트 ID
    Username: email, // 사용자 이름 (일반적으로 이메일 주소)
    Password: password, // 비밀번호
    UserAttributes: [
      { Name: 'given_name', Value: firstname }, // 이름
      { Name: 'family_name', Value: lastname }, // 성
      { Name: 'email', Value: email } // 이메일
    ]
  };

  try {
    const data = await cognitoidentityserviceprovider.signUp(signUpParams).promise();
    console.log('User successfully signed up:', data);
    
    // DB에 사용자 정보 저장
    const dbResult = await db`
      INSERT INTO user_accounts (firstname, lastname, phone, email, password)
      VALUES (${firstname}, ${lastname}, ${phone}, ${email}, ${password})
    `;
    
    return dbResult;
  } catch (error) {
    console.error('Error signing up user:', error);
    throw error;
  }
};
const createUserWithRole = async (params) => {
  const { firstname, lastname, phone, email, password, role } = params

  return await db`
  INSERT INTO user_accounts (firstname, lastname, phone, email, password, role)
  VALUES (${firstname}, ${lastname}, ${phone}, ${email}, ${password}, ${role})
  `
}

// Get user from db
const getAllUsers = async () => {
  return await db`SELECT * FROM user_accounts`
}

const getUserEmail = async (params) => {
  const { email } = params

  return await db`SELECT email FROM user_accounts WHERE email = ${email}`
}

const getUserByEmail = async (params) => {
  const { email } = params

  return await db`SELECT * FROM user_accounts WHERE email = ${email}`
}

const getUserPhone = async (params) => {
  const { phone } = params

  return await db`SELECT phone FROM user_accounts WHERE phone = ${phone}`
}

const getUserById = async (params) => {
  const { id } = params

  return await db`SELECT * FROM user_accounts WHERE id = ${id}`
}

// Update user to db
const editUserPhoto = async (params) => {
  const { id, firstname, lastname, phone, email, password, photo, getUser } = params

  return await db`
  UPDATE user_accounts SET
  "firstname" = ${firstname || getUser[0]?.firstname},
  "lastname" = ${lastname || getUser[0]?.lastname},
  "phone" = ${phone || getUser[0]?.phone},
  "email" = ${email || getUser[0]?.email},
  "password" = ${password || getUser[0]?.password},
  "photo" = ${photo || getUser[0]?.photo}
  WHERE "id" = ${id}
  `
}

const editUser = async (params) => {
  const { id, firstname, lastname, phone, email, password, getUser } = params

  return await db`
  UPDATE user_accounts SET
  "firstname" = ${firstname || getUser[0]?.firstname},
  "lastname" = ${lastname || getUser[0]?.lastname},
  "phone" = ${phone || getUser[0]?.phone},
  "email" = ${email || getUser[0]?.email},
  "password" = ${password || getUser[0]?.password}
  WHERE "id" = ${id}
  `
}

// Delete user from db
const deleteUser = async (params) => {
  const { id } = params

  return await db`DELETE FROM "public"."user_accounts" WHERE id = ${id}`
}

module.exports = {
  createUser,
  createUserWithRole,
  getAllUsers,
  getUserEmail,
  getUserByEmail,
  getUserPhone,
  getUserById,
  editUserPhoto,
  editUser,
  deleteUser
}