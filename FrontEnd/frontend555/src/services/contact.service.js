import axios from "axios";
import AuthService from "./auth.service";
const API_URL = "http://localhost:3000/api/";
const currentUser = AuthService.getCurrentUser();
const uid = currentUser.id;

const createContact = (name, additionalFields) => {
    return axios.post(API_URL + "putcontact", {
        uid,
        name,
        additionalFields
    });
};

const getContacts = () => {
    console.log(uid);
    return axios.post(API_URL + "getcontacts", {
        uid
    });
};

const updateContact = (oldname, name, additionalFields) => {
    return axios.post(API_URL + "updatecontact", {
        uid,
        name,
        additionalFields
    });
};

const ContactService = {
    createContact,
    getContacts,
    updateContact
}

export default ContactService;