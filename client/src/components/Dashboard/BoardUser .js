import React, { Component } from 'react';
import { roleActions } from "../../actions/role.actions";

export class BoardUser  extends Component {

      componentDidMount() {
        const dispatch = this.props;        
       return dispatch(this.props.getPublicContent());
      }

      
    render() {
      const getPublicContent = this.state;
        return (
            <div className="container">
              <header className="jumbotron">
                <h3>{getPublicContent}</h3>
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
    getPublicContent: () => dispatch(roleActions.getAllPublicContent())
  };
};

const connectedUserBoard = connect (
  mapStateToProps,
  mapDispatchToProps
)(BoardUser);

export { connectedUserBoard as BoardUser };

