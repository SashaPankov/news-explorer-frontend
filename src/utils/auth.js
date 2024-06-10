import { sendRequest, reqHeaders } from './api.js';

const signup = (userCredentials) => {
  console.log(userCredentials);
  console.log(JSON.stringify(userCredentials));
  return sendRequest('/signup', {
    method: 'POST',
    body: JSON.stringify(userCredentials),
    headers: reqHeaders,
  });
};

const signin = (userLoginData) => {
  return sendRequest('/signin', {
    method: 'POST',
    body: JSON.stringify(userLoginData),
    headers: reqHeaders,
  });
};

const getContent = (token) => {
  return sendRequest('/users/me', {
    method: 'GET',
    headers: { ...reqHeaders, authorization: `Bearer ${token}` },
  });
};

export { signin, signup, getContent };
