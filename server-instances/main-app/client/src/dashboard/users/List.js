import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Search from 'grommet/components/Search';
import DriverIcon from 'grommet/components/icons/base/Bus';
import GrommetList from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';
import Navbar from '../navigation/Navbar';
import bindFunctions from '../../utils/bindFunctions';
import { enableDriver, disableDriver } from './store/actions';

export class List extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this, ['_onSearch']);
  }

  /**
   * Function used to search for a role inside `user.roles`.
   *
   * @method findRole
   * @static
   * @param roleName
   * @returns {function(*)}
   */
  static findRole (roleName) {
    return (role) => {
      return role.name === roleName;
    }
  };

  _onSearch() {
    // TODO
  }

  /**
   * Used to enable user's driver privileges (practically adds `driver` user role).
   *
   * @method onEnableDriver
   * @param {String} userId
   * @returns {Function}
   */
  onEnableDriver(userId) {
    return () => {
      this.props.enableDriver(userId); // TODO
    };
  }

  /**
   * Used to disabled user's driver privileges (practically removes `driver` user role).
   *
   * @method onDisableDriver
   * @param {String} userId
   * @returns {Function}
   */
  onDisableDriver(userId) {
    return () => {
      this.props.disableDriver(userId); // TODO
    };
  }


  renderUser(user) {
    const userId = user.id;
    const roles = user.roles;
    if (roles.findIndex(List.findRole('admin')) !== -1) return null; // ignore admin
    let button;
    const isDriver = roles.findIndex(List.findRole('driver')) !== -1;
    if (isDriver) {
      button = (
        <Button
          icon={<DriverIcon/>} a11yTitle={'Disable Driver\'s privileges'}
          onClick={this.onDisableDriver(userId)} label='Disable Driver' accent={true}
        />
      );
    } else {
      button = (
        <Button
          icon={<DriverIcon/>} a11yTitle={'Enable Driver\'s privileges'}
          onClick={this.onEnableDriver(userId)} label='Enable Driver' secondary={true}
        />
      );
    }
    return (
      <ListItem
        key={userId} direction="row" align="center" justify="between" separator='horizontal'
        pad={{horizontal: 'medium', vertical: 'small', between: 'medium'}} responsive={false}
      >
        <span>{user.username}</span>
        <span>{isDriver ? 'driver' : 'passenger'}</span>
        {button}
      </ListItem>
    );
  }

  render() {
    let content;
    if (this.props.children) {
      return this.props.children;
    } else {
      const users = this.props.users.users;
      const filteredUsers = users; // dummy for now
      content = (
        <Box>
          <Header size='medium' pad={{ horizontal: 'medium' }}>
            <Search
              inline={true} fill={true} size='medium' placeHolder='Dummy Search (TODO)'
              onDOMChange={this._onSearch} iconAlign='start' responsive={false}
            />
          </Header>
          <GrommetList selectable={false}>
            <ListItem
              key={0} direction="row" align="center" justify="between" separator='horizontal'
              pad={{horizontal: 'medium', vertical: 'small', between: 'medium'}} responsive={false}
            >
              <span><b>Username</b></span>
              <span><b>Role</b></span>
              <span><b>Actions</b></span>
            </ListItem>
            {users.map((user) => this.renderUser(user))}
          </GrommetList>
          <ListPlaceholder
            filteredTotal={filteredUsers.length}
            unfilteredTotal={users.length}
            emptyMessage='Currently there are no users.'
          />
        </Box>
      );
    }
    return (
      <Box flex={true}>
        <Navbar page='Users'/>
        {content}
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps, { enableDriver, disableDriver })(List);
