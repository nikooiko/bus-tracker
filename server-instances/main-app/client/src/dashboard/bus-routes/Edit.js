import React from 'react';
import { connect } from 'react-redux';
import bindFunctions from '../../utils/bindFunctions';
import { updateOfficialRoute } from './store/actions';
import Form from './Form';
import Loading from '../../common/Loading';
import { showToast } from '../../toast/store/actions';

class Edit extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this, ['submit']);

    this.state = {
      ...this.state,
      routeIndex: -1,
      foundStops: []
    }
  }

  findStops(stopIds) {
    const { stops } = this.props;
    const foundStops = [];
    let i = -1;
    const len = stopIds.length - 1;
    while (i++ < len) {
      const stopId = stopIds[i];
      const stopIndex = stops.findIndex((stop) => {
        return stop.id === stopId;
      });
      if (stopIndex !== -1) {
        foundStops.push(stops[stopIndex]);
      }
    }
    return foundStops;
  }

  findInRoutes() {
    const { routes, routeId, router, showToast } = this.props;
    const findRoute = (route) => {
      return route.id === routeId;
    };
    const routeIndex = routes.findIndex(findRoute);
    if (routeIndex === -1) {
      router.replace('/routes');
      return;
    }
    const prevState = this.state;
    const foundStops = this.findStops(routes[routeIndex].stopIds);
    const origin = foundStops[0];
    const destination = foundStops[foundStops.length - 1];
    if (!origin || !destination || origin === destination) {
      this.props.router.replace('/routes');
      showToast({
        message: 'Something went wrong, please try again later.',
        status: 'warning'
      });
    }
    this.setState({
      ...prevState,
      routeIndex,
      foundStops
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

  submit(fields) {
    const { updateOfficialRoute, routeId } = this.props;
    return updateOfficialRoute(routeId, fields);
  }

  render() {
    const { routeIndex, foundStops } = this.state;
    const route = this.props.routes[routeIndex];
    let content = (
      <Loading/>
    );
    if (route) {
      const origin = foundStops[0];
      const destination = foundStops[foundStops.length - 1];
      const defaultFieldValues = {
        name: route.name,
        origin,
        destination
      };
      content = (
        <Form
          submit={this.submit}
          defaultFieldValues={defaultFieldValues}
        />
      );
    }

    return content;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    routeId: ownProps.params.routeId,
    routes: state.busRoutes.routes,
    stops: state.stops.stops
  }
};

export default connect(mapStateToProps, { updateOfficialRoute, showToast })(Edit);
