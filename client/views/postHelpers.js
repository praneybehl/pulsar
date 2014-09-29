Template.PostEditTemplate.events({
    'keyup #editorTitle': function(e) {
        $('#previewTitle').html(e.target.value.trim());
    },
    'keyup #editorContent': function(e) {
        $('#previewContent').html(window.marked(e.target.value.trim()));
    },
    'submit #postEditForm': function(e) {
        e.preventDefault();

        var postTitle = $('#editorTitle').val(),
            postRawContent = $('#editorContent').val(),
            postHTMLContent = $('#previewContent').html();

        var postData = {
            title: postTitle,
            rawContent: postRawContent,
            htmlContent: postHTMLContent,
            published: true
        }

        Meteor.call('upsertPostById', null, postData, function (error, result) {
            if (!error) {
                Router.go('/posts/' + result);
            }
        });
    }
});

Template.PostEditTemplate.helpers({
  mostRelevantDate: function() {
    return moment().calendar();
  }
});

Template.PostListTemplate.helpers({
  humanizeDate: function(date) {
    return moment().calendar(date);
  }
});