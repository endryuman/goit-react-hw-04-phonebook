import { useEffect, useState } from 'react';
import Section from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localData = localStorage.getItem('contacts');
    if (localData) {
      return JSON.parse(localData);
    } else {
      return [{ id: 'id-1', name: 'Contact Number', number: '459-12-56' }];
    }
  });
  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    if (checkContactExists(newContact.name)) {
      return;
    }
    const contactsObj = {
      ...newContact,
      id: nanoid(),
    };
    setContacts(prev => [...prev, contactsObj]);
  };

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    if (filter === '') {
      return contacts;
    } else {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  };

  const deleteContact = id => {
    setContacts(prev => prev.filter(el => el.id !== id));
  };

  const checkContactExists = newName => {
    const isNameDuplicate = contacts.some(contact => contact.name === newName);

    if (isNameDuplicate) {
      alert(`${newName} is already in contacts`);
      return true;
    }
  };

  const visibleContacts = getVisibleContacts();
  return (
    <div>
      <Section title="Phonebook">
        <ContactForm addContact={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <ContactsList
          contacts={visibleContacts}
          deleteContact={deleteContact}
        />
      </Section>
    </div>
  );
};
