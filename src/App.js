import React from "react";

import "./styles/App.css";
import {SearchBar} from "./SearchBar";
import {SearchResults} from "./SearchResults";
import {Playlist} from "./Playlist";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: "Songs to get Help",
      searchResults: [
        {name: "Song Nemo", artist: "Nemo", album: "Alb", id: 1},
        {name: "Song Nemo2", artist: "Nemo2", album: "Alb2", id: 2},
        {name: "Song Nemo3", artist: "Nemo3", album: "Alb3", id: 3},
        {name: "Song Nemo4", artist: "Nemo4", album: "Alb4", id: 4},
      ],
      playlistTracks: [
        {name: "Song Nemo2", artist: "Nemo2", album: "Alb2", id: 2},
        {name: "Song Nemo4", artist: "Nemo4", album: "Alb4", id: 4},
      ],
    };
    this.setPlaylistName = this.setPlaylistName.bind(this);
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }
  setPlaylistName(newName) {
    this.setState({playlistName: newName});
  }
  search(keyWord) {
    console.log(keyWord);
  }
  addTrack(track) {
    let currPlaylist = this.state.playlistTracks;
    if (currPlaylist.find((currTrack) => currTrack.id === track.id)) {
      return -1; //track already in playlist (okay return value?)
    } else {
      currPlaylist.push(track);
      this.setState({playlistTracks: currPlaylist});
    }
  }
  removeTrack(track) {
    let newPlaylist = this.state.playlistTracks.filter((currTrack) => currTrack.id !== track.id);
    this.setState({playlistTracks: newPlaylist});
  }
  savePlaylist() {
    alert("TEMP!");
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onNameChange={this.setPlaylistName}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}
