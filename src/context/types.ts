export enum STORE_ACTIONS {
  //TEMPLATE ACTIONS
  ADD_TEMPLATE = 'template:add',

  SELECTED_TEMPLATE = 'template:selected',
  SET_SELECTED_TEMPLATE = 'template:set-selected'
}

export enum FieldTypes {
  TEXT = 'text',
  NUMBER = 'number',
  FILE = 'file',
}

export type FieldTypesOptions = FieldTypes.TEXT | FieldTypes.FILE | FieldTypes.NUMBER

export type DynamicField = {
  name: string
  type: FieldTypesOptions
}

export interface TemplateProps {
  name: string
  fields: DynamicField[]
}

export type StoreTypes = |
{
  type: STORE_ACTIONS.ADD_TEMPLATE,
  payload: TemplateProps,
} |
{
  type: STORE_ACTIONS.SET_SELECTED_TEMPLATE,
  payload: TemplateProps,
}

export interface StoreState {
  template: TemplateProps[] | []
  selectedTemplate: TemplateProps | null
}
