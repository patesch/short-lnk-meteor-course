import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
// import {} from './../imports/startup/simple-schema-configuration';
import { validateNewUser, validateLoginAttempt } from './../imports/api/users';
import { Links } from './../imports/api/links';

Meteor.startup(() => {

  WebApp.connectHandlers.use((req,res,next) => {
    console.log('this is from my custom middleware 1');
    const _id = req.url.slice(1);
    const link = Links.findOne({_id});

    if (link) {
      res.statusCode = 302;
      res.setHeader('location', link.url);
      res.end();
      // Increment by 1 the visitedCount
      // and update lastVisitedAt with current timestamp
      Meteor.call('links.trackVisit',_id);
    } else {
      next();
    }
  });

  WebApp.connectHandlers.use('/',(req, res, next) => {
    console.log('this is from my custom middleware 2');
    console.log(req.url, req.method, req.headers, req.query);

    // Set HTTP status code
    // res.statusCode = 404;
    // // Set HTTP headers
    // res.setHeader('custom-header','Andrew was here');
    // // Set HTTP body
    // res.write('<h1>this is my middleware at work!</h1>');
    // // End HTTP request
    // res.end(); // to hijack the response

    next();
  });

  // code to run on server at startup
  // Start listening to create new user event
  validateNewUser();
  // Start listening to login attempt event
  validateLoginAttempt();
});
