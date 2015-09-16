import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import numeral from 'numeral'

export default React.createClass({
    mixins: [ampersandMixin],
    displayName: 'SelectedZoneSummary',

    render () {
        const {mapState} = this.props
        const inside = mapState.showCounts ? numeral(mapState.zone_count).format('0,0') : mapState.zone_pct
        const outside = mapState.showCounts ? numeral(mapState.zone_count_out).format('0,0') : mapState.zone_pct_out
        const insideText = 'TRIPS ORIGINATING INSIDE ' + mapState.zone_name.toUpperCase()
        return (
          <div id='selected-zone-summary' className='selected-zone-summary'>
            <div className='zone-info'>
              <div className='zone-header'>DESTINATION</div>
              <div className='destination-zone'>{mapState.zone_desc}</div>
              <div className='grid-flex-container'>
                <div className='grid-flex-cell'>
                  <div className='zone-header'>{insideText}</div>
                  <div className='destination-count'>{inside}</div>
                </div>
                <div className='grid-flex-cell'>
                  <div className='zone-header'>TRIPS ORIGINATING OUTSIDE STUDY AREA</div>
                  <div className='destination-count'>{outside}</div>
                </div>
              </div>
            </div>
          </div>
        )
    }
})
