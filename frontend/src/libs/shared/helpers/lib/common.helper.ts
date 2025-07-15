export const formattingNumber = (value: string | number, locale = 'ru-RU'): string => {
  if (typeof value === 'number' || !isNaN(parseInt(value, 10))) {
    const num = typeof value === 'string' ? parseInt(value.replace(/\D/g, ''), 10) : value;

    return new Intl.NumberFormat(locale).format(num);
  }

  return '';
};

export const setDefaultFormat = (value: string): string => value.replace(/\D/g, '');
