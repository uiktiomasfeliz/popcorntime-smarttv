define( ['App', 'jquery', 'backbone', 'marionette', 'hbs!templates/sidebar'],
    function(App, $, Backbone, Marionette, template) {
        return Backbone.Marionette.ItemView.extend( {
            template:template,
            className:"sidebar",
            events: {
                'click .closer':           'hide',
                'click .play-button':      'play',
                'click #switch-on':        'enableHD',
                'click #switch-off':       'disableHD'
            },

            initialize: function (options) {
                this.model = App.Scrapers.get(options.currentMovie);
            },

            onRender: function(){
                this.$el.removeClass('hidden');

                this.backdropCache = new Image();
                this.backdropCache.src = this.model.get('backdrop');
                this.backdropCache.onload = function () {
                    $(".backdrop-image").addClass("loaded");
                };
            },

            hide: function () {

                $('.movie.active').removeClass('active');
                this.$el.addClass('hidden');
                
                if( typeof this.backdropCache != 'undefined' ) {
                    this.backdropCache.src = null;
                }
            },

            enableHD: function (evt) {

                var torrents = this.model.get('torrents');
                console.log('HD Enabled');

                if(torrents['1080p'] !== undefined) {
                    this.model.set('torrent', torrents['1080p']);
                    this.model.set('quality', '1080p');
                }
            },

            disableHD: function (evt) {

                var torrents = this.model.get('torrents');
                console.log('HD Disabled');

                if(torrents['720p'] !== undefined) {
                    this.model.set('torrent', torrents['720p']);
                    this.model.set('quality', '720p');
                }
            }
        });
    });