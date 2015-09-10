import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import app from 'ampersand-app';

export default React.createClass({
    mixins: [ampersandMixin],
    displayName: 'Map',

    render () {
        return (
            <div id='map' className='map'>
                <div id='loading' className='modal modal-no-sections hidden'>
                    <p>Loading data...</p>
                </div>
            </div>
        )
    },

    componentDidMount () {

        const {mapState} = this.props;
        mapState.initMap(map);

        this.listenTo(app, 'page', function (page) {
            switch (page) {
                // case 'demo':
                // case 'airports':
                //     mapState.removeLayer(app.requestCollection);
                //     mapState.removeLayer(app.destinationCollection);
                //     mapState.removeLayer(app.homedwellCollection);
                //     break;
                // case 'requests':
                //     app.showLoading();
                //     mapState.addLayer(app.requestCollection);
                //     mapState.removeLayer(app.destinationCollection);
                //     mapState.removeLayer(app.homedwellCollection);
                //     break;
                // case 'locals':
                // case 'workers':
                //     app.showLoading();
                //     mapState.removeLayer(app.requestCollection);
                //     mapState.addLayer(app.destinationCollection);
                //     mapState.addLayer(app.homedwellCollection);
                //     break;
                // case 'visitors':
                //     app.showLoading();
                //     mapState.removeLayer(app.requestCollection);
                //     mapState.removeLayer(app.homedwellCollection);
                //     mapState.addLayer(app.destinationCollection);
                //     mapState.addLayer(app.visitorCollection);
                //     break;
            }
        });
    },
})
