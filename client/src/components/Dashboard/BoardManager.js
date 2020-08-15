import React, { Component } from 'react';
import { roleActions } from '../../actions/role.actions';
import { connect } from 'react-redux';

export  class BoardManager extends Component {
    constructor(props) {
        super(props);
    
/*         this.state = {
          content: ""
        }; */
      }

      componentDidMount() {
        this.props.loadingManagerBoard();
      //  roleActions.getAllManagerBoard()
        /* .then(
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
        const { loadingManagerBoard } = this.props;
        return (
            <div className="container">
              <header className="jumbotron">
                <h3>{ loadingManagerBoard }</h3>
              </header>
            </div>
          );
    }
    
}


const mapDispatchToProps = dispatch => {
  return {
    loadingManagerBoard: () =>
      dispatch(roleActions.getAllManagerBoard())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(BoardManager);
