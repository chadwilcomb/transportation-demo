import Model from 'ampersand-model';
import numeral from 'numeral';

export default Model.extend({

    props: {
        airport_id: 'string',
        person_type_id: 'string',
        category: 'string',
        name: 'string',
        value: 'number'
    },
    derived: {
        index: {
            deps: ['value'],
            fn () {
                return numeral(this.value).format('0%');
            }
        },
    }

});
