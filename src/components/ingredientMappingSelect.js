import React from 'react';
import Select from 'react-select';


class IngredientMappingSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedBaseIngredient: ''
    }
  }

  switchBaseIngredient = (newIngredient) => {
    this.setState({
      selectedBaseIngredient: newIngredient
    });
  }

  render() {
    return (
      <div id='ingredient-add-drop' className="col-sm-12">
        <div className="col-md-10 for-review-dropdown">
          <Select ref="ingredientSelect" 
                  autofocus 
                  options={this.props.baseIngredients} 
                  simpleValue 
                  name="selected-ingredient"  
                  onChange={this.switchBaseIngredient} 
                  value={this.state.selectedBaseIngredient} 
                  valueKey='id' 
                  labelKey='name' 
                  searchable={true} 
          />
        </div>
        <div className="pull-right col-sm-3">
            <button onClick={this.postIngredientMapping}
                    className="btn-success btn-outline btn-rounded btn-block"
            >
              Submit
            </button>
        </div>
      </div>
    )
  }
}

export default IngredientMappingSelect;
        