import React, { Component } from 'react';
import { ValidatorForm } from 'react-form-validator-core';

import InputField from './InputField';
import './App.css';

class App extends Component {
  state = {
    firstName: '',
    lastName: '',
    score: '',
    editId: null,
    leaderboard: [],
  };

  currentId = 0;

  // adds new row to leaderboard
  handleAdd = event => {
    let { firstName, lastName, score, editId } = this.state;
    const player = { firstName, lastName, score, id: this.currentId++ };
    let leaderboard;

    event.preventDefault();

    // update if editting
    if (editId !== null) {
      const index = this.state.leaderboard.findIndex(item => item.id === editId);
      leaderboard = [
        ...this.state.leaderboard.slice(0, index),
        Object.assign({}, player),
        ...this.state.leaderboard.slice(index + 1),
      ];
      // insert new player
    } else {
      leaderboard = [...this.state.leaderboard, player];
    }

    // reset form and sort leaderboard
    this.setState({
      firstName: '',
      lastName: '',
      score: '',
      editId: null,
      leaderboard: leaderboard.sort((a, b) => b.score - a.score || a.lastName.localeCompare(b.lastName)),
    });
  };

  // sets up row for edit
  handleEdit = id => {
    const player = this.state.leaderboard.find(player => {
      return player.id === id;
    });

    this.setState({
      firstName: player.firstName,
      lastName: player.lastName,
      score: player.score,
      editId: player.id,
    });
  };

  handleCancel = () => {
    this.setState({
      firstName: '',
      lastName: '',
      score: '',
      editId: null,
    });
  };

  handleDelete = id => {
    const leaderboard = this.state.leaderboard.filter(player => {
      return player.id !== id;
    });

    // update state from filter
    return this.setState({ leaderboard });
  };

  // tracks input change
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  renderLeaderboard = () => {
    const { leaderboard } = this.state;

    if (leaderboard.length < 1) return <li>Leaderboard is empty</li>;

    return leaderboard.map((item, i) => (
      <li key={`player-${i}`} onClick={() => this.handleEdit(item.id)}>
        {`${item.lastName}, ${item.firstName}`}
        <div className="points">{item.score}</div>
        <button onClick={() => this.handleDelete(item.id)}>DELETE</button>
      </li>
    ));
  };

  renderCancel = () => (
    <button style={{ margin: '0 0 0 5px' }} onClick={this.handleCancel}>
      CANCEL
    </button>
  );

  render() {
    return (
      <div className="App">
        <div className="Aligner">
          <div className="Aligner-item Aligner-item--top" />

          <div className="leaderboard">
            <ValidatorForm ref="form" onSubmit={this.handleAdd} className="enterPlayer">
              <div className="form-divide">
                <InputField
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  onChange={this.handleInputChange}
                  value={this.state.firstName}
                  validators={['required']}
                  errorMessages={['required', 'email is not valid']}
                />
                <InputField
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  onChange={this.handleInputChange}
                  value={this.state.lastName}
                  validators={['required']}
                  errorMessages={['required']}
                  style={{ marginLeft: 5 }}
                />
              </div>
              <div className="form-divide" style={{ margin: '5px 0' }}>
                <InputField
                  name="score"
                  placeholder="Score"
                  type="text"
                  onChange={this.handleInputChange}
                  value={this.state.score}
                  validators={['required', 'minNumber:0', 'maxNumber:100', 'matchRegexp:^[0-9]+$']}
                  errorMessages={[
                    'required',
                    'only numbers 0 - 100',
                    'only numbers 0 - 100',
                    'only numbers 0 - 100',
                    'only numbers 0 - 100',
                  ]}
                />
                <button style={{ margin: '0 0 0 5px' }} type="submit">
                  SAVE
                </button>
                {this.state.editId !== null && this.renderCancel()}
              </div>
            </ValidatorForm>
            <div className="title">
              LEADERBOARD<div>SCORE</div>
            </div>
            <ul>{this.renderLeaderboard()}</ul>
          </div>
          <div className="Aligner-item Aligner-item--bottom" />
        </div>
      </div>
    );
  }
}

export default App;
