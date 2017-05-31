import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/shoppingList';

class RecipeInfo extends React.Component {

  static propTypes = {
    recipe: React.PropTypes.any.isRequired,
    actions: React.PropTypes.shape({
      slChangeRecipeAmount: React.PropTypes.func.isRequired
    })
  };

  changeRecipeAmount = (e) => {
    e.preventDefault();
    let amount = this.refs.recipeAmount.value;
    if (amount) {
      this.props.actions.slChangeRecipeAmount(this.props.recipe.url, amount);
    }
  };

  validateRecipeAmount = (e) => {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };

  render() {
    let recipe = this.props.recipe
    return (
      <div>
        <div>
          {recipe.title}
        </div>
        <form onSubmit={this.changeRecipeAmount}>
          <input ref="recipeAmount" onKeyPress={this.validateRecipeAmount} />
          <button type="submit"
                  className="btn-lg action-button animate green">
            Apply
          </button>
        </form>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
          slChangeRecipeAmount: actionCreators.slChangeRecipeAmount
        }, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(RecipeInfo);
export { RecipeInfo as RecipeInfoNotConnected };