import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/shoppingList';

import RecipeInfo from './recipeInfo';

class RecipeInfoContainer extends React.Component {

  static propTypes = {
    recipes: React.PropTypes.any.isRequired,
    actions: React.PropTypes.shape({
      slChangeRecipesAmount: React.PropTypes.func.isRequired
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      recipeMultipliers: this.props.recipes.map(recipe => ({
                            url: recipe.url,
                            multiplier: recipe.multiplier
                          }))
    }
  }

  handleRecipeMultiplierChange = (url, multiplier) => {
    let newState = this.state.recipeMultipliers.map(recipe => recipe.url === url ? 
                                                                {...recipe, multiplier: multiplier } : 
                                                                recipe )
    this.setState({
      recipeMultipliers: newState
    });
  };

  changeRecipesAmount = (e) => {
    e.preventDefault();
    this.props.actions.slChangeRecipesAmount(this.state.recipeMultipliers);
  };

  render() {
    let recipes = this.props.recipes;
    let multiplierHandler = this.handleRecipeMultiplierChange;
    return (
      <div>
        <div className="title">
          <h3 className="text-left">Recipes</h3>
          <button onClick={this.changeRecipesAmount}
                  className="btn-lg action-button animate green">
            Apply
          </button>
        </div>
        <div className="recipe-container">
          {recipes.map(function(recipe) {
            return <RecipeInfo handleMultiplierChange={multiplierHandler} 
                               key={recipe.title} 
                               recipe={recipe} />
          })}
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

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
          slChangeRecipesAmount: actionCreators.slChangeRecipesAmount
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInfoContainer);
export { RecipeInfoContainer as RecipeInfoContainerNotConnected };