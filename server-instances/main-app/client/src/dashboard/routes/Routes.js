import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Notification from 'grommet/components/Notification';
import Anchor from 'grommet/components/Anchor';
import Navbar from '../navigation/Navbar';
import Loading from '../../common/Loading';

export class Routes extends React.Component {
  renderRoute(route) {
    return (
      <Box className='red-border'>
        <Anchor
          label={route.id}
          path={`/routes/${route.id}`}
        />
      </Box>
    );
  }

  render() {
    let content;
    if (this.props.busRoutes.isFetching) {
      content = <Loading />;
    } else if (this.props.children) {
      return this.props.children;
    } else {
      const routes = this.props.busRoutes.routes;
      if (routes.length > 0) {
        content = (
          <Box direction='column'>
            {routes.map((route) => this.renderRoute(route))}
          </Box>
        );
      } else {
        content = (
          <Notification status='warning' message='Currently there are no routes' />
        )
      }
    }
    return (
      <Box flex={true}>
        <Navbar page='Routes'/>
        {content}
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  busRoutes: state.busRoutes
});

export default connect(mapStateToProps)(Routes);
