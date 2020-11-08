export default class NewsApiService {
  constructor() {
    this.searchInput = '';
    this.page = 1;
  }

  fetchArticles() {
    const BASE_URL = 'https://newsapi.org/v2/';
    const options = {
      headers: {
        Authorization: '2f479ca51904464eaecc59acc7478e76',
      },
    };

    const url = `${BASE_URL}everything?qInTitle=${this.searchInput}&language=en&pageSize=5&page=${this.page}&apiKey=${options.headers.Authorization}`;

    return fetch(url, options)
      .then(responce => responce.json())
      .then(({ articles }) => {
        this.page += 1;
        return articles;
      });
  }

  restPage() {
    this.page = 1;
  }

  get query() {
    return this.searchInput;
  }

  set query(newQuery) {
    this.searchInput = newQuery;
  }
}
