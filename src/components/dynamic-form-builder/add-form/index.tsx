import { Button, Flex, Input, Select } from "@chakra-ui/react"
import { FieldTypes } from "../../../context/types"
import { capitalizeFirstLetter } from "../../../common/helpers"
import { useEffect, useState } from "react"

const FIELD_TYPES_OPTIONS = [
  {
    name: capitalizeFirstLetter(FieldTypes.TEXT),
    value: FieldTypes.TEXT
  },
  {
    name: capitalizeFirstLetter(FieldTypes.NUMBER),
    value: FieldTypes.NUMBER
  },
  {
    name: capitalizeFirstLetter(FieldTypes.FILE),
    value: FieldTypes.FILE
  }
]

export interface AddFormValueProps {
  name: string
  fieldType: string
}

interface AddFormProps {
  defaultValue?: AddFormValueProps | null
  onConfirm: (value: AddFormValueProps) => void
}

const AddForm = ({
  defaultValue,
  onConfirm
}: AddFormProps) => {
  const [name, setName] = useState('')
  const [fieldType, setFieldType] = useState('')

  useEffect(() => {
    if (defaultValue) {
      const {
        name,
        fieldType
      } = defaultValue

      setName(name)
      setFieldType(fieldType)
    }
  }, [defaultValue])

  const onFormSubmit = () => {
    onConfirm({
      name: name,
      fieldType: fieldType
    })

    setName('')
    setFieldType('')
  }

  return (
    <Flex
      alignItems="cetner"
      gap="10px"
    >
      <Input
        placeholder="Name of field"
        size="sm"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Select
        placeholder="Select type"
        size="sm"
        value={fieldType}
        onChange={(event) => setFieldType(event.target.value)}
      >
        {
          FIELD_TYPES_OPTIONS.map((field, index) =>
            <option
              key={index}
              value={field.value}
            >
              {field.name}
            </option>
          )
        }
      </Select>
      <Button
        type="button"
        colorScheme="teal"
        fontSize="12px"
        h="33px"
        w="80px"
        disabled={name === '' || fieldType === ''}
        isDisabled={name === '' || fieldType === ''}
        onClick={onFormSubmit}
      >
        {defaultValue ? 'Edit' : 'Add'}
      </Button>
    </Flex>
  )
}

export default AddForm