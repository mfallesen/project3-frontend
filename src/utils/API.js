// Code to add to API Route
import axios from "axios";
const BASEURL = process.env.REACT_APP_API_SERVER;
const qs = require('qs');

export default {
    //Register user
    registerUser: function (userData) {
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
        return axios.post(BASEURL + '/company/signupCompanyUser', {
            email: companyData.email,
            username: companyData.username,
            password: companyData.password,
        });
    },

    addCompany: function (companyData) {
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

    addAdventure: function (adventureData, tagsArr, adventureCompanyId, token) {
        const data = qs.stringify({
            'name': adventureData.name,
            'description': adventureData.description,
            'image': adventureData.image,
            'longitude': adventureData.longitude,
            'latitude': adventureData.latitude,
            'AdventureCompanyId': adventureCompanyId,
            'tags': tagsArr
        });
        return axios({
            method: 'post',
            url: BASEURL + '/api_company/adventure/',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        })
    },

    deleteAdventure: function (adventureId, token) {
        return axios({
            method: 'delete',
            url: BASEURL + `/api_company/adventure/${adventureId}`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },

        })
    },


    updateUserInfo: function (userData, userName, token) {
        const data = qs.stringify({
            'username': userName,
            'first_name': userData.first_name,
            'last_name': userData.last_name,
            'email': userData.email,
            'city': userData.city,
            'state': userData.state,
            'image': userData.image,
        });
        return axios({
            method: 'put',
            url: BASEURL + '/user/updateUser',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        })
    },

    updateCompanyInfo: function (companyData, token) {
        const data = qs.stringify({
            'name': companyData.name,
            'address_1': companyData.address_1,
            'address_2': companyData.address_2,
            'city': companyData.city,
            'state': companyData.state,
            'zip_code': companyData.zip_code,
            'phone': companyData.phone,
            'email': companyData.email,
            'website': companyData.website,
            'description': companyData.description,
            'image': companyData.image,
        });
        return axios({
            method: 'put',
            url: BASEURL + `/api_company/edit/company/${companyData.id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        })
    },

    addUserPost: function (postData, username, token) {
        const data = qs.stringify({
            'title': postData.title,
            'description': postData.description,
            'image': `https://res.cloudinary.com/crowandrew/image/upload/c_fit,g_center,h_1600,w_1200/v1605816733/${postData.image}`,
        });
        return axios({
            method: 'post',
            url: BASEURL + `/api/userPost/${username}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        })
    },

    getAdventures: function (token) {
        return axios({
            method: 'get',
            url: BASEURL + '/api_company/adventures/',
            headers: {
                'Authorization': `Bearer ${token}`
            },

        })
    },

    getAdventureLanding: function () {

        return axios({
            method: 'get',
            url: BASEURL + '/company/adventures'

        })
    },

    loginCompany: function (userData) {
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
    getAdventureTags: function (token) {
        return axios({
            method: 'get',
            url: BASEURL + '/api/adventures',
            headers: {
                Authorization: 'Bearer ' + `${token}`
            },

        })
    },
    getCompanyProfile: function (username, token) {
        return axios.get(BASEURL + '/company/findCompanyUser', {
            params: {
                username: username
            },
            headers: { Authorization: 'Bearer ' + `${token}` },
        });
    },
    getActivities: function (token) {
        return axios.get(BASEURL + '/api/userPosts', {
            headers: { Authorization: 'Bearer ' + `${token}` },
        });
    },
    postAdventureRating: function (token, id) {
        return axios({
            method: 'post',
            url: BASEURL + '/api/adventure_rating/' + id,
            headers: {
                Authorization: 'Bearer ' + `${token}`
            },

        })
    },

    countAdventureRating: function (token, id) {
        return axios.get(BASEURL + '/api/adventure_rating/' + id, {
            headers: { Authorization: 'Bearer ' + `${token}` },
        }
        )
    }
};