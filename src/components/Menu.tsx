import React from 'react';
import {
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, calendarOutline, calendarSharp, chatbubbleOutline, chatbubblesOutline, chatbubblesSharp, cogOutline, cogSharp, heartOutline, heartSharp, layersOutline, layersSharp, listOutline, listSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, personCircleOutline, personCircleSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

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
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
        <div id="inbox-list">
          <IonImg src = "assets/stng_logo1.svg"  class = "m-img"/>
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
