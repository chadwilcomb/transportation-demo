import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({
    mixins: [ampersandMixin],
    displayName: 'SelectedZoneSummary',

    render () {
        const {mapState} = this.props
        let content
        if (mapState.zone_desc) {
          content = (
            <div className='zone-info'>
              <h3>Destination: {mapState.zone_desc}</h3>
            </div>
          )
        }
        return (
            <div id='selected-zone-summary' className='selected-zone-summary'>
              {content}
            </div>
        )
    }
})
