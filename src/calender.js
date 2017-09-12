import React, {Component} from 'react';
import CalWindow from './components/cal_window';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { updateMonthYear, setStartDay, renderCalender } from "./actions/index";
import { generateTheStore } from "./actions/event_actions";


class Calender extends Component{

  constructor(){
    super()
    this.getYear = this.getYear.bind(this)
    this.getMonth = this.getMonth.bind(this)
  }

  componentDidMount(){
    this.props.renderCalender()
    this.props.generateTheStore()
  }

  leapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  };

  howManyDaysInMonth(){
    let currentmonth = this.props.calender.months[this.props.calender.month]
    if(currentmonth === "April" || currentmonth === "June" || currentmonth === "September" || currentmonth === "November") {
      return 30;
    } else if(currentmonth === "January" || currentmonth === "March" ||
    currentmonth === "May" || currentmonth === "July" || currentmonth ===  "August"
    || currentmonth ===  "October" || currentmonth ===  "December") {
        return 31
    } else {
      if(this.leapYear(this.props.calender.year)){
        return 29
      } else {
        return 28
      }
    }
  };

  getMonth(){
    return this.props.calender.month
  }

  getYear(){
    return this.props.calender.year
  }

  render(){

    return(
      <div className="cal_wrp">

        <CalWindow
          month={this.getMonth()}
          year={this.getYear()}
          startDay={this.props.calender.startDay}
          onClick={this.calWinClick}
          numDays={this.howManyDaysInMonth(this.props.calender.month)}
          dayDate={this.props.calender.dayDate}
        />

      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    updateMonthYear: updateMonthYear,
    setStartDay:setStartDay,
    renderCalender:renderCalender,
    generateTheStore:generateTheStore
  }, dispatch)
}

function mapStateToProps(state){
  return {
    calender: state.calender
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calender);
