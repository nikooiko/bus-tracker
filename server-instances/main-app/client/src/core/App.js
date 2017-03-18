import React from 'react';
import { connect } from 'react-redux';
import GrommetApp from 'grommet/components/App';
import Toast from 'grommet/components/Toast';

class App extends React.Component {
  render() {
    const toast = this.props.toast;
    let displayedToast;
    if (!toast.hidden) {
      displayedToast = (
        <Toast status={toast.status} size='medium'>
          {toast.message}
        </Toast>
      );
    }

    return (
      <GrommetApp centered={false}>
        {displayedToast}
        {this.props.children}
      </GrommetApp>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  toast: state.toast
});

export default connect(mapStateToProps)(App);
