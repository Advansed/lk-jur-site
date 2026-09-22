import { useEffect } from 'react';
import { getData } from '../Store';
import { useLoginStore } from '../Login/loginStore';
import { useActSverkiStore } from './actSverkiStore';

export function getLoginToken(): string | undefined {
  return useLoginStore.getState().login?.token;
}

export async function loadInvoicesAndDocs(loginOverride?: any): Promise<void> {
  const login = loginOverride ?? useLoginStore.getState().login;
  const { setInvoices, setDocs } = useActSverkiStore.getState();

  if (!login) {
    setInvoices([]);
    setDocs([]);
    return;
  }

  const invoicesRes = await getData('jur_invoices', login);
  if (!invoicesRes.error) {
    setInvoices(invoicesRes.data || []);
  } else {
    setInvoices([]);
  }

  const docsRes = await getData('jur_documents', login);
  if (!docsRes.error) {
    setDocs(docsRes.data || []);
  } else {
    setDocs([]);
  }
}

export async function loadActsverkiImage(): Promise<string | null> {
  const { actsverki, setActsverki } = useActSverkiStore.getState();
  if (actsverki) return actsverki;

  const res = await getData('jur_actsverki', {
    token: getLoginToken(),
  });

  if (!res.error) {
    setActsverki(res.data);
    return res.data;
  }
  return null;
}

export async function loadDocAct(guid: string): Promise<string | null> {
  const res = await getData('jur_docs_act', {
    token: getLoginToken(),
    guid,
  });
  return res.error ? null : res.data;
}

export async function loadDocSf(guid: string): Promise<string | null> {
  const res = await getData('jur_docs_sf', {
    token: getLoginToken(),
    guid,
  });
  return res.error ? null : res.data;
}

export async function loadInvoiceImage(id: string): Promise<string | null> {
  const res = await getData('jur_invoice_image', {
    token: getLoginToken(),
    id,
  });
  return res.error ? null : res.data;
}

export async function sendInvoiceMail(params: {
  id: string;
  email: string;
  image: string;
}): Promise<{ error: boolean; message?: string }> {
  return getData('jur_sendMail', {
    token: getLoginToken(),
    type: 'Квитанция',
    name: 'Kvitok',
    email: params.email,
    image: params.image,
  });
}

export const useActSverki = () => {
  const invoices = useActSverkiStore((state) => state.invoices);
  const docs = useActSverkiStore((state) => state.docs);
  const actsverki = useActSverkiStore((state) => state.actsverki);
  const login = useLoginStore((state) => state.login);

  useEffect(() => {
    if (login) {
      loadInvoicesAndDocs(login);
    }
  }, [login]);

  return {
    invoices,
    docs,
    actsverki,
    loadInvoicesAndDocs,
    loadActsverkiImage,
    loadDocAct,
    loadDocSf,
    loadInvoiceImage,
    sendInvoiceMail,
    getLoginToken,
  };
};
