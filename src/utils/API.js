// Code to add to API Route
import axios from "axios";
const BASEURL = "http://localhost:3000";

export default {
    //Register user
    registerUser: function (userData) {
        console.log(userData);
        return axios.post(BASEURL + '/registerUser', {
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            username: userData.username,
            password: userData.password,
        });
    },
    //Code example of api to login
    login: function (userData) {
        return axios.post(BASEURL + '/loginUser', {
            username: userData.username,
            password: userData.password,

        })
    },
    //Code example of how to pass Bearer token
    updatePassword: function (username, password, accessString) {
        return axios.put('/updatePassword', {
            body: {
                username,
                password
            },
            headers: { Authorization: 'Bearer ' + `${accessString}` },
        });
    },
    getProfile: function (username1, token){
        return axios.get(BASEURL + '/findUser',{
            params: {
                username: username1
            },
            headers:{ Authorization: 'Bearer ' + `${token}` },
        });
    }
};