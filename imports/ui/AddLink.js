import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

// Container Component
export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    };
  }
  onSubmit (e) {
    // const url = this.refs.url.value.trim(); // OR
    // const url = this.state.url; // this.refs.url.value.trim(); // OR
    const { url } = this.state; // this.refs.url.value.trim();

    e.preventDefault();

    Meteor.call('links.insert', url, (err,res)=>{
      // if (!err)
      //   this.setState({url:'', isOpen: false, error: ''});
      // else
      //   this.setState({error: err.reason});

      console.log('links.insert',err,res);
      if (res && res.success)
        this.closeModal();
      else {
        this.setState({error: res.reason});
        setTimeout(()=>this.setState({error: ''}),3000);
      }
    });
  }
  closeModal() {
    this.setState({isOpen: false, url:'', error: ''});
  }
  onChange(e) {
    this.setState({
      url: e.target.value.trim()
    });
  }
  renderErrorMessage() {
    return this.state.error ? <p>{this.state.error}</p> : undefined ;
  }
  render () {
    return (
      <div>
        <button className="button" onClick={()=>this.setState({isOpen: true})}>+ Add Link</button>
        <Modal isOpen={this.state.isOpen}
          onAfterOpen={()=>this.refs.url.focus()}
          contentLabel="Add Link"
          onRequestClose={this.closeModal.bind(this)}
          shouldCloseOnOverlayClick={false}
          overlayClassName="boxed-view boxed-view--modal"
          className="boxed-view__box"
        >
          <h1>Add Link</h1>
          {this.renderErrorMessage()}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input type='text'
              ref="url"
              placeholder="URL"
              value={this.state.url}
              onChange={this.onChange.bind(this)}/>
            <button className="button">Add</button>
            <button type="button" className="button button--secondary" onClick={this.closeModal.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}

//
// // Stateless Functional Component
// export default () => {
//   const onSubmit = e => {
//     const url = e.target.children.url.value.trim();
//     e.preventDefault();
//     e.persist(); // to allow to clean up the input field from here
//     if (url) {
//       Meteor.call('links.insert', url, function(err,res){
//         console.log('links.insert',err,res);
//         if (res && res.success) {
//           console.log(`${res.message} with id=${res.id}`);
//           e.target.children.url.value = '';
//         } else {
//           // console.log(err.message);
//           console.log(res.message);
//         }
//       });
//     }
//   }
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input type='text' name='url' placeholder="your URL"/>
//         <button>Add Link</button>
//       </form>
//     </div>
//   );
// }
