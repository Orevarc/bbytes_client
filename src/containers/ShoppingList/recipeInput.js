import classNames from 'classnames';
import React from 'react';
import t from 'tcomb-form';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/shoppingList';
import MessageBox from '../../components/messageBox';

const Form = t.form.Form;

const Recipes = t.struct({
    recipeUrls: t.String
});

const RecipeFormLayout = (locals) => {
    return (
        <div className="recipe-input-paper">
            <div className="recipe-input">
                {locals.inputs.recipeUrls}
            </div>
        </div>
    );
};

const RecipeFormOptions = {
    template: RecipeFormLayout,
    fields : {
        recipeUrls: {
            type: 'textarea',
            label: ' ',
            attrs: {
                rows: 9,
                placeholder: 'Paste urls here...'
            }
        }
    }
};

class RecipeInput extends React.Component {

    static propTypes = {
        recipeUrls: React.PropTypes.string.isRequired,
        statusText: React.PropTypes.string,
        actions: React.PropTypes.shape({
            slFetchIngredients: React.PropTypes.func.isRequired
        })
    };

    constructor(props) {
        super(props);

        this.state = {
            formValues: {
                recipeUrls: this.props.recipeUrls
            },
        };
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
        <div className="recipe-input-container">
            <MessageBox type="warning" message="Testing an error message!" visible={true}/>
            <form onSubmit={this.fetchIngredients}>
                <Form ref={(ref) => { this.recipeInputForm = ref; }}
                      type={Recipes}
                      options={RecipeFormOptions}
                      value={this.state.formValues}
                      onChange={this.onFormChange}
                />
                <button disabled={this.props.isFetching}
                        type="submit"
                        className="button is-large is-outlined is-black"
                >
                    Get Ingredients
                </button>
            </form>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
    return {
        recipeUrls: state.shoppingList.recipeUrls,
        statusText: state.shoppingList.statusText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInput);
export { RecipeInput as RecipeInputNotConnected };