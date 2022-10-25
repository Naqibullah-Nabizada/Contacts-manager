import './App.css';

import { confirmAlert } from 'react-confirm-alert';
// import {toast, ToastContainer} from 'react-toastify';

import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import ViewContact from './components/contacts/ViewContact';

import { createContact, deleteContact, getAllContacts, getAllGroups } from './services/contactService';
import { COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from './helpers/colors';

const App = () => {

  const [loading, setLoading] = useState(false);
  const [getContacts, setContacts] = useState([]);
  const [getFilteredContacts, setFilteredContacts] = useState([]);
  const [getGroups, setGroups] = useState([]);
  const [getContact, setContact] = useState({});

  const [query, setQuery] = useState({ text: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status, data } = await createContact(getContact);

      if (status === 201) {
        const allContacts = [...getContacts, data];
        setContacts(allContacts);
        setFilteredContacts(allContacts);
        setContact({});
        setLoading(false);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const setContactInfo = (event) => {
    setContact({
      ...getContact,
      [event.target.name]: event.target.value
    })
  }

  const contactSearch = (event) => {
    setQuery({ ...query, text: event.target.value });
    const allContacts = getContacts.filter((contact) => {
      return contact.fullname.includes(event.target.value);
    });
    console.log(allContacts);
    setFilteredContacts(allContacts);
  }

  const confirm = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div dir='rtl' className='p-3' style={{ background: CURRENTLINE, border: `1px solid ${PURPLE}`, borderRadius: '1rem' }}>
            <h4 style={{ color: YELLOW }} className="text-center">پاک کردن مخاطب</h4>
            <p style={{ color: FOREGROUND }}>میخوای مخاطب <span className='text-warning'>{contactFullname}</span> را پاک کنی ؟</p>
            <button onClick={() => {
              removeContact(contactId);
              onClose();
            }} className="btn-sm mx-2" style={{ background: PURPLE }}>مطمن هستم</button>
            <button onClick={onClose} className="btn-sm" style={{ background: COMMENT }}>انصراف</button>
          </div>
        )
      }
    })
  }

  const removeContact = async (contactId) => {
    try {
      setLoading(true);
      const response = await deleteContact(contactId);
      if (response) {
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  }

  return (
    <div className='App'>
      <Navbar query={query} search={contactSearch} />
      <Routes>
        <Route path='/' element={<Navigate to="/contacts" />} />
        <Route path='/contacts' element={<Contacts contacts={getFilteredContacts} loading={loading} confirmDelete={confirm} />} />
        <Route path='/contacts/add' element={<AddContact loading={loading} groups={getGroups} setContactInfo={setContactInfo} contact={getContact} createContactForm={createContactForm} />} />
        <Route path='/contacts/:contactId' element={<ViewContact />} />
        <Route path='/contacts/edit/:contactId' element={<EditContact />} />
      </Routes>
    </div>
  )
}

export default App;;