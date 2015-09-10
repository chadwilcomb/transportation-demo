import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import app from 'ampersand-app';

export default React.createClass({

    handleClick: function() {
        const {selectedAirport, airport} = this.props;

        switch (app.personType.person_type_id) {
            case 'Local':
            case 'Visitor':
                app.showLoading();
                break;
        }

        // need to set all of the airport properties when tab is clicked
        setTimeout(function () {
            app.airport.set({ geometry: airport.geometry }, { silent: true });
            selectedAirport.set(airport.properties);
        },100);


    },
    render: function() {
        const {selectedAirport, airport} = this.props;
        return (
            <li className='airport-tab' onClick={this.handleClick}><a className={selectedAirport.airport_id === airport.properties.airport_id ? 'current-item' : ''}>{airport.properties.airport_id}</a></li>
        );
    }
});
