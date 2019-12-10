import React from 'react';
// Field is component, reduxForm is a function
import {Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component{

    renderError({error, touched}){
        if (touched && error){
            return (
            <div className='ui error message'>
                <div className='header'>{error}</div>
            </div>
            )
        }
    }
    // renderInput (formProps){    
        // instead of formProps we deinstructured input
        // formProps.input ==={input}
    renderInput = ({input, label, meta}) => {
        const className= `field ${meta.error && meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <label> {label}</label>
                <input {...input} autoComplete='off' />
                {this.renderError(meta)}
            </div> 
        )
    }
    onSubmit = (formValues)=> {
        // dont need to use e.preventDefault() anymore
        // redux form has this function builting within handleSubmit prop
        this.props.onSubmit(formValues);
    }

    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
                <Field name='title' label='Enter Title' component={this.renderInput} />
                <Field name='description' label='Enter Description' component={this.renderInput} />
                <button className='ui button primary'> Submit </button>
            </form>
            
            )
    }
}
const validate =(formValues)=>{
    const errors ={}
    if (!formValues.title){
        errors.title= 'Please Enter Title'
    }
    if (!formValues.description){
        errors.description = 'Please Enter Description'
    }
    return errors;
}
// reduxForm gonna return a function, and we immediatly 
// call that function with streamCreate
// ** unlike connect that takes seprate arguments, 
// ** reduxform just take a single object, 
// **any configuration should be within the object
// export default connect() (reduxForm({form: 'streamCreate', validate})(StreamForm));

export default reduxForm({form: 'streamForm', validate})(StreamForm);
