import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import Menu from 'grommet/components/Menu';
import GrommetSidebar from 'grommet/components/Sidebar';
import CloseIcon from 'grommet/components/icons/base/Close'
import Anchor from 'grommet/components/Anchor';
import DashboardIcon from 'grommet/components/icons/base/Dashboard';
import RoutesIcon from 'grommet/components/icons/base/Directions';
import StopsIcon from 'grommet/components/icons/base/MapLocation';
import UserSettingsIcon from 'grommet/components/icons/base/UserSettings';
import { closeSidebar } from './store/actions';
import bindFunctions from '../../../utils/bindFunctions';

class Sidebar extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this, ['_onClose']);
  }

  _onClose() {
    this.props.closeSidebar();
  }

  render() {
    if (!this.props.opened) {
      return null;
    }

    return (
      <GrommetSidebar colorIndex='neutral-1' fixed={true} size={'medium'}>
        <Header
          size='medium' pad={{ horizontal: 'medium', between: 'medium' }} onClick={this._onClose}
        >
          <Box flex={true} />
          <Button
            icon={<CloseIcon />}
            plain={true}
            a11yTitle='Close Sidebar'
            onClick={() => {}}
          />
        </Header>
        <Menu fill={true} primary={true}>
          <Anchor
            path={'/dashboard'} label={'Dashboard'}
            icon={<DashboardIcon />}
          />
          <Anchor
            path={'/routes'} label={'Routes'}
            icon={<RoutesIcon />}
          />
          <Anchor
            path={'/stops'} label={'Stops'}
            icon={<StopsIcon />}
          />
          <Anchor
            path={'/users'} label={'Users'}
            icon={<UserSettingsIcon />}
          />
        </Menu>
      </GrommetSidebar>
    )
  }
}

const mapStateToProps = (state) => ({
  opened: state.sidebar.opened,
  routing: state.routing
});

export default connect(mapStateToProps, { closeSidebar })(Sidebar);
