import React from 'react';
import {
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  isPlatform,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { calendarOutline, calendarSharp, chatboxEllipsesOutline, chatboxEllipsesSharp, cogOutline, cogSharp, helpOutline, helpSharp, layersOutline, layersSharp, listOutline, listSharp, personCircleOutline, personCircleSharp } from 'ionicons/icons';
import './Menu.css';
import { Store } from './Store';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Договора',
    url: '/page/agreements',
    iosIcon: layersOutline,
    mdIcon: layersSharp
  },
  {
    title: 'Заявки',
    url: '/page/apps',
    iosIcon: listOutline,
    mdIcon: listSharp
  },
  {
    title: 'Информация',
    url: '/page/info',
    iosIcon: helpOutline,
    mdIcon: helpSharp,
  },
  {
    title: 'Услуги',
    url: '/page/services',
    iosIcon: cogOutline,
    mdIcon: cogSharp
  },
  {
    title: 'Личные данные',
    url: '/page/personal',
    iosIcon: personCircleOutline,
    mdIcon: personCircleSharp
  },
  {
    title: 'Акт сверки',
    url: '/page/actsverki',
    iosIcon: calendarOutline,
    mdIcon: calendarSharp
  },
  {
    title: 'Контакты',
    url: '/page/contacts',
    iosIcon: chatboxEllipsesOutline,
    mdIcon: chatboxEllipsesSharp
  },
  {
    title: 'Удалить аккаунт',
    url: '/page/delaccount',
    iosIcon: chatboxEllipsesOutline,
    mdIcon: chatboxEllipsesSharp
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
        <div id="inbox-list">
          <IonImg src = "assets/stng_logo1.svg"  class = { isPlatform("ios") ? "m-img mt-4" : "m-img mt-2" }
              onClick= {()=>{
                Store.dispatch({ type: "route", route: "main"})
              }}
          />
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </div>
    </IonMenu>
  );
};

export default Menu;
