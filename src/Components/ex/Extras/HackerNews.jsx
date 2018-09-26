import React, { Component } from "react";
import { DatePicker, Divider } from "antd";

const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

class HackerNews extends Component {
  constructor() {
    super();
    this.state = {
      a: null,
      searchTerm: DEFAULT_QUERY
    };
    // console.log("constructor");
  }

  render() {
    const { a, searchTerm } = this.state;
    // console.log(this.state);

    return <div>{!a ? <h1>Loading</h1> : this.renderNews()}</div>;
  }

  setData = result => {
    let a = result.hits;
    this.setState({
      a
    });
  };

  renderNews() {

   return this.state.a.map(val => {
      return <h1>{val.title}</h1>;
    });
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(json => {
        return this.setData(json);
      });
  }
}

export default HackerNews;
