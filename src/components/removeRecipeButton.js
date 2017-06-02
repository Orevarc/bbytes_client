import React from 'react';
import FontAwesome from 'react-fontawesome';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/shoppingList';

class RemoveRecipeButton extends React.Component {

  static propTypes = {
    recipe: React.PropTypes.any.isRequired,
    actions: React.PropTypes.shape({
      slRemoveRecipe: React.PropTypes.func.isRequired
    })
  };

  removeRecipe = (e) => {
    e.preventDefault();
    const urls = this.props.recipeUrls;
    this.props.actions.slFetchIngredients(urls);
  };

  render() {
    return (
      <div className="remove-button">
        <FontAwesome name='times' />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        recipeUrls: state.shoppingList.recipeUrls,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveRecipeButton);
export { RemoveRecipeButton as RemoveRecipeButtonNotConnected };