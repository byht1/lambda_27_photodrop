import * as date from 'date-and-time';

type TSearch = {
  pattern?: string;
  minDate?: Date;
  maxDate?: Date;
};

export const dataValidate = (value: string, search?: TSearch) => {
  const {
    pattern = 'DD/MM/YYYY',
    minDate = new Date('1900-01-01'),
    maxDate = new Date(),
  } = search || {};
  const parsedDate = date.parse(value, pattern);

  if (isNaN(parsedDate.getTime())) return false;

  const userDate = new Date(value.split('.').reverse().join('-'));

  const minDifference = date.subtract(userDate, minDate).toDays();
  const difference = date.subtract(userDate, maxDate).toDays();

  if (difference > 0 || minDifference < 0) return false;

  return true;
};

export const messageErrorDate = (search?: TSearch) => {
  const {
    pattern = 'DD/MM/YYYY',
    minDate = '01/01/1900',
    maxDate = 'Must not exceed the current date',
  } = search || {};
  return `the date must follow the pattern ${pattern}. ${maxDate} and should not be less than ${minDate}`;
};
