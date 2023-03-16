import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { NODAL_CLSOE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    //garde
    if (!id) return;
    //console.log(id);
    recipeView.reanderSpnner();
    //update result view to mark selected search result
    resultsView.update(model.getSerachResultPage());
    bookmarksView.update(model.state.bookmarks);

    //loading Recepe
    await model.loadRecipe(id);

    //reander recepe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.errorRender();
  }
};

const controlSerachResult = async function () {
  try {
    resultsView.reanderSpnner();

    const query = searchView.getQuery();
    await model.loadSearchResult(query);
    //console.log(model.state.search.result);
    // resultsView.render(model.state.search.result);
    resultsView.render(model.getSerachResultPage(2));
    //render pagenation
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goToPage) {
  //render new result
  resultsView.render(model.getSerachResultPage(goToPage));
  //render new pagenation
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings
  model.updateServings(newServings);

  //update the render
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controladdBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBoolmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render recipe
    recipeView.render(model.state.recipe);
    //success bookmark
    bookmarksView.render(model.state.bookmarks);

    //change url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //clsoe frome window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, NODAL_CLSOE_SEC);
  } catch (err) {
    console.error('***', err);
    addRecipeView.errorRender(err.message);
  }
};

const newFeature = function () {
  console.log('Welcome to the application');
};
const init = function () {
  bookmarksView.addHandelerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controladdBookmark);
  searchView.addHandlerSearch(controlSerachResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature();
};
init();
