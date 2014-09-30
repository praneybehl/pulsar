Meteor.startup(function() {
    Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
        theme: 'flat'
    }

    window.marked.setOptions({
        breaks: true,
        smartyPants: true,
        highlight: function(code) {
            return hljs.highlightAuto(code).value;
        }
    });

    Mousetrap.bind('ctrl+l', function() {
        Meteor.loginWithGithub({
            requestPermissions: ['user']
        }, function(err) {
            if (err) {
                Messenger().post({
                    message: err.reason || "Login Failed. What, you can't even remember a 30 character long password?",
                    type: "error",
                    hideOnNavigate: true
                });
            } else {
                Messenger().post({
                    message: "Login Successful. Welcome, welcome!",
                    type: "success",
                    hideOnNavigate: true
                });
            }
        });
    });
});