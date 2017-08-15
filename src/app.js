import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import NotificationSystem from 'react-notification-system';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { bindActionCreators } from 'redux';
import * as actionCreators from './actions/global';

import { authLogoutAndRedirect } from './actions/auth';
import './styles/main.scss';
import 'bootstrap/dist/css/bootstrap.css';
var _ = require('lodash');

import { GLOBAL_APP_NAME, GLOBAL_DESCRIP } from './constants'

class App extends React.Component {

    static propTypes = {
        dispatch: React.PropTypes.func,
        notification: React.PropTypes.shape({
            title: React.PropTypes.string,
            message: React.PropTypes.string,
            type: React.PropTypes.string
        }),
        pathName: React.PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
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

    logout = () => {
        this.props.dispatch(authLogoutAndRedirect());
    };

    goToIndex = () => {
        this.props.dispatch(push('/'));
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    render() {
        const homeClass = classNames({
            active: this.props.pathName === '/'
        });
        const protectedClass = classNames({
            active: this.props.pathName === '/protected'
        });
        const loginClass = classNames({
            active: this.props.pathName === '/login'
        });
        const registerClass = classNames({
            active: this.props.pathName === '/register'
        });
        const shoppingListClass = classNames({
            active: this.props.pathName === '/shopping_list'
        });

        const { pathname } = this.props.location;

        this.displayNotification()

        return (
            <div className="app">
               <header>
                    <div className="logo">
                         <a href="/">
                            <img src="images/groceries.svg"/>
                         </a>
                    </div>               
               </header>
                <section id="intro">
                    <div className="intro-content">
                        <div>
                            {this.props.children}
                        </div>
                        <NotificationSystem ref="notificationSystem" />
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        notification: state.global.notification,
        pathName: ownProps.location.pathname
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
export { App as AppNotConnected };
