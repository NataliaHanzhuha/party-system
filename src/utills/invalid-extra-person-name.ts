export const invalidExtraPersonName = (value: string | null) => {
  if (value === null) {
    return false;
  }

  return value?.trim()?.includes('\s[2,]')
    || value?.trim()?.includes(', ')
    || value?.trim()?.toLowerCase() === 'me'
    || value?.trim()?.toLowerCase()?.includes('none')
    || value?.trim()?.toLowerCase()?.includes('0')
    || value?.trim()?.toLowerCase()?.includes('yet')
    || value?.trim()?.toLowerCase()?.includes("don't")
    // || value?.trim()?.toLowerCase()?.includes(' or ')
}
