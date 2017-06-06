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
    <div>
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
    const categories = {};
    Object.keys(INGREDIENT_CATEGORIES).reduce((categories, category) => {
      categories[category] = category.charAt(0) + category.substr(1).toLowerCase();
      return categories;
    }, categories);
    this.state = {
      baseIngredientFormOptions: BaseIngredientFormOptions,
      formFields: {
        name: t.String,
        category: t.enums(categories)
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
      <div className="base-ingredient">
        <form onSubmit={this.postBaseIngredient}>
          <Form ref={(ref) => { this.baseIngredientForm = ref; }}
                type={this.getForm()}
                options={BaseIngredientFormOptions}
                value={this.state.formValues}
                onChange={this.onFormChange}
          />
          <div className="col-sm-2">
            <button type="submit"
                    className="button is-medium is-outlined is-primary"
            >
              Submit
            </button>
          </div>
        </form>
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
