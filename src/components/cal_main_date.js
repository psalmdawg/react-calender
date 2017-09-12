import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { updateMonthYear, setStartDay, renderCalender } from "../actions/index";

class CalMainDate extends Component{

  constructor(){
    super()
    this.updateMonthUp = this.updateMonthUp.bind(this);
    this.updateMonthDown = this.updateMonthDown.bind(this);
  }

  updateMonthUp(){
    if(this.props.calender.month === 11 || this.props.month > 11){
      this.props.updateMonthYear(this.props.calender.year + 1, 0)
    } else {
      this.props.updateMonthYear(null,this.props.calender.month + 1)
    }
  }

  updateMonthDown(){
    if(this.props.calender.month === 0 || this.props.calender.month < 0){
      this.props.updateMonthYear(this.props.calender.year - 1, 11)
    } else {
      this.props.updateMonthYear(null,this.props.calender.month - 1)
    }
  }

  render(){
    return(
      <div>
        <div className='current_month_outer'>
          <div className="current_month_arrow_left" onClick={this.updateMonthDown}>Prev</div>
          <div className="current-month-hdr"> {this.props.calender.months[this.props.calender.month]} {this.props.calender.year} </div>
          <div className="current_month_arrow_right"onClick={this.updateMonthUp}>Next</div>
        </div>
      </div>
    )
  };
  
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    updateMonthYear: updateMonthYear,
    setStartDay:setStartDay,
    renderCalender:renderCalender
  }, dispatch)
}

function mapStateToProps(state){
  return {
    calender: state.calender
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalMainDate);
