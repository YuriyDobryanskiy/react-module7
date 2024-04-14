import { useId, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUserLock } from 'react-icons/fa6';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

import styles from './ContactForm.module.css';

import { addContact } from '../../redux/contactsOps';

const ContactForm = () => {
  const dataValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, 'Phone number is not valid')
      .required('Required')
      .min(12, 'Too Short!')
      .max(13, 'Too Long!'),
  });

  const usernameId = useId();
  const phoneNumberId = useId();

  const dispatch = useDispatch();
  const addUser = (data, actions) => {
    dispatch(addContact({ ...data }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        phoneNumber: '',
      }}
      onSubmit={addUser}
      validationSchema={dataValidationSchema}
    >
      <Form className={styles.addContactForm}>
        <div className={styles.inputFieldContainer}>
          <label htmlFor={usernameId}>Name</label>
          <div className={styles.inputSvgContainer}>
            <Field
              type="text"
              name="name"
              id={usernameId}
              className={clsx(styles.inputField, styles.inputFieldAddition)}
            />
          </div>
          <ErrorMessage
            name="name"
            render={msg => <span className={styles.formError}>{msg}</span>}
          />
        </div>
        <div className={styles.inputFieldContainer}>
          <label htmlFor={phoneNumberId}>Number</label>
          <Field
            type="text"
            name="phoneNumber"
            id={phoneNumberId}
            className={styles.inputField}
            placeholder="380xxxxxxxxx"
          />
          <ErrorMessage
            name="phoneNumber"
            render={msg => <span className={styles.formError}>{msg}</span>}
          />
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
