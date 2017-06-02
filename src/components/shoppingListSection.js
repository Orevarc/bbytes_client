import React from 'react';

import ShoppingListItem from './shoppingListItem';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ShoppingListSection extends React.Component {

  static propTypes = {
    category: React.PropTypes.string,
    ingredients: React.PropTypes.array.isRequired,
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
          <ReactCSSTransitionGroup transitionName="ingredient-mapping" transitionEnterTimeout={300} transitionLeaveTimeout={300} component="ul" className="notepad-list">
            {Object.keys(ingredients).map(function(key) {
              return <ShoppingListItem key={ingredients[key]['name']} 
                                       name={ingredients[key]['name']} 
                                       item={ingredients[key]} />
            })}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}

export default ShoppingListSection;