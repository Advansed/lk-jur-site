import { useState } from "react";
import { RegistrationInfo } from "./loginStore";
import { getData } from "../Store";
import { toPDF } from "../Files";

const initialRegistrationInfo: RegistrationInfo = {
  Контрагент: null,
  ИНН: "",
  Наименование: "",
  КонтактныйТелефон: "",
  элПочта: "",
  Фамилия: "",
  Имя: "",
  Отчество: "",
  Файлы: {
    Устав: [],
    Карточка: [],
  },
  Согласие: false,
};

export const useReg = () => {
  const [info, setInfo] = useState<RegistrationInfo>(initialRegistrationInfo);
  const [alert, setAlert] = useState(false);
  const [page, setPage] = useState(0);
  const [upd, setUpd] = useState(0);
  const [modal, setModal] = useState<any>();
  const [load, setLoad] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const save = async () => {
    setLoad(true);

    const updatedInfo = { ...info };

    if (updatedInfo.Файлы.Устав.length > 1) {
      const pdf = await toPDF(updatedInfo.Файлы.Устав, "Устав.pdf");
      updatedInfo.Файлы.Устав = [{ dataUrl: pdf, format: "pdf" }];
    }

    if (updatedInfo.Файлы.Карточка.length > 1) {
      const pdf = await toPDF(updatedInfo.Файлы.Карточка, "Карточка.pdf");
      updatedInfo.Файлы.Карточка = [{ dataUrl: pdf, format: "pdf" }];
    }

    const res = await getData("jur_registration", updatedInfo);
    if (!res.error) {
      setAlert(true);
    } else {
      setMessages([res.message]);
    }

    setLoad(false);
  };

  const validate = (): boolean => {
    console.log("test " + page);
    console.log(info);
    let jarr: string[] = [];
    
    if (page === 0) {
      if (info.ИНН === "") jarr = [...jarr, "Заполните ИНН"];
      if (info.КонтактныйТелефон === "") jarr = [...jarr, "Заполните контактный телефон"];
      if (info.элПочта === "") jarr = [...jarr, "Заполните электронную почту"];
      if (!info.Согласие) jarr = [...jarr, "Нужно согласие на обработку персональных данных"];

      if (jarr.length > 0) {
        setMessages(jarr);
        return false;
      }
    } else {
      if (info.ИНН.length > 10) {
        if (info.Файлы.Устав.length === 0) jarr = [...jarr, "Прикрепите копия паспорта"];
        if (info.Файлы.Карточка.length === 0) jarr = [...jarr, "Прикрепите карточку ИП (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)"];
      } else {
        if (info.Файлы.Устав.length === 0) jarr = [...jarr, "Прикрепите устав предприятия"];
        if (info.Файлы.Карточка.length === 0) jarr = [...jarr, "Прикрепите карточку ЮЛ (юр. адрес, конт.тел. эл. почта, р/с, ОКВЭД)"];
      }
      if (jarr.length > 0) {
        setMessages(jarr);
        console.log(jarr);
        return false;
      }
    }
    return true;
  };

  const updateInfo = (updates: Partial<RegistrationInfo>) => {
    setInfo((prev) => ({ ...prev, ...updates }));
  };

  const handleContragentChange = (e: any) => {
    console.log(e);
    const updatedInfo: RegistrationInfo = {
      ...info,
      Контрагент: e || "",
      ИНН: e?.data?.inn || "",
      Наименование: e?.value || "",
    };

    if (e?.data?.fio !== undefined) {
      updatedInfo.Имя = e.data.fio.name || "";
      updatedInfo.Фамилия = e.data.fio.surname || "";
      updatedInfo.Отчество = e.data.fio.patronymic || "";
    }

    setInfo(updatedInfo);
    setUpd((prev) => prev + 1);
  };

  const nextPage = () => {
    if (validate()) {
      setPage((prev) => prev + 1);
      setMessages([]);
    }
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const reset = () => {
    setInfo(initialRegistrationInfo);
    setAlert(false);
    setPage(0);
    setUpd(0);
    setModal(undefined);
    setLoad(false);
    setMessages([]);
  };

  return {
    // State
    info,
    alert,
    page,
    upd,
    modal,
    load,
    messages,
    
    // Setters
    setInfo,
    setAlert,
    setPage,
    setUpd,
    setModal,
    setLoad,
    setMessages,
    
    // Actions
    save,
    validate,
    updateInfo,
    handleContragentChange,
    nextPage,
    prevPage,
    clearMessages,
    reset,
  };
};
