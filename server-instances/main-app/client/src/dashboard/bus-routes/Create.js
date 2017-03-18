import React from 'react';
import { connect } from 'react-redux';
import bindFunctions from '../../utils/bindFunctions';
import { createOfficialRoute } from './store/routesActions';
import Form from './Form';

class Create extends Form {
  constructor(props, content) {
    const defaultFieldValues = {
      name: ''
    };

    super(props, content, defaultFieldValues);
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
      this.props.createOfficialRoute(form.fields)
        .catch((errors) => {
          // pass errors to form
          const anotherNewState = { ...this.state };
          anotherNewState.form.errors = { ...errors };
          this.setState(anotherNewState);
        });
    }
  }
}

export default connect(null, { createOfficialRoute })(Create);
