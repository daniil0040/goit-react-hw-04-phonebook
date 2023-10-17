import { Component } from "react";
import { AddContactForm } from "./AddContactForm/AddContactForm";
import { ContactList } from "./ContactList/ContactList";
import { nanoid } from 'nanoid'
import { ContactListFilter } from "./ContactListFilter/ContactListFilter";


export class App extends Component {
  state = {
  contacts: [],
  filter: ''
  }

  hendleDeleteItem = contactId => {
    const updatedContacts = this.state.contacts.filter(({ id }) => id !== contactId)
    this.setState(() => ({
      contacts: updatedContacts,
    }))
  }

  hendleAddContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts,{...newContact,id: nanoid()}]
    }) )
  }

  hendleFilter = newFilter => {
    this.setState(() => ({
      filter: `${newFilter.toLowerCase().trim()}`
    }))
  }

  getVisibleContacts = () => {
    return this.state.contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(this.state.filter)
    })
  }

  render() {
    const visibleContacts = this.getVisibleContacts()
    return (
      <div>
        <h1>Phonebook</h1>
        <AddContactForm onAddContact={this.hendleAddContact} contacts={this.state.contacts}/>
        <h2>Contacts</h2>
        <ContactListFilter onFilter={this.hendleFilter} filter={this.state.filter} />
        <ContactList contacts={visibleContacts} onDelete={ this.hendleDeleteItem} />
    </div>
  ); 
  }
};
