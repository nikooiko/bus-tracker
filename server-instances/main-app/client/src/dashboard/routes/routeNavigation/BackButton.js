import React from 'react';
import Anchor from 'grommet/components/Anchor';
import BackIcon from 'grommet/components/icons/base/LinkPrevious';
import Box from 'grommet/components/Box';

class NavLogo extends React.Component {
  render() {
    return (
      <Box
        pad={{ between: 'medium' }}
      >
        <Anchor
          icon={<BackIcon />}
          label='Back'
          animateIcon={true}
          path='/routes'
        />
      </Box>
    )
  }
}

export default NavLogo;
