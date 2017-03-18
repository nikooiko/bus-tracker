import React from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { routeAfterUnauth } from './authConfig';
import Loading from '../common/Loading';

export default (ComposedComponent) => {
  class Authenticated extends React.Component {
    componentWillMount() {
      if(!this.props.authenticated) {
        this.props.push(routeAfterUnauth);
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated) {
        this.props.push(routeAfterUnauth);
      }
    }

    render() {
      if(this.props.authenticated) {
        return <ComposedComponent {...this.props} />
      } else {
        return <Loading />
      }
    }
  }

  const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated
  });

  return connect(mapStateToProps, { push: routerActions.push })(Authenticated);
}
