export const parseFunction = (value: string): number | undefined => {
  const valueToUse: string = value.toLowerCase() || '';

  if (valueToUse.endsWith('b')) {
    return Number(valueToUse.slice(0, valueToUse.length - 1)) * 1000000000;
  }
  if (valueToUse.endsWith('m')) {
    return Number(valueToUse.slice(0, valueToUse.length - 1)) * 1000000;
  }

  if (valueToUse.endsWith('k')) {
    return Number(valueToUse.slice(0, valueToUse.length - 1)) * 1000;
  }

  if (Number(valueToUse)) {
    return Number(valueToUse);
  }

  return undefined;
};

describe('Curl Request', () => {
  it('should convert bilion', () => {
    expect(parseFunction('8b')).toEqual(8000000000);
    expect(parseFunction('1b')).toEqual(1000000000);
    expect(parseFunction('1.1b')).toEqual(1100000000);
    expect(parseFunction('1.145b')).toEqual(1145000000);
  });

  it('should convert militon', () => {
    expect(parseFunction('641M')).toEqual(641000000);
    expect(parseFunction('87M')).toEqual(87000000);
    expect(parseFunction('17M')).toEqual(17000000);
    expect(parseFunction('9M')).toEqual(9000000);
    expect(parseFunction('3.8M')).toEqual(3800000);
    expect(parseFunction('50m')).toEqual(50000000);
    expect(parseFunction('1m')).toEqual(1000000);
  });

  it('should convert miliar???', () => {
    expect(parseFunction('770k')).toEqual(770000);
    expect(parseFunction('86.12k')).toEqual(86120);
    expect(parseFunction('29k')).toEqual(29000);
    expect(parseFunction('14.7k')).toEqual(14700);
    expect(parseFunction('1.5k')).toEqual(1500);
    expect(parseFunction('1k')).toEqual(1000);
  });

  it('should convert unit???', () => {
    expect(parseFunction('405')).toEqual(405);
    expect(parseFunction('900')).toEqual(900);
    expect(parseFunction('1')).toEqual(1);
  });

  it('should convert unit???', () => {
    expect(parseFunction('')).toEqual(undefined);
    expect(parseFunction('ABC')).toEqual(undefined);
    expect(parseFunction('213S')).toEqual(undefined);
  });
});