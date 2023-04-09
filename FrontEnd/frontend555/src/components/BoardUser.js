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

import React, { useState, useEffect } from "react";
import ContactService from "../services/contact.service";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  //const contacts2 = ContactService.getContacts();
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedContactFields, setSelectedContactFields] = useState([]);
  const [selectedContactName, setSelectedContactName] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newContactFields, setNewContactFields] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  useEffect(() => {
    getContacts();
  }, []);

  const objectToObjectArray = (obj) => {
    const objectArray = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        objectArray.push({ label: key, value: obj[key] });
      }
    }
    return objectArray;
  };

  const getContacts = async () => {
    try {
      const response = await ContactService.getContacts();;
      console.log(response.data);
      response.data.forEach(contact => {
        contact.additionalFields = objectToObjectArray(contact.additionalFields);
      })
      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //new COntact
  const handleNewContactField = () => {
    setNewContactFields([...newContactFields, { label: '', value: '' }]);
  };

  const handleNewSelectedContactField = () => {
    setSelectedContactFields([...selectedContactFields, { label: '', value: '' }]);
  };

  const handleRemoveContactField = () => {
    console.log(contacts);
    let protoArray = [...newContactFields]
    protoArray.pop()
    setNewContactFields([...protoArray]);
  };

  const handleRemoveSelectedContactField = () => {
    let protoArray = [...selectedContactFields]
    protoArray.pop()
    setSelectedContactFields([...protoArray]);
  };

  const handleNewContactFieldChange = (index, key, value) => {
    const fields = [...newContactFields];
    fields[index][key] = value;
    setNewContactFields(fields);
  };

  const handleSelectedContactFieldChange = (index, key, value) => {
    const fields = [...selectedContactFields];
    fields[index][key] = value;
    setSelectedContactFields(fields);
  };

  const handleNewContactSubmit = (event) => {
    event.preventDefault();
    ContactService.createContact(newContactName, newContactFields)
      .then(() => {
        console.log({ name: newContactName, fieldz: newContactFields });
        setNewContactName('');
        setNewContactFields([]);
        getContacts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleContactUpdate = (event) => {
    event.preventDefault();
    ContactService.updateContact(selectedContact._id, selectedContactName, selectedContactFields)
      .then(() => {
        console.log({ name: selectedContact.name, name2: selectedContactName });
        resetSelectedContacts()
        getContacts()
        .then(() => {
          contacts.forEach((contact) => {
            if (contact.name == selectedContactName) {
              // setEditMode(false);
              // handleContactClick(contact);
              // setTimeout(handleContactClick(contact), 500);
            }
          });
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleContactClick = (contact) => {
    setEditMode(false);
    setSelectedContact(contact);
    setSelectedContactFields(contact.additionalFields);
    setSelectedContactName(contact.name);
    console.log(selectedContact);
  };

  const handleFieldChange = (fieldName, newValue) => {
    setSelectedContact((prev) => ({ ...prev, [fieldName]: newValue }));
  };

  const handleEditModeToggle = () => {
    setEditMode((prev) => !prev);
  };

  
  const handleDelete = (event) => {
    event.preventDefault();
    ContactService.deleteContact(selectedContact._id)
      .then(() => {
        console.log({ name: selectedContact.name});
        resetSelectedContacts()
        getContacts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAddModeToggle = () => {
    setAddMode((prev) => !prev);
    //sets everything back to default for selected contact
    resetSelectedContacts();
    setNewContactName('');
    setNewContactFields([]);
  };

  const resetSelectedContacts = () => {
    //sets everything back to default for selected contact
    setSelectedContact(null);
    setSelectedContactFields([]);
    setSelectedContactName('');
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
              onClick={handleDelete}
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

              {editMode ? (
                <>
                <form onSubmit={handleContactUpdate}>
              <div style={{ marginBottom: "10px" }}>
                <div>
                  <label>Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={selectedContactName}
                    required
                    onChange={(e) => setSelectedContactName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Fields:</label>
                  {selectedContactFields.map((field, index) => (
                    <div style={{ marginBottom: "20px" }} key={index}>
                      <input
                        type="text"
                        className="form-control"
                        value={field.label}
                        placeholder="Label"
                        onChange={(e) =>
                          handleSelectedContactFieldChange(
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
                          handleSelectedContactFieldChange(
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
                  <button type="button" className="btn btn-success" onClick={handleNewSelectedContactField}>
                    Add Field
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleRemoveSelectedContactField}>
                    Remove Last Field
                  </button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </div>
            </form>
                  {/* <div className="mb-3">
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
                  </div> */}
                </>
              ) : (
                <>
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
                  {selectedContactFields.map((field, index) => (
                    <p key={index}>{field.label} : {field.value}</p>
                  ))}
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
