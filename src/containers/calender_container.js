import React, { Component } from 'react';
import { connect } from 'react-redux';

class CalenderTester extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <h3>my lucky x face</h3>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    calender: state.calender
  };
}

export default connect(mapStateToProps,null)(CalenderTester);
