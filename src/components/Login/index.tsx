import React, { useState } from "react";
import { useLogin } from "./useLogin";
import { Registration } from "./registration";
import { Authorization } from "./authorization";
import { Restore } from "./restore";
import "./login.css";

type AuthPage = "auth" | "restore" | "restoreSuccess" | "restoreError";

export function Login(): JSX.Element {
  const {
    reg,
    authenticate,
    showRegistration,
    showAuthorization,
  } = useLogin();

  const [authPage, setAuthPage] = useState<AuthPage>("auth");
  const [restoreMessage, setRestoreMessage] = useState<string>("");

  const handleRestoreSuccess = (message: string) => {
    setRestoreMessage(message);
    setAuthPage("restoreSuccess");
  };

  const handleRestoreError = (message: string) => {
    setRestoreMessage(message);
    setAuthPage("restoreError");
  };

  const handleShowRestore = () => {
    setAuthPage("restore");
  };

  const handleBackToAuth = () => {
    setAuthPage("auth");
    setRestoreMessage("");
  };

  if (reg) {
    return <Registration onShowAuthorization={showAuthorization} />;
  } else {
    return (
      <>
        {authPage === "restore" ? (
          <Restore
            onCancel={handleBackToAuth}
            onSuccess={handleRestoreSuccess}
            onError={handleRestoreError}
          />
        ) : (
          <Authorization
            onAuthenticate={authenticate}
            onShowRegistration={showRegistration}
            onShowRestore={handleShowRestore}
            restorePage={authPage === "restoreSuccess" || authPage === "restoreError" ? authPage : undefined}
            restoreMessage={restoreMessage}
            onBackToAuth={handleBackToAuth}
          />
        )}
      </>
    );
  }
}
