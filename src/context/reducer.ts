import {
  STORE_ACTIONS,
  StoreState,
  StoreTypes,
} from './types'

export const StoreReducer = (state: StoreState, action: StoreTypes) => {

  switch (action.type) {
  case STORE_ACTIONS.ADD_TEMPLATE:
    return {
      ...state,
      template: [...state.template, action.payload],
    }
  case STORE_ACTIONS.SET_SELECTED_TEMPLATE:
      return {
        ...state,
        selectedTemplate: action.payload,
      }
  default:
    return state
  }
}
