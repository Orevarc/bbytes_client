import classNames from 'classnames';
import React from 'react';
import t from 'tcomb-form';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


import * as actionCreators from '../../actions/shoppingList';

const Form = t.form.Form;

const ShoppingList = t.struct({
    recipeUrls: t.String
});

const ShoppingListFormOptions = {
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

class ShoppingListView extends React.Component {

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
        const value = this.shoppingListForm.getValue();
        if (value) {
            this.props.actions.slFetchIngredients(value.recipeUrls);
        }
    };

    render() {
        // Could move this into a seperate util class and use across app
        let statusText = null;
        if (this.props.statusText) {
            const statusTextClassNames = classNames({
                'alert': true,
                'alert-danger': this.props.statusText.indexOf('Error') === 0,
                'alert-success': this.props.statusText.indexOf('Error') !== 0
            });

            statusText = (
                <div className="row">
                    <div className="col-sm-12">
                        <div className={statusTextClassNames}>
                            {this.props.statusText}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container">
                <h1 className="text-left">BBytes SL</h1>
                <div className="jumbotron margin-top-medium">
                    {statusText}
                    <form onSubmit={this.fetchIngredients}>
                        <Form ref={(ref) => { this.shoppingListForm = ref; }}
                              type={ShoppingList}
                              options={ShoppingListFormOptions}
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
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListView);
export { ShoppingListView as ShoppingListViewNotConnected };
