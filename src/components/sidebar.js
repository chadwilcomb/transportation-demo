import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import app from 'ampersand-app';
import groupBy from 'lodash.groupby';
import MapState from '../helpers/map-helper';
import AirportSwitcher from './airport-switcher';
import DemographicSection from './demographic-section'

export default React.createClass({
    mixins: [ampersandMixin],
    displayName: 'Sidebar',

    render () {
        // const {selectedAirport, selectedPersonType, airports} = this.props;
        let content;
        content = (
          <div className='zone-info'>Zone Info goes here...</div>
        )
        // let selection, grouped, keys;
        // let airportNavItems, demoSections;
        //
        // airportNavItems = airports.map((airport) => {
        //     return (<AirportSwitcher key={airport.cid} airport={airport} selectedAirport={selectedAirport} />);
        // });
        //
        // if (selectedAirport.airport_id) {
        //     // high level airport stats
        //     nav = (
        //         <nav className='airport-switch' role='navigation'>
        //             <ul className='list-unstyled list-inline tabs'>
        //                 {airportNavItems}
        //             </ul>
        //         </nav>
        //     );
        //     heading = (<div className='airport-name'>{selectedAirport.name}</div>);
        // }
        // if (selectedAirport.airport_id && !selectedPersonType.person_type_id) {
        //
        //     // show high level stats for aiport info and airport requests view
        //     content = (
        //         <div className='airport-info'>
        //             <p>On a single day, <strong>{selectedAirport.date}</strong>, a sample of <strong>{selectedAirport.travelers}</strong>&nbsp;devices were detected
        //             at <strong>{selectedAirport.airport_id}</strong> airport. Of this sample, <strong>Locals</strong> made up <strong>{selectedAirport.pctLocals}</strong>,
        //             out of town <strong>Visitors</strong> made up <strong>{selectedAirport.pctVisitors}</strong>, and airport <strong>Workers</strong> made up <strong>{selectedAirport.pctWorkers}</strong>.
        //             </p>
        //         </div>
        //     );
        // }
        // if (selectedAirport.airport_id && selectedPersonType.person_type_id) {
        //
        //     //show audience profiles for Locals/Visitors/Workers pages
        //
        //     // filter the audience profiles by airport and person type
        //     selection = app.audienceProfiles.where({airport_id: selectedAirport.airport_id, person_type_id: selectedPersonType.person_type_id }).reverse();
        //
        //     // group the audience profiles collection by category
        //     grouped = groupBy(selection, 'category');
        //
        //     // sort the categories
        //     keys = Object.keys(grouped);
        //     keys.sort();
        //
        //     // render a DemographicSection for each category
        //     demoSections = keys.map((key) => {
        //         return (<DemographicSection category={app.category} key={key} demographics={grouped[key]} label={key.toString()} />)
        //     });
        //
        //     content = (<div className='audience-profile-container'>{demoSections}</div>);
        // }
        return (
            <div id='sidebar' className='sidebar'>{content}</div>
        )
    },

    componentDidUpdate () {
        this.forceRepaint();
    },

    forceRepaint () {
        // this is here because of a weird issue where the DOM elements get updated
        // in the sidebar but the browser just looks white. If you resize the window
        // slightly it renders out. This just adjusts the sidebar width slightly as
        // to force a repaint. Needs further investigation.
        const width = app.config.sidebarWidth;
        const reset = width - 0.1;
        document.getElementById('sidebar').style.width = reset + '%';
        window.setTimeout(function () {
                document.getElementById('sidebar').style.width = width + '%';
        }, 10);

    }
})
