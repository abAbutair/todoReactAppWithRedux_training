import React from "react";
import {connect} from "react-redux";
import {showHidePopup} from "../../actions";

const PopupModal = ({buttonContent, modalBodyClassName, children, showHidePopup, popupState, todoId}) => {
    return (
        <React.Fragment>
            <span className="span me-1" onClick={() => showHidePopup(true, todoId)}>
                {buttonContent}
            </span>
            <div className={`${modalBodyClassName} ${popupState.modalState && popupState.modalId === todoId ? 'show' : ''}`}
                 onClick={() => showHidePopup(false)}>
                {children}
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    console.log(state)
    return {
        popupState: state.popupState
    }
};

export default connect(mapStateToProps, {showHidePopup})(PopupModal);