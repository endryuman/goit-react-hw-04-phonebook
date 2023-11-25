import styles from './ContactForm.module.css';
import { useState } from 'react';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handelSubmit = e => {
    e.preventDefault();
    addContact({
      name,
      number,
    });
    e.target.reset();
  };
  const handleChange = ({ target: { value, name } }) => {
    if (name === 'name') setName(value);
    if (name === 'number') setNumber(value);
  };

  return (
    <form className={styles.contactForm} onSubmit={handelSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        required
      />
      <label htmlFor="number">Number</label>
      <input
        id="number"
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};
