export const capitalizeFirstLetter = (value: string) => {
  if (value && value !== '') {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
  }

  return ''
}