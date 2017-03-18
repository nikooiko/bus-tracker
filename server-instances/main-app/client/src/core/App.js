import React from 'react';
import { connect } from 'react-redux';
import GrommetApp from 'grommet/components/App';
import Toast from 'grommet/components/Toast';
import bindFunctions from '../utils/bindFunctions';
import { hideToast } from '../toast/store/toastActions';

class App extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this, ['_onClose']);
  }

  _onClose() {
    this.props.hideToast();
  }

  render() {
    const toast = this.props.toast;
    let displayedToast;
    if (!toast.hidden) {
      displayedToast = (
        <Toast status={toast.status} onClose={this._onClose}>
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

export default connect(mapStateToProps, { hideToast })(App);
