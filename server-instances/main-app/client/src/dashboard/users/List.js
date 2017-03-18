import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Search from 'grommet/components/Search';
import DriverIcon from 'grommet/components/icons/base/Bus';
import Table from 'grommet/components/Table';
import TableHeader from 'grommet/components/TableHeader';
import TableRow from 'grommet/components/TableRow';
import Notification from 'grommet/components/Notification';
import Navbar from '../navigation/Navbar';
import bindFunctions from '../../utils/bindFunctions';
import { enableDriver, disableDriver } from './store/actions';

export class List extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this, ['_onSearch']);
  }

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
      // this.props.enableDriver(userId); // TODO
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
      // this.props.disableDriver(userId); // TODO
    };
  }


  renderUser(user) {
    const userId = user.id;
    return (
      <TableRow key={userId}>
        <td>userId</td>
        <td>
          <Button
            icon={<DriverIcon/>} a11yTitle={'Enable Driver\'s privileges'}
            onClick={this.onEnableDriver(userId)} label='Enable Driver' secondary={true}
          />
          <Button
            icon={<DriverIcon/>} a11yTitle={'Disable Driver\'s privileges'}
            onClick={this.onDisableDriver(userId)} label='Disable Driver' accent={true}
          />
        </td>
      </TableRow>
    );
  }

  render() {
    let content;
    if (this.props.children) {
      return this.props.children;
    } else {
      const users = this.props.users.users;
      if (users.length > 0) {
        content = (
          <Box>
            <Header size='medium' pad={{ horizontal: 'medium' }}>
              <Search
                inline={true} fill={true} size='medium' placeHolder='Dummy Search (TODO)'
                onDOMChange={this._onSearch} iconAlign='start' responsive={false}
              />
            </Header>
            <Table selectable={false}>
              <TableHeader labels={['TODO_LABEL1', 'TODO_LABEL2']}/>
              <tbody>
              {users.map((user) => this.renderUser(user))}
              </tbody>
            </Table>
          </Box>
        );
      } else {
        content = (
          <Notification status='warning' message='Currently there are no users' />
        );
      }
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
