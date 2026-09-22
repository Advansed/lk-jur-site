import { useEffect } from 'react';
import { getData } from '../Store';
import { useContactsStore } from './contactsStore';

export async function loadContacts(): Promise<void> {
  const { setContacts } = useContactsStore.getState();
  const res = await getData('jur_contacts', {});
  if (!res.error) {
    setContacts(res.data ?? null);
  } else {
    setContacts(null);
  }
}

export const useContacts = () => {
  const contacts = useContactsStore((state) => state.contacts);

  useEffect(() => {
    loadContacts();
  }, []);

  return {
    contacts,
    loadContacts,
  };
};
