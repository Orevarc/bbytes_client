import React from 'react';

import { connect } from 'react-redux';

import RecipeInfo from './recipeInfo';

class RecipeInfoContainer extends React.Component {

  static propTypes = {
    recipes: React.PropTypes.any.isRequired
  };

  render() {
    let recipes = this.props.recipes;
    return (
      <div>
        <h3 className="text-center">Recipes:</h3>
        <div className="notepad-paper">
          <div className="notepad-lines"></div>
          <ul className="notepad-list">
          {recipes.map(function(recipe) {
            return <RecipeInfo key={recipe.title} recipe={recipe} />
          })}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        recipes: state.shoppingList.recipes,
    };
};

export default connect(mapStateToProps)(RecipeInfoContainer);
export { RecipeInfoContainer as RecipeInfoContainerNotConnected };