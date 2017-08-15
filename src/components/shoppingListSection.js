import React from 'react';
import FontAwesome from 'react-fontawesome';
import ShoppingListItem from './shoppingListItem';

import { CSSTransitionGroup } from 'react-transition-group'
import { INGREDIENT_CATEGORIES } from '../constants';

class ShoppingListSection extends React.Component {

  static propTypes = {
    category: React.PropTypes.string,
    ingredients: React.PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      categoryExpanded: true
    };
  };

  toggleCategory = () => {
    this.setState({
      categoryExpanded: !this.state.categoryExpanded
    });
  };

  renderCategoryIcon = () => {
    const imgSrc = INGREDIENT_CATEGORIES[this.props.category.toUpperCase()];
    return <img src={imgSrc} alt="Image"/>
  };

  renderShowHideIcon = () => {
    if (this.state.categoryExpanded) {
      return <FontAwesome name="minus" />;
    } else {
      return <FontAwesome name="plus" />; 
    }
  };

  render() {
    let ingredients = this.props.ingredients;
    console.log(ingredients)
    return (
      <div>
        <div className="sl-category-box">
          <div className="sl-category-image">
            <figure className="image is-32x32">
              {this.renderCategoryIcon()}
            </figure>
          </div>
          <div className="sl-category-title">
            {this.props.category}
          </div>
          <div className="sl-category-toggle" onClick={this.toggleCategory}>
            {this.renderShowHideIcon()}
          </div>
        </div>
        <CSSTransitionGroup transitionEnterTimeout={500}
                          transitionLeaveTimeout={500}
                          transitionName="ingredient">
          {this.state.categoryExpanded ? 
            Object.keys(ingredients).sort().map(function(key) {
              return <ShoppingListItem key={ingredients[key]['name']} 
                                       name={ingredients[key]['name']} 
                                       item={ingredients[key]} />
            })
            : null
          }
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default ShoppingListSection;