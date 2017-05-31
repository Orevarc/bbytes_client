import FontAwesome from 'react-fontawesome';
import React from 'react';
import Select from 'react-select';
import t from 'tcomb-form';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/ingredients';
import { INGREDIENT_CATEGORIES } from '../../constants';

const Form = t.form.Form;

const BaseIngredientFormLayout = (locals) => {
  return (
    <div className="col-sm-12">
      <div className="col-sm-10">
        {locals.inputs.name}
      </div>
      <div className="col-sm-10">
        {locals.inputs.category}
      </div>
    </div>
  );
};

const BaseIngredientFormOptions = {
  template: BaseIngredientFormLayout,
  fields: {
    category: { }
  }
};

class BaseIngredient extends React.Component {

  static propTypes = {
    item: React.PropTypes.shape().isRequired,
    ingredientCategories: React.PropTypes.array,
    statusText: React.PropTypes.string,
    actions: React.PropTypes.shape({
      ingFetchIngredientCategories: React.PropTypes.func.isRequired,
      ingPostBaseIngredient: React.PropTypes.func.isRequired
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      baseIngredientFormOptions: BaseIngredientFormOptions,
      formFields: {
        name: t.String,
        category: t.enums(INGREDIENT_CATEGORIES)
      },
      formValues: {
        name: '',
        category: {}
      }
    }
  }

  getForm = () => {
    return(t.struct({
      name: this.state.formFields.name,
      category: this.state.formFields.category
    }));
  }

  onFormChange = (value) => {
    this.setState({ formValues: value });
  };

  switchIngredientCategory = (newCategory) => {
    this.setState({
      selectedIngredientCategory: newCategory
    });
  }

  postBaseIngredient = (e) => {
    e.preventDefault();
    const value = this.baseIngredientForm.getValue();
    if (value) {
      this.props.actions.ingPostBaseIngredient(value.name, value.category);
    }
  };

  render() {
    let item = this.props.item;
    let baseIngredients = this.props.baseIngredients;
    return (
      <div className="row">
        <div id='base-ingredient-add-drop' className="col-sm-12">
          <form onSubmit={this.postBaseIngredient}>
            <Form ref={(ref) => { this.baseIngredientForm = ref; }}
                  type={this.getForm()}
                  options={BaseIngredientFormOptions}
                  value={this.state.formValues}
                  onChange={this.onFormChange}
            />
            <button type="submit"
                    className="btn-lg btn-outline btn-rounded btn-block"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        ingredientCategories: state.ingredients.ingredientCategories,
        statusText: state.ingredients.statusText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseIngredient);
export { BaseIngredient as BaseIngredientNotConnected };
