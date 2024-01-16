import { IonButton, IonButtons, IonIcon, IonLabel, IonMenuButton } from '@ionic/react';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import './Page.css';
import { Store } from '../components/Store';
import { Agreements } from '../components/Agreements';
import { arrowBackOutline, chatboxEllipsesOutline, logOutOutline, personCircleOutline } from 'ionicons/icons';
import { Profile } from '../components/Profile';
import { Apps } from '../components/Apps';
import { Service1_1, Service1_2, Service2, Service3, Service4_1, Service4_2, Service4_3, Service4_4, Service4_5, Services } from '../components/Services';
import { ActSverki } from '../components/ActSverki';
import { Hello } from '../components/Main';



const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const hist = useHistory();

  const tbNames = [
    {name: "agreements", title: "Договора", JSX: function():JSX.Element { return <Agreements />}},
    {name: "personal", title: "Личные данные", JSX: function():JSX.Element { return <Profile />}},
    {name: "apps", title: "Заявки", JSX: function():JSX.Element { return <Apps />}},
    {name: "services", title: "Услуги", JSX: function():JSX.Element { return <Services />}},
    {name: "service1_1", title: "Услугa", JSX: function():JSX.Element { return <Service1_1 />}},
    {name: "service1_2", title: "Услугa", JSX: function():JSX.Element { return <Service1_2 />}},
    {name: "service2", title: "Услугa", JSX: function():JSX.Element { return <Service2 />}},
    {name: "service3", title: "Услугa", JSX: function():JSX.Element { return <Service3 />}},
    {name: "service4_1", title: "Услугa", JSX: function():JSX.Element { return <Service4_1 />}},
    {name: "service4_2", title: "Услугa", JSX: function():JSX.Element { return <Service4_2 />}},
    {name: "service4_3", title: "Услугa", JSX: function():JSX.Element { return <Service4_3 />}},
    {name: "service4_4", title: "Услугa", JSX: function():JSX.Element { return <Service4_4 />}},
    {name: "service4_5", title: "Услугa", JSX: function():JSX.Element { return <Service4_5 />}},
    {name: "actsverki", title: "Акт сверки", JSX: function():JSX.Element { return <ActSverki />}},
    {name: "main", title: "Приветствие", JSX: function():JSX.Element { return <Hello />}},
    // {name: "lic:", title: "л/с №" + name.split(":")[1], JSX: function(){ return <Lic name = { name } />}},
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
        <div className='flex w-100'>
          <div className='p-tool flex fl-space w-100'>
            <div className='flex fl-left'>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <div>
                <a href="https://aostng.ru">
                    <div className="flex ml-1 mt-1 pb-1 fs-bold"> Вернуться на основной сайт 
                        <div className="l-icon ml-1">
                            <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9999 3.00409H3.4099L4.7099 1.71409C4.8982 1.52579 5.00399 1.27039 5.00399 1.00409C5.00399 0.73779 4.8982 0.482395 4.7099 0.294092C4.52159 0.105788 4.2662 1.9841e-09 3.9999 0C3.73359 -1.9841e-09 3.4782 0.105788 3.2899 0.294092L0.289896 3.29409C0.198856 3.3892 0.127491 3.50134 0.0798963 3.62409C-0.0201217 3.86755 -0.0201217 4.14063 0.0798963 4.38409C0.127491 4.50684 0.198856 4.61899 0.289896 4.71409L3.2899 7.71409C3.38286 7.80782 3.49346 7.88221 3.61532 7.93298C3.73718 7.98375 3.86788 8.00989 3.9999 8.00989C4.13191 8.00989 4.26261 7.98375 4.38447 7.93298C4.50633 7.88221 4.61693 7.80782 4.7099 7.71409C4.80363 7.62113 4.87802 7.51053 4.92879 7.38867C4.97956 7.26681 5.00569 7.1361 5.00569 7.00409C5.00569 6.87208 4.97956 6.74137 4.92879 6.61951C4.87802 6.49766 4.80363 6.38705 4.7099 6.29409L3.4099 5.00409H12.9999C13.2651 5.00409 13.5195 5.10945 13.707 5.29699C13.8945 5.48452 13.9999 5.73888 13.9999 6.00409V11.0041C13.9999 11.2693 14.1053 11.5237 14.2928 11.7112C14.4803 11.8987 14.7347 12.0041 14.9999 12.0041C15.2651 12.0041 15.5195 11.8987 15.707 11.7112C15.8945 11.5237 15.9999 11.2693 15.9999 11.0041V6.00409C15.9999 5.20844 15.6838 4.44538 15.1212 3.88277C14.5586 3.32016 13.7955 3.00409 12.9999 3.00409Z" 
                                className="l-icon_font_mute"></path>
                            </svg>
                        </div>            
                    </div>
                </a>
              </div>
            </div>
            <div className='flex fl-right'>
                <IonIcon icon={ chatboxEllipsesOutline } className='h-15 w-15' color='tertiary'/>
                <IonLabel class='ml-1 cl-def'>Контакты</IonLabel>
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
    <div>
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
