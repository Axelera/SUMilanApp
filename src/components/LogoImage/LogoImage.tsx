import titleLogo from '../../assets/images/title-logo.png';
import titleLogoWhite from '../../assets/images/title-logo-white.png';
import titleLogoSmall from '../../assets/images/logo_1_lines_sm.png';
import titleLogoSmallWhite from '../../assets/images/logo_1_lines_sm-white.png';
import titleYoung from '../../assets/images/title-logo-young.png';
import titleYoungWhite from '../../assets/images/title-logo-young-white.png';
import React, { ComponentPropsWithRef } from 'react';

interface LogoImagePropsModel extends ComponentPropsWithRef<any> {
    small?: boolean;
    young?: boolean;
}

const LogoImage: React.FC<LogoImagePropsModel> = (props: LogoImagePropsModel) => {
    const isDarkModeEnabled = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let image;
    if (isDarkModeEnabled) {
        if (props.small) {
            image = titleLogoSmallWhite;
        } else if (props.young) {
            image = titleYoungWhite;
        } else {
            image = titleLogoWhite;
        }
    } else {
        if (props.small) {
            image = titleLogoSmall;
        } else if (props.young) {
            image = titleYoung;
        } else {
            image = titleLogo;
        }
    }

    return <img src={image} alt="SU-logo" {...props} />;
};

export default LogoImage;