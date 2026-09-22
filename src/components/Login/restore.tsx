import React, { useState } from "react";
import { IonButton, IonCard, IonInput, IonLoading } from "@ionic/react";
import { getData } from "../Store";
import "./login.css";

interface RestoreProps {
  onCancel: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function Restore({ onCancel, onSuccess, onError }: RestoreProps): JSX.Element {
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);

  async function handleRestore() {
    setLoad(true);
    
    if (email === "") {
      setLoad(false);
      onError("Введите эл. почту");
      return;
    }

    const res = await getData("jur_restore", { email });
    console.log(res);
    
    if (!res.error) {
      setEmail("");
      onSuccess(res.message);
    } else {
      setEmail("");
      onError(res.message);
    }

    setLoad(false);
  }

  return (
    <>
      <IonLoading isOpen={load} message={"Подождите..."} />
      <div className="cl-prim">
        <div className="flex ml-2 mr-2 mt-1 l-bg1 pl-1 pr-1">
          <IonInput
            type="text"
            placeholder="Эл. почта"
            className="cl-prim fs-bold"
            value={email}
            onIonChange={(e) => {
              setEmail(e.target.value as string);
            }}
          />
        </div>

        <div className="flex ml-2 mr-2">
          <IonButton
            className="mt-1 w-50"
            expand="block"
            color="tertiary"
            mode="ios"
            onClick={onCancel}
          >
            Отмена
          </IonButton>
          <IonButton
            className="mt-1 w-50"
            expand="block"
            color="tertiary"
            mode="ios"
            onClick={handleRestore}
          >
            Отправить
          </IonButton>
        </div>
      </div>
    </>
  );
}
