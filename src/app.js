import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { authLogoutAndRedirect } from './actions/auth';
import './styles/main.scss';
import 'bootstrap/dist/css/bootstrap.css';
var _ = require('lodash');

import { GLOBAL_APP_NAME, GLOBAL_DESCRIP } from './constants'

class App extends React.Component {

    static propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        pathName: React.PropTypes.string.isRequired
    };

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

        return (
            <div className="app">
               <header>
                <div className="row">

                    <div className="logo">
                         <a href="/">BBytes</a>
                  </div>

                    <nav id="main-nav-wrap">
                        <ul className="main-navigation">
                            <li><Link to="/shopping_list">Shopping List</Link></li>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </nav>

                    <a className="menu-toggle" href="#"><span>Menu</span></a>
                    
                </div>      
                
               </header>
                <section id="intro">
                    <div className="intro-content">
                        <div>
                            {this.props.children}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pathName: ownProps.location.pathname
    };
};

export default connect(mapStateToProps)(App);
export { App as AppNotConnected };


//<div className="dashboard-page ui-view"> 
//                  <div className="container-fluid"> 
//                    <div className="row"> 
//                      <div className="col-sm-3 col-md-2 sidebar"> 
//                        <div className="text-center"> 
//                          <a onClick={this.goToIndex}>
//                            <h2 className="brand">{GLOBAL_APP_NAME}<br /><small>{GLOBAL_DESCRIP}</small></h2> 
//                            </a>
//                            <img src="https://practicegreenhealth.org/sites/default/files/upload-images/food.png" height="125" width="125" className="user-avatar" />
//                        </div> 
//
//                        <ul className="nav nav-sidebar"> 
//                          <li>
//                            <Link to="/shopping_list">Shopping List</Link>
//                          </li> 
//                          <li>
//                            <Link to="/register">Register</Link>
//                          </li> 
//                          <li>
//                            <Link to="/login">Login</Link>
//                          </li>
//                        </ul> 
//                      </div>
//
//                       <ReactCSSTransitionGroup component="div"
//                                         transitionName="ng"
//                                         transitionEnterTimeout={500}
//                                         transitionLeaveTimeout={300}
//                        >
//                          {React.cloneElement(<div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main ng-scope ui-view">{this.props.children}</div> || <div />, { key: pathname })}
//                        </ReactCSSTransitionGroup>
//
//
//                    </div> 
//                  </div> 
//                </div>

                // <div className="container-fluid">
                //     <div className="navbar-header">
                //         <button type="button"
                //                 className="navbar-toggle collapsed"
                //                 data-toggle="collapse"
                //                 data-target="#top-navbar"
                //                 aria-expanded="false"
                //         >
                //             <span className="sr-only">Toggle navigation</span>
                //             <span className="icon-bar"/>
                //             <span className="icon-bar"/>
                //             <span className="icon-bar"/>
                //         </button>
                //         <a className="topnav-text navbar-brand" tabIndex="0" onClick={this.goToIndex}>
                //             {GLOBAL_APP_NAME}
                //         </a>
                //     </div>
                //     <div className="collapse navbar-collapse" id="top-navbar">
                //         {this.props.isAuthenticated ?
                //             <ul className="nav navbar-nav navbar-right">
                //                 <li className={homeClass}>
                //                     <a className="js-go-to-index-button" tabIndex="0" onClick={this.goToIndex}>
                //                         <i className="fa fa-home"/> Home
                //                     </a>
                //                 </li>
                //                 <li className={protectedClass}>
                //                     <a className="js-go-to-protected-button"
                //                        tabIndex="0"
                //                        onClick={this.goToProtected}
                //                     >
                //                         <i className="fa fa-lock"/> Protected
                //                     </a>
                //                 </li>
                //                 <li>
                //                     <a className="js-logout-button" tabIndex="0" onClick={this.logout}>
                //                         Logout
                //                     </a>
                //                 </li>
                //             </ul>
                //             :
                //             <ul className="nav navbar-nav navbar-right">
                //                 <li className={homeClass}>
                //                     <a className="js-go-to-index-button" tabIndex="0" onClick={this.goToIndex}>
                //                         <i className="fa fa-home"/> Home
                //                     </a>
                //                 </li>
                //                 <li className={shoppingListClass}>
                //                     <Link className="js-login-button" to="/shopping_list">Shopping List</Link>
                //                 </li>
                //                 <li className={registerClass}>
                //                     <Link className="js-login-button" to="/register">Register</Link>
                //                 </li>
                //                 <li className={loginClass}>
                //                     <Link className="js-login-button" to="/login">Login
                //                         <i className="fa fa-sign-in"/>
                //                     </Link>
                //                 </li>
                //             </ul>
                //         }
                //     </div>
                // </div>

                // <div>
                //     {this.props.children}
                // </div>
