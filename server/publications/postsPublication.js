Meteor.publish("allPosts", function(limit) {
    check(limit, Match.Integer);

    return Posts.find({}, {
        limit: limit,
        fields: {
            rawContent: 0,
            htmlContent: 0,
            contentHistory: 0
        }
    });
});

Meteor.publish("adminPosts", function() {
    return Posts.find({});
});

Meteor.publish("singlePost", function(slug) {
    check(slug, String);

    return Posts.find({
        slug: slug
    });
});