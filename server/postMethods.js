Meteor.methods({
    'upsertPostById': function(id, postDataObject) {
        if(id) {
          Posts.update(id, {
            $set: postDataObject
          });

          return URLify2(postDataObject.title);
        } else {
          Posts.insert(postDataObject);

          return URLify2(postDataObject.title);
        }
    },
    'deletePostById': function(id) {
        if(id) {
          Posts.remove(id);

          return true;
        } else {
          return false;
        }
    }
});