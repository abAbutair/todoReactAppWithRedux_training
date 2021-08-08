import React from "react";
import {Field} from "react-final-form";
import DatePicker from "react-date-picker";

const Input = ({name, labelName}) => {
    const renderError = ({touched, error}) => {
        if (touched && error) {
            return (
                <span>{error}</span>
            );
        }
    };

    const handleDateInput = ({input, meta, className, id, labelName, labelClassName, dateFormat}) => {
        return (
            <React.Fragment>
                <label htmlFor={id} className={labelClassName}>{labelName}</label>
                <DatePicker {...input} className={className} id={id} format={dateFormat} />
                {renderError(meta)}
            </React.Fragment>
        );
    };

    return (
        <Field name={name} render={handleDateInput} className="form-control react-date-picker" id={name} placeholder={labelName} labelName={labelName} labelClassName="form-label"/>
    );
};

export default Input;