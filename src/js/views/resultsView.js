import icons from 'url:../../img/icons.svg';
import View from './View.js';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'not found try agin';
  _message = '';

  _genrateMarkup() {
    return this._data.map(bookr => previewView.render(bookr, false)).join('');
  }
}

export default new ResultsView();
