import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

export default class LinksListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: true
    };
  }
  componentDidMount(){
    this.tracker = Tracker.autorun(()=>{
      this.setState({
        showVisible: Session.get('links:showVisible')
      });
    });
  }
  componentWillUnmount() {
    this.tracker.stop();
  }
  render() {
    return (
      <label className="checkbox">
        <input type="checkbox" className="checkbox__box" checked={!this.state.showVisible} onChange={(e)=> {
          console.log(e.target.checked);
          Session.set('links:showVisible', !e.target.checked);
        }}/>
        show hidden links
      </label>
    );
  }
}
