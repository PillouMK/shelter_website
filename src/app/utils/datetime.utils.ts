import {format} from 'date-fns';

import {fr} from 'date-fns/locale';

export const parseDate = (dateValue: any): Date => {
  return dateValue.toDate()
};

export const formatToFrench = (date: Date): string => {
  return format(date, "dd MMMM yyyy 'à' HH'h'mm", { locale: fr })
}

export const formatTimeMMSS = (seconds: number): string => {
  const totalSeconds = Math.round(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}
