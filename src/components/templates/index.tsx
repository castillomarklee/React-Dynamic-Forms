import { Box, Flex, Text } from "@chakra-ui/react"
import { useStoreContext } from "../../context"
import { STORE_ACTIONS } from "../../context/types"

const Templates = () => {
  const {
    state,
    dispatch
  } = useStoreContext()

  const templates = state.template

  return (
    <Box
      border="1px solid"
      borderColor="grey"
      borderRadius="10px"

      p="20px 25px"
      h="350px"
      w="500px"
      overflowY="auto"
    >
      <Text mb="20px">Templates:</Text>
      <Flex
        gap="10px"
      >
        {
          templates && !!templates.length && templates.map((template, index) => {
            return (
              <Text
                key={index}
                _hover={{
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  dispatch({
                    type: STORE_ACTIONS.SET_SELECTED_TEMPLATE,
                    payload: template
                  })
                }}
              >
                {template.name}
              </Text>
            )
          })
        }
      </Flex>
    </Box>
  )
}

export default Templates