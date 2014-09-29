Template.PostEditTemplate.events({
    'keyup #editorTitle': function(e) {
        $('#previewTitle').html(e.target.value.trim());
    },
    'keyup #editorContent': function(e) {
        // Convert the raw MD content and insert it into the preview window
        $('#previewContent').html(window.marked(e.target.value.trim()));

        // Parse the LaTeX in the preview window
        Array.prototype.forEach.call(document.getElementsByTagName('tex'), function(element) {
            if (element.innerHTML) {
                try {
                    katex.render("\\displaystyle" + element.innerHTML, element);
                } catch (e) {
                    // Do nothing
                }
            }
        });
    },
    'submit #postEditForm': function(e) {
        e.preventDefault();

        var postData = {
            title: $('#editorTitle').val(),
            rawContent: $('#editorContent').val(),
            htmlContent: $('#previewContent').html(),
            published: true
        }

        var getCurrentPost = Posts.findOneFaster();

        if (typeof(getCurrentPost) === "undefined") {
            var postId = null,
                postType = "Create";
        } else {
            var postId = getCurrentPost._id,
                postType = "Update";
        }

        Meteor.call('upsertPostById', postId, postData, function(error, result) {
            if (!error) {
                Router.go('post.show', {
                    slug: result
                });
                if (postType === "Create") {
                    Messenger().post({
                        message: "New post '" + postData.title + "' created.",
                        type: "success",
                        hideOnNavigate: true
                    });
                } else if (postType === "Update") {
                    Messenger().post({
                        message: "Existing post '" + postData.title + "' updated.",
                        type: "success",
                        hideOnNavigate: true
                    });
                }
            } else {
                Messenger().post({
                    message: "This is a horribly unhelpful message telling you something went wrong. Between the two of us, you're the human, so go fix it.",
                    type: "error",
                    hideOnNavigate: true
                });
            }
        });
    },
    'reset #postEditForm': function(e) {
        e.preventDefault();

        Router.go('post.list');
    }
});

Template.PostEditTemplate.rendered = function() {
    $('#previewContent').html(window.marked($('#editorContent').val().trim()));
}

Template.PostEditTemplate.helpers({
    mostRelevantDate: function() {
        return moment().calendar();
    }
});