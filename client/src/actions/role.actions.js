import { userService } from  '../services/user.service';
import {
    GET_PUBLICBOARD,
    GET_ADMINBOARD,
    GET_GESTIONNAIREBOARD,
    GET_MANAGERBOARD,
    GET_MEDECINBOARD
} from './types';

export const roleActions = {
    getAllPublicContent,
    getAllMedecinBoard,
    getAllGestionnaireBoard,
    getAllManagerBoard,
    getAllAdminBoard
};


export const publicBoardsuccess = (data) => {
    return {
      type: GET_PUBLICBOARD,
      data
    }
  }

function getAllPublicContent(){
    return dispatch => {
        userService.getPublicContent()
        .then(
            resposne => {
                dispatch(publicBoardsuccess(resposne));
            }
        )
        .catch(error => {
            throw(error);
          });
    }
}

function medecinBoardsuccess(data) {
    return {
      type: GET_MEDECINBOARD,
      data
    }
  }
  
function getAllMedecinBoard(){
    return dispatch => {
        userService.getMedecinBoard()
        .then(
            user => {
                dispatch(medecinBoardsuccess(user));
            }
        )        
        .catch(error => {
            throw(error);
          });
    }
}

function adminBoardsuccess (data) {
    return {
      type: GET_ADMINBOARD,
      data
    }
  }

function getAllAdminBoard(){
    return dispatch => {
        userService.getAdminBoard()
        .then(
            response => {
                dispatch(adminBoardsuccess(response));
            }
        )      
        .catch(error => {
            throw(error);
          });
    }
}

export function  managerBoardsuccess (data) {
    return {
        type: GET_MANAGERBOARD,
        data
    }
}

function getAllManagerBoard(){
    return dispatch => {
        userService.getManagerBoard()
        .then(
            resposne => {
                dispatch(managerBoardsuccess(resposne));
            }
        )
        .catch(error => {
            throw(error);
        });
    }
}

export function  gestionBoardsuccess (data) {
    return {
        type: GET_GESTIONNAIREBOARD,
        data
    }
}

function getAllGestionnaireBoard(){
    return dispatch => {
        userService.getGestionnaireBoard()
        .then(
            response => {
                dispatch(gestionBoardsuccess(response));
            }
        )
        .catch(error => {
            throw(error);
        });  
    }
}

