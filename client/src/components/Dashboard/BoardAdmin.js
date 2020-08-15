import React, { Component } from 'react';
import { roleActions } from "../../actions/role.actions";
import { connect } from 'react-redux';

export default class BoardAdmin extends Component {
    constructor(props) {
        super(props);
  
      }

      componentDidMount() {
        this.props.getAllAdminBoard();
      }


      render() {
        const getAllAdminBoard = this.state;
        return (
            <div className="container">
              <header className="jumbotron">
                <h3>{getAllAdminBoard}</h3>
              </header>
            </div>
          );
    }
    
}

const mapStateToProps = state => ({
  auth: state.auth
}); 

const mapDispatchToProps = dispatch => {
  return {
    getAllAdminBoard: () => dispatch(roleActions.getAdminBoard())
  };
};

const connectedAdminBoard = connect (
  mapStateToProps,
  mapDispatchToProps
)(BoardAdmin);

export { connectedAdminBoard as BoardAdmin };
