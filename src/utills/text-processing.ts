export const toCapitalCase = (word: string) => word[0].toUpperCase() + word.substring(1);
export const fromKebabToCapitalCase = (name: string) => name
  ?.toLowerCase()
  ?.split('-')
  ?.map(toCapitalCase)
  ?.join(' ');
