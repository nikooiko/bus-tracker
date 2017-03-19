import React from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';

class HomeNav extends React.Component {
  render() {
    return (
      <Header
        size='medium' pad={{ horizontal: 'medium', between: 'medium' }}
        colorIndex='neutral-1'
      >
        <Box className='hide-portable' direction='row' pad={{ between: 'medium' }}>
        </Box>
        <Box direction='row' justify='end' flex={true} responsive={false}>
        </Box>
      </Header>
    )
  }
}
export default HomeNav;
