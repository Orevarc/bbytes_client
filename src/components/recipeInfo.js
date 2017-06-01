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

  handleChange = (e) => {
    const multiplier = this.refs.recipeMultiplier.value;
    if (multiplier) {
       this.setState({
        multiplier: multiplier
      });
      this.props.handleMultiplierChange(this.props.recipe.url, parseFloat(multiplier));
    }
  }

  render() {
    let recipe = this.props.recipe
    return (
      <div className="col-sm-12">
        <div className="col-sm-2">
          <FontAwesome name="times"/>
        </div>
        <div className="col-sm-7">
          {recipe.title}
        </div>
        <div className="col-sm-3">
          <input ref="recipeMultiplier" 
                 onChange={this.handleChange} 
                 onKeyPress={this.validateRecipeAmount} 
                 value={this.state.multiplier}/>
        </div>
      </div>
    )
  }
}


export default RecipeInfo;