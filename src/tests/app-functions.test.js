import app from '../js/app-functions';

test('Creates URL from input', () => {
  const input = "1G1ND52J9Y6186734";
  const output = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/1G1ND52J9Y6186734?format=json";
  expect(app.createURL(input)).toBe(output);
});