import React, { Component } from "react";
import DataService from "../services/ServiceTransactions";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class ListTransfer extends Component {
  constructor(props) {
    super(props);
    this.retrieveTransfers = this.retrieveTransfers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTransfer = this.setActiveTransfer.bind(this);

    this.state = {
      transfers: [],
      currentTransfer: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveTransfers();
  }

  retrieveTransfers() {
    DataService.getAll()
      .then(response => {
        this.setState({
          transfers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTransfers();
    this.setState({
      currentTransfer: null,
      currentIndex: -1
    });
  }

  setActiveTransfer(transfer, index) {
    this.setState({
      currentTransfer: transfer,
      currentIndex: index
    });
  }

  searchId() {
    this.setState({
      currentTransfer: null,
      currentIndex: -1
    });

  DataService.findById(this.state.searchId)
      .then(response => {
        this.setState({
          transfers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { transfers, currentTransfer, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Transfers List</h4>
          <p>Please click on a Transfer to change...</p>

          <ul className="list-group">
            {transfers &&
              transfers.map((transfer, index) => (
                <li 
                  className={ 
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTransfer(transfer, index)}
                  key={index}
                >
                  {
                  "[Id: " + transfer.id + "] " + 
                   "[Payer User: " + transfer.payer_user + "] " + 
                   "[Receiver User: " + transfer.receiver_user + "] " + 
                   "[Value ($): " +transfer.transferred_value + "] " + 
                   "[Date: " + transfer.transferred_date.replace('T',' ').replace(new RegExp('.{6}$'), '') + "] "
                   }
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentTransfer ? (
            <div>
              <h4>Transfer</h4>
              <div>
                <label>
                  <strong>Id:</strong>
                </label>{" "}
                {currentTransfer.id}
              </div>
              <div>
                <label>
                  <strong>Payer User:</strong>
                </label>{" "}
                {currentTransfer.payer_user}
              </div>
              <div>
                <label>
                  <strong>Receiver User:</strong>
                </label>{" "}
                {currentTransfer.receiver_user}
              </div>
              <div>
                <label>
                  <strong>Transferred Value:</strong>
                </label>{" "}
                {currentTransfer.transferred_value}
              </div>
              <div>
                <label>
                  <strong>Transferred Date:</strong>
                </label>{" "}
                {currentTransfer.transferred_date.replace('T',' ').replace(new RegExp('.{6}$'), '')}
              </div>

              <Link
                to={"/transfers/" + currentTransfer.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>             
            </div>
          )}
        </div>
      </div>
    );
  }
}
