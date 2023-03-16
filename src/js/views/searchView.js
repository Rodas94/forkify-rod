class searchView {
  _parentEL = document.querySelector('.search');
  getQuery() {
    const query = this._parentEL.querySelector('.search__field').value;
    this._clearQuery;
    return query;
  }
  _clearQuery() {
    this._parentEL.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this._parentEL.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
