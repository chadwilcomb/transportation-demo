import Collection from 'ampersand-rest-collection';
import bind from 'lodash.bind';
import GeoJSON from './geojson';


export default Collection.extend({

    model: GeoJSON,

    layerId () {
        return 'destinations';
    },

    url () {
        const props = this.cartoDbProps();
        return '//' + props.account + '.cartodb.com/api/v2/sql?q=' + props.sql + ' ' + props.tableName + props.sql2 + props.format + props.apiKey;
    },

    parse (response) {
        this.type = response.type;
        return response.features;
    },

    cartoDbProps () {
         return {
            account: 'chadwilcomb',
            tableName: 'destination_points',
            format: '&format=GeoJSON',
            apiKey: '',
            sql: 'SELECT * FROM',
            sql2: '',
        }
    },

    baseStyle () {
        return {
            fillColor: '#ffb055',
            color: '#444',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.4
        };
    },

    highlightStyle () {
        return {
            weight: 2,
            color: '#444',
            fillColor: '#00b0e9',
            fillOpacity: 0.7
        };

    },

    popupContent (props) {
        return '<div>'+ props.name + '</div>';

    },

    getIcon (props) {
        const icon = {
            iconSize: [24,24],
            className: 'maki ' + props.airport_id
        };
        switch (props.category) {
            case 'Dining':
                icon.iconUrl = 'https://www.mapbox.com/maki/renders/restaurant-24@2x.png';
                break;
            case 'Grocery':
                icon.iconUrl = 'https://www.mapbox.com/maki/renders/grocery-24@2x.png';
                break;
            case 'Hotel':
                icon.iconUrl = 'https://www.mapbox.com/maki/renders/lodging-24@2x.png';
                break;
            default:
                icon.iconUrl = 'https://www.mapbox.com/maki/renders/marker-24@2x.png';
                break;
        }
        return L.icon(icon);
    },

    pointToLayer (feature, latlng) {
        const myIcon = this.getIcon(feature.properties);
        return L.marker(latlng, {icon: myIcon});
    },

    onEachFeature (feature, layer) {
        const popup = L.popup({ closeButton: false })
            .setContent(this.popupContent(feature.properties));
        layer.bindPopup(popup);
    },

    leafletOptions() {
        return {
            onEachFeature: bind(this.onEachFeature, this),
            pointToLayer: bind(this.pointToLayer, this),
        };
    },

    toGeoJSON () {
        var featureCollection = {
            "type": "FeatureCollection",
            "crs": {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:EPSG::2066"
                }
            },
            "features": []
        };
        featureCollection.features = this.filterFeatures();
        return featureCollection;
    },

    filterFeatures () {
        let features = [];
        console.log(app.category.name);
        features = this.filter(function (feature) {
            return app.category &&
                app.category.category === feature.properties.category &&
                (!app.category.name || app.category.name === feature.properties.name) &&
                app.personType.person_type_id &&
                feature.properties.person_type_id === app.personType.person_type_id &&
                feature.properties.airport_id === app.airport.airport_id;
        });
        return features;
    }
});
