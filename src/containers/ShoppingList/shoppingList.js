import React from 'react';

import ShoppingListItem from './shoppingListItem';
import ForReviewItem from './forReviewItem';

class ShoppingList extends React.Component {

  static propTypes = {
    ingredients: React.PropTypes.shape().isRequired,
    forReview: React.PropTypes.array.isRequired
  };

  render() {
    let ingredients = this.props.ingredients;
    let forReview = this.props.forReview;
    return (
      <div>
        <h3 className="text-left">Items For Review:</h3>
        {forReview.map(function(item) {
          return <ForReviewItem key={item.name} item={item} />
        })}
        <h3 className="text-left">Shopping List</h3>
        {Object.keys(ingredients).map(function(key) {
          return <ShoppingListItem key={key} name={key} item={ingredients[key]} />
        })}
      </div>
    )
  }
}

export default ShoppingList;