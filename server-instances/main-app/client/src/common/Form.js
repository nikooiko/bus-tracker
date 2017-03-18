import React from 'react';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';

class Form extends React.Component {
  constructor(props, content, defaultFieldValues, formValidator) {
    super(props, content);
    this.state = {
      ...this.state,
      form: {
        fields: defaultFieldValues,
        errors: {}
      }
    };

    this.formValidator = formValidator;
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

  validateField(form, fieldName) {
    const fieldValidator = this.formValidator[fieldName];
    const value = form.fields[fieldName];
    const errors = form.errors;
    if (value === '' && fieldValidator.required) {
      errors[fieldName] = 'required';
      return;
    }
    const shouldEqual = fieldValidator.shouldEqual;
    if (shouldEqual && value !== form.fields[shouldEqual]) {
      errors[fieldName] = 'no match';
      return;
    }
    // No error so delete
    delete errors[fieldName];
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

  _onSelectFieldChange(fieldName) {
    return (event) => {
      const newState = {...this.state};
      const form = newState.form;
      form.fields[fieldName] = event.option;
      //check if need validation
      if (this.formValidator[fieldName]) {
        this.validateField(form, fieldName);
      }
      this.setState(newState);
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

  renderSelectField(label, name, options) {
    const form =this.state.form;
    return (
      <FormField label={label} htmlFor={name} error={form.errors[name]}>
        <Select
          id={name}
          options={options}
          value={form.fields[name]}
          onChange={this._onSelectFieldChange(name)}
          onBlur={this._onSelectFieldChange(name)}
        />
      </FormField>
    );
  }

}

export default Form;
