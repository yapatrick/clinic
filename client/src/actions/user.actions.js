import { userConstants }    from '../constants/user.constants';
import { userService }      from '../services/user.service';
import { UserServices }     from '../services/userservices';
import { alertActions }     from '../actions/alert.actions';
/* import  authHeader          from '../helpers/auth-header';
import jwt_decode           from 'jwt-decode';
import { history }          from '../helpers/history';
import axios                from 'axios'; */

export const userActions = {
    login,
    logout,
    getAll,
    getPublicContent,
    getCurrentUser,
    setCurrentUser
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                   // history.push('/profile');
                    window.location.href = '/profile';
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user)  { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user)  { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function getPublicContent(user){
    return dispatch => {
        dispatch(request());

        UserServices.getPublicContent()
        .then(
            user => { 
                dispatch(success(user));
                window.location='/profile';
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        )
    };

    function request() { return { type: userConstants.GET_PUBLICCONTENT_REQUEST } }
    function success(user) { return { type: userConstants.GET_PUBLICCONTENT_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_PUBLICCONTENT_FAILURE, error } } 
}

function logout() {
    return dispatch => {
        dispatch(request())
        dispatch(receiveLogout());
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT_SUCCESS' });
      };

     function request() { return { type: userConstants.LOGOUT_REQUEST } }
     function receiveLogout() { return { type: userConstants.LOGOUT_SUCCESS } }
}

// Set logged in user
export function setCurrentUser(user){
    return {
      type: userConstants.SET_CURRENT_USER,
      payload: user
    };
  };

  function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

/*  export function getCurrentUser() {
    return dispatch => {
       dispatch(request());
   
     userService.getCurrentUser()
        .then(res => res.json())
        .then(profile => {
          dispatch(success(profile));
        }), 
        error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error));
        }
    };
  
  //function request() { return { type: userConstants.PROFILE_REQUEST } }
  function success() { return { type: userConstants.PROFILE_SUCESS} }
  function failure(error) { return { type: userConstants.PROFILE_FAILURE, error } }
};  */


export function getCurrentUser (){
    return dispatch => {
        userService.getCurrentUser()
      .then(response => {
        if (response.accessToken) {
          dispatch(success(response.accessToken));
        } else {
           console.log("pas d'utilisateur connecté.")
           dispatch(failure());
         }
      });
    };
    function success(accessToken) { return { type: userConstants.PROFILE_SUCESS}, accessToken}
    function failure() { return { type: userConstants.PROFILE_FAILURE } }
  };