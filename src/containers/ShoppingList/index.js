import classNames from 'classnames';
import React from 'react';
import t from 'tcomb-form';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/shoppingList';
import RecipeInput from './recipeInput';
import ShoppingList from './shoppingList';

class ShoppingListView extends React.Component {

    static propTypes = {
        shoppingList: React.PropTypes.any,
        inputtingRecipes: React.PropTypes.bool.isRequired,
        isFetching: React.PropTypes.bool.isRequired,
        statusText: React.PropTypes.string,
        actions: React.PropTypes.shape({
            slFetchIngredients: React.PropTypes.func.isRequired
        })
    };

    constructor(props) {
        super(props);

        this.state = {
            inputtingRecipes: true,
        };
    }

    render() {
        let inputtingRecipes = this.props.inputtingRecipes;
        var ingredients = {};
        var forReview = [];
        if (this.props.shoppingList) {
            ingredients = this.props.shoppingList.item_list;
            forReview = this.props.shoppingList.for_review;   
        }
        return (
            <div className="container">
                <h1 className="text-center">BBytes SL</h1>
                <div className="jumbotron margin-top-medium">
                    { inputtingRecipes === true ? (
                        <RecipeInput />
                    ) : inputtingRecipes === false ? (
                        <ShoppingList ingredients={ingredients} forReview={forReview} />
                    ) : null }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        statusText: state.shoppingList.statusText,
        shoppingList: state.shoppingList.shoppingList,
        isFetching: state.shoppingList.isFetching,
        inputtingRecipes: state.shoppingList.inputtingRecipes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListView);
export { ShoppingListView as ShoppingListViewNotConnected };
