import { useRef } from 'react';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { helpCircle, helpCircleOutline, homeOutline, homeSharp, informationCircleOutline, informationCircleSharp, logoGithub, openOutline, peopleOutline, peopleSharp, school, schoolOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

import LogoImage from './LogoImage/LogoImage';

import './Menu.css';
import { getAppVersion } from '../utils/version';
import { openPreferenceCenter } from '../libs/avacy';
import { SUM_SOCIAL_LINKS } from '../data';

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
    url: '/activist',
    iosIcon: peopleOutline,
    mdIcon: peopleSharp
  },
];

const Menu: React.FC = () => {
  const menuRef = useRef<HTMLIonMenuElement>(null);
  const location = useLocation();
  const { t } = useTranslation();

  const handleCookieClick = () => {
    openPreferenceCenter();
    menuRef.current?.close();
  };

  return (
    <IonMenu contentId="main" type="overlay" ref={menuRef}>
      <IonContent>
        <IonList id="inbox-list">
          <LogoImage small={true} />
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{t(appPage.url.substring(1).toUpperCase() + '.title')}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <IonList lines="full">
          <IonItem routerLink="/certificates" routerDirection="none" detail={false}>
            <IonIcon slot="start" ios={schoolOutline} md={school} />
            <IonLabel>{t('CERTIFICATES.title')}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonList style={{ padding: 0 }}>
          <IonList lines="full">
            <IonItem href="https://github.com/Axelera/SUMilanApp/issues/new" target="_blank" detail={true} detailIcon={openOutline}>
              <IonIcon slot="start" ios={helpCircleOutline} md={helpCircle} />
              <IonLabel>{t('MENU.feedback')}</IonLabel>
            </IonItem>
          </IonList>
          <IonItem href={SUM_SOCIAL_LINKS.github} target="_blank" lines="full">
            <IonLabel style={{ margin: 0 }}>
              <h3>{t('MENU.sourceCode')}</h3>
            </IonLabel>
            <IonButton slot="end" fill="clear">
              <IonIcon slot="icon-only" icon={logoGithub} />
            </IonButton>
          </IonItem>
          <IonItem lines="none" button onClick={handleCookieClick}>
            <IonLabel style={{ margin: 0 }}>
              <p>{t("COOKIES.preferences")}</p>
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonLabel style={{ margin: 0 }}>
              <p>Version: {getAppVersion()}</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
