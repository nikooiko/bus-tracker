import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';

import Navbar from './navigation/Navbar';

export class DashboardIndex extends React.Component {
  render() {
    return (
      <Box>
        <Navbar page='Dashboard'/>
        Hello world from dashboard!
      </Box>
    );
  }
}

export default connect()(DashboardIndex);
