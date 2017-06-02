import React from 'react';
import FontAwesome from 'react-fontawesome';

class RecipeInfo extends React.Component {

  static propTypes = {
    handleMultiplierChange: React.PropTypes.func.isRequired,
    recipe: React.PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      multiplier: this.props.recipe.multiplier
    };
  }

  validateRecipeAmount = (e) => {
    const re = /^[0-9]+([,.][0-9]+)?$/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };

  changeMultiplier = (multiplier) => {
    this.setState({
      multiplier: multiplier
    });
    this.props.handleMultiplierChange(this.props.recipe.url, parseFloat(multiplier));
  };

  decMultiplier = (e) => {
    const multiplier = this.state.multiplier - 1;
    this.changeMultiplier(multiplier);
  };

  incMultiplier = (e) => {
    const multiplier = this.state.multiplier + 1;
    this.changeMultiplier(multiplier);
  };

  render() {
    let recipe = this.props.recipe
    return (
      <div className="recipe-box">
        <div className="recipe">
          <div className="recipe-image">
            <figure className="image is-64x64">
              <img src={recipe.img} alt="Image"/>
            </figure>
          </div>
          <div className="recipe-content">
            <p>
              <strong>{recipe.title}</strong>
            </p>
          </div>
          <div className="recipe-controls">
            <FontAwesome onClick={this.incMultiplier} name="chevron-up" />
            <p>{this.state.multiplier}</p>
            <FontAwesome onClick={this.decMultiplier} name="chevron-down" />
          </div>
        </div>
      </div>
    )
  }
}


export default RecipeInfo;