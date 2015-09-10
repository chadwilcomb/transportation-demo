import Collection from 'ampersand-rest-collection';
import AudienceProfile from './audience-profile';


export default Collection.extend({

    model: AudienceProfile,

    comparator: 'value',

    url () {
        const props = this.cartoDbProps();
        return '//' + props.account + '.cartodb.com/api/v2/sql?q=' + props.sql + ' ' + props.tableName + props.sql2 + props.format + props.apiKey;
    },

    parse (response) {
        this.fields = response.fields;
        this.time = response.time;
        return response.rows;
    },

    cartoDbProps () {
         return {
            account: 'chadwilcomb',
            tableName: 'audience_profiles',
            format: '',
            apiKey: '',
            sql: 'SELECT * FROM',
            sql2: '',
        }
    },

});
