ServiceConfiguration.configurations.remove({
    services: 'github'
});

ServiceConfiguration.configurations.insert({
    service: 'github',
    clientId: Meteor.settings.github.CLIENTID,
    secret: Meteor.settings.github.SECRET
});

