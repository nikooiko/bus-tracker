import React from 'react';
import GrommetForm from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import FormUtil from '../../common/Form';
import Navbar from './navigation/Navbar';
import bindFunctions from '../../utils/bindFunctions';

import  {withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';

const DirectionsExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={props.center}
  >
    {props.directions && <DirectionsRenderer directions={props.directions}/>}
  </GoogleMap>
));

const formValidator = {
  name: {
    required: true
  },
  origin: {
    required: true
  },
  destination: {
    required: true
  }
};

class Form extends FormUtil {
  constructor(props, content, defaultFieldValues) {
    const state = {
      directions: null
    };
    super(props, content, state, defaultFieldValues, formValidator);

    this.directionsService = new google.maps.DirectionsService();
    bindFunctions(this, ['_onNeedDirections']);
  }

  _onNeedDirections() {
    const { state, form } = this.state;
    const { fields } = form;
    if (!fields.origin || !fields.destination) return;

    this.directionsService.route({
      origin: fields.origin.value,
      destination: fields.destination.value,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (res, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          ...state,
          directions: res
        })
      } else {
        console.error(`error fetching directions ${res}`);
      }
    });
  }

  render() {
    const locationOpts = [
      { value: new google.maps.LatLng(41.8507300, -87.6512600), label: 'loc1' },
      { value: new google.maps.LatLng(41.8525800, -87.6514100), label: 'loc2' }
    ];
    const origin = this.state.form.fields.origin;

    return (
      <Box>
        <Navbar />
        <Box direction='row' justify='center' align='center'>
          <GrommetForm
            pad={{ horizontal: 'medium', vertical: 'small' }}
            onSubmit={this._onSubmit}
          >
            <FormFields>
              {this.renderInputField('Name', 'name', 'text')}
              {this.renderSelectField('Origin', 'origin', locationOpts, this._onNeedDirections)}
              {this.renderSelectField('Destination', 'destination', locationOpts, this._onNeedDirections)}
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
          <DirectionsExampleGoogleMap
            containerElement={
              <Box size={{height: 'medium', width: 'medium'}}/>
            }
            mapElement={
              <div style={{height: `100%`}}/>
            }
            center={origin ? origin.value: null}
            directions={this.state.directions}
          />
        </Box>
      </Box>
    );
  }
}

export default Form;
