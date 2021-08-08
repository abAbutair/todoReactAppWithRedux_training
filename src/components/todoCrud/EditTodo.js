import React from "react";
import {connect} from "react-redux";
import {Form} from "react-final-form";
import PopupModal from "../../layout/popupModal/PopupModal";

import {editTodo, getTodos, showHidePopup} from "../../actions";

import Input from "../../formFields/Input";
import Textarea from "../../formFields/Textarea";
import DateInput from "../../formFields/DateInput";

import "./editTodo.scss";

const EditTodo = ({ownTodo, editTodo, getTodos, showHidePopup}) => {

    const initialValues2 = {
        [`title-${ownTodo._id}`]: ownTodo.title,
        [`description-${ownTodo._id}`]: ownTodo.description,
        [`dataPicker-${ownTodo._id}`]: ownTodo.toBeDoneAt ? new Date(ownTodo.toBeDoneAt.substring(0, 10)) : null,
    };


    const onEditFormSubmit = async (formValues) => {
        // Date format sent to backend
        const selectedDate = formValues[`dataPicker-${ownTodo._id}`] ? `${formValues[`dataPicker-${ownTodo._id}`].getMonth()+1}-${formValues[`dataPicker-${ownTodo._id}`].getDate()}-${formValues[`dataPicker-${ownTodo._id}`].getFullYear()}` : null;

        editTodo(formValues, selectedDate, ownTodo._id);
        getTodos();
        showHidePopup(false, ownTodo._id);
    };

    const validateEditForm = (e) => {
        const errors = {};

        if (e.title && e.title.length < 5 ) {
            errors.title = "too short"
        }

        return errors;
    };

    const renderEditForm = ({handleSubmit}) => {
      return (
          <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
              <div className="mb-3">
                  <Input name={`title-${ownTodo._id}`} type="text" labelName="Edit Title" />
              </div>

              <div className="mb-3">
                  <Textarea name={`description-${ownTodo._id}`} labelName="Edit Description:"/>
              </div>

              <div className="mb-3">
                  <DateInput name={`dataPicker-${ownTodo._id}`} labelName="Edit The Date:" />
              </div>

              <button type="submit" className="btn btn-dark">Submit</button>
          </form>
      );
    };

    return (
        <PopupModal buttonContent={<i className="bi bi-pencil-square"/>} modalBodyClassName="edit-form" todoId={ownTodo._id}>
            <Form onSubmit={onEditFormSubmit} initialValues={initialValues2} validate={validateEditForm} render={renderEditForm}/>
        </PopupModal>
    );
}

export default connect(null, {editTodo, getTodos, showHidePopup})(EditTodo);