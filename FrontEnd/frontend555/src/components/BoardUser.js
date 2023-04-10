import React, { useState, useEffect } from "react";
import ContactService from "../services/contact.service";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);;
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedContactFields, setSelectedContactFields] = useState([]);
  const [selectedContactName, setSelectedContactName] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newContactFields, setNewContactFields] = useState([]);
  const [editMode, setEditMode] = useState(false);

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
      response.data.forEach(contact => {
        contact.additionalFields = objectToObjectArray(contact.additionalFields);
      })
      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //add new contact field(addmode) 
  const handleNewContactField = () => {
    setNewContactFields([...newContactFields, { label: '', value: '' }]);
  };

  //add new contact field(editmode) 
  const handleNewSelectedContactField = () => {
    setSelectedContactFields([...selectedContactFields, { label: '', value: '' }]);
  };

  //remove contact field (add mode)
  const handleRemoveContactField = () => {
    let protoArray = [...newContactFields]
    protoArray.pop()
    setNewContactFields([...protoArray]);
  };

  //remove contact field (edit mode)
  const handleRemoveSelectedContactField = () => {
    let protoArray = [...selectedContactFields]
    protoArray.pop()
    setSelectedContactFields([...protoArray]);
  };

  //remove a chosen field
  const handleRemoveMiddleSelectedContactField = (index) => {
    let protoArray = [...selectedContactFields]
    console.log(index);
    protoArray.splice(index, 1)
    setSelectedContactFields([...protoArray]);
  };

  //add contact field(add mode)
  const handleNewContactFieldChange = (index, key, value) => {
    const fields = [...newContactFields];
    fields[index][key] = value;
    setNewContactFields(fields);
  };

  //add contact field(edit mode)
  const handleSelectedContactFieldChange = (index, key, value) => {
    const fields = [...selectedContactFields];
    fields[index][key] = value;
    setSelectedContactFields(fields);
  };

  //submit new contact
  const handleNewContactSubmit = (event) => {
    event.preventDefault();
    ContactService.createContact(newContactName, newContactFields)
      .then(() => {
        setNewContactName('');
        setNewContactFields([]);
        getContacts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //save edited contact 
  const handleContactUpdate = (event) => {
    event.preventDefault();
    ContactService.updateContact(selectedContact._id, selectedContactName, selectedContactFields)
      .then(() => {
        clearSelectedContacts()
        getContacts()
          .then(() => {
            contacts.forEach((contact) => {
              if (contact.name === selectedContactName) {
              }
            });
          })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Click on contact list
  const handleContactClick = (contact) => {
    setEditMode(false);
    setSelectedContact(contact);
    setSelectedContactFields([...contact.additionalFields]);
    setSelectedContactName(contact.name);
  };

  //turn on/off edit mode
  const handleEditModeToggle = () => {
    setEditMode((prev) => !prev);
  };

  //delete contact
  const handleDelete = (event) => {
    event.preventDefault();
    ContactService.deleteContact(selectedContact._id)
      .then(() => {
        clearSelectedContacts()
        getContacts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //switch to add new contact mode
  const handleAddModeToggle = () => {
    clearSelectedContacts();
    setNewContactName('');
    setNewContactFields([]);
  };

  //cancel changes in add mode
  const resetNewContacts = () => {
    setNewContactName('');
    setNewContactFields([]);
  }

  //cancel changes in edit mode
  const resetSelectedContacts = () => {
    setSelectedContactFields([...selectedContact.additionalFields]);
    setSelectedContactName(selectedContact.name);
    setEditMode(false);
  }

  //helper function: clear the states for selected contact
  const clearSelectedContacts = () => {
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
            <input style={{ width: "300px" }} type="text" className="form-control" placeholder="Search Contact" />
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
                    <div style={{ marginBottom: "10px", paddingBottom: "10px" }}>
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
                          <div key={index}>
                            <div style={{ marginBottom: "10px" }}>
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
                            <div style={{ marginBottom: "20px" }}><button type="button" onClick={() => { handleRemoveMiddleSelectedContactField(index) }} class="btn btn-danger">
                              <i class="bi bi-trash"></i> Delete
                            </button></div>
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
                        <button type="submit" className="btn btn-warning" onClick={resetSelectedContacts} >Cancel</button>
                      </div>
                    </div>
                  </form>
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
                  <button type="submit" className="btn btn-warning" onClick={resetNewContacts} >Cancel</button>
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
