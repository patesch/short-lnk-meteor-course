import React from 'react';

import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksList from './../ui/LinksList';
import LinksListFilters from './../ui/LinksListFilters';

// import createBrowserHistory from 'history/createBrowserHistory';
// const browserHistory = createBrowserHistory();

// Stateless Functional Components
export default () => {
  return (
    <div>
      <PrivateHeader title="Short Lnk Login" />
      <div className="page-content">
        <LinksListFilters/>
        <AddLink />
        <LinksList />
      </div>
    </div>
  );
}

// Container Components
// export default class Link extends React.Component {
//   render () {
//     return (
//       <div>
//         <PrivateHeader title="Your Links"/>
//         <AddLink/>
//         <LinksList/>
//       </div>
//     );
//   }
// };
