import FontAwesome from 'react-fontawesome';
import React from 'react';
import Select from 'react-select';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/ingredients';
import { transformBaseIngredients } from '../../utils/recipes';

import BaseIngredient from './baseIngredient';
import IngredientMappingSelect from '../../components/ingredientMappingSelect'

class IngredientMapping extends React.Component {

  static propTypes = {
    item: React.PropTypes.shape().isRequired,
    statusText: React.PropTypes.string,

    actions: React.PropTypes.shape({
      ingFetchBaseIngredients: React.PropTypes.func.isRequired,
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      addingNewBaseIngredient: false,
    }
  }

  componentDidMount() {
    // this.props.actions.ingFetchBaseIngredients();
  }

  addNewBaseIngredient = () => {
    this.setState({
      addingNewBaseIngredient: !this.state.addingNewBaseIngredient
    })
  }

  render() {
    let item = this.props.item;
    let baseIngredients = this.props.baseIngredients;
    const transitionStyle = {

    }
    return (
      <div>
        { this.state.addingNewBaseIngredient ?
          <BaseIngredient item={item}/> :
          <IngredientMappingSelect item={item}/>
        }
        <div className="col-sm-12">
          Add new Base Ingredient: 
          <input type="checkbox" onChange={this.addNewBaseIngredient} name='new_base_ingredient'/>
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
