import words from '../words.json';

export const getWords = async (str: string) => {
  return words.filter((word) => word.includes(str));
}