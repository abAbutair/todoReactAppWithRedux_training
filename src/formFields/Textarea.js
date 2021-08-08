import React from "react";
import {Field} from "react-final-form";

const Textarea = ({name, labelName}) => {
    const renderError = ({touched, error}) => {
        if (touched && error) {
            return (
                <span>{error}</span>
            );
        }
    };

    const handleTextarea = ({input, meta, className, id, placeholder, labelName, labelClassName}) => {
        return (
            <React.Fragment>
                <label htmlFor={id} className={labelClassName}>{labelName}</label>
                <textarea {...input} className={className} id={id} placeholder={placeholder} />
                {renderError(meta)}
            </React.Fragment>
        );
    };

    return (
        <Field name={name} render={handleTextarea} className="form-control" id={name} placeholder={labelName} labelName={labelName} labelClassName="form-label"/>
    );
};

export default Textarea;