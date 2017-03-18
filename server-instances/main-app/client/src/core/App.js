import React from 'react';
import { connect } from 'react-redux';
import GrommetApp from 'grommet/components/App';

class App extends React.Component {
  render() {
    return (
      <GrommetApp centered={false}>
        {this.props.children}
      </GrommetApp>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(App);
