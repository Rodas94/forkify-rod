import icons from 'url:../../img/icons.svg';
import View from './View.js';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'Bookmark not yet';
  _message = '';

  addHandelerRender(handler) {
    window.addEventListener('load', handler);
  }

  _genrateMarkup() {
    return this._data.map(book => previewView.render(book, false)).join('');
  }
}

export default new BookmarksView();
