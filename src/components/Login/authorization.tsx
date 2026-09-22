import React, { useEffect, useState } from "react";
import { IonButton, IonCard, IonInput, IonLoading, isPlatform } from "@ionic/react";
import styles from "./authorization.module.css";

interface AuthInfo {
  login: string;
  password: string;
  email: string;
  version: string;
  mode: string;
}

type RestorePage = "restoreSuccess" | "restoreError";

interface AuthorizationProps {
  onAuthenticate: (data: { login: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  onShowRegistration: () => void;
  onShowRestore: () => void;
  restorePage?: RestorePage;
  restoreMessage?: string;
  onBackToAuth: () => void;
}

export function Authorization({ 
  onAuthenticate, 
  onShowRegistration, 
  onShowRestore,
  restorePage,
  restoreMessage,
  onBackToAuth
}: AuthorizationProps): JSX.Element {
  
  const [info, setInfo] = useState<AuthInfo>({
    login:    "",
    password: "",
    email:    "",
    version:  "7.1",
    mode:     "android",
  });

  const [upd, setUpd] = useState(0);
  const [message, setMessage] = useState<{type: string, text: string} | string | null>(null);
  const [load, setLoad] = useState(false);

  async function handleAuth() {
    setLoad(true);
    setMessage(null);
    
    if (info.password === "" || info.login === "") {
      setInfo({ ...info, login: "", password: "" });
      setMessage({
        type: "error",
        text: "Заполните все поля!"
      });
      setLoad(false);
      return;
    }

    const result = await onAuthenticate({
      login:      info.login,
      password:   info.password,
    });

    if (!result.success) {
      setInfo({ ...info, login: "", password: "" });
      setUpd(upd + 1);
      setMessage({
        type: "error",
        text: result.error || "Ошибка авторизации"
      });
    }

    setLoad(false);
  }

  useEffect(() => {
    const login = null // localStorage.getItem("stngjur.phone");
    const pass = null //localStorage.getItem("stngjur.pass");

    console.log("use login ")
    if (login !== null && pass !== null) {
      setInfo({ ...info, login, password: pass });
    }
  }, []);

  // Определяем класс для кнопки в зависимости от платформы
  const getButtonClass = () => {
    return isPlatform("ios") ? `${styles.button} ${styles.iosButton}` : `${styles.button} ${styles.androidButton}`;
  };

  return (
    <>
      <IonLoading isOpen={load} message={"Подождите..."} />
      
      <div className={styles.authorizationContainer}>
        <div className={styles.header}>
          <img
            src="assets/logo2.1c3a9d80.svg"
            alt="Логотип"
            className={styles.logo}
          />
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>Авторизация</h1>

          {restorePage === "restoreSuccess" ? (
            <div className={styles.card}>
              <IonCard className={styles.infoMessage}>
                <div className="ml-1 mt-1 fs-11">
                  <b>Результат запроса:</b>
                </div>
                <div>
                  <p className="ml-2 fs-12">{" - " + restoreMessage}</p>
                </div>
                <div>
                  <button
                    className={`${styles.button} ${isPlatform("ios") ? styles.iosButton : styles.androidButton}`}
                    onClick={onBackToAuth}
                  >
                    Закрыть
                  </button>
                </div>
              </IonCard>
            </div>
          ) : restorePage === "restoreError" ? (
            <div className={styles.card}>
              <IonCard className={styles.errorMessage}>
                <div className="ml-1 mt-1 fs-11">
                  <b>Что то пошло не так...</b>
                </div>
                <div>
                  <p className="ml-2 fs-12">{" - " + restoreMessage}</p>
                </div>
                <div>
                  <button
                    className={`${styles.button} ${isPlatform("ios") ? styles.iosButton : styles.androidButton}`}
                    onClick={onShowRestore}
                  >
                    Закрыть
                  </button>
                </div>
              </IonCard>
            </div>
          ) : (
            <>
              <div className={styles.registerPrompt}>
                <span>Еще нет аккаунта?</span>
                <a 
                  className={styles.registerLink}
                  onClick={(e) => {
                    e.preventDefault();
                    onShowRegistration();
                  }}
                >
                  Зарегистрируйтесь
                </a>
              </div>

              <div className={styles.card}>
                <div className={styles.inputGroup}>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      placeholder="Логин"
                      className={styles.input}
                      value={info.login}
                      onChange={(e) => {
                        setInfo({ ...info, login: e.target.value as string });
                      }}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                    <input
                      type="password"
                      placeholder="Пароль"
                      className={styles.input}
                      value={info.password}
                      onChange={(e) => {
                        setInfo({ ...info, password: e.target.value as string });
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAuth();
                        }
                      }}
                    />
                  </div>

                  {message && (
                    <div className={
                      typeof message === 'string' 
                        ? styles.errorMessage 
                        : `${styles.message} ${message.type === 'error' ? styles.errorMessage : 
                            message.type === 'success' ? styles.successMessage : styles.infoMessage}`
                    }>
                      {typeof message === 'string' ? message : message.text}
                    </div>
                  )}

                  <button
                    className={getButtonClass()}
                    onClick={handleAuth}
                    disabled={load}
                  >
                    {load ? "Вход..." : "Войти"}
                  </button>

                  <div className="mt-1 a-center">
                    <button
                      className={styles.linkButton}
                      onClick={onShowRestore}
                    >
                      Забыли пароль?
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Кастомный лоадер, если IonLoading не подходит */}
      {load && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}
    </>
  );
}

// Альтернативная версия с использованием Ion компонентов
export function AuthorizationIon({ 
  onAuthenticate, 
  onShowRegistration, 
  onShowRestore,
  restorePage,
  restoreMessage,
  onBackToAuth
}: AuthorizationProps): JSX.Element {
  
  const [info, setInfo] = useState<AuthInfo>({
    login: "",
    password: "",
    email: "",
    version: "7.1",
    mode: "android",
  });

  const [upd, setUpd] = useState(0);
  const [message, setMessage] = useState<{type: string, text: string} | string | null>(null);
  const [load, setLoad] = useState(false);

  async function handleAuth() {
    setLoad(true);
    setMessage(null);
    
    if (info.password === "" || info.login === "") {
      setInfo({ ...info, login: "", password: "" });
      setMessage({
        type: "error",
        text: "Заполните все поля!"
      });
      setLoad(false);
      return;
    }

    const result = await onAuthenticate({
      login: info.login,
      password: info.password,
    });

    if (!result.success) {
      setInfo({ ...info, login: "", password: "" });
      setUpd(upd + 1);
      setMessage({
        type: "error",
        text: result.error || "Ошибка авторизации"
      });
    }

    setLoad(false);
  }

  useEffect(() => {
    const login = localStorage.getItem("stngjur.phone");
    const pass = localStorage.getItem("stngjur.pass");

    if (login !== null && pass !== null) {
      setInfo({ ...info, login, password: pass });
    }
  }, []);

  return (
    <>
      <IonLoading isOpen={load} message={"Подождите..."} />
      
      <div className={styles.authorizationContainer}>
        <div className={styles.header}>
          <img
            src="assets/logo2.1c3a9d80.svg"
            alt="Логотип"
            className={styles.logo}
          />
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>Авторизация</h1>

          {restorePage === "restoreSuccess" ? (
            <div className={styles.card}>
              <div className={styles.successMessage}>
                <div className="ml-1 mt-1 fs-11">
                  <b>Результат запроса:</b>
                </div>
                <div>
                  <p className="ml-2 fs-12">{" - " + restoreMessage}</p>
                </div>
                <div>
                  <IonButton
                    className={isPlatform("ios") ? styles.iosButton : styles.androidButton}
                    expand="block"
                    color="primary"
                    onClick={onBackToAuth}
                  >
                    Закрыть
                  </IonButton>
                </div>
              </div>
            </div>
          ) : restorePage === "restoreError" ? (
            <div className={styles.card}>
              <div className={styles.errorMessage}>
                <div className="ml-1 mt-1 fs-11">
                  <b>Что то пошло не так...</b>
                </div>
                <div>
                  <p className="ml-2 fs-12">{" - " + restoreMessage}</p>
                </div>
                <div>
                  <IonButton
                    className={isPlatform("ios") ? styles.iosButton : styles.androidButton}
                    expand="block"
                    color="primary"
                    onClick={onShowRestore}
                  >
                    Закрыть
                  </IonButton>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.registerPrompt}>
                <span>Еще нет аккаунта?</span>
                <a 
                  className={styles.registerLink}
                  onClick={(e) => {
                    e.preventDefault();
                    onShowRegistration();
                  }}
                >
                  Зарегистрируйтесь
                </a>
              </div>

              <div className={styles.card}>
                <div className={styles.inputGroup}>
                  <div className={styles.inputContainer}>
                    <IonInput
                      type="text"
                      placeholder="Логин"
                      className={styles.input}
                      value={info.login}
                      onIonChange={(e) => {
                        setInfo({ ...info, login: e.detail.value as string });
                      }}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                    <IonInput
                      type="password"
                      placeholder="Пароль"
                      className={styles.input}
                      value={info.password}
                      onIonChange={(e) => {
                        setInfo({ ...info, password: e.detail.value as string });
                      }}
                    />
                  </div>

                  {message && (
                    <div className={
                      typeof message === 'string' 
                        ? styles.errorMessage 
                        : `${styles.message} ${message.type === 'error' ? styles.errorMessage : 
                            message.type === 'success' ? styles.successMessage : styles.infoMessage}`
                    }>
                      {typeof message === 'string' ? message : message.text}
                    </div>
                  )}

                  <IonButton
                    className={isPlatform("ios") ? styles.iosButton : styles.androidButton}
                    expand="block"
                    color="primary"
                    onClick={handleAuth}
                    disabled={load}
                  >
                    {load ? "Вход..." : "Войти"}
                  </IonButton>

                  <div className="mt-1 a-center">
                    <IonButton
                      fill="clear"
                      color="medium"
                      onClick={onShowRestore}
                      className={styles.linkButton}
                    >
                      Забыли пароль?
                    </IonButton>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}