import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import SidebarIcon from 'grommet/components/icons/base/Menu';
import Button from 'grommet/components/Button';
import { openSidebar } from './store/sidebarActions';
import bindFunctions from '../../../utils/bindFunctions';

class Sidebar extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this, ['_onClick']);
  }

  _onClick() {
    this.props.openSidebar();
  }

  render() {
    if (this.props.authenticated && !this.props.opened) {
      return (
        <Box
          direction='row' pad={{ between: 'medium' }} onClick={this._onClick} responsive={false}
        >
          <Button
            icon={<SidebarIcon />}
            plain={true}
            a11yTitle='Open Sidebar'
            onClick={() => {}}
          />
        </Box>
      )
    }
    return null;
  }
}

const mapStateToProps = (state) => ({
  opened: state.sidebar.opened,
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps, { openSidebar })(Sidebar);
