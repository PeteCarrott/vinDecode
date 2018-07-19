import app from '../js/app-functions';

test('Creates URL from input', () => {
  const input = "1G1ND52J9Y6186734";
  const output = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/1G1ND52J9Y6186734?format=json";
  expect(app.createURL(input)).toBe(output);
});

test('Capitalizes only first letter of string', () => {
  expect(app.capitalize("WORD")).toBe("Word");
});

test('Capitalizes only first letter of string', () => {
  expect(app.capitalize("wORD")).toBe("Word");
});

test('Get age based on model year', () => {
  expect(app.determineAge("2015")).toBe("3");
});

test('Get age based on model year', () => {
  expect(app.determineAge("2018")).toBe("0");
});

test("Get age based on model year", () => {
  expect(app.determineAge("2020")).toBe("0");
});