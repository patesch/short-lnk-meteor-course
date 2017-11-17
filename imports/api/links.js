import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Links.find({userId:Meteor.userId()});
  });
}


// Name Conversions => resource.action
// ex.: emails.archive
Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // // Using SimpleSchema.defineValidationErrorTransform on startup/simple-schema-configuration.js
    // new SimpleSchema({
    //   url: {
    //     type: String,
    //     label: 'Your link',
    //     regEx: SimpleSchema.RegEx.Url
    //   }
    // }).validate({ url });

    try {
      new SimpleSchema({
        url: {
          type: String,
          label: 'Your link',
          regEx: SimpleSchema.RegEx.Url
        }
      }).validate({ url });

      const sid = shortid.generate();
      console.log('shortid='+sid);

      const _id = Links.insert({'_id':sid, url, userId:this.userId, visible:true, visitedCount:0, lastVisitedAt:null});
      return {status: 'success', success: true, id: _id, message: 'url have been inserted'};

    } catch (e) {
      // throw new Meteor.Error(400,'Expecting a valid URL address'); // Please enter a valid url
      // return {status: 'error', success: false, id: null, message: 'error: url have not been inserted. [Please enter a valid url]'};
      return {
        status: 'error',
        success: false,
        id: null,
        message: `error: url have not been inserted. [${e.message}]`,
        reason: e.message
      };
    }
  },
  'links.remove'(_id){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    return Links.remove({_id});
  },
  'links.setVisibility'(_id,visible){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    try {
      // Schema Validation
      new SimpleSchema({
        _id: {type: String,min: 1},
        visible: {type: Boolean}
      }).validate({ _id, visible });

      const rowCount = Links.update({_id, userId:this.userId},{$set:{visible}});
      return {status: 'success', success: true, id: _id, message: `success: Links visibility has been updated. RowCount: ${rowCount}`};

    } catch (e) {
      return {status: 'error', success: false, id: null, message: `error: visibility has not been changed. [${e.message}]`};
    }
  },
  'links.trackVisit'(_id){
    try {
      // Schema Validation
      new SimpleSchema({_id: {type: String,min: 1}}).validate({ _id });
      const rowCount = Links.update({_id},{
        $inc: {visitedCount:1},
        $set: {lastVisitedAt: (new Date).getTime()}
      });
      return {status: 'success', success: true, id: _id, message: `success: Link's visit has been updated. RowCount: ${rowCount}`};

    } catch (e) {
      console.log('links.updateVisit exception');
      return {status: 'error', success: false, id: null, message: `error: Link's visit has not been updated. [${e.message}]`};
    }
  }
});
