import { Button, Flex, Input, Text } from "@chakra-ui/react"
import AddForm, { AddFormValueProps } from "../add-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { array, object, string } from "yup"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export interface FieldProps {
  name: string
  type: string
}

export interface MainFormValueProps {
  name: string
  formFields: FieldProps[]
}

interface MainFormProps {
  onSubmit: (value: MainFormValueProps) => void
}

const MainForm = ({
  onSubmit
}: MainFormProps) => {
  const [selectedForm, setSelectedForm] = useState<AddFormValueProps | null>(null)

  const MainFormSchema = object().shape({
    name: string().required(),
    formFields: array().of(object().shape({
      name: string().required(),
      type: string().required()
    })).required()
  })

  const {
    handleSubmit,
    reset,
    register,
    setValue,
    watch,
    formState: {
      isValid,
    }
  } = useForm<MainFormValueProps>({
    resolver: yupResolver(MainFormSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      formFields: []
    },
  })

  const onFormSubmit = (formValue: MainFormValueProps) => {
    onSubmit(formValue)

    reset({
      name: '',
      formFields: []
    })
  }

  const fieldsValue = watch('formFields')

  const handleEdit = (field: FieldProps) => {
    setSelectedForm({
      name: field.name,
      fieldType: field.type
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Flex
          flexDirection="column"
          gap="10px"
        >
          <Input
            placeholder="Name of template"
            size="sm"
            {...register('name')}
          />
          <AddForm
            defaultValue={selectedForm}
            onConfirm={(form) => {
              if (selectedForm) {
                const oldFields = fieldsValue.filter((field) => field.name !== selectedForm?.name)

                setValue('formFields', [
                  ...oldFields,
                  {
                    name: form.name,
                    type: form.fieldType
                  }
                ])

                setSelectedForm(null)

                return
              }

              const isExisting = fieldsValue.find((field) => field.name === form.name)

              if (isExisting) {
                Swal.fire({
                  title: 'Error!',
                  text: 'This field name is already existing',
                  icon: 'error',
                  confirmButtonText: 'Close'
                })
                return
              }

              setValue('formFields', [
                ...fieldsValue,
                {
                  name: form.name,
                  type: form.fieldType
                }
              ])
            }}
          />
          {
            fieldsValue && !!fieldsValue.length && fieldsValue.map((field, index) => {
              return (
                <Flex
                  key={index}
                  gap="5px"
                >
                  <Text fontWeight="700">{field.name}: </Text>
                  <Text>{field.type}</Text>
                  <Text
                    ml="20px"
                    _hover={{
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleEdit(field)}
                  >
                    Edit
                  </Text>
                  <Text
                    _hover={{
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      const newFields = fieldsValue.filter((item) => item.name !== field.name)

                      setValue('formFields', newFields)
                    }}
                  >
                    Remove
                  </Text>
                </Flex>
              )
            })
          }
          <Button
            type="submit"
            colorScheme="teal"
            disabled={!isValid || !fieldsValue.length}
            isDisabled={!isValid || !fieldsValue.length}
          >
            Save
          </Button>
        </Flex>
      </form>
    </>
  )
}

export default MainForm