import React from 'react';
import { render } from 'react-dom';

import Root from './core/Root';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Import stylesheets like this, if you choose: import './public/stylesheets/base.scss';
import './base.scss';

// Needed for onTouchTap
// TODO delete when unneeded
injectTapEventPlugin();

// Render the Root component
render(
  <Root/>
  , document.getElementById('root')
);
