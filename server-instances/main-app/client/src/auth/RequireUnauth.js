import React from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { routeAfterAuth } from './authConfig';
import Loading from '../common/Loading';

export default (ComposedComponent) => {
  class Unauthenticated extends React.Component {
    componentWillMount() {
      if(this.props.authenticated) {
        this.props.push(routeAfterAuth);
      }
    }

    componentWillUpdate(nextProps) {
      if(nextProps.authenticated) {
        this.props.push(routeAfterAuth);
      }
    }

    render() {
      if(!this.props.authenticated) {
        return <ComposedComponent {...this.props} />
      } else {
        return <Loading />
      }
    }
  }

  const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated
  });

  return connect(mapStateToProps, { push: routerActions.push })(Unauthenticated);
}
