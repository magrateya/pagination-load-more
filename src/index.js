import './css/styles.css';
import articlesTpl from './templates/articles.hbs';
import NewsApiService from './js/news-service';
// import LoadMoreBtn from './js/load-more';
// import './js/scroll';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  sentinel: document.querySelector('#sentinel'),
};

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
// loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return;
  }

  //   loadMoreBtn.show();
  newsApiService.restPage();
  clearArticlesContainer();

  fetchArticles();
}

function fetchArticles() {
  //   loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    // loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && newsApiService.query !== '') {
      fetchArticles();
    }
  });
};

const options = {
  rootMargin: '200px',
};

const observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.sentinel);
