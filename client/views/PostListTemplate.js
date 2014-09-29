Template.PostListTemplate.helpers({
    humanizeDate: function(date) {
        return moment(date).calendar();
    }
});