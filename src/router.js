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
        '': 'public',
        'zones': 'demoHome',
        // 'airports': 'demoHome',
        // 'requests': 'requests',
        // 'locals': 'locals',
        // 'visitors': 'visitors',
        // 'workers': 'workers',
        // '*fourohfour': 'fourOhFour'
    },

    public () {
        this.renderPage(<PublicPage/>, { layout: false });
    },

    demoHome () {
        app.trigger('page', 'zones');
        // app.trigger('page', 'airports');
        this.renderPage(<DemoPage  />);
        // app.personType.person_type_id = null;
        app.isRendered = true;
    },

    zones () {
        if (!app.isRendered) {
            this.demoHome();
        }
        app.navs.get('zones').active = true;
        // app.personType.person_type_id = null;
        app.trigger('page', 'zones');
    },

    // airports () {
    //     if (!app.isRendered) {
    //         this.demoHome();
    //     }
    //     app.navs.get('airports').active = true;
    //     app.personType.person_type_id = null;
    //     app.trigger('page', 'airports');
    // },
    //
    // requests () {
    //     if (!app.isRendered) {
    //         this.demoHome();
    //     }
    //     app.navs.get('requests').active = true;
    //     app.personType.person_type_id = null;
    //     app.trigger('page', 'requests');
    //     app.showLoading();
    // },
    //
    // locals () {
    //     app.personType.person_type_id = 'Local';
    //     if (!app.isRendered) {
    //         this.demoHome();
    //     }
    //     app.navs.get('locals').active = true;
    //     app.trigger('page', 'locals');
    //     app.showLoading();
    // },
    //
    // visitors () {
    //     app.personType.person_type_id = 'Visitor';
    //
    //     if (!app.isRendered) {
    //         this.demoHome();
    //     }
    //     app.navs.get('visitors').active = true;
    //     app.trigger('page', 'visitors');
    //     app.showLoading();
    // },
    //
    // workers () {
    //     app.personType.person_type_id = 'Worker';
    //     if (!app.isRendered) {
    //         this.demoHome();
    //     }
    //     app.navs.get('workers').active = true;
    //     app.trigger('page', 'workers');
    //     app.showLoading();
    // },

    fourOhFour () {
        app.trigger('page', '404');
        this.renderPage(<MessagePage title='Page not found' />);
        app.isRendered = false;
    }

});
