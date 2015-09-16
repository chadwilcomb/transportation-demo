import State from 'ampersand-state';
import app from 'ampersand-app';
import extend from 'extend-object';
// import L from 'leaflet';
import L from 'mapbox.js'
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

    // getSatelliteMapDefaults() {
    //     return {
    //         basemapUrl: 'https://{s}.tiles.mapbox.com/v3/placeiq.map-trgmcjhu/{z}/{x}/{y}.png',
    //         options: {
    //             detectRetina: true
    //         }
    //     }
    // },

    initMap (element) {
        const _this = this;

        L.Polygon.prototype.isEmpty = function () {
          return !this._latlngs.length || !this._latlngs[0].length;
        }

        L.mapbox.accessToken = 'pk.eyJ1IjoibmV3ZmllbGRzIiwiYSI6Ikk3TmFfYWMifQ.yxfeME9vJaT2GyCbnzsBzw';

        app.map = L.map(element, this.getMapDefaults());

        /* MapBox Grey Muted Palette Map */
        var basemapGray = L.tileLayer(
                this.getBasemapDefaults().basemapUrl,
                this.getBasemapDefaults().options);

                /* MapBox Satellite Map */
        // var basemapSatellite = L.tileLayer(
        //         this.getSatelliteMapDefaults().basemapUrl,
        //         this.getSatelliteMapDefaults().options);
        //

        // var baseMaps = {
        //     'Gray Basemap': basemapGray,
        //     'Satellite Imagery': basemapSatellite
        // };

        basemapGray.addTo(app.map);

        this.closeTooltip = null
        this.popup = new L.popup({ closeButton: false, autoPan: false, offset: [0,-5] })
        this.popupOn = false

        // L.control.layers(baseMaps).addTo(app.map);

        // app.zones.fetch({
        //   parse: true,
        //   success (collection, response, options) {
        //     _this.addCollectionLayer(collection);
        //   }
        // })

        this.listenTo(app, 'update-map', this.updateStyle)
        if (app.zones.length) this.updateStyle(app.zones)

        return app.map;
    },


    addCollectionLayer (collection) {
        const _this = this
        const layerId = collection.layerId()
        this.showLoading()
        // app.geoJsonLayers[layerId] = L.geoJson([], collection.leafletOptions()).addTo(app.map);
        app.geoJsonLayers[layerId] = L.mapbox.featureLayer([], collection.leafletOptions()).addTo(app.map)
        app.geoJsonLayers[layerId].on('layeradd', function () { _this.hideLoading() })
        app.geoJsonLayers[layerId].setGeoJSON(collection.toGeoJSON())
        // app.geoJsonLayers[layerId].on('click', collection.onClickLayer)

        app.geoJsonLayers[layerId].eachLayer(function (layer) {
          // layer.setStyle(collection.countStyle)
          // layer.bindPopup(collection.getPopupContent(layer.feature), { closeButton: false, autoPan: false })
          layer.on('click', collection.onClickLayer)
          layer.on('mouseover', function(e) {
            // e.layer.openPopup();
            // console.log(e)
            _this.popup.setLatLng(e.latlng)
            _this.popup.setContent(collection.getPopupContent(e.target.feature))
            if (!_this.popup._map) _this.popup.openOn(app.map);
            window.clearTimeout(_this.closeTooltip);
            // if (!app.popupOn) {
            //   app.popup.openOn(app.map)
            //   app.popupOn = true
            // }
          })
          layer.on('mouseout', function(e) {
              // e.layer.closePopup();
              _this.closeTooltip = window.setTimeout(function() {
                app.map.closePopup();
              }, 100);
              // if (app.popupOn) {
              //   app.map.closePopup()
              //   app.popupOn = false
              // }
          })
        })

        // this.listenTo(app.mapState, 'change:zone_id', function () {
        //   app.geoJsonLayers[layerId].setGeoJSON(collection.toGeoJSON())
        // })

        // app.geoJsonLayers[layerId].addData(collection.toGeoJSON());
        // switch (layerId) {
        //     case 'zones':
        //         // this.zoomToLayer('zones');
        //         app.geoJsonLayers[layerId].on({
        //             click: function (e) {
        //               app.geoJsonLayers[layerId].setStyle(collection.baseStyle())
        //               e.layer.setStyle(collection.highlightStyle()).bringToFront()
        //               // app.selectedZone.set(e.layer.feature.properties)
        //             }
        //         });
        //         break;
        //     default:
        //         break;
        // }
    },

    updateStyle (collection) {
      const newStyle = collection.countStyle
      const layerId = collection.layerId()
      if (app.geoJsonLayers[layerId]) {
          app.geoJsonLayers[layerId].eachLayer(function (layer) {
              layer.setStyle(newStyle(layer.feature));
          });
      } else {
        this.addCollectionLayer(collection)
      }
    },

    // resetCollectionLayer (collection) {
    //   const _this = this
    //   const layerId = collection.layerId()
    //   app.geoJsonLayers[layerId].setGeoJSON(collection.toGeoJSON())
    // //   this.removeLayer(collection)
    // //   // this.addCollectionLayer(collection)
    // //   app.geoJsonLayers[layerId] = L.geoJson([], collection.leafletOptions()).addTo(app.map);
    // //   app.geoJsonLayers[layerId].addData(collection.toGeoJSON());
    // //   // app.geoJsonLayers[layerId].setStyle(collection.countStyle);
    // //   // app.geoJsonLayers[layerId].onEachFeature(collection.leafletOptions().onEachFeature);
    // },

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

    // zoomToLayer (layerName) {
    //     app.map.fitBounds(app.geoJsonLayers[layerName].getBounds());
    //     app.map.invalidateSize();
    // },

    // addLayer(collection) {
    //     const _this = this,
    //         layerId = collection.layerId();
    //     if (app.geoJsonLayers[layerId]) {
    //
    //         app.geoJsonLayers[layerId].addTo(app.map);
    //         if (layerId === 'requests') {
    //             this.hideLoading();
    //         }
    //     } else {
    //
    //         collection.fetch({
    //             parse: true,
    //             success (collection, response, options) {
    //                 _this.addCollectionLayer(collection);
    //             }
    //         });
    //     }
    // },

    // removeLayer (collection) {
    //     const layerId = collection.layerId();
    //     if (app.geoJsonLayers[layerId]) {
    //         app.map.removeLayer(app.geoJsonLayers[layerId]);
    //     }
    // },

});
