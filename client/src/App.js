import React from 'react';
import { Router, Switch, Route, Link } from "react-router-dom";
import PropTypes        from 'prop-types';
import { connect }      from 'react-redux';
//import {useSelector}    from 'react-redux';
import { history }      from './helpers/history';
//import { alertActions } from './actions/alert.actions';
import { userActions }  from './actions/user.actions';
//import { setCurrentUser } from './actions/user.actions';
import { LoginPage }    from './components/Users/LoginPage';
import { Register }     from './components/Users/Register';
import { Profile }      from './components/Users/Profile';
import { Home }         from './components/Home/home';


//import BoardUser from "./components/Dashboard/BoardUser ";
import BoardManager from './components/Dashboard/BoardManager';
import BoardAdmin from "./components/Dashboard/BoardAdmin";
import BoardGestionnaire from "./components/Dashboard/BoardGestionnaire";
import BoardMedecin from './components/Dashboard/BoardMedecin';
import "bootstrap/dist/css/bootstrap.min.css";
//import jwt_decode from 'jwt-decode';


export default class App extends React.Component {
  constructor(props) {
    
    super(props);

    this.logOut = this.logOut.bind(this);

    this.setState({
      showManagerBoard: false,
      showGestionnaireBoard: false,
      showMedecinBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    });
  }

  componentDidMount() {
    if(this.props.auth){
     const user = JSON.parse(localStorage.getItem('user'));

      if (user) {
        this.setState({
          currentUser             : JSON.parse(localStorage.getItem('user')),
         // currentUser           : userActions.getCurrentUser(),
          showMedecinBoard        : user.roles.includes("ROLE_MEDECIN"),
          showManagerBoard        : user.roles.includes("ROLE_MANAGER"),
          showGestionnaireBoard   : user.roles.includes("ROLE_GESTIONNAIRE"),
          showAdminBoard          : user.roles.includes('ROLE_ADMIN')
        });
        console.log(user);
      }
    }
  }

  logOut(e) {
    e.preventDefault()
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("roles");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    window.location="/";
  }

  render() {
    const user          = localStorage.getItem('user');
    const currentUser   = user;
    //var profile       = JSON.parse(currentUser.roles);
    var profile         = user.roles && user.roles.map((role, index) => <li key={index}>{role}</li>)
  /* var profile =         {user.arrOfStrings.map((item, i) => {
      return <li key={i}>{item}</li>
    })} */

    console.log('Votre profile est:', profile); 
 
    const {showMedecinBoard, showManagerBoard, showGestionnaireBoard,showAdminBoard} = this.props;
  
      switch(profile){
        case "ROLE_MANAGER": 
        return {
          showManagerBoard : profile 
        };
        case "ROLE_GESTIONNAIRE":
        return {
          showGestionnaireBoard : profile
        };
        case "ROLE_MEDECIN":
          return {
            showMedecinBoard : profile
          };
        case "ROLE_ADMIN":
          return {
            showAdminBoard : profile
          }
      }


/*     const showGestionnaireBoard = user.roles.includes("ROLE_GESTIONNAIRE");
    const showManagerBoard      = user.roles.includes("ROLE_MANAGER");
    const showMedecinBoard      = user.roles.includes("ROLE_MEDECIN");
    const showAdminBoard        = user.roles.includes("ROLE_ADMIN"); */
  
    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              MEDCAB - V.2.0 Gestion de clinique
              </Link>
            <div className="navbar-nav mr-auto">
              {showMedecinBoard && (
                <React.Fragment>
                  <li className="nav-item">
                    <Link to={"/medecin"} className="nav-link">
                      DashBoard
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/listmedecin"} className="nav-link">
                      Medecins
                      </Link>
                  </li>
                </React.Fragment>
              )}

              {showManagerBoard && (
                <React.Fragment>
                  <li className="nav-item">
                    <Link to={"/manager"} className="nav-link">
                      Dashboard
                    </Link>

                  </li>

                  <li className="nav-item">
                    <Link to={"/listannee"} className="nav-link">
                      Années civiles
                    </Link>

                  </li>

                  <li className="nav-item">
                    <Link to={"/listmedecin"} className="nav-link">
                      Medecins
                    </Link>
                  </li>

                </React.Fragment>
              )
              }

              {showGestionnaireBoard && (
                <React.Fragment>
                  <li className="nav-item">
                    <Link to={"/gestionnaire"} className="nav-link">
                      DashBoard
                  </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/doctors"} className="nav-link">
                      Consulations -  RDV
                  </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/listpatient"} className="nav-link">
                      Patients
                  </Link>
                  </li>
                </React.Fragment>
              )}


              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    DashBoard
                  </Link>
                </li>
              )}

{/*               {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )} */}
            </div>

            {currentUser?(
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                  {currentUser.email}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </Link>
                </li>
              </div>
            ):(
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a href="/login" className="nav-link">
                      Login
                   </a>
                  </li>

                </div>
              )}
          </nav>
        </div>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/login"]} component={LoginPage} />
            <Route exact path="/home"           component={Home} />
            <Route exact path="/profile"        component={Profile} />
            <Route exact path="/register"       component={Register} />
            <Route path="/manager"              component={BoardManager} />
            <Route path="/gestionnaire"         component={BoardGestionnaire} />
            <Route path="/admin"                component={BoardAdmin} />
            <Route path="/medecin"              component={BoardMedecin} />
          </Switch>
        </div>
     </Router>
    );
  }
}
Profile.propTypes = {
  getUsers: PropTypes.func,
  logoutUser: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = state => {
  const { users, auth } = state;
  const { user } = auth;
  const { currentUser } = auth;
  return {
    currentUser,
    user,
    users,
    auth: auth.state
  };
}

const actionCreators = {
  getUsers: userActions.getCurrentUser,
  logoutUser: userActions.logout,
}

const connectedApp = connect(
  mapStateToProps,
  actionCreators)(App);

  export { connectedApp as App };
