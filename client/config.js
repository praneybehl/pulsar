Meteor.startup(function() {
    Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right'
    }

    window.marked.setOptions({
        breaks: true,
        smartyPants: true,
        highlight: function(code) {
          return hljs.highlightAuto(code).value;
        }
    });
});