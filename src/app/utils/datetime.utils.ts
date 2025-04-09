import {TimestampDate} from "timestamp-date";
import {format} from 'date-fns';
import {fr} from 'date-fns/locale';

export const parseDate = (dateValue: any): Date => {
  const timestampDate = new TimestampDate();

  // Si c'est une chaîne ISO (comme "2025-03-18T23:00:00.000Z")
  if (typeof dateValue === 'string' && dateValue.includes('T')) {
    return new Date(dateValue);
  }

  // Sinon c'est un timestamp, utiliser la fonction existante
  return new Date(timestampDate.timestampToDate(dateValue));
};

export const formatToFrench = (date: Date): string => {
  return format(date, "dd MMMM yyyy 'à' HH'h'mm", { locale: fr })
}
