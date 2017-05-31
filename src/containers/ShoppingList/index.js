import classNames from 'classnames';
import React from 'react';
import t from 'tcomb-form';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit'

import * as actionCreators from '../../actions/shoppingList';
import RecipeInput from './recipeInput';
import ShoppingList from './shoppingList';
import ForReviewList from './forReviewList';
import RecipeInfoContainer from '../../components/recipeInfoContainer'
import RefreshRecipesButton from '../../components/refreshRecipesButton'
import MoreRecipesButton from '../../components/moreRecipesButton'

class ShoppingListView extends React.Component {

    static propTypes = {
        shoppingList: React.PropTypes.array,
        forReview: React.PropTypes.array,
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
        let isFetching = this.props.isFetching;
        var ingredients = null;
        var forReview = null;
        if (this.props.shoppingList) {
            ingredients = this.props.shoppingList;
            forReview = this.props.forReview;
        }
        return (
            <div className="container">
                <h1 className="text-center">BBytes Shopping List</h1>
                { inputtingRecipes === true ? (
                    isFetching ? (
                        <div className="loading-spinner">
                            <Spinner spinnerName="three-bounce" noFadeIn />
                        </div>
                    ) : (
                        <RecipeInput />
                    )
                ) : inputtingRecipes === false ? (
                    forReview.length && ingredients ? (
                        <div>
                            <div className="btn-group">
                                <MoreRecipesButton />
                                <RefreshRecipesButton />
                            </div>
                            <RecipeInfoContainer />
                            <ForReviewList forReview={forReview} /> 
                            <ShoppingList allIngredients={ingredients} />
                        </div>
                    ) : ingredients ? (
                        <ShoppingList allIngredients={ingredients} />
                    ) : null
                ) : null }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        statusText: state.shoppingList.statusText,
        shoppingList: state.shoppingList.shoppingList,
        forReview: state.shoppingList.forReview,
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
