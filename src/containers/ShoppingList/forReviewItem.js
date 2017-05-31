import React from 'react';

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

  render() {
    let item = this.props.item;
    return (
      <div className="for-review">
        <div onClick={this.onAddIngredientMappingClick}>
          {item.name}
        </div>
        { this.state.addingIngredientMapping ? 
          <IngredientMapping item={item}/>
          : null
        }
      </div>
    )
  }
}

export default ForReviewItem;