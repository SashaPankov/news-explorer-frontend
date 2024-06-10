const apiKey = '17e2d2d7e28e44948305073b5755342c';
const newsApiURL = 'https://newsapi.org/v2';
const backEndUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.ne7206.twilightparadox.com'
    : 'http://localhost:3001';
const reqHeaders = { 'Content-Type': 'application/json' };

const sendRequest = async (root, options, baseUrl = backEndUrl) => {
  return fetch(`${baseUrl}${root}`, options).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  });
};

const getNewsByKeyword = (keyword) => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const today = new Date(Date.now());
  return sendRequest(
    '',
    {},
    `${newsApiURL}/everything?q=${keyword}&apiKey=${apiKey}&from=${sevenDaysAgo.toISOString()}&to=${today.toISOString()}&pageSize=100`
  );
};

const getSavedArticles = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    return sendRequest('/articles', {
      method: 'GET',
      headers: { ...reqHeaders, authorization: `Bearer ${token}` },
    });
  }
};

const saveArticle = (article, keyword) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    return sendRequest('/articles', {
      method: 'POST',
      body: JSON.stringify({
        keyword: keyword,
        title: article.title,
        text: article.description,
        date: article.publishedAt,
        source: article.source.name,
        link: article.url,
        image: article.urlToImage,
      }),
      headers: { ...reqHeaders, authorization: `Bearer ${token}` },
    });
  }
};

const deleteArticle = (article) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    return sendRequest(`/articles/${article._id}`, {
      method: 'DELETE',
      headers: { ...reqHeaders, authorization: `Bearer ${token}` },
    });
  }
};

export {
  reqHeaders,
  sendRequest,
  getNewsByKeyword,
  getSavedArticles,
  saveArticle,
  deleteArticle,
};
