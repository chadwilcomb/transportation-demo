import Model from 'ampersand-model';
import omit from 'lodash.omit'

export default Model.extend({

    props: {
        type: 'string',
        geometry: 'object',
        properties: 'object',
    },

    // extraProperties: 'allow',

    // parse (response) {
    //   const props = response.properties;
    //   props.geojson = {
    //     geometry: response.geometry,
    //     type: response.type
    //   };
    //   return props;
    // },

    // toGeoJSON () {
    //   const geojson = this.geojson;
    //   const attrs = this.getAttributes({ props:true, session: true, derived: true })
    //   geojson.properties = omit(attrs, 'geojson')
    //   return geojson
    // }

});
