import FontAwesome from 'react-fontawesome';
import React from 'react';
import Select from 'react-select';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/ingredients';
import { transformBaseIngredients } from '../../utils/transforms';

class IngredientMapping extends React.Component {

  static propTypes = {
    item: React.PropTypes.shape().isRequired,
    baseIngredients: React.PropTypes.array,
    statusText: React.PropTypes.string,
    actions: React.PropTypes.shape({
      ingFetchBaseIngredients: React.PropTypes.func.isRequired,
      ingPostIngredientMapping: React.PropTypes.func.isRequired
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedBaseIngredient: ''
    }
  }

  componentDidMount() {
    this.props.actions.ingFetchBaseIngredients();
  }

  switchIngredient = (newIngredient) => {
    this.setState({
      selectedBaseIngredient: newIngredient
    });
  }

  postIngredientMapping = () => {
    // Do some front end checking?
    let ingredientMapping = {
      name: this.props.item.name,
      ingredient: this.state.selectedBaseIngredient
    }
    this.props.actions.ingPostIngredientMapping(ingredientMapping);
  }

  render() {
    let item = this.props.item;
    let baseIngredients = this.props.baseIngredients;
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="col-sm-4">
            <div className='text-left alert'>
              Should map to:
            </div>
          </div>
          <div className="col-sm-8">
            <Select ref="ingredientSelect" autofocus options={baseIngredients} simpleValue name="selected-ingredient"  onChange={this.switchIngredient} value={this.state.selectedBaseIngredient} valueKey='id' labelKey='name' searchable={true} />
            <div className="col-sm-5">
              <button onClick={this.postIngredientMapping}
                      className="pull-right btn-outline btn-rounded btn-block"
              >
                Submit
              </button>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        statusText: state.ingredients.statusText,
        baseIngredients: state.ingredients.baseIngredients
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IngredientMapping);
export { IngredientMapping as IngredientMappingNotConnected };
