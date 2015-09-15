import app from 'ampersand-app'
import State from 'ampersand-state';
import leafletcss from '../node_modules/leaflet/dist/leaflet.css'
import styles from './styles/main.styl'
import icons from '../node_modules/octicons/octicons/octicons.css'
import Router from './router'
import MapHelper from './helpers/map-helper'
//collections
import NavCollection from './models/nav-collection'
import ZonesCollection from './models/studyzone-collection'
import CountsCollection from './models/count-collection'

//models
import MapState from './models/map-state'

require("file?name=favicon.ico!./favicon.ico");
require("file?name=piq-logo.png!./images/piq-logo.png");

//expose 'app' to browser console
window.app = app;

var navs = [
    { id: 'zones', title: 'Transportation Study Zones', url: '/zones', active: true },
    { id: 'counts', title: 'Raw Counts', url: '/counts' },
    { id: 'distribution', title: 'Distribution', url: '/distribution' },
    { id: 'hourly', title: 'Hourly Counts', url: '/hourly' },
    // { id: 'locals', title: 'Locals', url: '/locals', personTypeId: 'Local' },
    // { id: 'visitors', title: 'Visitors', url: '/visitors', personTypeId: 'Visitor' },
    // { id: 'workers', title: 'Workers', url: '/workers', personTypeId: 'Worker' },
];

app.extend({

    config : {
        sidebarWidth: 30.0,
    },

    showLoading () {
        this.isLoading = true;
        document.getElementById('loading').classList.remove('hidden');
    },

    hideLoading () {
        this.isLoading = false;
        document.getElementById('loading').classList.add('hidden');
    },

    init () {
        this.geoJsonLayers = {}

        this.mapHelper = new MapHelper()
        this.navs = new NavCollection(navs)

        this.mapState = new MapState()


        this.counts = new CountsCollection()
        this.zones = new ZonesCollection()

        this.router = new Router()
        this.router.history.start()

    }
});

app.init();
