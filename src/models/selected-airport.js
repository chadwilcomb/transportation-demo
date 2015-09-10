import State from 'ampersand-state';
import numeral from 'numeral';

export default State.extend({

    idAttribute: 'airport_id',
    props: {
        airport_id: 'string',
        name: 'string',
        total_travelers: 'number',
        visitors: 'number',
        workers: 'number',
        locals: 'number',
        date: {
            type: 'string',
            default: '5/2/2015'
        },
        geometry: 'object'
    },

    derived: {
        pctVisitors: {
            deps: ['total_travelers', 'visitors'],
            fn () {
                return numeral(this.visitors / this.total_travelers).format('0.00%');
            }
        },
        pctLocals: {
            deps: ['total_travelers', 'locals'],
            fn () {
                return numeral(this.locals / this.total_travelers).format('0.00%');
            }
        },
        pctWorkers: {
            deps: ['total_travelers', 'arrivals'],
            fn () {
                return numeral(this.workers / this.total_travelers).format('0.00%');
            }
        },
        travelers: {
            deps: ['total_travelers'],
            fn () {
                return numeral(this.total_travelers).format('0,0');
            }
        }
    },

    initialize () {
        this.listenToOnce(app.airportCollection, 'sync', function () {
            const airport = app.airportCollection.at(0).toJSON();
            console.log(airport.geometry);
            this.set('geometry', airport.geometry);
            this.set(airport.properties);
        })

        this.on('change:airport_id', function () {
            if (app.personType.person_type_id) {
                app.hideLoading();
            }
        })
    }

});
