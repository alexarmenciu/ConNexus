import axios from "axios";
import AuthService from "./auth.service";
const API_URL = "http://localhost:3000/api/";


const createContact = (name, additionalFields) => {
    const currentUser = AuthService.getCurrentUser();
    const uid = currentUser.id;
    return axios.post(API_URL + "putcontact", {
        uid,
        name,
        additionalFields
    });
};

const getContacts = () => {
    const currentUser = AuthService.getCurrentUser();
    const uid = currentUser.id;
    console.log(uid);
    return axios.post(API_URL + "getcontacts", {
        uid
    });
};

const updateContact = (oldname, name, additionalFields) => {
    const currentUser = AuthService.getCurrentUser();
    const uid = currentUser.id;
    return axios.patch(API_URL + "updatecontact/" + oldname, {
        uid,
        name,
        additionalFields
    });
};

const deleteContact = (name) => {
    const currentUser = AuthService.getCurrentUser();
    const uid = currentUser.id;
    return axios.patch(API_URL + "deletecontacts/" + name, {
        uid
    });
}

const ContactService = {
    createContact,
    getContacts,
    updateContact,
    deleteContact
}

export default ContactService;