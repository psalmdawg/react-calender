import React, {Component} from 'react';
import CalMainDate from './cal_main_date';
import { connect } from 'react-redux';
import CalHeader from './calHeader';
import CalWindowEvent from './calender_day_events';
import {bindActionCreators} from 'redux';
import { incrementDay, decrementDay, setActiveDay } from "../actions/day_actions";
import { updateActiveSearchDate } from "../actions/event_actions";

class CalWindow extends Component{

  constructor(props){
    super(props);
    this.calWindows = []
    this.handleClick = this.handleClick.bind(this);
    this.back = this.back.bind(this);
    this.showDay = this.showDay.bind(this);
    this.state = {
      currentMonth:this.props.month,
      currentYear:this.props.year,
      showCalDay:false,
    }
  this.dayForward = this.dayForward.bind(this)
  this.dayBackward = this.dayBackward.bind(this)

  }

  //this recieves updated props (When cal is changed in parent) and passess them to state
  componentWillReceiveProps(nextProps) {


    // }, 3000)

  }

  componentDidMount(){
    // let dayString = this.props.calender.activeDay.toString()
    // let monthString = this.props.calender.month.toString()
    // let yearString = this.props.calender.year.toString()
    // let bonzaResult = dayString + '/' + monthString + '/' + yearString;
    // // console.log(bonzaResult)
    // // console.log(typeof(bonzaResult))
    // this.props.updateActiveSearchDate(bonzaResult)
    console.log(this.props.calender)
  }


  handleClick(day){
    console.log(this.state)
  }

  showDay(day){
    console.log(day)
    this.setState({showCalDay : !this.state.showCalDay})
    this.props.setActiveDay(day)
    //HERE SET THE ACTIVE SEARCH DAY AS A PROP
  }

  back(){
    this.setState({showCalDay : !this.state.showCalDay})
  }

  dayForward(){
    // console.log(this.props.calender)
    this.props.incrementDay()
  }

  dayBackward(){
    // console.log(this.props)
    this.props.decrementDay()
  }


  createTheCalender(props){
    //creates the calender windows uses CSS to create new lines for each week
    // clearTheWindows
    this.calWindows = [];
    const startDay = this.props.startDay;
    let count = 0;
    let numberOfDays = startDay + this.props.numDays

    for(let i = 1;i<=numberOfDays;i++){
      if(count <= startDay - 1){
        //these are the blanks spaces in the cal to match date up with correct day .
        count ++
        this.calWindows.push(<div className='cal_window prevMonth' key={'st' + i}> </div>)
      } else if (count % 7 === 0){
          //SUNDAYS and change of row
          count ++
          if( i - startDay === this.props.dayDate){
            this.calWindows.push(<div onClick={()=> this.showDay(i - startDay)} className='cal_window today clearfix weekend' key={i - startDay}>{i - startDay}</div>)
          } else {
            this.calWindows.push(<div onClick={()=> this.showDay(i - startDay)}  className='cal_window clearfix weekend' key={i - startDay}>
             {i - startDay}</div>)
          }
      } else if ( count === 6 || count === 13 || count === 20 || count === 27 ||count === 34){
          // SATURDAYS
          count ++
          if( i - startDay === this.props.dayDate){
            this.calWindows.push(<div onClick={()=> this.showDay(i - startDay)} className='cal_window today weekend' key={i - startDay}>{i - startDay}</div>)
          } else {
            this.calWindows.push(<div onClick={()=> this.showDay(i - startDay)} className='cal_window weekend' key={i - startDay}>{i - startDay}</div>)
          }
      } else if( i - startDay === this.props.dayDate) {
        count ++
        this.calWindows.push(<div onClick={()=> this.showDay(i - startDay)}
          className='cal_window today' key={i - startDay}>{i - startDay}</div>)
      } else {
        count ++
        this.calWindows.push(<div onClick={()=> this.showDay(i - startDay)}
          className='cal_window' key={i - startDay}>{i - startDay }</div>)
      }

    };

    return this.calWindows;
  };

  showCalDay(){
    return(
      <div className="cal_day_wrap">
        <div className="backbutton" onClick={this.back}>back</div>
        <div className="cal_day_inner">
          <div className="cal_day_title">
            <div className="cdt_prev" onClick={this.dayBackward}>
              PREV
            </div>
            <div className="cdt_main">
              {this.props.calender.activeDay} {this.props.calender.months[this.props.calender.month]} {this.props.calender.year}
            </div>
            <div className="cdt_next" onClick={this.dayForward}>
              NEXT
            </div>
          </div>
          <div className="cal_day_content">
            <CalWindowEvent />
          </div>
        </div>
      </div>
    )
  }

  showCalMonth(){
    return(
      <div className="cal_inr_wrp">
        <CalMainDate />
        <div className="cal_win_wrp" >
          <CalHeader/>
          {this.createTheCalender()}
        </div>
      </div>
    )
  }

  render(){
    if (!this.state.showCalDay) {
      return (
        this.showCalMonth()
      )
    } else {
      return (
        this.showCalDay()
      )
    }
  }

};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    incrementDay,
    decrementDay,
    setActiveDay,
    updateActiveSearchDate
  }, dispatch)
}

function mapStateToProps(state){
  return {
    calender: state.calender
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CalWindow);
