import React from 'react';
import { connect } from 'react-redux';
import bindFunctions from '../../utils/bindFunctions';
import { updateStop } from './store/actions';
import Form from './Form';
import Loading from "../../common/Loading";

class Edit extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this, ['submit']);

    this.state = {
      ...this.state,
      stopIndex: -1,
    }
  }

  findInStops() {
    const { stops, stopId, router } = this.props;
    const findStop = (stop) => {
      return stop.id === stopId;
    };
    const stopIndex = stops.findIndex(findStop);
    if (stopIndex === -1) {
      router.replace('/stops');
      return;
    }
    const prevState = this.state;
    this.setState({
      ...prevState,
      stopIndex
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


  submit(fields) {
    const { updateStop, stopId } = this.props;
    return updateStop(stopId, fields)
  }

  render() {
    const { stopIndex } = this.state;
    const stop = this.props.stops[stopIndex];
    let content;
    if (stop) {
      const defaultFieldValues = {
        label: stop.label,
        value: stop.value
      };
      content = (
        <Form
          submit={this.submit}
          defaultFieldValues={defaultFieldValues}
        />
      );
    } else {
      content = (
        <Loading/>
      )
    }

    return content;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stopId: ownProps.params.stopId,
    stops: state.stops.stops
  }
};

export default connect(mapStateToProps, { updateStop })(Edit);
