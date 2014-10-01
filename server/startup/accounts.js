var authUser = Meteor.settings.github.AUTHUSERS[0],
    authUserId = Meteor.users.findOneFaster({
        'services.github.username': authUser
    })._id;

if (authUserId) {
    Roles.addUsersToRoles(authUserId, 'admin');
}

Accounts.validateLoginAttempt(function(userInfo) {
    if (userInfo.user.services.github.username === authUser) {
        return true;
    } else {
        return false;
    }
});

Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        user.profile = options.profile;
    }

    user.profile.github = {};
    user.profile.github.accessToken = user.services.github.accessToken;
    user.profile.github.email = user.services.github.email;
    user.profile.github.username = user.services.github.username;

    return user;
});

Accounts.validateNewUser(function(user) {
    var loggedInUser = Meteor.user();

    if (Roles.userIsInRole(loggedInUser, 'admin')) {
        return true;
    }

    throw new Meteor.Error(403, "Not authorized to create new users");
});