import app from 'ampersand-app';
import leafletcss from '../node_modules/leaflet/dist/leaflet.css';
import styles from './styles/main.styl';
import icons from '../node_modules/octicons/octicons/octicons.css';
import Router from './router';
//collections
import ZonesCollection from './models/studyzone-collection'
// import AirportCollection from './models/airport-collection';
// import RequestCollection from './models/request-collection';
// import HomeDwellCollection from './models/homedwell-collection';
// import VisitorCollection from './models/visitor-sighting-collection';
// import DestinationCollection from './models/destination-collection';
import NavCollection from './models/nav-collection';
// import AudienceProfilesCollection from './models/audience-profile-collection';
import MapState from './helpers/map-helper';
// import SelectedAirport from './models/selected-airport';
// import SelectedPersonType from './models/selected-person-type';
// import SelectedCategory from './models/selected-category';

require("file?name=favicon.ico!./favicon.ico");
require("file?name=piq-logo.png!./images/piq-logo.png");

//expose 'app' to browser console
window.app = app;

var navs = [
    { id: 'zones', title: 'NYMTC Study Zones', url: '/zones', active: true },
    // { id: 'requests', title: 'Airport Requests', url: '/requests' },
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
        this.geoJsonLayers = {};

        this.mapState = new MapState();
        this.navs = new NavCollection(navs);

        this.zones = new ZonesCollection();
        // this.airportCollection = new AirportCollection();
        // this.requestCollection = new RequestCollection();
        // this.destinationCollection = new DestinationCollection();
        // this.visitorCollection = new VisitorCollection();
        // this.homedwellCollection = new HomeDwellCollection();
        // this.audienceProfiles = new AudienceProfilesCollection();
        // this.audienceProfiles.fetch();

        // this.airport = new SelectedAirport();
        // this.personType = new SelectedPersonType();
        // this.category = new SelectedCategory();

        this.router = new Router();
        this.router.history.start();

    }
});

app.init();
