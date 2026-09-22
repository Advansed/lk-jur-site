import React, { useState, useEffect } from 'react';
import { IonAlert, IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './app.css'
import { Store } from './components/Store';
import { Login } from './components/Login/index';
import { useLoginStore } from './components/Login/loginStore';
import { loadDogs } from './components/Agreements/useAgreements';
import { loadApps } from './components/Apps/useApps';
import { loadServices } from './components/Services/useServices';
import { loadProfile } from './components/Profile/useProfile';
import { loadInvoicesAndDocs } from './components/ActSverki/useActSverki';
import { loadContacts } from './components/Contacts/useContacts';
import PropTypes from 'prop-types';
import OneSignal from 'onesignal-cordova-plugin'



setupIonicReact();


function App() {
  const auth = useLoginStore((state) => state.auth);
  const login = useLoginStore((state) => state.login);
  const setReg = useLoginStore((state) => state.setReg);
  const setAuth = useLoginStore((state) => state.setAuth);
  const setLogin = useLoginStore((state) => state.setLogin);
  const setToken = useLoginStore((state) => state.setToken);
  
  const [ message, setMessage] = useState<any>()
    
  Store.subscribe({ num: 3, type: "message", func: ()=>{
      setMessage( Store.getState().message ) 
      console.log("subscribe message:")
  }})


  function OneSignalInit(): void {

    // Uncomment to set OneSignal visual logging to VERBOSE  
    // OneSignal.Debug.setAlertLevel(6);
    console.log("OneSignal.init")

    // NOTE: Update the init value below with your OneSignal AppId.
    OneSignal.initialize( "daff2bee-e428-4bd3-9f47-ac3c914113d6" );

    const myClickListener = async function(event) {
          const notificationData = JSON.stringify(event);
          console.log( notificationData )
      };
    OneSignal.Notifications.addEventListener("click", myClickListener);
    

      
    // Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
    console.log("OneSignal.requestPermissions")
    OneSignal.Notifications.requestPermission(true).then((accepted: boolean) => {
      console.log("User accepted notifications: " + accepted);
    })

    OneSignal.User.addAlias("external_id", login?.id || Store.getState().login?.id)

    console.log(JSON.stringify( OneSignal ))
  }

  useEffect(() => {
    console.log( 'auth', auth)
    if (auth && Capacitor.isNativePlatform()) {
      OneSignalInit();
    }
  }, [auth])

  return (
    auth
      ? <IonApp>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                  <Redirect to="/page/main" />
                </Route>
                <Route path="/page/:name" exact={true}>
                  <Page />
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      : <IonApp>
          <IonReactRouter>
              <IonRouterOutlet id="lg-main">
                <Route path="/" 
                  render={(props) => { 
                    if(props.location.hash === ''){
                      return <Login />
                    }
                    if(props.location.hash === '#/registr'){
                      setReg(true)
                      return <Login />
                    } else {
                      let jarr  = props.location.hash.split("?");
                      if(jarr.length > 1) {
                        if(jarr[0] === '#/auth'){
                          jarr = jarr[1].split("&")
                          jarr = jarr[1].split("=");
                          console.log( "token - " + jarr[1] )
                          setLogin({ token: jarr[1] })
                          setToken(jarr[1])
                          setAuth(true)
                          loadDogs({ token: jarr[1] })
                          loadApps({ token: jarr[1] })
                          loadServices({ token: jarr[1] })
                          loadProfile({ token: jarr[1] })
                          loadInvoicesAndDocs({ token: jarr[1] })
                          loadContacts()
                          return <></>    
                        } else return <Login />
                      } else return <Login />
                    } 
                  }}
                /> 
                <Route path="/login" exact={true}>
                  <Login />
                </Route>
              </IonRouterOutlet>
          </IonReactRouter>
          <IonAlert
            isOpen =  { message !== undefined }
            header =  { message?.header }
            message = { message?.message }
            buttons={['OK']}
        />
        </IonApp>
  );
}

App.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
  }).isRequired,
};

App.defaultProps = {
  location: {
    hash: '',
  },
};

export default App;
