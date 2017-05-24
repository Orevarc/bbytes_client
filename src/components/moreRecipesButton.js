import React from 'react';
import FontAwesome from 'react-fontawesome';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/shoppingList';

class MoreRecipesButton extends React.Component {

  static propTypes = {
    inputtingRecipes: React.PropTypes.bool.isRequired,
    actions: React.PropTypes.shape({
      slAddMoreRecipes: React.PropTypes.func.isRequired
    })
  };

  addMoreRecipes = (e) => {
    e.preventDefault();
    this.props.actions.slAddMoreRecipes();

  }

  render() {
    return (
      <div className="refresh-button">
        <button onClick={this.addMoreRecipes}
                className="btn-lg action-button animate blue">
          <FontAwesome name='plus' /> Add More
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        inputtingRecipes: state.shoppingList.inputtingRecipes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreRecipesButton);
export { MoreRecipesButton as MoreRecipesButtonNotConnected };