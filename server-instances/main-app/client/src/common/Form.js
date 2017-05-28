import React from 'react';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';
import bindFunctions from '../utils/bindFunctions';

class Form extends React.Component {
  constructor(props, content, state, formValidator) {
    super(props, content);
    this.state = {
      ...state,
      form: {
        fields: props.defaultFieldValues,
        errors: {}
      }
    };

    this.formValidator = formValidator;
    bindFunctions(this, ['_onSubmit']);
  }

  _onSubmit(event) {
    event.preventDefault();
    const newState = { ...this.state };
    const form = newState.form;
    this.validateForm(form);
    if (Object.keys(form.errors).length !== 0) {
      this.setState(newState);
    } else {
      this.props.submit(form.fields)
        .catch((errors) => {
          // pass errors to form
          const anotherNewState = { ...this.state };
          anotherNewState.form.errors = { ...errors };
          this.setState(anotherNewState);
        });
    }
  }

  validateForm(form) {
    const fieldNames = Object.keys(form.fields);
    const len = fieldNames.length - 1;
    let i = -1;
    while (i++ < len) {
      const fieldName = fieldNames[i];
      if (this.formValidator[fieldName]) {
        this.validateField(form, fieldName);
      }
    }
  }

  /**
   * Util that used to validate a field based on provided validator
   *
   * @param form The form containing all the fields
   * @param fieldName The field to validate
   * @param continueValidation Whether to call validation again for another field
   *        (e.g. for comparisons).
   * @returns {String|null} An error message or null if no error.
   */
  validateField(form, fieldName, continueValidation=true) {
    const fieldValidator = this.formValidator[fieldName];
    const value = form.fields[fieldName];
    const errors = form.errors;
    if ((value === '' || !value)  && fieldValidator.required) {
      return errors[fieldName] = 'required';
    }
    let continueErr = null;
    const shouldEqual = fieldValidator.shouldEqual;
    if (shouldEqual) {
      let err = null;
      if (value && value !== form.fields[shouldEqual]) {
        err = errors[fieldName] = `should not equal ${shouldEqual}`;
      }
      if (continueValidation) {
        continueErr = this.validateField(form, shouldEqual, false); // false to avoid lock
      }
      if (err) return err
    }
    const shouldNotEqual = fieldValidator.shouldNotEqual;
    if (shouldNotEqual) {
      let err = null;
      let continueErr = null;
      if (value && value === form.fields[shouldNotEqual]) {
        err = errors[fieldName] = `should not equal ${shouldNotEqual}`;
      }
      if (continueValidation) {
        continueErr = this.validateField(form, shouldNotEqual, false); // false to avoid lock
      }
      if (err) return err
    }
    // No error so delete
    delete errors[fieldName];
    return continueErr; // return second level validation error
  }

  _onInputFieldChange(fieldName) {
    return (event) => {
      const newState = {...this.state};
      const form = newState.form;
      form.fields[fieldName] = event.target.value;
      //check if need validation
      if (this.formValidator[fieldName]) {
        this.validateField(form, fieldName);
      }
      this.setState(newState);
    };
  }

  _onCheckBoxChange(fieldName) {
    return (event) => {
      const newState = {...this.state};
      const form = newState.form;
      form.fields[fieldName] = event.target.checked;
      this.setState(newState);
    }
  }

  _onSelectFieldChange(fieldName, postAction) {
    return (event) => {
      const newState = {...this.state};
      const form = newState.form;
      form.fields[fieldName] = event.option;
      //check if need validation
      let err = null;
      if (this.formValidator[fieldName]) {
        err = this.validateField(form, fieldName);
      }
      this.setState(newState);
      if (postAction && typeof postAction === 'function') postAction(err);
    }
  }

  renderInputField(label, name, type) {
    const form = this.state.form;
    return (
      <FormField label={label} htmlFor={name} error={form.errors[name]}>
        <input
          value={form.fields[name]} id={name} type={type}
          onChange={this._onInputFieldChange(name)}
          onBlur={this._onInputFieldChange(name)}
        />
      </FormField>
    );
  }

  renderSelectField(label, name, options, postAction) {
    const { form } = this.state;
    const selectedOpt = form.fields[name];
    return (
      <FormField label={label} htmlFor={name} error={form.errors[name]}>
        <Select
          id={name}
          options={options}
          value={selectedOpt ? selectedOpt.label : null}
          onChange={this._onSelectFieldChange(name, postAction)}
        />
      </FormField>
    );
  }

}

export default Form;
