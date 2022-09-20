import React from "react";

import "./styles/Tracks.css";
import {Track} from "./Track";

export class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map((aTrack) => {
          return (
            <Track
              track={aTrack}
              key={aTrack.id}
              onAdd={this.props.onAdd}
              onRemove={this.props.onRemove}
              isRemoval={this.props.isRemoval}
            />
          );
        })}
      </div>
    );
  }
}
