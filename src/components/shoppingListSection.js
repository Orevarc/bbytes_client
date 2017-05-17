import React from 'react';

import ShoppingListItem from './shoppingListItem';

class ShoppingListSection extends React.Component {

  static propTypes = {
    category: React.PropTypes.string,
    ingredients: React.PropTypes.shape().isRequired,
  };

  render() {
    let ingredients = this.props.ingredients;
    return (
      <div>
        <div className="notepad-paper">
          <div className="notepad-category">
            {this.props.category}
          </div>
          <div className="notepad-lines"></div>
          <ul className="notepad-list">
          {Object.keys(ingredients).map(function(key) {
            return <ShoppingListItem key={ingredients[key]['name']} 
                                     name={ingredients[key]['name']} 
                                     item={ingredients[key]} />
          })}
          </ul>
        </div>
      </div>
    )
  }
}

export default ShoppingListSection;