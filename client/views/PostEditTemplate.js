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
    'click #postDelete': function(e) {
        e.preventDefault();

        var currentPost = Posts.findOneFaster();

        Meteor.call('deletePostById', currentPost._id, function(error, result) {
           if (!error && result) {
                Messenger().post({
                    message: "Post '" + currentPost.title + "' successfully deleted.",
                    type: "success",
                    hideOnNavigate: true
                });

                Router.go('post.list');
           } else {
                Messenger().post({
                    message: "This is a horribly unhelpful message telling you something went wrong. Between the two of us, you're the human, so go fix it.",
                    type: "error",
                    hideOnNavigate: true
                });
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
                        hideOnNavigate: true,
                        showCloseButton: true
                    });
                } else if (postType === "Update") {
                    Messenger().post({
                        message: "Existing post '" + postData.title + "' updated.",
                        type: "success",
                        hideOnNavigate: true,
                        showCloseButton: true
                    });
                }
            } else {
                Messenger().post({
                    message: "This is a horribly unhelpful message telling you something went wrong. Between the two of us, you're the human, so go fix it.",
                    type: "error",
                    hideOnNavigate: true,
                    showCloseButton: true
                });
            }
        });
    },
    'reset #postEditForm': function(e) {
        e.preventDefault();

        Router.go('post.show', {
            slug: this.slug
        });
    },
    'click .statusDraft': function(e) {
        e.preventDefault();

        $('.statusDraft').addClass('statusSelected');
        $('.statusFinal').removeClass('statusSelected');
        $('#postSubmit').val('Save');
    },
    'click .statusFinal': function(e) {
        e.preventDefault();

        $('.statusFinal').addClass('statusSelected');
        $('.statusDraft').removeClass('statusSelected');
        $('#postSubmit').val('Publish');
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