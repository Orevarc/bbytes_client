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
        <div onClick={this.addMoreRecipes}>
          <figure className="image is-64x64">
            <img src="images/add.svg" alt="Image"/>
          </figure>
        </div>
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