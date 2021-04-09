const INITIAL_STATE = {
  inputs: null,
  references: null
}

const datasetsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'SUBMIT_DATASETS':
      return {
        ...state,
        inputs: action.payload.inputs,
        references: action.payload.references
      };
    default:
      return state;
  }
}

export default datasetsReducer;