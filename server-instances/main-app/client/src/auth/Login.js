import React from 'react';
import { connect } from 'react-redux';
import { login } from './store/actions';
import bindFunctions from '../utils/bindFunctions';
import Form from './Form';

class Login extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this, ['submit']);
  }

  submit(fields) {
    return this.props.login(fields);
  }

  render() {
    const defaultFieldValues = {
      username: '',
      password: '',
      rememberMe: false,
    };

    return (
      <Form
        submit={this.submit}
        defaultFieldValues={defaultFieldValues}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error
});

export default connect(mapStateToProps, { login })(Login);
