import React from 'react';
import { connect } from 'react-redux';
import bindFunctions from '../../utils/bindFunctions';
import { createStop } from './store/actions';
import Form from './Form';

class Create extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this, ['submit']);
  }

  submit(fields) {
    return this.props.createStop(fields);
  }

  render() {
    const defaultFieldValues = {
      name: '',
      origin: null,
      destination: null
    };

    return (
      <Form
        submit={this.submit}
        defaultFieldValues={defaultFieldValues}
      />
    );
  }
}

export default connect(null, { createStop })(Create);
