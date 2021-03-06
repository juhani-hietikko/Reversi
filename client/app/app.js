/** == defaults == **/
steal(
    '//steal/less/less.js',
    '//jquery/controller/controller.js',
    '//jquery/controller/subscribe/subscribe.js',
    '//jquery/view/ejs/ejs.js',
    '//jquery/controller/view/view.js',
    '//jquery/model/model.js',
    '//jquery/model/validations/validations.js',
    '//jquery/lang/json/json.js',
    '//jquery/lang/openajax/openajax.js',
    './plugins/modernizr/modernizr.js',
    './plugins/string/string.js',
    './plugins/socketio/socketio.js'
)
/** == styles == **/
.then(function() {
    steal('./styles/app.less');
})
/** == templates == **/
.then(
	'./views/page/skeleton.ejs'
)
/** == resources == **/
.then(
)
/** == models == **/
.then(
	'./models/board.js'
)
/** == super controllers == **/
.then(
)
/** == controllers == **/
.then(
	'./controllers/init_controller.js',
	'./controllers/board_controller.js',
	'./controllers/status_controller.js'
)
/** == boot strap == **/
.then(function() {
    $.param = function(a) { // override default processData handler to post raw JSON only instead of encodeURI params
        return (a.constructor == String) ? a : $.toJSON(a);
    };
    $(function() {
        $.ajaxSetup({
            contentType: "application/json; charset=utf-8",
            statusCode: {
                401: function(res) {
                    OpenAjax.hub.publish("Auth.loggedOut", $.parseJSON(res.responseText));
                },
                400: function(res) {
                    OpenAjax.hub.publish("Validation."+$.originName(res), $.parseJSON(res.responseText));
                }
            }
        });
    });

    $('body').app_init();
});
