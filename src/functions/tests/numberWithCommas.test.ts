import { numberWithCommas } from '../numberWithCommas'

test.each`
  input      | output
  ${0}       | ${'0'}
  ${1}       | ${'1'}
  ${12}      | ${'12'}
  ${123}     | ${'123'}
  ${1234}    | ${'1,234'}
  ${12345}   | ${'12,345'}
  ${123456}  | ${'123,456'}
  ${1234567} | ${'1,234,567'}
`('$input が $output に変換される', ({ input, output }) => {
  expect(numberWithCommas(input)).toEqual(output)
})
