import React from 'react';
import SidebarButton from './sidebar/SidebarButton';
import SessionMenu from '../../auth/SessionMenu';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';

class Navbar extends React.Component {
  render() {
    let title = null;
    if (this.props.page) {
      title = (
        <Title a11yTitle='Page Title'>
          {this.props.page}
        </Title>
      );
    }
    return (
      <Header
        size='medium' pad={{ horizontal: 'medium', between: 'medium' }}
        colorIndex='neutral-1'
      >
        <SidebarButton/>
        {title}
        <Box justify='end' direction='row' responsive={false} flex={true}>
          <SessionMenu/>
        </Box>
      </Header>
    )
  }
}

export default Navbar;
