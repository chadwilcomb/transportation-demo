import app from 'ampersand-app'
import React from 'react';
import Router from 'ampersand-router';
import qs from 'qs'
import xhr from 'xhr'
import Layout from './layout';
import MessagePage from './pages/message';
import PublicPage from './pages/public';
import DemoPage from './pages/demo';

export default Router.extend({
    renderPage(page, opts = {layout: true}) {
        if(opts.layout) {
            page = (
                <Layout navs={app.navs}>
                    {page}
                </Layout>
            );
        }

        React.render(page, document.body)
    },

    routes: {
        '': 'zones',
        // 'zones': 'zones',
        // 'counts': 'counts',
    },

    public () {
        this.renderPage(<PublicPage/>, { layout: false });
    },

    demoHome () {
      app.trigger('page', 'zones')
      app.selectedLayer = 'zones'
      this.renderPage(<DemoPage  />)
      app.isRendered = true
    },

    zones () {
      if (!app.isRendered) {
        this.demoHome();
      }
      app.navs.get('zones').active = true
      app.trigger('page', 'zones')
      app.selectedLayer = 'zones'
    },

    counts () {
      if (!app.isRendered) {
        this.demoHome();
      }
      app.trigger('page', 'counts')
      app.selectedLayer = 'counts'
      app.navs.get('counts').active = true;
    },

    fourOhFour () {
        app.trigger('page', '404');
        this.renderPage(<MessagePage title='Page not found' />);
        app.isRendered = false;
    }

});
