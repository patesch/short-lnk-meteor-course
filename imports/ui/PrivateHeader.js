import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';

// ES6 Container Component
// export default class PrivateHeader extends React.Component {
//   onLogout () {
//     Accounts.logout();
//     // setTimeout(() => {console.log('Logout:user', Meteor.user())}, 400 );
//     window.browserHistory.push('/');
//   }
//   render () {
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <button onClick={this.onLogout.bind(this)}>Logout</button>
//       </div>
//     );
//   }
// }

const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>
      </div>
    </div>
  );
  // return (
  //   <div className="title-bar">
  //     <div className="title-bar__content">
  //       <h1 className="title-bar__title">{props.title}</h1>
  //       <button className="button button--link" onClick={() => Accounts.logout()}>Logout</button>
  //     </div>
  //   </div>
  // );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PrivateHeader;
