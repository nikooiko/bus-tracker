import React from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import Box from 'grommet/components/Box';
import RouteNavbar from '../routeNavigation/RouteNavbar';

export class Route extends React.Component {
  constructor(props, content) {
    super(props, content);
    this.state = {
      routeIndex: -1,
    }
  }

  findInRoutes() {
    const { routes, routeId, replace } = this.props;
    const findRoute = (route) => {
      return route.id === routeId;
    };
    const routeIndex = routes.findIndex(findRoute);
    if (routeIndex === -1) {
      replace('/routes');
      return;
    }
    this.setState({
      ...this.state,
      routeIndex
    });
  }

  componentWillMount() {
    this.findInRoutes();
  }

  componentWillUpdate() {
    const { routes, routeId } = this.props;
    const { routeIndex } = this.state;
    let route = routes[routeIndex];
    if (!route || route.id !== routeId) {
      // route not found or it's not the expected one
      this.findInRoutes();
    }
  }

  render() {
    const { routes } = this.props;
    const { routeIndex } = this.state;
    let route = routes[routeIndex];

    return (
      <Box flex={true}>
        <RouteNavbar status={status} routeId={route.id}/>
        <Box>
          route.id
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  routeId: ownProps.params.routeId,
  routes: state.busRoutes.routes
});

export default connect(mapStateToProps, { replace: routerActions.replace })(Route);
