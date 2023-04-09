import axios from "axios";
import AuthService from "./auth.service";
const API_URL = "http://localhost:3000/api/";

const userContactsUrl = (uid) => {
    return API_URL + "user/" + uid + "/contacts";
};

const createContact = (name, additionalFields) => {
    const currentUser = AuthService.getCurrentUser();
    const uid = currentUser.id;
    return axios.post(userContactsUrl(uid), {
        name,
        additionalFields
    });
};

const getContacts = () => {
    const currentUser = AuthService.getCurrentUser();
    const uid = currentUser.id;
    console.log(uid);
    return axios.get(userContactsUrl(uid));
};

const updateContact = (oldname, name, additionalFields) => {
    const currentUser = AuthService.getCurrentUser();
    const uid = currentUser.id;
    return axios.patch(userContactsUrl(uid) + '/' + oldname, {
        name,
        additionalFields
    });
};

const deleteContact = (name) => {
    const currentUser = AuthService.getCurrentUser();
    const uid = currentUser.id;
    return axios.delete(userContactsUrl(uid) + "/" + name);
}

const ContactService = {
    createContact,
    getContacts,
    updateContact,
    deleteContact
}

export default ContactService;