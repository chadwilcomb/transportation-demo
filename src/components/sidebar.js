import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
// import app from 'ampersand-app';
// import groupBy from 'lodash.groupby';
import mapHelper from '../helpers/map-helper';

import SelectedZoneSummary from './selected-zone-summary'
import SelectedHourSummary from './selected-hour-summary'
import CountsSummary from './counts-summary'

export default React.createClass({
    mixins: [ampersandMixin],
    displayName: 'Sidebar',



    render () {
      const {mapState, zones, counts} = this.props

      return (
        <div id='sidebar' className='sidebar'>
          <SelectedZoneSummary mapState={mapState} />
          <SelectedHourSummary mapState={mapState} />
          <CountsSummary zones={zones} counts={counts} mapState={mapState} />
        </div>
      )
    },

    // componentDidUpdate () {
    //     this.forceRepaint();
    // },
    //
    // forceRepaint () {
    //     // this is here because of a weird issue where the DOM elements get updated
    //     // in the sidebar but the browser just looks white. If you resize the window
    //     // slightly it renders out. This just adjusts the sidebar width slightly as
    //     // to force a repaint. Needs further investigation.
    //     const width = app.config.sidebarWidth;
    //     const reset = width - 0.1;
    //     document.getElementById('sidebar').style.width = reset + '%';
    //     window.setTimeout(function () {
    //             document.getElementById('sidebar').style.width = width + '%';
    //     }, 10);
    //
    // }
})
