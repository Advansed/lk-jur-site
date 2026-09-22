import { useEffect } from 'react';
import { getData } from '../Store';
import { useLoginStore } from '../Login/loginStore';
import { useAgreementsStore, AgreementMessage } from './agreementsStore';

interface SaveIndicationsParams {
  id: string;
  objects: any[];
}

export async function loadDogs(loginOverride?: any): Promise<void> {
  const login = loginOverride ?? useLoginStore.getState().login;
  const { setDogs } = useAgreementsStore.getState();

  if (!login) {
    setDogs([]);
    return;
  }

  const res = await getData('jur_info', login);
  if (!res.error) {
    setDogs(res.data || []);
  } else {
    setDogs([]);
  }
}

export async function saveIndications({ id, objects }: SaveIndicationsParams): Promise<AgreementMessage[]> {
  const login = useLoginStore.getState().login;
  const { setLoad, setMessages } = useAgreementsStore.getState();

  setLoad(true);

  const param = {
    token: login?.token,
    id,
    agreements: [
      {
        id,
        objects: objects.map((e: any) => ({
          id: e.objectId,
          counters: e.counters.map((c: any) => {
            if (c.indice === undefined) return null;
            if (c.indice === c.Indication) return null;
            return { id: c.Id, value: c.indice };
          }),
        })),
      },
    ],
  };

  param.agreements[0].objects.forEach((obj: any) => {
    let jarr: any[] = [];
    obj.counters.forEach((elem: any) => {
      if (elem !== null) jarr = [...jarr, elem];
    });
    obj.counters = jarr;
  });

  let i = 0;
  while (param.agreements[0].objects.length > i) {
    if (param.agreements[0].objects[i].counters.length === 0) {
      param.agreements[0].objects.splice(i, 1);
    } else {
      i = i + 1;
    }
  }

  let messages: AgreementMessage[] = [];

  if (param.agreements[0].objects.length > 0) {
    const res = await getData('jur_indications', param);
    res.forEach((contr: any) => {
      contr.data.forEach((elem: any) => {
        messages = [...messages, { error: elem.error, message: elem.message }];
      });
    });
    setMessages(messages);
    await loadDogs();
  }

  setLoad(false);
  return messages;
}

export const useAgreements = () => {
  const dogs = useAgreementsStore((state) => state.dogs);
  const messages = useAgreementsStore((state) => state.messages);
  const load = useAgreementsStore((state) => state.load);
  const setMessages = useAgreementsStore((state) => state.setMessages);
  const login = useLoginStore((state) => state.login);

  useEffect(() => {
    if (login) {
      loadDogs(login);
    }
  }, [login]);

  return {
    dogs,
    messages,
    load,
    setMessages,
    loadDogs,
    saveIndications,
  };
};
