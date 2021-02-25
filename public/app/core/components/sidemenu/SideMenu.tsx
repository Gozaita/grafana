import React, { useCallback } from 'react';
import appEvents from '../../app_events';
import TopSection from './TopSection';
import BottomSection from './BottomSection';
import config from 'app/core/config';
import { CoreEvents } from 'app/types';
import { Branding } from 'app/core/components/Branding/Branding';
import { Icon } from '@grafana/ui';
import { useLocation } from 'react-router-dom';

const homeUrl = config.appSubUrl || '/';
const queryParamsToHideSidemenu = ['viewPanel'];

export const SideMenu = () => {
  const location = useLocation();
  const toggleSideMenuSmallBreakpoint = useCallback(() => {
    appEvents.emit(CoreEvents.toggleSidemenuMobile);
  }, []);

  for (let i = 0; i < queryParamsToHideSidemenu.length; i++) {
    if (location.search.indexOf(queryParamsToHideSidemenu[i]) > -1) {
      return null;
    }
  }

  return (
    <div className="sidemenu">
      <a href={homeUrl} className="sidemenu__logo" key="logo">
        <Branding.MenuLogo />
      </a>
      <div className="sidemenu__logo_small_breakpoint" onClick={toggleSideMenuSmallBreakpoint} key="hamburger">
        <Icon name="bars" size="xl" />
        <span className="sidemenu__close">
          <Icon name="times" />
          &nbsp;Close
        </span>
      </div>
      <TopSection key="topsection" />
      <BottomSection key="bottomsection" />
    </div>
  );
};
