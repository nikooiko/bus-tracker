import React from 'react';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import GrommetForm from 'grommet/components/Form';
import CheckBox from 'grommet/components/CheckBox';
import FormUtil from '../common/Form';
import bindFunctions from '../utils/bindFunctions';

const formValidator = {
  username: {
    required: true
  },
  password: {
    required: true
  }
};

class Form extends FormUtil {
  constructor(props, content) {
    super(props, content, {}, formValidator);
    bindFunctions(this, ['_onSubmit']);
  }

  render() {
    const fields = this.state.form.fields;
    return (
      <GrommetForm
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
      </GrommetForm>
    );
  }
}

export default Form;
