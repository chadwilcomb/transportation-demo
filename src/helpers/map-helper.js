import State from 'ampersand-state';
import app from 'ampersand-app';
import extend from 'extend-object';
import L from 'leaflet';
import bind from 'lodash.bind';

export default State.extend({

    getMapDefaults() {
        return {
            zoom: 9,
            center: [40.81, -73.74],
            attributionControl: false,
            touchZoom: false,
            scrollWheelZoom: false
        };
    },

    getBasemapDefaults() {
        return {
            basemapUrl: 'https://{s}.tiles.mapbox.com/v3/placeiq.map-8kxlh0ef/{z}/{x}/{y}.png',
            options: {
                detectRetina: true
            }
        }
    },

    getSatelliteMapDefaults() {
        return {
            basemapUrl: 'https://{s}.tiles.mapbox.com/v3/placeiq.map-trgmcjhu/{z}/{x}/{y}.png',
            options: {
                detectRetina: true
            }
        }
    },

    initMap (element) {
        const _this = this;
        app.map = L.map(element, this.getMapDefaults());

        /* MapBox Grey Muted Palette Map */
        var basemapGray = L.tileLayer(
                this.getBasemapDefaults().basemapUrl,
                this.getBasemapDefaults().options);

                /* MapBox Satellite Map */
        var basemapSatellite = L.tileLayer(
                this.getSatelliteMapDefaults().basemapUrl,
                this.getSatelliteMapDefaults().options);


        var baseMaps = {
            'Gray Basemap': basemapGray,
            'Satellite Imagery': basemapSatellite
        };

        basemapGray.addTo(app.map);

        L.control.layers(baseMaps).addTo(app.map);

        app.zones.fetch({
          parse: true,
          success (collection, response, options) {
            _this.addCollectionLayer(collection);
          }
        })
        // app.airportCollection.fetch({
        //     parse: true,
        //     success (collection, response, options) {
        //         _this.addCollectionLayer(collection);
        //     }
        // });


        // this.listenTo(app.airport, 'change:airport_id', this.onAirportChanged);
        // this.listenTo(app.personType, 'change:person_type_id', this.onPersonTypeChanged);
        // this.listenTo(app.category, 'change', this.onCategoryChanged);

        return app.map;
    },

    addCollectionLayer (collection) {
        const _this = this;
        const layerId = collection.layerId();
        app.geoJsonLayers[layerId] = L.geoJson([], collection.leafletOptions()).addTo(app.map);
        app.geoJsonLayers[layerId].on('layeradd', function () { _this.hideLoading(); });
        app.geoJsonLayers[layerId].addData(collection.toGeoJSON());
        switch (layerId) {
            case 'zones':
                // this.zoomToLayer('zones');
                break;
            // case 'requests':
            //     this.zoomToSelectedAirport(app.airport.airport_id);
            //     break;
            default:
                break;
        }
    },

    showLoading () {
        !app.isLoading && app.showLoading();
    },

    hideLoading() {
        if (this.hideLoadingTimeoutId) {
            window.clearTimeout(this.hideLoadingTimeoutId);
        }
        this.hideLoadingTimeoutId = setTimeout(function () {
            app.hideLoading();
        }, 300);
    },

    zoomToLayer (layerName) {
        app.map.fitBounds(app.geoJsonLayers[layerName].getBounds());
        app.map.invalidateSize();
    },

    zoomToSelectedAirport (airportId) {
        const {geometry} = app.airport;
        if (geometry) {
            app.map.fitBounds(L.geoJson(geometry).getBounds(), { padding: [100,100] });
        }
    },

    centerOnSelectedAirport () {
        const {geometry} = app.airport;
        if (geometry) {
            app.map.panTo(L.geoJson(geometry).getBounds().getCenter());
            if (app.map.getZoom() > 10) {
                app.map.setZoom(10);
            }
        }
    },

    addLayer(collection) {
        const _this = this,
            layerId = collection.layerId();
        if (app.geoJsonLayers[layerId]) {

            app.geoJsonLayers[layerId].addTo(app.map);
            if (layerId === 'requests') {
                this.hideLoading();
            }
        } else {

            collection.fetch({
                parse: true,
                success (collection, response, options) {
                    _this.addCollectionLayer(collection);
                }
            });
        }
    },

    removeLayer (collection) {
        const layerId = collection.layerId();
        if (app.geoJsonLayers[layerId]) {
            app.map.removeLayer(app.geoJsonLayers[layerId]);
        }
    },

    updateStyle (collection) {
        const newStyle = bind(collection.setStyle, collection),
            layerId = collection.layerId();
        if (app.geoJsonLayers[layerId]) {
            app.geoJsonLayers[layerId].eachLayer(function (layer) {
                layer.setStyle(newStyle(layer.feature));
            });
        }
    },
    resetData (collection) {
        const layerId = collection.layerId()
        let geoJson;
        if (app.geoJsonLayers[layerId]) {
            app.geoJsonLayers[layerId].clearLayers();
            geoJson = collection.toGeoJSON();
            app.geoJsonLayers[layerId].addData(geoJson);
            if (geoJson.features.length === 0) {
                console.log('length === 0');
                this.hideLoading();
            }
        }
    },

    onAirportChanged (airport) {
        const navId = app.navs.findWhere({active: true }).id;
        console.log('airport changed, selected Nav = ' + navId + ', airport_id=' + airport.airport_id + ', person_type_id=' + app.personType.person_type_id);
        this.updateStyle(app.airportCollection);
        switch (navId) {
            case 'requests':
                this.zoomToSelectedAirport();
                break;
            case 'locals':
            case 'workers':
                this.resetData(app.homedwellCollection);
                this.resetData(app.destinationCollection);
                this.centerOnSelectedAirport();
                break;
            case 'visitors':
                this.resetData(app.visitorCollection);
                this.resetData(app.destinationCollection);
                this.centerOnSelectedAirport();
                break;
        }

        //highlight selected airport
        this.updateStyle(app.airportCollection);

    },

    onPersonTypeChanged (model) {

        this.resetData(app.homedwellCollection);
        this.resetData(app.visitorCollection);
        this.resetData(app.destinationCollection);

        this.centerOnSelectedAirport();
    },

    onCategoryChanged (categoryId) {

        this.resetData(app.destinationCollection);
    }


});
