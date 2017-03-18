import React from 'react';
import Header from 'grommet/components/Header';
import BackIcon from 'grommet/components/icons/base/LinkPrevious';
import Anchor from 'grommet/components/Anchor';

class Navbar extends React.Component {
  render() {
    return (
      <Header
        size='medium' pad={{ horizontal: 'medium', between: 'medium' }}
        colorIndex='grey-5'
      >
        <Anchor
          icon={<BackIcon />}
          label='Back'
          animateIcon={true}
          path='/routes'
        />
      </Header>
    )
  }
}

export default Navbar;
