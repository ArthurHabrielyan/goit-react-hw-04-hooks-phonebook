import { useState, useEffect } from "react";
import { ContactsForm } from "./ContactsForm";
import { Section } from "./Section";
import { ContactList } from "./ContactList";
import { Filter } from "./Filter";
import * as localStorage from "./localStorage/localStorageUtils";

const KEY = "contact_key";

export const App = () => {
  const [contacts, setContacts] = useState(localStorage.readItem(KEY) || []);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.saveItem(KEY, contacts);
  }, [contacts]);

  const formSubmitHandler = (contact) => {
    if (contacts.find((item) => item.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts((prevContatcs) => {
      return [...prevContatcs, contact];
    });
  };

  const onChangeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  const onDeleteContact = (contactId) => {
    setContacts(contacts.filter((item) => item.id !== contactId));
  };

  const getVisibleContacts = () => {
    const toLowerCaseContacts = filter.toLocaleLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(toLowerCaseContacts)
    );
  };

  return (
    <div className="container">
      <Section
        title={
          "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d Artagnan"
        }
      >
        <ContactsForm onSubmit={formSubmitHandler} />
        <Filter onChangeFilter={onChangeFilter} filterValue={filter} />
        <ContactList
          contactsArr={getVisibleContacts()}
          deleteContact={onDeleteContact}
        />
      </Section>
    </div>
  );
};
