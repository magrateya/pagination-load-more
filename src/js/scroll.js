import '../css/styles.css';
import scrollTpl from '../templates/scroll-tpl.hbs';
import NewsApiService from './news-service';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.container'),
};

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return;
  }

  // loadMoreBtn.show();
  newsApiService.restPage();
  clearArticlesContainer();

  fetchArticles();
}

function fetchArticles() {
  // loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', scrollTpl(articles));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}

const infScroll = new InfiniteScroll(refs.articlesContainer, {
  // options
  path: '.pagination__next',
  append: '.post',
  history: false,
});
infScroll.loadNextPage();
