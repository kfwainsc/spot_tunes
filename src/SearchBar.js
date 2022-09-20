import React from "react";
import "./styles/SearchBar.css";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {keyWord: ""};
    this.search = this.search.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  search() {
    this.props.onSearch(this.state.keyWord);
  }
  handleSearchChange(e) {
    this.setState({keyWord: e.target.value});
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleSearchChange} />
        <button className="SearchButton">SEARCH</button>
      </div>
    );
  }
}
