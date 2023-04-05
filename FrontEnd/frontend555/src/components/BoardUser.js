// import React, { useState, useEffect } from "react";

// import UserService from "../services/user.service";

// const BoardUser = () => {
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     UserService.getUserBoard().then(
//       (response) => {
//         setContent(response.data);
//       },
//       (error) => {
//         const _content =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         setContent(_content);
//       }
//     );
//   }, []);

//   return (
//     <div className="container">
//       <header className="jumbotron">
//         <h3>{content}</h3>
//       </header>
//     </div>
//   );
// };

// export default BoardUser;

import React, { useState } from "react";
import ContactService from "../services/contact.service";

const ContactList = () => {
  const [contacts, setContacts] = useState([
    { name: "John Doe", email: "johndoe@example.com", phone: "123-456-7890" },
    { name: "Jane Smith", email: "janesmith@example.com", phone: "987-654-3210" },
    { name: "Bob Johnson", email: "bobjohnson@example.com", phone: "555-555-5555" },
    { name: "John Doe", email: "johndoe@example.com", phone: "123-456-7890" },
    { name: "Jane Smith", email: "janesmith@example.com", phone: "987-654-3210" },
    { name: "Bob Johnson", email: "bobjohnson@example.com", phone: "555-555-5555" },
    { name: "John Doe", email: "johndoe@example.com", phone: "123-456-7890" },
    { name: "Jane Smith", email: "janesmith@example.com", phone: "987-654-3210" },
    { name: "Bob Johnson", email: "bobjohnson@example.com", phone: "555-555-5555" },
    { name: "John Doe", email: "johndoe@example.com", phone: "123-456-7890" },
    { name: "Jane Smith", email: "janesmith@example.com", phone: "987-654-3210" },
    { name: "Bob Johnson", email: "bobjohnson@example.com", phone: "555-555-5555" }
  ]);
  
  const [selectedContact, setSelectedContact] = useState(null);
  const [newContactName, setNewContactName] = useState('');
  const [newContactFields, setNewContactFields] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);

  //new COntact
  const handleNewContactField = () => {
    setNewContactFields([...newContactFields, { label: '', value: '' }]);
  };

  const handleRemoveContactField = () => {
    let protoArray = [...newContactFields]
    protoArray.pop()
    setNewContactFields([...protoArray]);
  };

  const handleNewContactFieldChange = (index, key, value) => {
    const fields = [...newContactFields];
    fields[index][key] = value;
    setNewContactFields(fields);
  };

  const handleNewContactSubmit = (event) => {
    event.preventDefault();
    ContactService.createContact(newContactName, newContactFields)
    console.log({ name: newContactName, fieldz: newContactFields });
    //setNewContactName('');
    //setNewContactFields([]);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleFieldChange = (fieldName, newValue) => {
    setSelectedContact((prev) => ({ ...prev, [fieldName]: newValue }));
  };

  const handleEditModeToggle = () => {
    setEditMode((prev) => !prev);
  };

  const handleAddModeToggle = () => {
    setAddMode((prev) => !prev);
    handleContactClick(null);
    setNewContactName('');
    setNewContactFields([]);
  };

  return (
    <div>
      <div class="buttonGroup">
        {selectedContact ? (
          <>
            <button
              className="btn btn-success"
              onClick={handleAddModeToggle}
            >
              Add New Contact
            </button>

            <button
              className="btn btn-danger"
              onClick={handleEditModeToggle}
            >
              Delete Contact
            </button>
            <button
              className="btn btn-primary"
              onClick={handleEditModeToggle}
            >
              Edit Contact
            </button>
          </>
        ) : (<></>)}
      </div>
      <div className="row">
        <div className="col-sm-2">
          <ul className="list-group">
            {contacts.map((contact, index) => (
              <button
                key={index}
                className={`list-group-item list-group-item-action ${selectedContact === contact ? "active" : ""
                  }`}
                onClick={() => handleContactClick(contact)}
              >
                {contact.name}
              </button>
            ))}
          </ul>
        </div>
        <div className="col-sm-8" >
          {selectedContact ? (
            <>
              <h2>{selectedContact.name}</h2>
              <p>Email: {selectedContact.email}</p>
              <p>Phone: {selectedContact.phone}</p>
              {editMode ? (
                <>
                  <div className="mb-3">
                    <label htmlFor="editName" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editName"
                      value={selectedContact.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editEmail" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="editEmail"
                      value={selectedContact.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editPhone" className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="editPhone"
                      value={selectedContact.phone}
                      onChange={(e) => handleFieldChange("phone", e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={handleEditModeToggle}
                  >
                    Edit
                  </button>
                </>
              )}
            </>
          ) : (
            <form onSubmit={handleNewContactSubmit}>
              <div style={{ marginBottom: "10px" }}>
                <h2>Create New Contact</h2>
                <div>
                  <label>Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={newContactName}
                    required
                    onChange={(e) => setNewContactName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Fields:</label>
                  {newContactFields.map((field, index) => (
                    <div style={{ marginBottom: "20px" }} key={index}>
                      <input
                        type="text"
                        className="form-control"
                        value={field.label}
                        placeholder="Label"
                        onChange={(e) =>
                          handleNewContactFieldChange(
                            index,
                            'label',
                            e.target.value
                          )
                        }
                      />
                      <input
                        className="form-control"
                        type="text"
                        value={field.value}
                        placeholder="Value"
                        onChange={(e) =>
                          handleNewContactFieldChange(
                            index,
                            'value',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}

                </div>
                <div className="buttonGroup" style={{ columnGap: "10px" }}>
                  <button type="button" className="btn btn-success" onClick={handleNewContactField}>
                    Add Field
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleRemoveContactField}>
                    Remove Last Field
                  </button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactList;
