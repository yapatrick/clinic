import React, { Component } from 'react';
import { roleActions } from "../../actions/role.actions";
import { connect } from 'react-redux';

export default class BoardMedecin extends Component {
    constructor(props) {
        super(props);
  
      }

      componentDidMount() {
        const dispatch = this.props;
        
       return dispatch(this.props.getAllMedecinBoard());
      }


      render() {
        const getAllMedecinBoard = this.state;
        return (
            <div className="container">
              <header className="jumbotron">
                <h3>{getAllMedecinBoard}</h3>
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
    getAllMedecinBoard: () => dispatch(roleActions.getMedecinBoard())
  };
};

const connectedMedBoard = connect (
  mapStateToProps,
  mapDispatchToProps
)(BoardMedecin);

export { connectedMedBoard as BoardMedecin };
