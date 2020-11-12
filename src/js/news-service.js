export default class NewsApiService {
  constructor() {
    this.searchInput = '';
    this.page = 1;
  }

  fetchArticles() {
    const searchParams = new URLSearchParams({
      q: this.searchInput,
      language: 'en',
      pageSize: 10,
      page: this.page,
      apiKey: '2f479ca51904464eaecc59acc7478e76',
    });
    const BASE_URL = 'https://newsapi.org/v2/';
    const url = `${BASE_URL}everything?${searchParams}`;

    // const url = `${BASE_URL}everything?qInTitle=${this.searchInput}&language=en&pageSize=10&page=${this.page}&apiKey=2f479ca51904464eaecc59acc7478e76`;

    return fetch(url)
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
