import { format } from 'date-fns';

// Date Format
export const formatDate = (date: number | Date, str: string) => format(date, str);
