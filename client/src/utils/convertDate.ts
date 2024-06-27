import { format } from 'date-fns';

export const convertDate = (date: string) => {
  return format(new Date(date), 'yyyy.MM.dd');
};
