import React from "react";
import "./styles/SearchBar.css";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {term: ""};
    this.search = this.search.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  search() {
    console.log(this.state.term);
    this.props.onSearch(this.state.term);
  }
  handleSearchChange(e) {
    this.setState({term: e.target.value});
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleSearchChange} />
        <button className="SearchButton" onClick={this.search}>
          SEARCH
        </button>
      </div>
    );
  }
}
