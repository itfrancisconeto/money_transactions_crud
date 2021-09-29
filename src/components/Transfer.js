import React, { Component } from "react";
import DataService from "../services/ServiceTransactions";

export default class Transfer extends Component {
  constructor(props) {
    super(props);
    this.onChangeReceiverUser = this.onChangeReceiverUser.bind(this);
    this.onChangeTransferredValue = this.onChangeTransferredValue.bind(this);
    this.getTransfer= this.getTransfer.bind(this);
    this.updateTransfer= this.updateTransfer.bind(this);
    this.deleteTransfer = this.deleteTransfer.bind(this);

    this.state = {
      currentTransfer: {
        id: null,
        payer_user: "",
        receiver_user: "",
        transferred_value: "",  
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTransfer(this.props.match.params.id);
  }

  onChangeReceiverUser(e) {
    const receiver_user = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTransfer: {
          ...prevState.currentTransfer,
          receiver_user: receiver_user
        }
      };
    });
  }

  onChangeTransferredValue(e) {
    const transferred_value = e.target.value;
    
    this.setState(prevState => ({
      currentTransfer: {
        ...prevState.currentTransfer,
        transferred_value: transferred_value
      }
    }));
  }

  getTransfer(id) {
    DataService.get(id)
      .then(response => {
        this.setState({
          currentTransfer: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTransfer() {
    DataService.update(
      this.state.currentTransfer.id,
      this.state.currentTransfer
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The transfer was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTransfer() {    
    DataService.delete(this.state.currentTransfer.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTransfer } = this.state;

    return (
      <div>
        {currentTransfer ? (
          <div className="edit-form">
            <h4>Transfer</h4>
            <form>
              <div className="form-group">
                <label htmlFor="receiver_user">Receiver User</label>
                <input
                  type="text"
                  className="form-control"
                  id="receiver_user"
                  value={currentTransfer.receiver_user}
                  onChange={this.onChangeReceiverUser}
                />
              </div>
              <div className="form-group">
                <label htmlFor="transferred_value">Transferred Value</label>
                <input
                  type="text"
                  className="form-control"
                  id="transferred_value"
                  value={currentTransfer.transferred_value}
                  onChange={this.onChangeTransferredValue}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTransfer}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTransfer}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Transfer...</p>
          </div>
        )}
      </div>
    );
  }
}
