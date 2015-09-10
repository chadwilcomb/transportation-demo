import Model from 'ampersand-model';

export default Model.extend({

    props: {
        type: 'string',
        geometry: 'object',
        properties: 'object',
        selectedFeature: false
    },

});
