import React from 'react';
import { connect } from 'react-redux';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import Box from 'grommet/components/Box';
import { login } from './store/authActions';
import bindFunctions from '../utils/bindFunctions';
import MyForm from '../common/Form';

const formValidator = {
  username: {
    required: true
  },
  password: {
    required: true
  }
};

class Login extends MyForm {
  constructor(props, content) {
    const fields = {
      username: '',
      password: '',
      rememberMe: false,
    };

    super(props, content, fields, formValidator);
    bindFunctions(this, ['_onSubmit']);
  }

  _onSubmit(event) {
    event.preventDefault();
    const newState = {...this.state};
    const form = newState.form;
    this.validateForm(form);
    if (Object.keys(form.errors).length !== 0) {
      this.setState(newState);
    } else {
      this.props.login(form.fields);
    }
  }

  render() {
    const fields = this.state.form.fields;
    return (
    <Form
      pad={{ horizontal: 'medium', vertical: 'small' }}
      onSubmit={this._onSubmit}
    >
      <FormFields>
        {this.renderInputField('Username', 'username', 'text')}
        {this.renderInputField('Password', 'password', 'password')}
      </FormFields>
      <Box pad={{ vertical: 'medium', between: 'medium' }}>
        <Box direction='row'>
          <CheckBox
            id='rememberMe' name='rememberMe' label='Remember me' checked={fields.rememberMe}
            onChange={this._onCheckBoxChange('rememberMe')}
          />
        </Box>
        <Box direction='row'>
          <Button
            fill={true} align='center' label='Submit' primary={true} type='submit'
            onClick={this._onSubmit}
          />
        </Box>
      </Box>
    </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error
});

export default connect(mapStateToProps, { login })(Login);
