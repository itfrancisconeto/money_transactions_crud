import React, { Component } from "react";
import DataService from "../services/ServiceTransactions";

export default class AddTransfer extends Component {
  constructor(props) {
    super(props);
    this.onChangeReceiverUser= this.onChangeReceiverUser.bind(this);    
    this.onChangeTransferredValue= this.onChangeTransferredValue.bind(this);
    this.onChangePayerUser = this.onChangePayerUser.bind(this);    
    this.saveTransfer = this.saveTransfer.bind(this);
    this.newTransfer = this.newTransfer.bind(this);

    this.state = {
      id: null,
      payer_user: "",
      receiver_user: "",
      transferred_value: "",  
      published: false,
      submitted: false
    };
  }

  onChangeReceiverUser(e) {
    this.setState({
      receiver_user: e.target.value
    });
  }

  onChangeTransferredValue(e) {
    this.setState({
      transferred_value: e.target.value
    });
  }

  onChangePayerUser(e) {
    this.setState({
      payer_user: e.target.value
    });
  }

  saveTransfer() {
    var data = {
      receiver_user: this.state.receiver_user,
      transferred_value: this.state.transferred_value,
      payer_user: this.state.payer_user      
    };

    DataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          receiver_user: response.data.receiver_user,
          transferred_value: response.data.transferred_value,
          payer_user: response.data.payer_user,          
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTransfer() {
    this.setState({
      id: null,
      receiver_user: "",
      transferred_value: "",
      payer_user: "",      
      published: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTransfer}>
            Add Transfer
            </button>
          </div>
        ) : (
          <div>

            <div className="form-group">
              <label htmlFor="payer_user">Payer User</label>
              <input
                type="text"
                className="form-control"
                id="payer_user"
                required
                value={this.state.payer_user}
                onChange={this.onChangePayerUser}
                name="payer_user"
              />
            </div>  
            
            <div className="form-group">
              <label htmlFor="receiver_user">Receiver User</label>
              <input
                type="text"
                className="form-control"
                id="receiver_user"
                required
                value={this.state.receiver_user}
                onChange={this.onChangeReceiverUser}
                name="receiver_user"
              />
            </div>

            <div className="form-group">
              <label htmlFor="transferred_value">Transferred Value ($)</label>
              <input
                type="text"
                className="form-control"
                id="transferred_value"
                required
                value={this.state.transferred_value}
                onChange={this.onChangeTransferredValue}
                name="transferred_value"
              />
            </div>         

            <button onClick={this.saveTransfer} className="btn btn-success">
              Add Transfer
            </button>
          </div>
        )}
      </div>
    );
  }
}
