import React from 'react';
import { connect } from 'react-redux';
import bindFunctions from '../../utils/bindFunctions';
import { updateOfficialRoute } from './store/actions';
import Form from './Form';
import Loading from "../../common/Loading";

class Edit extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this, ['submit']);

    this.state = {
      ...this.state,
      routeIndex: -1
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
    const prevState = this.state;
    this.setState({
      ...prevState,
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

  submit(fields) {
    const { updateOfficialRoute, routeId } = this.props;
    return updateOfficialRoute(routeId, fields);
  }

  render() {
    const { routeIndex } = this.state;
    const route = this.props.routes[routeIndex];
    let content;
    if (route) {
      const defaultFieldValues = {
        name: route.name,
        origin: route.stops[0],
        destination: route.stops[route.stops.length - 1]
      };
      content = (
        <Form
          submit={this.submit}
          defaultFieldValues={defaultFieldValues}
        />
      );
    } else {
      content = (
        <Loading/>
      )
    }

    return content;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    routeId: ownProps.params.routeId,
    routes: state.busRoutes.routes
  }
};

export default connect(mapStateToProps, { updateOfficialRoute })(Edit);
