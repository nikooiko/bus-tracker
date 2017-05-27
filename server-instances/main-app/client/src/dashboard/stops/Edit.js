import React from 'react';
import { connect } from 'react-redux';
import bindFunctions from '../../utils/bindFunctions';
import { updateStop } from './store/actions';
import Form from './Form';

class Edit extends Form {
  constructor(props, content) {
    const defaultFieldValues = {
      label: ''
    };

    super(props, content, defaultFieldValues);
    bindFunctions(this, ['_onSubmit']);

    this.state = {
      ...this.state,
      stopIndex: -1,
    }
  }

  findInStops() {
    const { stops, stopId, replace } = this.props;
    const findStop = (stop) => {
      return stop.id === stopId;
    };
    const stopIndex = stops.findIndex(findStop);
    if (stopIndex === -1) {
      replace('/stops');
      return;
    }
    const prevState = this.state;
    this.setState({
      ...prevState,
      stopIndex,
      form: {
        ...prevState.form,
        fields: {
          label: stops[stopIndex].label
        }
      }
    });
  }

  componentWillMount() {
    this.findInStops();
  }

  componentWillUpdate() {
    const { stops, stopId } = this.props;
    const { stopIndex } = this.state;
    let stop = stops[stopIndex];
    if (!stop || stop.id !== stopId) {
      // stop not found or it's not the expected one
      this.findInStops();
    }
  }

  _onSubmit(event) {
    event.preventDefault();
    const { updateStop, stopId } = this.props;
    const newState = {...this.state};
    const form = newState.form;
    this.validateForm(form);
    if (Object.keys(form.errors).length !== 0) {
      this.setState(newState);
    } else {
      updateStop(stopId, form.fields)
        .catch((errors) => {
          // pass errors to form
          const anotherNewState = { ...this.state };
          anotherNewState.form.errors = { ...errors };
          this.setState(anotherNewState);
        });
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stopId: ownProps.params.stopId,
    stops: state.stops.stops
  }
};

export default connect(mapStateToProps, { updateStop })(Edit);
