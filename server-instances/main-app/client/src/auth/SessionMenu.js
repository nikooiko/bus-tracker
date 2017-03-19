import React from 'react';
import UserIcon from 'grommet/components/icons/base/User';
import AdminIcon from 'grommet/components/icons/base/UserAdmin';
import LoginIcon from 'grommet/components/icons/base/Login';
import LogoutIcon from 'grommet/components/icons/base/Logout';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import { connect } from 'react-redux';
import { loginRoute } from './authConfig';
import { logout } from './store/actions';

class UserMenu extends React.Component {
  render() {
    const auth = this.props.auth;
    if (auth.authenticated) {
      let userIcon = <UserIcon/>;
      if (auth.user.isAdmin) {
        userIcon = <AdminIcon/>;
      }
      return (
        <Menu
          icon={userIcon}
          dropAlign={{ right: 'right' }}
          colorIndex='neutral-1-a'
        >
          <Anchor
            icon={<LogoutIcon />}
            label='Logout'
            animateIcon={true}
            onClick={() => this.props.logout()}
          />
        </Menu>
      )
    }
    return (
      <Menu
        icon={<UserIcon/>}
        dropAlign={{ right: 'right' }}
        colorIndex='neutral-1-a'
      >
        <Anchor
          icon={<LoginIcon />}
          label='Login'
          animateIcon={true}
          path={ loginRoute }
        />
      </Menu>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(UserMenu);
