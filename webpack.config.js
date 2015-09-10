// require('babel/register');
var getConfig = require('hjs-webpack');
// var React = require('react');
// var Layout = require('./src/layout');
// var Public = require('./src/pages/public');

module.exports = getConfig({
    in: 'src/app.js',
    out: 'public',
    clearBeforeBuild: true,
    isDev: true, //process.env.NODE_ENV !== 'production',
    hostname: 'piq-chad.local',
    html: function (context) {
        // var layoutHtml = React.renderToString(React.createElement(Layout, {me: {}}));
        // var publicHtml = React.renderToString(React.createElement(Public));
        return {
            '200.html': context.defaultTemplate(),
            'index.html': context.defaultTemplate()
        };
    }
});
