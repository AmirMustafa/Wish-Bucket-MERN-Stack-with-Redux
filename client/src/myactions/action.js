// for update i/p
export const handleInputAction = input => {
  return {
    type: "UPDATE_INPUT",
    payload: input
  };
};

// For fetching data from componentDidMount --> mapDispatchToProps --> actioncreator --> reducers
export const fetchWishAction = () => {
  // We are fetching data asynchrously
  return dispatch => {
    fetch("/data") // this hit's node js data route)
      .then(res => res.json())
      .then(res => {
        /* this.setState({  // earlier without redux we were updating state - 
          mywishes: res
        }); */

        dispatch({ type: "GET_WISH", payload: res });
      });
  };
};

// For posting data in server
export const handleSubmitAction = e => {
  return dispatch => {
    e.preventDefault();
    // const url = "http://localhost:5000/sent-data"; // Node JS Server route (check route.js)
    let usp = new URLSearchParams();

    console.log(e.target);
    for (const pair of new FormData(e.target)) {
      usp.append(pair[0], pair[1]);
    }

    // proxy is written in Client's package js which target's node
    // now this will target nodejs (i.e. localhost:5000) instead of localhost:3000 (i.e. React JS)
    fetch("/sent-data", {
      method: "post",
      body: usp
    })
      .then(res => res.json())
      .then(res => {
        // Earlier we were updating state --> Now let reducer update it's data
        /* this.setState({
          mywishes: [...this.state.mywishes, res]
        }); */

        dispatch({ type: "ADD_WISH", payload: res });
      });
  };
};

export const handleDeleteAction = id => {
  return dispatch => {
    fetch("/remove/" + id, { method: "delete" }) // React JS delete request
      .then(res => res.json())
      .then(res => {
        /* const newwishes = this.props.mywishes.filter(item => {
          return item._id !== id; // return id which is not equal to passed id
        }); */
        /* const newwishes = this.state.mywishes.filter(item => {
          return item._id !== id; // return id which is not equal to passed id
        }); */

        // this.setState({ mywishes: newwishes });

        dispatch({ type: "REMOVE_WISH", payload: res });
      });
  };
};
