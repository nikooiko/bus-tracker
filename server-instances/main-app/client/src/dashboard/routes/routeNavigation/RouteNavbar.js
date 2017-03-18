import React from 'react';
import Header from 'grommet/components/Header';

import BackButton from './BackButton';

class RouteNavbar extends React.Component {
  render() {
    const { status, routeId } = this.props;

    return (
      <Header
        size='medium' pad={{ horizontal: 'medium', between: 'medium' }}
        colorIndex='grey-5'
      >
        <BackButton/>
      </Header>
    )
  }
}

export default RouteNavbar;
