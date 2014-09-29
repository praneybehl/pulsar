Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.plugin('loading', {
    loadingTemplate: 'LoadingTemplate'
});

Router.plugin('dataNotFound', {
    dataNotFoundTemplate: 'NotFoundTemplate'
});

Router.route('/', {
    name: 'home',
    template: 'HomeTemplate'
});

Router.route('/about', {
    name: 'about',
    template: 'AboutTemplate',
});

Router.route('/contact', {
    name: 'contact',
    template: 'ContactTemplate',
});

Router.route('/posts', {
    name: 'post.list',
    template: 'PostListTemplate',
    waitOn: function() {
        return Meteor.subscribe('allPosts', 100);
    },
    data: function() {
        return {
            posts: Posts.findFaster({
                published: true
            }, {
              sort: {
                createdAt: -1
              }
            }).fetch()
        };
    }
});

Router.route('/posts/new', {
    name: 'post.create',
    template: 'PostEditTemplate'
});

Router.route('/posts/admin', {
  name: 'post.admin',
  template: 'PostListTemplate',
  waitOn: function() {
      return Meteor.subscribe('adminPosts');
  },
  data: function() {
    return {
      posts: Posts.findFaster().fetch()
    };
  }
});

Router.route('/posts/:slug', {
    name: 'post.show',
    template: 'PostDisplayTemplate',
    waitOn: function() {
        return Meteor.subscribe('singlePost', this.params.slug);
    },
    data: function() {
        return Posts.findOneFaster();
    },
});

Router.route('/posts/:slug/edit', {
    name: 'post.edit',
    template: 'PostEditTemplate',
    waitOn: function() {
        return Meteor.subscribe('singlePost', this.params.slug);
    },
    data: function() {
        return Posts.findOneFaster();
    }
});