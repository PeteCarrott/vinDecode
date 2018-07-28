import app from '../js/app-functions';

test('Creates URL from input', () => {
  const input = '1G1ND52J9Y6186734';
  const output = 'https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/1G1ND52J9Y6186734?format=json';
  expect(app.createURL(input)).toBe(output);
});

test('Capitalizes only first letter of string', () => {
  expect(app.capitalize('WORD')).toBe('Word');
});

test('Capitalizes only first letter of string', () => {
  expect(app.capitalize('wORD')).toBe('Word');
});

test('Get age based on model year', () => {
  expect(app.determineAge('2015')).toBe('3 years old');
});

test('Get age based on model year', () => {
  expect(app.determineAge('2017')).toBe('1 year old');
});

test('Get age based on model year', () => {
  expect(app.determineAge('2018')).toBe('Less than a year old');
});

test('Get age based on model year', () => {
  expect(app.determineAge('2020')).toBe('Less than a year old');
});

test('Return serial number from vin', () => {
  expect(app.getSerialNumber('1C3CCBBB6DN695936')).toBe('695936');
});

test('Return serial number from vin', () => {
  expect(app.getSerialNumber('BBB6DN695936')).toBe(undefined);
});
