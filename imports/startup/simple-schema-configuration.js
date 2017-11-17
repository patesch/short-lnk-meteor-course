import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform((e) => {
  console.log(e);
  const message = {status: 'error', success: false, id: 0, message: `you got an error [${e.message}]`};
  return new Meteor.Error(400, message);
});
