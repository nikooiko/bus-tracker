import React from 'react';
import { connect } from 'react-redux';
import bindFunctions from '../../utils/bindFunctions';
import { updateOfficialRoute } from './store/actions';
import Form from './Form';

class Edit extends Form {
  constructor(props, content) {
    const defaultFieldValues = {
      name: ''
    };

    super(props, content, defaultFieldValues);
    bindFunctions(this, ['_onSubmit']);

    this.state = {
      ...this.state,
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
    const prevState = this.state;
    this.setState({
      ...prevState,
      routeIndex,
      form: {
        ...prevState.form,
        fields: {
          name: routes[routeIndex].name
        }
      }
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

  _onSubmit(event) {
    event.preventDefault();
    const { updateOfficialRoute, routeId } = this.props;
    const newState = {...this.state};
    const form = newState.form;
    this.validateForm(form);
    if (Object.keys(form.errors).length !== 0) {
      this.setState(newState);
    } else {
      updateOfficialRoute(routeId, form.fields)
        .catch((errors) => {
          // pass errors to form
          const anotherNewState = { ...this.state };
          anotherNewState.form.errors = { ...errors };
          this.setState(anotherNewState);
        });
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    routeId: ownProps.params.routeId,
    routes: state.busRoutes.routes
  }
};

export default connect(mapStateToProps, { updateOfficialRoute })(Edit);
