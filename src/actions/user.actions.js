import axios from 'axios';
import {REGISTER_USER, LOGIN_USER, EDIT_USER, AUTH_USER} from './types';
import config from '../config';

export function registerUser(dataToSubmit){
    const request = axios.post(`${config.users_baseUrl}/register`, dataToSubmit, {withCredentials:true, credentials: 'include'})
    .then(res => res.data)
    .catch(e => e.data)
    return{type:REGISTER_USER, payload: request}
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${config.users_baseUrl}/login`, dataToSubmit, {withCredentials:true, credentials: 'include'})
    .then(res => res.data)
    .catch(e => e.data)
    return{type:LOGIN_USER, payload: request}
}
export function editUser(dataToSubmit){
    const request = axios.post(`${config.users_baseUrl}/editProfile`, dataToSubmit, {withCredentials:true, credentials: 'include'})
    .then(res => res.data)
    .catch(e => e.data)
    return{type:EDIT_USER, payload: request}
}

export function authUser(dataToSubmit){
    const request = axios.post(`${config.users_baseUrl}/tokenIsValid`, dataToSubmit, {withCredentials:true, credentials: 'include'})
    .then(res => res.data)
    .catch(e => e.data)
    return{type:AUTH_USER, payload: request}
}
