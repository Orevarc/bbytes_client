import React from 'react';
import FontAwesome from 'react-fontawesome';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/shoppingList';

class RefreshRecipesButton extends React.Component {

  static propTypes = {
    recipeUrls: React.PropTypes.any.isRequired,
    actions: React.PropTypes.shape({
      slFetchIngredients: React.PropTypes.func.isRequired
    })
  };

  fetchIngredients = (e) => {
    e.preventDefault();
    const urls = this.props.recipeUrls;
    this.props.actions.slFetchIngredients(urls);
  };

  render() {
    return (
      <div className="refresh-button">
        <div onClick={this.fetchIngredients}>
          <figure className="image is-64x64">
            <img src="images/refresh.svg" alt="Image"/>
          </figure>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RefreshRecipesButton);
export { RefreshRecipesButton as RefreshRecipesButtonNotConnected };