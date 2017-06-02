import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

import FontAwesome from 'react-fontawesome';

import IngredientMapping from './ingredientMapping';

class ForReviewItem extends React.Component {

  static propTypes = {
    item: React.PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
        addingBaseIngredient: false,
        addingIngredientMapping: false
    };
  }

  fetchIngredients = (e) => {
    e.preventDefault();
    const value = this.recipeInputForm.getValue();
    if (value) {
        this.props.actions.slFetchIngredients(value.recipeUrls);
    }
  };

  onAddBaseIngredientClick = (e) => {
    this.setState({addingBaseIngredient: !this.state.addingBaseIngredient });
  };

  onAddIngredientMappingClick = (e) => {
    this.setState({addingIngredientMapping: !this.state.addingIngredientMapping });
  };

  renderIngredientMapping() {
    return (
      <IngredientMapping item={item}/>
    );
  };

  render() {
    let item = this.props.item;
    let ingMapping = null;
    if (this.state.addingIngredientMapping) {
      ingMapping = <IngredientMapping item={item}/>;
    }
    const transitionStyle = {
      'max-height': this.state.addingIngredientMapping ? '150px' : '0px'
    };
    return (
      <div className="for-review">
        <div onClick={this.onAddIngredientMappingClick}>
          {item.name}
        </div>
        <CSSTransitionGroup transitionEnterTimeout={1000}
                            transitionLeaveTimeout={1000}
                            transitionName="menu">
          { ingMapping }
        </CSSTransitionGroup>      
      </div>
    )
  }
}

export default ForReviewItem;