(function() {
  var Thread = Backbone.Model.extend({});

  var ThreadCollection = Backbone.Collection.extend({
    model: Thread,

    parse: function(response) {
      return response.results;
    }
  })

  var Inbox = new ThreadCollection;
  Inbox.url = "/samples/inbox.json";

  var ThreadView = Backbone.View.extend({
    tagName: "div",

    // FIXME use hogan
    template: _.template($('#thread-template')
      .html()),

    render: function() {
      $(this.el)
        .html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var AppView = Backbone.View.extend({
    el: $("#cottonapp"),

    initialize: function() {
      Inbox.bind('add', this.addThread, this);
      Inbox.bind("reset", this.addAllThreads, this);
      Inbox.fetch();
    },

    addThread: function(thread) {
      var view = new ThreadView({
        model: thread
      });
      $("#cottonapp")
        .append(view.render()
          .el);
    },

    addAllThreads: function() {
      Inbox.each(this.addThread);
    }

  });

  window.App = new AppView;
})();