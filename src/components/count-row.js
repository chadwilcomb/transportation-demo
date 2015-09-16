import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import numeral from 'numeral'
import app from 'ampersand-app';

export default React.createClass({
    mixins: [ampersandMixin],
    displayName: 'CountsSummary',

    render () {
        const {count, max, mapState} = this.props
        // const width = count.properties.count / max * 100
        const string = mapState.showCounts ? numeral(count.properties.count).format('0,0') : count.properties.pct
        // const backgroundColor = app.countScale(count.properties.count)
        // const color = app.textScale(count.properties.count)
        const meterStyle = {
          width: (count.properties.count / max * 100) + '%',
          backgroundColor: app.countScale(count.properties.count),
        }
        const textStyle = {
          color: app.textScale(count.properties.count)
        }
        return (
            <div className='count-row'>
              <div className='zone-label'>{count.properties.name}</div>
              <div className='progress progress-large'>
                <span className='meter' style={meterStyle}>
                  <span className="meter-label" style={textStyle}>{string}</span>
                </span>
              </div>
            </div>
        )
    }
})
