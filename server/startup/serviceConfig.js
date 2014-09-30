ServiceConfiguration.configurations.remove({
    services: 'github'
});

ServiceConfiguration.configurations.insert({
    service: 'github',
    clientId: Meteor.settings.GITHUB_CLIENTID,
    secret: Meteor.settings.GITHUB_SECRET
});

