import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import './style.scss';
import reactLogo from './images/react-logo.png';
import reduxLogo from './images/redux-logo.png';
import { GLOBAL_APP_NAME } from '../../constants'

class HomeView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string,
        userName: React.PropTypes.string
    };

    render() {
        return (
            <div className="container">
                <div className="text-center">
                    <h1>{GLOBAL_APP_NAME}</h1>
                </div>
                <div className="jumbotron">
                    <h3 className="text-left">Welcome!</h3> <br/>
                    <h4> Use this app to turn BudgetByte urls into a shopping list. </h4>
                </div>
                <div className="margin-top-medium">
                    {this.props.statusText ?
                        <div className="alert alert-info">
                            {this.props.statusText}
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
