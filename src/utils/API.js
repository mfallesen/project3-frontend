// Code to add to API Route
import axios from "axios";
const BASEURL = "http://localhost:3000";
const qs = require('qs');

export default {
    //Register user
    registerUser: function (userData) {
        console.log(userData);
        return axios.post(BASEURL + '/user/registerUser', {
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
        console.log("In API: ", companyData);
        return axios.post(BASEURL + '/company/addCompany', {
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

    addAdventure: function (adventureData, token) {
        console.log("In API: ", adventureData);
        console.log("In API: ", token)

        const data = qs.stringify({
            'name': adventureData.name,
            'description': adventureData.description,
            'image': adventureData.longitude,
            'longitude': adventureData.latitude,
            'latitude': adventureData.latitude,
            'AdventureCompanyId': adventureData.adventureCompanyId,
        });
        return axios({
            method: 'post',
            url: BASEURL + '/api/company/adventure/',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        })
    },

    getAdventures: function (token) {
        console.log("In API: ", token)

        return axios({
            method: 'get',
            url: BASEURL + '/api/company/adventures/',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        
        })
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
        return axios.post(BASEURL + '/user/loginUser', {
            username: userData.username,
            password: userData.password,

        })
    },
    //Code example of how to pass Bearer token
    updatePassword: function (username, password, accessString) {
        return axios.put('/user/updatePassword', {
            body: {
                username,
                password
            },
            headers: { Authorization: 'Bearer ' + `${accessString}` },
        });
    },
    getProfile: function (username1, token) {
        return axios.get(BASEURL + '/user/findUser', {
            params: {
                username: username1
            },
            headers: { Authorization: 'Bearer ' + `${token}` },
        });
    },
    getActivities: function (token) {
        return axios.get(BASEURL + '/api/userPosts', {
            headers: { Authorization: 'Bearer ' + `${token}` },
        });
    }
};