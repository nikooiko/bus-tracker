import React from 'react';
import GrommetForm from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import FormUtil from '../../common/Form';
import Navbar from './navigation/Navbar';
import bindFunctions from '../../utils/bindFunctions';

import  { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const LocationGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={props.center}
  >
  </GoogleMap>
));

const formValidator = {
  label: {
    required: true
  },
  value: {
    required: true
  }
};

class Form extends FormUtil {
  constructor(props, content, defaultFieldValues) {
    const state = {};
    super(props, content, state, defaultFieldValues, formValidator);

    bindFunctions(this, ['_onNeedLocation']);
  }

  _onNeedLocation() {
    const { state, form } = this.state;
    const { fields } = form;
    if (!fields.value) return;
    // TODO
  }

  render() {
    return (
      <Box>
        <Navbar />
        <Box direction='row' justify='center' align='center'>
          <GrommetForm
            pad={{ horizontal: 'medium', vertical: 'small' }}
            onSubmit={this._onSubmit}
          >
            <FormFields>
              {this.renderInputField('Label', 'label', 'text')}
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
          <LocationGoogleMap
            containerElement={
              <Box size={{height: 'medium', width: 'medium'}}/>
            }
            mapElement={
              <div style={{height: `100%`}}/>
            }
          />
        </Box>
      </Box>
    );
  }
}

export default Form;
