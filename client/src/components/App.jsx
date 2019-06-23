import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import List from './List.jsx';
import InsertConfirmation from './InsertConfirmation.jsx';
import UpdateConfirmation from './UpdateConfirmation.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      numberGuests: '',
      list: [],
      showPopupInsert: false,
      showPopupUpdate: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.readAllName = this.readAllName.bind(this);
    this.togglePopupInsert = this.togglePopupInsert.bind(this);
    this.togglePopupUpdate = this.togglePopupUpdate.bind(this);
    this.blank = this.blank.bind(this);
  }
  componentDidMount() {
    this.readAllName();
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleClick(e) {
    let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEx.test(this.state.email)) {
      
      alert("please correct email format!")
      e.preventDefault();
    } else {
      let flag = this.allRequired(this.state.firstName, this.state.lastName, this.state.email, this.state.numberGuests);
      //console.log('flag', flag);
      if (!flag) {
        alert("all field are required before submission!");
        e.preventDefault();
      } else {
        this.addRsvp(this.state);
        
      }
    }
  }
  allRequired(firstName, lastName, email, numberGuests) {
    if ((firstName || undefined) && (lastName || undefined) && (email || undefined) && (Number(numberGuests) || Number(''))) {
      return true;
    } else {
      return false;
    }
  }
  addRsvp(rsvp) {
    axios.post('/rsvps', {
      firstName: rsvp.firstName,
      lastName: rsvp.lastName,
      email: rsvp.email,
      numberOfGuests: rsvp.numberGuests
    })
      .then((res) => {
        this.readAllName();
         if(res.data === "saved"){
           this.togglePopupInsert();
         } else if (res.data === "updated"){
           this.togglePopupUpdate();
         }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  readAllName() {
    axios.get('/rsvps')
    .then((data) => {
      this.setState({
        list: data.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }
  togglePopupInsert() {
    this.setState({
      showPopupInsert: !this.state.showPopupInsert
    });
  }
  togglePopupUpdate() {
    this.setState({
      showPopupUpdate: !this.state.showPopupUpdate
    })
  }
  blank() {
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      numberGuests: ''
    });
  }
  render() {
    return (
      <form>
        <label>
          First Name:
         <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
        </label>
        <label>
          Last Name:
         <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} />
        </label>
        <label>
          Email Address:
         <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
        </label>
        <label>
          Number of Guests:
         <input onKeyDown={(e) => e.preventDefault()} type="number" name="numberGuests" min="1" value={this.state.numberGuests} onChange={this.handleInputChange} />
        </label>
        <button type="button" onClick={this.handleClick}>Submit</button>
        <List attendee={this.state.list} />
        {this.state.showPopupInsert ? <InsertConfirmation firstName={this.state.firstName} 
        guests={this.state.numberGuests} email={this.state.email} closePopup={this.togglePopupInsert} blank={this.blank} /> : null}
        {this.state.showPopupUpdate ? <UpdateConfirmation firstName={this.state.firstName} 
        guests={this.state.numberGuests} email={this.state.email} closePopup={this.togglePopupUpdate} blank={this.blank} /> : null}
      </form>
    )
  }
}

export default App;
