import React from "react";

import "./styles/App.css";
import {SearchBar} from "./SearchBar";
import {SearchResults} from "./SearchResults";
import {Playlist} from "./Playlist";
import Spotify from "./util/Spotify";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "",
      playlistTracks: [],
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
  search(term) {
    //can passed in searchResults be a diff named var?
    Spotify.search(term).then((searchResults) => {
      console.log(searchResults);
      this.setState({searchResults: searchResults});
    });
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
    if (!this.state.playlistTracks.length) {
      alert("Empty Playlist! Please add a song to save.");
      return;
    } else {
      const trackURIs = this.state.playlistTracks.map((track) => track.uri);
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() =>
        //have saved, so now reset playlist
        this.setState({playlistName: "Untitled Playlist", playlistTracks: []})
      );
    }
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
