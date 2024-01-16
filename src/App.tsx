import React, { useEffect, useState } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, isPlatform, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router-dom';
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
import { Store, getData } from './components/Store';
import { Login, Registration } from './components/Login';
import PropTypes from "prop-types";
import { AR } from './components/AR';
import OneSignal, { OneSignalPlugin } from 'onesignal-cordova-plugin'
import { Console } from 'console';


setupIonicReact();


const App: React.FC = () => {
  const [ auth, setAuth ] = useState( Store.getState().auth )
  const hist = useHistory()
  
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

    OneSignal.User.addAlias("external_id", Store.getState().login.id)

    console.log(JSON.stringify( OneSignal ))
  }

  Store.subscribe({ num: 1, type: "auth", func: ()=>{
    setAuth( Store.getState().auth ) 

    if( isPlatform("mobile") )
      OneSignalInit();

  }})

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
                    console.log(props.location.hash)
                    if(props.location.hash === ''){
                      return <Login />
                    }
                    if(props.location.hash === '#/registr'){
                      Store.dispatch({type: "reg", reg: true })
                      return <Login />
                    } else {
                      let jarr  = props.location.hash.split("?");
                      if(jarr.length > 1) {
                        if(jarr[0] === '#/auth'){
                          jarr = jarr[1].split("&")
                          jarr = jarr[1].split("=");
                          console.log( "token - " + jarr[1] )
                          Store.dispatch({type: "login", login: { token: jarr[1] } })
                          Store.dispatch({type: "auth", auth: true })
                          return <></>    
                        } else return <Login />
                      } else return <Login />
                    } 
                  }}
                /> 
                <Route path="/login" exact={true}>
                  <Login />
                </Route>
                <Route path="/ar" exact={true}>
                  <AR />
                </Route>
              </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
  );
};



export default App;
