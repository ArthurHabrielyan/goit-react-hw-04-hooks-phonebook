import { useState } from "react";
import { nanoid } from "nanoid";
import style from "./ContactsForm.module.css";
import PropTypes from "prop-types";

export const ContactsForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const reset = (event) => {
    setName("");
    setNumber("");
    event.currentTarget.reset();
  };

  const onChangeInputValue = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    }
    if (name === "number") {
      setNumber(value);
    }
  };

  const addContactItem = (event) => {
    event.preventDefault();
    onSubmit({
      name: name,
      number: number,
      id: nanoid(),
    });
    reset(event);
  };

  return (
    <form className={style.form} onSubmit={addContactItem}>
      <label>
        Name
        <input
          className={style.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={onChangeInputValue}
          value={name}
          required
        />
      </label>

      <label>
        Number
        <input
          className={style.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={onChangeInputValue}
          value={number}
          required
        />
      </label>

      <button className={style.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
