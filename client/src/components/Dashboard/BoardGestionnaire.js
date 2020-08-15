import React, { Component } from 'react';
import { roleActions } from "../../actions/role.actions";
import { connect } from 'react-redux';

export default class BoardGestionnaire extends Component {
      componentDidMount() {
        const dispatch = this.props;
        
        return dispatch(this.props.getGestionnaireBoard());
/*         this.props.getGestionnaireBoard()
        .then(
          response => {
            this.setState({
              content: response.data
            });
          },
          error => {
            this.setState({
              content:
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString()
            });
          }
        ); */
      }


      render() {
        const getGestionnaireBoard = this.state;
        return (
            <div className="container">
              <header className="jumbotron">
                <h3>{getGestionnaireBoard}</h3>
              </header>
            </div>
          );
    }
    
}

/*  Home.PropTypes = {
    getAllPublicContent: PropTypes.func,
    auth: PropTypes.object.isRequired
}  */

const mapStateToProps = state => ({
  auth: state.auth
}); 

const mapDispatchToProps = dispatch => {
  return {
    getGestionnaireBoard: () => dispatch(roleActions.getAllGestionnaireBoard())
  };
};

const connectedGesBoard = connect (
  mapStateToProps,
  mapDispatchToProps
)(BoardGestionnaire);

export { connectedGesBoard as BoardGestionnaire };
