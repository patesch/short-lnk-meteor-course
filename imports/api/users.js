import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

export const validateNewUser = () => {
  // Validate nn creating new user
  // try {
  //   Accounts.validateNewUser((user) => {
  //     const email = user.emails[0].address;
  //     new SimpleSchema({
  //       email: {
  //         type: String,
  //         regEx: SimpleSchema.RegEx.Email
  //       }
  //     }).validate({ email });
  //     return true;
  //   });
  // } catch (e) {
  //   throw new Meteor.Error(400,'Email must be a valid email address'); // Please enter a valid email
  // }

  Accounts.validateNewUser((user) => {
     const email = user.emails[0].address;
     new SimpleSchema({
       email: {
         type: String,
         label: 'Your email',
         regEx: SimpleSchema.RegEx.Email
       }
     }).validate({ email });
     return true;
   });
}

export const validateLoginAttempt = () => {
  // Validate on userlogging
  Accounts.validateLoginAttempt((attempt) => {
    // console.log(attempt);
    if (attempt.allowed) {
      // console.log('user',attempt.user);
      // console.log(attempt.user.emails[0].address);
    } else {
      // console.log('error message => '+attempt.error.reason);
      // throw new Meteor.Error(400,'Invalid user!');
    }
    return attempt.allowed;
  });
}
