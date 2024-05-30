const apiKey = '17e2d2d7e28e44948305073b5755342c';
const newsApiURL = 'https://newsapi.org/v2';
const backEndUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.wtwr7206.twilightparadox.com'
    : 'http://localhost:3001';

const sendRequest = async (root, options, baseUrl = backEndUrl) => {
  return fetch(`${baseUrl}${root}`, options).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  });
};

const getNewsByKeyword = (keyword) => {
  return sendRequest(
    '',
    {},
    `${newsApiURL}/everything?q=${keyword}&apiKey=${apiKey}`
  );
};

export { sendRequest, getNewsByKeyword };
