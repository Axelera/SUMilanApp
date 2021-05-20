import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { balloonOutline, balloonSharp, globeOutline, homeOutline, homeSharp, informationCircleOutline, informationCircleSharp, logoGithub, ticketOutline, ticketSharp } from 'ionicons/icons';
import './Menu.css';
import LogoImage from './LogoImage/LogoImage';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'SU Young',
    url: '/young',
    iosIcon: balloonOutline,
    mdIcon: balloonSharp
  },
  {
    title: 'Info sul Chapter',
    url: '/chapter',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <LogoImage small={true} />
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonList style={{ padding: 0 }}>
          <IonListHeader>Credits:</IonListHeader>
          <IonItem lines="full">
            <IonLabel style={{ margin: 0 }}>
              <h3>Luca Bertelli</h3>
              <p>Sviluppo</p>
            </IonLabel>
            <IonButton slot="end" fill="clear" href="https://github.com/Luca8991" target="_blank">
              <IonIcon slot="icon-only" icon={logoGithub} />
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonLabel style={{ margin: 0 }}>
              <h3>Roberto Crosignani</h3>
              <p>Marketing</p>
            </IonLabel>
            <IonButton slot="end" fill="clear" href="https://www.robertocrosignani.com/" target="_blank">
              <IonIcon slot="icon-only" icon={globeOutline} />
            </IonButton>
          </IonItem>
        </IonList>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
