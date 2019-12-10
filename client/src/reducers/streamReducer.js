import _ from 'lodash';
const streamReducer = (state={}, action) =>{
    switch(action.type){
        case 'CREATE_STREAM':
            return {...state, [action.payload.id]: action.payload}
        case 'ALL_STREAM':
            return  {...state, ..._.mapKeys(action.payload, 'id')}
        case 'SHOW_STREAM':
            return {...state, [action.payload.id]: action.payload}
        case 'EDIT_STREAM':
            return {...state, [action.payload.id]: action.payload}
        case 'DELETE_STREAM':
            return _.omit(state, action.payload)
        default: 
            return state
    }
}

export default streamReducer;