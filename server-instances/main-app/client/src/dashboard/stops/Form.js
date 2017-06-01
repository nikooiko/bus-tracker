import React from 'react';
import { connect } from 'react-redux';
import GrommetForm from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import FormUtil from '../../common/Form';
import Navbar from './navigation/Navbar';
import bindFunctions from '../../utils/bindFunctions';
import { showToast } from '../../toast/store/actions';

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const defaultCenter = {
  lat: 39.3666667,
  lng: 22.9458333
};

const LocationGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={props.center || defaultCenter}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker title={marker.title} position={marker.position} key={index} />
    ))}
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
  constructor(props, content) {
    super(props, content, {}, formValidator);

    bindFunctions(this, ['_onMapClick']);
  }

  _onMapClick(event) {
    const { state } = this;
    const { latLng } = event;
    const newState = {...state};
    newState.form.fields.value = {
      lat: latLng.lat(),
      lng: latLng.lng()
    };
    this.setState(newState);
    this.validateField(this.state.form, 'value');
  }

  componentWillUpdate() {
    const valueError = this.state.form.errors['value'];
    if (valueError) {
      this.props.showToast({
        message: 'You must add a location! Click inside map.',
        status: 'critical'
      });
    }
  }

  render() {
    const fields = this.state.form.fields;
    const center = fields.value;
    const markers = [];
    if (center) {
      markers.push({
        position: center,
        title: fields.label
      });
    }

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
            center={center}
            markers={markers}
            onMapClick={this._onMapClick}
          />
        </Box>
      </Box>
    );
  }
}

export default connect(null, { showToast })(Form);
