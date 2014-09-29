Meteor.methods({
    'upsertPostById': function(id, postDataObject) {
        if (id) {
          Posts.update(id, {
            $set: postDataObject
          });

          return slug(postDataObject.title);
        } else {
          Posts.insert(postDataObject);

          return slug(postDataObject.title);
        }
    }
});