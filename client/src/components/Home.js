import React, { Component } from "react";
import { connect } from "react-redux";
import {
  handleInputAction,
  fetchWishAction,
  handleSubmitAction,
  handleDeleteAction
} from "../myactions/action";

class Home extends Component {
  componentDidMount() {
    this.props.fetchWish(); // calling this in mapDispatchToProps --> function --> action creator
  }

  render() {
    const list = this.props.mywishes.map(item => {
      return (
        <a
          className="collection-item"
          key={item._id}
          onClick={() => this.props.handleDelete(item._id)}
        >
          {item.wish}
        </a>
      );
    });

    return (
      <div className="row">
        <h4>React Form</h4>
        <form onSubmit={e => this.props.handleSubmit(e)} className="col s12">
          <input
            type="text"
            name="item"
            value={this.props.text}
            onChange={e => this.props.handleInput(e.target.value)}
          />
          {/* <input              // without redux
            type="text"
            name="item"
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })} 
          />*/}
          <button type="submit" className="waves-effect waves-light btn">
            Add
          </button>
        </form>

        <div className="collection">{list}</div>
      </div>
    );
  }
}

// getting data from reducer store
const mapStateToProps = state => {
  return {
    text: state.text,
    mywishes: state.mywishes // some dummy data prev set
  };
};

// sending this data to action creator for reducer's type and payload
const mapDispatchToProps = dispatch => {
  return {
    handleInput: input => {
      dispatch(handleInputAction(input));
    },
    fetchWish: () => {
      dispatch(fetchWishAction());
    },
    handleSubmit: e => {
      dispatch(handleSubmitAction(e));
    },
    handleDelete: id => {
      dispatch(handleDeleteAction(id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
