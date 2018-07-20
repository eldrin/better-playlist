import React, { Component } from 'react';
import './App.css';

let defaultTextColor = '#fff';
let defaultStyle = {
  color: defaultTextColor
};

class Aggregate extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2 style={{color: defaultTextColor}}>Number Text</h2>
      </div>
    );
  }
}


class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img/>
        <input type="text"/>
        Filter
      </div>
    );
  }
}


class Playlist extends Component {
  render() {
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: "25%"}}>
        <img/>
        <h3>Playlist</h3>
        <ul><li>Song 1</li><li>Song 2</li><li>Song 3</li></ul>
      </div>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Title</h1>
        <Aggregate/>
        <Aggregate/>
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
      </div>
    );
  }
}

export default App;
