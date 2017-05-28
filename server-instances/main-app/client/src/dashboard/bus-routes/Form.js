import React from 'react';
import { connect } from 'react-redux';
import GrommetForm from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import FormUtil from '../../common/Form';
import Navbar from './navigation/Navbar';
import bindFunctions from '../../utils/bindFunctions';

import  { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';

const DirectionsGoogleMap = withGoogleMap(props => (
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
    required: true,
    shouldNotEqual: 'destination'
  },
  destination: {
    required: true,
    shouldNotEqual: 'origin'
  }
};

class Form extends FormUtil {
  constructor(props, content) {
    const state = {
      directions: null
    };
    super(props, content, state, formValidator);

    this.directionsService = new google.maps.DirectionsService();
    bindFunctions(this, ['_onNeedDirections']);
  }

  componentDidMount() {
    this._onNeedDirections();
  }

  _onNeedDirections(err) {
    const { state } = this;
    const { fields } = state.form;
    if (err || !fields.origin || !fields.destination) { // clear if error
      this.setState({
        ...state,
        directions: null
      });
      return;
    }

    const originLoc = fields.origin.value;
    const destinationLoc = fields.destination.value;

    const origin = new google.maps.LatLng(originLoc.lat, originLoc.lng);
    const destination = new google.maps.LatLng(destinationLoc.lat, destinationLoc.lng);

    this.directionsService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (res, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          ...state,
          directions: res
        });
      } else {
        console.error(`Error fetching directions ${status}`);
        // pass errors to form
        const anotherNewState = {
          ...state,
          directions: null
        };
        anotherNewState.form.errors = {
          origin: 'could not create route',
          destination: 'could not create route'
        };
        this.setState(anotherNewState);
      }
    });
  }

  render() {
    const { stops } = this.props.stops;
    const center = this.state.form.fields.origin;

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
              {this.renderSelectField('Origin', 'origin', stops, this._onNeedDirections)}
              {this.renderSelectField('Destination', 'destination', stops, this._onNeedDirections)}
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
          <DirectionsGoogleMap
            containerElement={
              <Box size={{height: 'medium', width: 'medium'}}/>
            }
            mapElement={
              <div style={{height: `100%`}}/>
            }
            center={center}
            directions={this.state.directions}
          />
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  stops: state.stops
});

export default connect(mapStateToProps, null)(Form);
