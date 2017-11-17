import React from 'react';
import FlipMove from 'react-flip-move';
import { Tracker } from 'meteor/tracker';
import { Links } from  './../api/links';
import LinksListItem from './LinksListItem';
import { Session } from 'meteor/session';

Meteor.subscribe('links');

export default class LinksList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount() {
    this.linksTracker = Tracker.autorun(()=>{
      const links = Links.find({
        visible: Session.get('links:showVisible')
      }).fetch();
      this.setState({links});
    });
  }
  componentWillUnmount() {
    this.linksTracker.stop();
  }
  // removeLink (e) {
  //   let id = e.target.dataset.myid;
  //   Meteor.call('links.remove', id, (err,res) =>{
  //     console.log('links.remove', err, res);
  //   });
  // }
  renderLinksListItem () {
    if (this.state.links.length===0) {
      return (
        <div className="item">
          <p className="item__status-message">No links</p>
        </div>
      );
    }
    return this.state.links.map( link => {
      return <LinksListItem key={link._id} shortUrl={Meteor.absoluteUrl(link._id)} {...link}/>;
    });
  }
  render () {
    return (
      <FlipMove enterAnimation="elevator" leaveAnimation="elevator">
        {this.renderLinksListItem()}
      </FlipMove>
    );
  }
}
