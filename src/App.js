import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';


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
        <img src={playlist.image} style={{width: '60px'}}/>
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
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken)
      return;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
    .then(data => this.setState(
      {user: {name: data.displayname}}))
    
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
    .then(data => this.setState({
      playlists: data.items.map(item => {
        console.log(data.items)
        return {
          name: item.name,
          image: item.images[0].url,
          songs: []
        }
      })
    }))
  }
  render() {
    let playlistToRender =
      this.state.user &&
      this.state.playlists
        ? this.state.playlists.filter(playlist => 
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase()))
        : [];
    return (
      <div className="App">
        {this.state.user ?
          <div>

            <h1 style={{...defaultStyle, fontSize: '54px'}}>
              {this.state.user.name}'s Playlist
            </h1>

            <PlaylistCounter playlists={playlistToRender}/>

            <HoursCounter playlists={playlistToRender}/>

            <Filter onTextChange={ text => {
              this.setState({filterString: text});
            }} />

            {playlistToRender.map(playlist => <Playlist playlist={playlist}/>)}

          </div> :
          <button onClick={() => {
              window.location = 
              window.location.href.includes('localhost')
              ? 'http://localhost:8080/login'
              : 'https://better-playlist-jaehun-backend.herokuapp.com/'}
            }
            style={{padding: '20px', fontSize: '50px', marginTop: '20px'}}>
            Sign in with Spotify
          </button>}
      </div>
    );
  }
}

export default App;
