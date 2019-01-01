import * as React from 'react';
import { Fragment, useContext, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import imgTop from '../assets/Arnaud-Conne-2017_5.jpg';
import getKey from '../core/intl/getKey';
import LanguageContext from '../core/intl/LanguageContext';
import LazyImage from '../core/lazy-image/LazyImage';
import Logo from '../core/logo/Logo';
import { goToTop, setPageTitle } from '../core/page.lib';
import InformationSection from './information-section/InformationSection';

const HomePage = () => {
  const { messages } = useContext(LanguageContext);

  useEffect(() => {
    setPageTitle(getKey('home.page.title', messages));
    goToTop();
  });

  return (
    <Fragment>
      <Header as="h1" data-testid="main-title">
        {getKey('home.page.title', messages)}
      </Header>
      <Logo big={true} width={320} height={232} />
      <InformationSection />
      <LazyImage
        width={320}
        height={212}
        src={imgTop}
        alt={'Photo: Arnaud Conne'}
      />
    </Fragment>
  );
};

export default HomePage;
