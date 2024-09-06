import phoneBookContacts from "../../contacts.json";
import { useState, useEffect } from "react";
import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";
import css from "./App.module.css";

export default function App() {
  const [filter, setFilter] = useState("");

  const [contacts, setContacts] = useState(() => {
    const savedContacts = window.localStorage.getItem("saved-contacts");
    try {
      if (savedContacts) {
        const parsedContacts = JSON.parse(savedContacts);
        if (Array.isArray(parsedContacts)) {
          return parsedContacts;
        }
      }
    } catch (error) {
      console.error("Error parsing contacts from localStorage", error);
    }
    return phoneBookContacts;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("saved-contacts", JSON.stringify(contacts));
    } catch (error) {
      console.error("Error saving contacts to localStorage", error);
    }
  }, [contacts]);

  const addContacts = (newContact) => {
    setContacts((currentContacts) => [...currentContacts, newContact]);
  };

  const deleteContacts = (contactId) => {
    setContacts((currentContacts) =>
      currentContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const filterContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onAdd={addContacts} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList contacts={filterContacts} onDelete={deleteContacts} />
    </div>
  );
}
