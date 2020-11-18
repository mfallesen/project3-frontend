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
    //Signup Company
    signupCompany: function (companyData) {
        console.log("In API: ", companyData);
        return axios.post(BASEURL + '/company/signupCompanyUser', {
            email: companyData.email,
            username: companyData.username,
            password: companyData.password,
        });
    },

    addCompany: function (companyData) {
        console.log(companyData);
        return axios.post(BASEURL + '/company/adventure/company', {
            name: companyData.name,
            address_1: companyData.address_1,
            address_2: companyData.address_2,
            city: companyData.city,
            state: companyData.state,
            zip_code: companyData.zip_code,
            phone: companyData.phone,
            email: companyData.email,
            website: companyData.website,
            description: companyData.description,
            image: companyData.image,
            CompanyUserId: companyData.CompanyUserId,
        });
    },

    loginCompany: function (userData) {
        console.log(userData);
        return axios.post(BASEURL + '/company/loginCompanyUser', {
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
    getProfile: function (username1, token) {
        return axios.get(BASEURL + '/findUser', {
            params: {
                username: username1
            },
            headers: { Authorization: 'Bearer ' + `${token}` },
        });
    }
};