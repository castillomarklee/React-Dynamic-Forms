import { Box, Flex, Text } from "@chakra-ui/react"
import { useStoreContext } from "../../context"
import { FieldTypesOptions, STORE_ACTIONS } from "../../context/types"
import MainForm, { FieldProps, MainFormValueProps } from "./main-form"
import Templates from "../templates"
import FormDisplay from "./form-display"

const DynamicFormBuilder = () => {
  const {
    state,
    dispatch
  } = useStoreContext()

  const selectedTemplate = state.selectedTemplate

  const onAddFormTemplate = (template: MainFormValueProps) => {
    const fields = template.formFields.length ? template.formFields.map((field: FieldProps) => {
      return {
        name: field.name,
        type: field.type as FieldTypesOptions
      }
    }) : []
    dispatch({
      type: STORE_ACTIONS.ADD_TEMPLATE,
      payload: {
        name: template.name,
        fields
      }
    })
  }

  return (
    <Box>
      <Flex
        alignItems="center"
        gap="10px"
      >
        <Text fontSize="20px">
          Add form here
        </Text>
      </Flex>
      <Box maxW="350px" mt="20px">
        <MainForm 
          onSubmit={(formValue) => {
            onAddFormTemplate(formValue)
          }}
        />
        <Flex mt="10px" gap="10px" w="100%">
          <Box flex="2">
            <Templates />
          </Box>
          <Box flex="2">
            {
              selectedTemplate && (
                <FormDisplay
                  template={selectedTemplate}
                  onSubmit={(formValue) => console.log(formValue)}
                />
              )
            }
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default DynamicFormBuilder