import classNames from 'classnames';
import React from 'react';
import t from 'tcomb-form';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


import * as actionCreators from '../../actions/shoppingList';

const Form = t.form.Form;

const Recipes = t.struct({
    recipeUrls: t.String
});

const RecipeFormOptions = {
    fields : {
        recipeUrls: {
            config: {
                size: 'lg'
            },
            type: 'textarea',
            attrs: {
                className: 'input-underline input-lg',
                placeholder: 'Paste urls here...'
            }
        }
    }
};

class RecipeInput extends React.Component {

    static propTypes = {
        data: React.PropTypes.string,
        isFetching: React.PropTypes.bool.isRequired,
        statusText: React.PropTypes.string,
        actions: React.PropTypes.shape({
            slFetchIngredients: React.PropTypes.func.isRequired
        })
    };

    constructor(props) {
        super(props);

        this.state = {
            formValues: {
                recipeUrls: ''
            },
        };
    }

    componentWillMount() {
    }

    onFormChange = (value) => {
        this.setState({ formValues: value });
    };

    fetchIngredients = (e) => {
        e.preventDefault();
        const value = this.recipeInputForm.getValue();
        if (value) {
            this.props.actions.slFetchIngredients(value.recipeUrls);
        }
    };

    render() {
      return (
        <form onSubmit={this.fetchIngredients}>
            <Form ref={(ref) => { this.recipeInputForm = ref; }}
                  type={Recipes}
                  options={RecipeFormOptions}
                  value={this.state.formValues}
                  onChange={this.onFormChange}
            />
            <button disabled={this.props.isFetching}
                    type="submit"
                    className="btn-lg btn-outline btn-rounded"
            >
                Get Ingredients
            </button>
        </form>
      )
    }
}

const mapStateToProps = (state) => {
    return {
        statusText: state.auth.statusText,
        data: state.data.data,
        isFetching: state.data.isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInput);
export { RecipeInput as RecipeInputNotConnected };