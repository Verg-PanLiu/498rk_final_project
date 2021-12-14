import React, { useState, useEffect } from "react"


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  timeout = null;
  search = (event) => {
    this.setState({ value: event.target.value })
    clearTimeout(this.timeout);
    this.timeout = setTimeout( () => {
      this.props.callback(this.state.value);
    }, 500);
  }

  render () {
    return (
      <div className="searchbar">
        <div className="searchbar-content">
          <input
            type="text"
            className="searchbar-input"
            placeholder="Search the Recipe Here"
            onChange={this.search}
            value={this.state.value}
          />
        </div>
      </div>
    )
  }
}

export default SearchBar;