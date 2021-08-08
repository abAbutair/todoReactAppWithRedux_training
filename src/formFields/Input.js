import React from "react";
import {Field} from "react-final-form";

const Input = ({name, type, labelName}) => {
    const renderError = ({touched, error}) => {
        if (touched && error) {
            return (
                <span>{error}</span>
            );
        }
    };

    const handleInput = ({input, meta, className, id, placeholder, labelName, labelClassName}) => {
        return (
            <React.Fragment>
                <label htmlFor={id} className={labelClassName}>{labelName}</label>
                <input {...input} placeholder={placeholder} className={className} id={id}/>
                {renderError(meta)}
            </React.Fragment>
        );
    };

    return (
        <Field name={name} type={type} render={handleInput} className="form-control" id={name} placeholder={labelName} labelName={labelName} labelClassName="form-label"/>
    );
};

export default Input;