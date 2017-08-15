import NotificationSystem from 'react-notification-system';
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
        notification: React.PropTypes.shape({
            title: React.PropTypes.string,
            visible: React.PropTypes.bool,
            message: React.PropTypes.string,
            type: React.PropTypes.string
        }),
        actions: React.PropTypes.shape({
            slFetchIngredients: React.PropTypes.func.isRequired
        })
    };

    constructor(props) {
        super(props);

        this.state = {
            inputtingRecipes: true,
        };
        this._notificationSystem = null;
    }

    componentDidMount () {
        this._notificationSystem = this.refs.notificationSystem;
    }

    displayNotification() {
        if (this.props.notification) {
            this._notificationSystem.addNotification({
                title: this.props.notification.title,
                message: this.props.notification.message,
                level: this.props.notification.type,
                position: 'br',
            });
        }
    }

    renderLoadingSpinner() {
        return (
            <div className="loading-spinner">
                <Spinner spinnerName="three-bounce" noFadeIn />
            </div>
        );
    };

    renderShoppingListButtons() {
        return (
            <div className="btn-group">
                <MoreRecipesButton />
                <RefreshRecipesButton />
            </div> 
        );
    };

    renderPageTitle = () => {
        if (this.props.inputtingRecipes) {
            return <div><h1 className="text-center">BBytes Shopping List</h1></div>;
        } else {
            return (
                <div className="page-title">
                    <h1 className="text-left">BBytes Shopping List</h1>
                    <div className="btn-group">
                        <MoreRecipesButton />
                        <RefreshRecipesButton />
                    </div>
                </div>
            );
        }
    };

    render() {
        let inputtingRecipes = this.props.inputtingRecipes;
        let isFetching = this.props.isFetching;
        var ingredients = null;
        var forReview = null;
        this.displayNotification()
        if (this.props.shoppingList) {
            ingredients = this.props.shoppingList;
            forReview = this.props.forReview;
        }
        return (
            <div>
                {this.renderPageTitle()}
                
                { inputtingRecipes === true ? (
                    isFetching ? (
                        this.renderLoadingSpinner()
                    ) : (
                        <RecipeInput />
                    )
                ) : inputtingRecipes === false ? (
                    forReview.length && ingredients ? (
                        <div>
                            <div className="shopping-list-container">
                                <div className="recipe-column">
                                    <RecipeInfoContainer />
                                </div>
                                <div className="list-column">
                                    <ShoppingList allIngredients={ingredients} />
                                </div>
                                <div className="for-review-column">
                                    <ForReviewList forReview={forReview} /> 
                                </div>
                            </div>
                        </div>
                    ) : ingredients ? (
                        <div>
                            <div className="shopping-list-container">
                                <div className="recipe-column">
                                    <RecipeInfoContainer />
                                </div>
                                <div className="list-column">
                                    <ShoppingList allIngredients={ingredients} />
                                </div>
                            </div>
                        </div>
                    ) : null
                ) : null }
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        notification: state.shoppingList.notification,
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
