import { IonButton, IonButtons, IonIcon, IonMenuButton } from '@ionic/react';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import './Page.css';
import { Store } from '../components/Store';
import { Agreements } from '../components/Agreements';
import { arrowBackOutline, logOutOutline, personCircleOutline } from 'ionicons/icons';
import { Profile } from '../components/Profile';
import { Apps } from '../components/Apps';
import { Services } from '../components/Services';
import { ActSverki } from '../components/ActSverki';
import { Hello } from '../components/Main';
import { Contacts } from '../components/Contacts';
import { DelAccount } from '../components/DelAccount';



const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const hist = useHistory();

  const tbNames = [
    {name: "agreements", title: "Договора", JSX: function():JSX.Element { return <Agreements />}},
    {name: "personal", title: "Личные данные", JSX: function():JSX.Element { return <Profile />}},
    {name: "apps", title: "Заявки", JSX: function():JSX.Element { return <Apps />}},
    {name: "services", title: "Услуги", JSX: function():JSX.Element { return <Services />}},
    {name: "actsverki", title: "Акт сверки", JSX: function():JSX.Element { return <ActSverki />}},
    {name: "main", title: "Приветствие", JSX: function():JSX.Element { return <Hello />}},
    {name: "contacts", title: "Контакты", JSX: function():JSX.Element { return <Contacts />}},
    {name: "delaccount", title: "Удалить аккаунт", JSX: function():JSX.Element { return <DelAccount />}},
  ] 


  Store.subscribe({ num: 2, type: "route", func: ()=>{

    const route = Store.getState().route;
  
    if( route === "back") hist.goBack()
    else hist.push( Store.getState().route )
  
  }})
  
  function Contents() {

    const commentIndex = tbNames.findIndex(function(b) { 
        if( name.includes(":")){
          const arr = name.split(":")
          return arr[0] + ":" === b.name
        } else return b.name === name; 
      });
      if(commentIndex >= 0){
        return tbNames[commentIndex]
      }
      return {name: '', title: "", JSX: () => {return <></>}}
  }

  function Tools():JSX.Element {

      const elem1 = <>
        <div className='flex w-100 bg-2'>
          <div className='p-tool flex fl-space w-100'>
            <div className='flex fl-left'>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <div>
                <IonIcon icon = { arrowBackOutline } className='w-2 h-2' slot ="icon-only" color='tertiary'
                  onClick={ ()=> { 
                    switch (name) {
                      case 'main': hist.push( "agreements" );break;
                      case 'services': Store.dispatch({type: "back", back: Store.getState().back++ });break;
                    
                      default: hist.goBack();  break;
                    }
                  }}
                />
            </div>
            </div>
          </div>
          <div className='p-right flex fl-space'>
            <div>
              <IonButton
                color = 'tertiary'
              >
                <IonIcon icon = { personCircleOutline } className='w-1 h-1' slot='icon-only' />
              </IonButton> 
            </div>
            <IonButton
              color = 'tertiary'
              fill = "clear"
              onClick={()=>{ Store.dispatch({ type: "auth", auth: false})}}
            >
              <IonIcon icon = { logOutOutline } className='w-15 h-15' />
                Завершить сеанс
            </IonButton> 
          </div>
        </div>
      </>

      const elem2 = <>
        <div>
          <div className='p-tool flex fl-space'>
            <div>
                <IonIcon icon = { arrowBackOutline } className='w-2 h-2' slot ="icon-only" color='tertiary'
                  onClick={ ()=> { 
                    switch (name) {
                      case 'main': hist.push( "agreements" );break;
                      case 'services': Store.dispatch({type: "back", back: Store.getState().back++ });break;
                    
                      default: hist.goBack();  break;
                    }
                  }}
                />
            </div>
            <div className='flex'>
              <IonButton
                color = 'tertiary'
                fill = "clear"
                onClick={()=>{ Store.dispatch({ type: "auth", auth: false})}}
              >
                <IonIcon icon = { logOutOutline } className='w-15 h-15' />
                  Завершить сеанс
              </IonButton> 
              <div className='flex fl-left'>
                <IonButtons slot="start">
                <IonMenuButton />
                </IonButtons>
              </div>
            </div>
          </div>
        </div>
      </>
    return window.innerWidth > 600 ? elem1 : elem2
  }

  return (
    <div className='mt-3'>
      <Tools />
      <div className='flex'>
        <div className='p-content'>
          { Contents().JSX() }
        </div>
      </div>
    </div>
  );
};

export default Page;
