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
        <button onClick={this.fetchIngredients}
                className="btn-lg action-button animate green">
          <FontAwesome name='refresh' /> Refresh
        </button>
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