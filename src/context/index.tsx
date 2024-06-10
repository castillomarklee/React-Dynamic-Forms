import React, {
  Dispatch,
  SetStateAction,
  createContext, useContext, useReducer, useState,
} from 'react'
import { StoreState, StoreTypes } from './types'
import { StoreReducer } from './reducer'

export interface Props {
  children: React.ReactNode
}

export type StoreContextProps = {
  state: StoreState
  dispatch: React.Dispatch<StoreTypes>
}

const initialState: StoreState = {
  template: [],
  selectedTemplate: null
}

const Context = createContext<StoreContextProps>({
  state: initialState,
  dispatch: () => ({
  }),
})

const initializer = (state: StoreState) => state

const StoreProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    StoreReducer,
    initialState,
    initializer
  )

  return (
    <Context.Provider value={{ state, dispatch, }}>{children}</Context.Provider>
  )
}

export { StoreProvider }

export const useStoreContext = (): StoreContextProps => {
  return useContext(Context)
}

export default Context
