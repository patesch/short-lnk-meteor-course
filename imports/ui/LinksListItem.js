import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard';
import moment from 'moment';
// import { moment } from 'meteor/moment:momentjs'; // also works if you prefer install by Atmosphere (meteor add momentjs:moment)

export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortUrl: props.shortUrl,
      justCopied: false
    };
  }
  removeLink (e) {
    let id = e.target.dataset.myid;
    Meteor.call('links.remove', id, (err,res) =>{
      console.log('links.remove', err, res);
    });
  }
  componentDidMount(p) {
    this.clip = new Clipboard(this.refs.copy);
    this.clip.on('success', () => {
      console.log('copied');
      this.setState({justCopied:true});
      setTimeout(()=>this.setState({justCopied:false}),700);
    }).on('error', () => {
      alert('Unable to copy. Please manually copy the link.');
    });
  }
  componentWillUnmount() {
    this.clip.destroy();
  }
  // setVisible(visible){
  //   Meteor.call('links.setVisibility',this.props._id,visible,(err,res) => {
  //     if (err)
  //         alert('Error during update visible property');
  //     else
  //       this.setState({visible});
  //   });
  // }
  renderShorturl(){
    // return <small><a target="_blank" href={this.props.shortUrl} title="shortUrl">{this.props.shortUrl}</a></small>;
    return <p>{this.props.shortUrl}</p>;
  }
  renderStats () {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    const visitedMessage = !this.props.lastVisitedAt ? '' : `(visited ${moment(this.props.lastVisitedAt).fromNow()})`; // format('MMM Do, YYYY h:mma')
    return <p>{this.props.visitedCount} {visitMessage} {visitedMessage}</p>;
  }
  render () {
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        {this.renderShorturl()}
        {this.renderStats()}
        <div>
          <a className="button--pill" target="_blank" href={this.props.shortUrl}>Visit</a>
          <button className="button--pill" ref="copy" data-clipboard-text={this.state.shortUrl}>{this.state.justCopied ? 'Copied' : 'Copy' }</button>
          <button className="button--pill" ref="visible" onClick={()=>Meteor.call('links.setVisibility',this.props._id,!this.props.visible)}>{ this.props.visible ? 'Hide' : 'Unhide' }</button>
          <button className="button--pill" ref="remove" onClick={this.removeLink} data-myid={this.props._id}>Remove</button>
        </div>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  shortUrl: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
}
