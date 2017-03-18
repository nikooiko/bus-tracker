import React from 'react';
import GrommetForm from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import FormUtil from '../../common/Form';
import Navbar from './navigation/Navbar';

const formValidator = {
  name: {
    required: true
  }
};

class Form extends FormUtil {
  constructor(props, content, defaultFieldValues) {
    super(props, content, defaultFieldValues, formValidator);
  }

  render() {
    return (
      <Box>
        <Navbar />
        <Box align='center'>
          <GrommetForm
            pad={{ horizontal: 'medium', vertical: 'small' }}
            onSubmit={this._onSubmit}
          >
            <FormFields>
              {this.renderInputField('Name', 'name', 'text')}
            </FormFields>
            <Box pad={{ vertical: 'medium', between: 'medium' }}>
              <Box direction='row'>
                <Button
                  fill={true} align='center' label='Submit' primary={true} type='submit'
                  onClick={this._onSubmit}
                />
              </Box>
            </Box>
          </GrommetForm>
        </Box>
      </Box>
    );
  }
}

export default Form;
