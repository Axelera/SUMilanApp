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
import { balloonOutline, balloonSharp, documentTextOutline, documentTextSharp, globeOutline, homeOutline, homeSharp, informationCircleOutline, informationCircleSharp, logoGithub, logOutOutline, openOutline, peopleOutline, peopleSharp } from 'ionicons/icons';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import LogoImage from './LogoImage/LogoImage';

import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
}

const appPages: AppPage[] = [
  {
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    url: '/chapter',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleSharp,
  },
  {
    url: '/young',
    iosIcon: balloonOutline,
    mdIcon: balloonSharp
  },
  {
    url: '/activist',
    iosIcon: peopleOutline,
    mdIcon: peopleSharp
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

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
                  <IonLabel>{t(appPage.url.substring(1).toUpperCase()+'.title')}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <IonList lines="full">
          <IonItem href="https://www.singularityumilan.com/guida-rapida-app" target="_blank" detail={true} detailIcon={openOutline}>
            <IonIcon slot="start" ios={documentTextOutline} md={documentTextSharp} />
            <IonLabel>{t('MENU.instructions')}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonList style={{ padding: 0 }}>
          <IonListHeader>{t('MENU.Credits.title')}</IonListHeader>
          <IonItem lines="full">
            <IonLabel style={{ margin: 0 }}>
              <h3>Luca Bertelli</h3>
              <p>{t('MENU.Credits.development')}</p>
            </IonLabel>
            <IonButton slot="end" fill="clear" href="https://github.com/Luca8991" target="_blank">
              <IonIcon slot="icon-only" icon={logoGithub} />
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonLabel style={{ margin: 0 }}>
              <h3>Roberto Crosignani</h3>
              <p>{t('MENU.Credits.marketing')}</p>
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
