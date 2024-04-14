import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from './redux/contactsOps';
import { errorSelector, loaderSelector } from './redux/selectors';

import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import Loader from './components/Loader/Loader';

import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const loadingState = useSelector(loaderSelector);
  const errorState = useSelector(errorSelector);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.appContainer}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loadingState && <Loader />}
      {errorState && <h2>{errorState}</h2>}
      {!loadingState && <ContactList />}
    </div>
  );
}

export default App;
