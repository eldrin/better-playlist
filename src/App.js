import React, { Component } from 'react';
import './App.css';


let defaultStyle = {
  color: '#fff'
};
let fakeServerData = {
  user: {
    name: 'Jaehun',
    playlists: [
      {
        name: 'My favorites',
        songs: [
          {name: 'Beat It', duration: 1234},
          {name: 'Chanelloni Makaroni', duration: 472},
          {name: 'Rosa helikopter', duration: 267}
        ]
      },
      {
        name: 'Discover Keewkly',
        songs: [
          {name: 'I hate this', duration: 842},
          {name: 'great love of me', duration: 137}
        ]
      },
      {
        name: 'Summber night',
        songs: [
          {name: 'SEa chillL', duration: 482},
          {name: '22673', duration: 422},
          {name: 'I am your man - feat. GammaEta', duration: 225}
        ]
      },
      {
        name: 'Winder night',
        songs: [
          {name: 'white Christmas', duration: 382},
          {name: 'my present', duration: 963},
          {name: 'Snow snow', duration: 25}
        ]
      }
    ]
  }
};


class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>
          {this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}


class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    totalDuration = Math.floor(totalDuration / 60)
    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>
          {totalDuration} Hours</h2>
      </div>
    );
  }
}


class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img/>
        <input type="text" onKeyUp={event =>
            this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}


class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: "25%"}}>
        <img/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {
    let serverData = this.state.serverData
    return (
      <div className="App">
        {serverData.user ?
          <div>

            <h1 style={{...defaultStyle, fontSize: '54px'}}>
              {serverData.user.name}'s Playlist
            </h1>

            <PlaylistCounter playlists={serverData.user.playlists}/>

            <HoursCounter playlists={serverData.user.playlists}/>

            <Filter onTextChange={ text => {
              this.setState({filterString: text});
            }} />

            {serverData.user.playlists
                .filter(playlist => playlist.name.toLowerCase().includes(
                                      this.state.filterString.toLowerCase()))
                .map(playlist => <Playlist playlist={playlist}/>)
            }

          </div> : <h1 style={defaultStyle}>'Loading...'</h1>}
      </div>
    );
  }
}

export default App;
