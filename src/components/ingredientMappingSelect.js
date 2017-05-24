import React from 'react';
import Select from 'react-select';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/ingredients';

class IngredientMappingSelect extends React.Component {

  static propTypes = {
    item: React.PropTypes.shape().isRequired,
    baseIngredients: React.PropTypes.array.isRequired,
    actions: React.PropTypes.shape({
      ingPostIngredientMapping: React.PropTypes.func.isRequired
    })
  };



  constructor(props) {
    super(props);
    this.state = {
      selectedBaseIngredient: ''
    }
  }

  postIngredientMapping = () => {
    // Do some front end checking?
    let ingredientMapping = {
      name: this.props.item.name,
      ingredient: this.state.selectedBaseIngredient
    }
    this.props.actions.ingPostIngredientMapping(ingredientMapping);
  }

  switchBaseIngredient = (newIngredient) => {
    this.setState({
      selectedBaseIngredient: newIngredient
    });
  }

  render() {
    return (
      <div id='ingredient-add-drop' className="col-sm-12">
        <div className="col-sm-10 for-review-dropdown">
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
        <div className="pull-right col-sm-2">
            <button onClick={this.postIngredientMapping}
                    className="btn-lg action-button animate green"
            >
              Submit
            </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        baseIngredients: state.ingredients.baseIngredients
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IngredientMappingSelect);
export { IngredientMappingSelect as IngredientMappingSelectNotConnected };
        