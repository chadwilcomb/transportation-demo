import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import numeral from 'numeral'

export default React.createClass({
    mixins: [ampersandMixin],
    displayName: 'CountsSummary',

    render () {
        const {count, max} = this.props
        const width = count.properties.count / max * 100
        const string = numeral(count.properties.count).format('0,0')
        const meterStyle = {
          minWidth: (width < 20 ? 20 : width) + '%'
        }
        return (
            <div className='count-row'>
              <div className='zone-label'>{count.properties.name}</div>
              <div className='progress progress-large'>
                <span className='meter' style={meterStyle}>
                  <span className="meter-label">{string}</span>
                </span>
              </div>
            </div>
        )
    }
})
