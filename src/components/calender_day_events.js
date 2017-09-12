import React, {Component} from 'react';
import CalMainDate from './cal_main_date';
import { connect } from 'react-redux';
import CalHeader from './calHeader';
import {bindActionCreators} from 'redux';
import { incrementDay, decrementDay, setActiveDay } from "../actions/day_actions";
import { updateActiveSearchDate } from "../actions/event_actions";

class CalWindowEvent extends Component{

  constructor(props){
    super(props);
    this.state = {
      events:[]
    }
    this.mapTheCal = this.mapTheCal.bind(this)
  }

  componentDidMount(){
    this.mapTheCal()
  }

  mapTheCal(){
    console.log('mapping calender')

    this.props.calender.cal.map((day) => {
    // console.log(day.date)
      if(day.date === '8/8/2017'){
        // console.log(day)
        day.events = [{
          title:"My Birthday",
          location:"my house, in the back yard",
          notes:"wear warm clothes"
        },
        {
          title:"Business Lunch",
          location:"Pub down road",
          notes:"wear a sensible outfit"
        },
        {
          title:"Bedtime",
          location:"my house, in my bedroom",
          notes:"try and sleep before 10pm"
        }]
      }
    });

      // console.log(this.props.calender.activeDateForSearch)
      this.props.calender.cal.map((day) =>{

      if(day.date === this.props.calender.activeDateForSearch){

        // console.log('day', day.events)
        this.setState({
          events: day.events
        }, this.forceUpdate())
      }
    })
  }

  render(){

    return(
      <div>
        { this.state.events.map((event,i) =>
          <div>
            <h3 key={i} className="event_title">{event.title}</h3>
            <p>{event.location}</p>
            <p>{event.notes}</p>
            <br/>
          </div>
        )}
      </div>
    )
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


export default connect(mapStateToProps, mapDispatchToProps)(CalWindowEvent);
