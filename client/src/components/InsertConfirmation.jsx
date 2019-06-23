import React from 'react';

class InsertConfirmation extends React.Component {
  
  render() {
    console.log("this.props on Insert:", this.props)
    return (
      <div className="popup">
        <div className="popup_inner">
        <p>
          {`${this.props.firstName}, you and your ${this.props.guests} guests are now on the list.
          We\'ll send an email confirmation to ${this.props.email}.`}
        </p>
        <button onClick={() => {this.props.closePopup(); this.props.blank()}}>close Me</button>
        </div>
      </div>
    );

  }

}


export default InsertConfirmation;