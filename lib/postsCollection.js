PostSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Post Title"
    },
    slug: {
        type: String,
        label: "Post Slug",
        autoValue: function() {
            var title = this.field("title");

            return URLify2(title.value);
        }
    },
    // author: {
    //   type: String,
    //   label: "Post Author",
    //   regEx: SimpleSchema.RegEx.Id
    // },
    createdAt: {
        type: Date,
        label: "Post Creation Date",
        defaultValue: new Date()
    },
    lastUpdatedAt: {
        type: Date,
        label: "Post Last Updated Date",
        denyInsert: true,
        optional: true,
        autoValue: function() {
            if (this.isUpdate) {
                return new Date();
            }
        }
    },
    rawContent: {
        type: String,
        label: "Post Raw Content"
    },
    htmlContent: {
        type: String,
        label: "Post HTML Content"
    },
    // contentHistory: {
    //     type: [Object],
    //     label: "Post Edit History",
    //     optional: true,
    //     autoValue: function() {
    //         var content = this.field("rawContent");

    //         if (content.isSet) {
    //             if (this.isInsert) {
    //                 return [{
    //                     date: new Date(),
    //                     content: content.value
    //                 }];
    //             } else {
    //                 return {
    //                     $push: {
    //                         date: new Date(),
    //                         content: content.value
    //                     }
    //                 };
    //             }
    //         } else {
    //             this.unSet();
    //         }
    //     }
    // },
    // 'contentHistory.$.date': {
    //     type: Date,
    //     optional: true
    // },
    // 'contentHistory.$.content': {
    //     type: String,
    //     optional: true
    // },
    published: {
        type: Boolean,
        label: "Post Publication Status"
    }
});

Posts = new Mongo.Collection('posts');
Posts.attachSchema(PostSchema);