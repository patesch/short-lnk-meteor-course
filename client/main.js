import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { routes, onAuthChange } from './../imports/routes/routes';
import ReactDOM from 'react-dom';
// import {} from './../imports/startup/simple-schema-configuration';

Tracker.autorun((c) => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

// // Stateless Functional Components
// import React from 'react';
// const MyComponent = () => {
//   return (
//     <div>
//       <h1>My Component Here!</h1>
//     </div>
//   );
// };

Meteor.startup(() => {
  Session.set('links:showVisible',true);
  ReactDOM.render(routes, document.getElementById('app'));
});
