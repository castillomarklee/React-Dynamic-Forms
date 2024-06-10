import { Box, Button, Flex, Input, Text } from "@chakra-ui/react"
import { TemplateProps } from "../../../context/types"
import { useEffect, useState } from "react"

export interface FormValues {
  [key: string]: any
}

interface FormDisplayProps {
  template: TemplateProps
  onSubmit: (value: FormValues | null) => void
}

interface HandeOnChangeProps {
  name: string
  value: any
}

const FormDisplay = ({
  onSubmit,
  template,
}: FormDisplayProps) => {
  const [formValue, setFormValue] = useState<FormValues | null>(null)

  const selectedTemplate = template.fields

  useEffect(() => {
    if (selectedTemplate?.length) {
      const formFields = selectedTemplate.reduce((acc, curr) =>
        ({ ...acc, [curr.name.toLocaleLowerCase().replace(/ /g, "_")]: '' }), {})

      setFormValue(formFields)
      return
    }

    return setFormValue(null)
  }, [selectedTemplate])

  const handleOnChange = (changeValue: HandeOnChangeProps) => {
    if (formValue) {
      setFormValue({
        ...formValue,
        [changeValue.name]: changeValue.value
      })
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(formValue)
  }

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
      <Text
        fontWeight="700"
        mb="20px"
      >
        {template.name}
      </Text>
      {
        selectedTemplate && !!selectedTemplate.length && formValue && (
          <form id="dynamic-form" onSubmit={(event) => handleSubmit(event)}>
            <Flex
              flexDirection="column"
              gap="10px"
            >
              {
                selectedTemplate.map((template, index) => {
                  const templateName = template.name.toLocaleLowerCase().replace(/ /g, "_")

                  return (
                    <Box key={index}>
                      <Input
                        name={templateName}
                        type={template.type} placeholder={template.name}
                        value={formValue[templateName]}
                        onChange={(event) => handleOnChange({
                          name: templateName,
                          value: event.target.value
                        })}
                      />
                    </Box>
                  )
                })
              }
              <Button
                type="submit"
                colorScheme="teal"
              >
                Submit
              </Button>
            </Flex>
          </form>
        )
      }
    </Box>
  )
}

export default FormDisplay