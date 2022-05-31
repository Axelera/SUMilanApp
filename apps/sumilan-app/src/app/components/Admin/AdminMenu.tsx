import { useRef } from 'react';
import {
  IonAvatar,
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
import { help, logOutOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

import { openPreferenceCenter } from '../../libs/avacy';
import { getAppVersion } from '../../utils/version';
import { useAuth } from '../../contexts/Auth';
import { AuthContextModel } from '../../models/auth.model';

import './AdminMenu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
}

const appPages: AppPage[] = [
  {
    url: 'questions',
    iosIcon: help,
    mdIcon: help
  },
];

const AdminMenu: React.FC = () => {
  const menuRef = useRef<HTMLIonMenuElement>(null);
  const location = useLocation();
  const { user, signOut } = useAuth() as AuthContextModel;
  const { t } = useTranslation();

  const handleCookieClick = () => {
    openPreferenceCenter();
    menuRef.current?.close();
  };

  const handleLogoutClick = () => {
    const wantsToLogout = window.confirm("Do you want to logout?");
    if (wantsToLogout) {
      signOut();
    }
  };

  return (
    <IonMenu contentId="main" type="overlay" ref={menuRef}>
      <IonContent>
        <IonList id="inbox-list">

          {user && (
            <IonItem>
              <IonAvatar slot="start">
                <img src={user.user_metadata['avatar_url']} alt="Profile avatar" />
              </IonAvatar>
              <IonLabel>{user.user_metadata['name']}</IonLabel>
              <IonButton slot="end" fill="clear" onClick={handleLogoutClick}>
                <IonIcon slot="icon-only" icon={logOutOutline} />
              </IonButton>
            </IonItem>
          )}

          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={`${location.pathname}/${appPage.url}`} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{t(appPage.url.toUpperCase() + '.title')}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}

        </IonList>
      </IonContent>
      <IonFooter>
        <IonList style={{ padding: 0 }}>
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

export default AdminMenu;
