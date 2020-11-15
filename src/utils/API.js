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
    //Code exampled of api to login
    login: function (username, password) {
        return axios.post('/loginUser', {
            username,
            password,
        });
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
};