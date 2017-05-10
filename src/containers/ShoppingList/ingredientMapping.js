import FontAwesome from 'react-fontawesome';
import React from 'react';
import Select from 'react-select';

class IngredientMapping extends React.Component {

  static propTypes = {
    item: React.PropTypes.shape().isRequired,
  };

  getInitialState = () => {
    return {
      searchable: true
    }
  };

  switchIngredient = (newIngredient) => {
    this.setState({
      selectValue: newIngredient
    });
  }

  // switchIngredient = (e) => {
  //   let newIngredient = e.target.value;
  //   console.log('Ingredient changed to ' + newIngredient);
  // };

  render() {
    let item = this.props.item;
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="col-sm-4">
            <div className='text-left alert'>
              Should map to:
            </div>
          </div>
          <div className="col-sm-8">
            <Select ref="ingredientSelect" autofocus options={options} simpleValue name="selected-ingredient"  onChange={this.switchIngredient} searchable={true} />
          </div>
        </div>  
      </div>
    )
  }
}

export default ForReviewItem;