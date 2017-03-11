import React from 'react';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';

class Loading extends React.Component {
  render() {
    return (
      <Box
        flex={true} responsive={false} align='center' textAlign='center'
        justify='center' pad='none'
      >
        <Spinning />
      </Box>
    )
  }
}
export default Loading;