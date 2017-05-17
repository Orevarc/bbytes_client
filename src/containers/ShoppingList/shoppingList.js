import React from 'react';

import ShoppingListSection from '../../components/shoppingListSection';

class ShoppingList extends React.Component {

  sortIngredients = (ingredients) => {
    var sortedIngredients = {}
    const categories = [...new Set(_.values(ingredients).map(ingredient => ingredient.category))];
    for (var i = 0; i < categories.length; i++) {
      sortedIngredients[categories[i]] = [];
    }
    Object.keys(ingredients).map(function(key) {
      sortedIngredients[ingredients[key]['category']].push(ingredients[key]);
    })
    return sortedIngredients;
  };

  static propTypes = {
    allIngredients: React.PropTypes.shape().isRequired,
  };

  render() {
    let sortedIngredients = this.sortIngredients(this.props.allIngredients);
    return (
      <div>
        <h3 className="text-center">Shopping List</h3>
        <div className="notepad-paper">
          <div className="notepad-lines"></div>
          <ul className="notepad-list">
          {Object.keys(sortedIngredients).map(function(key) {
            return <ShoppingListSection category={key} ingredients={sortedIngredients[key]} />
          })}
          </ul>
        </div>
      </div>
    )
  }
}

export default ShoppingList;