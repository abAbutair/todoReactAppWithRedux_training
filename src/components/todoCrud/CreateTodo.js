import React from "react";
import {connect} from "react-redux";
import {Form} from "react-final-form";

import {createTodo, getTodos} from "../../actions";

import Input from "../../formFields/Input";
import Textarea from "../../formFields/Textarea";
import DateInput from "../../formFields/DateInput";

const CreateTodo = ({createTodo, getTodos}) => {
    const initialValues = {
        datePicker: new Date()
    };

    // handle create todo form
    const onCreateTodoSubmit = async formValues => {

        // Date format sent to backend
        const selectedDate = formValues.datePicker ? `${formValues.datePicker.getMonth()+1}-${formValues.datePicker.getDate()}-${formValues.datePicker.getFullYear()}` : null;

        createTodo(formValues, selectedDate);
        getTodos();
    };

    const validateCreateForm = (e) => {
        const errors = {};

        if (e.title && e.title.length < 5 ) {
            errors.title = "too short"
        }

        return errors;
    };

    const renderCreateTodoForm = ({handleSubmit}) => {
        return (
            <React.Fragment>
                <h2>Create Todos</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <Input name="title" type="text" labelName="Title" />
                    </div>

                    <div className="mb-3">
                        <Textarea name="description" labelName="Description:"/>
                    </div>

                    <div className="mb-3">
                        <DateInput name="datePicker" labelName="To be done at:" />
                    </div>

                    <button type="submit" className="btn btn-dark">Create</button>
                </form>
            </React.Fragment>
        );
    };

    return (
        <Form onSubmit={onCreateTodoSubmit} initialValues={initialValues} validate={validateCreateForm} render={renderCreateTodoForm}/>
    );

};

export default connect(null, {createTodo, getTodos})(CreateTodo);