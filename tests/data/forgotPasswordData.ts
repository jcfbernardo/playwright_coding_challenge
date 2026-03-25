export const tc01Scenarios = [
  {
    id: 'EP-Empty',
    email: '',
    expectDisabled: true,
    expectedError: null
  },
  {
    id: 'EP-Invalid_Format_1',
    email: 'usuario',
    expectDisabled: true,
    expectedError: 'Please enter a valid email address'
  },
  {
    id: 'EP-Invalid_Format_2',
    email: 'usuario@',
    expectDisabled: true,
    expectedError: 'Please enter a valid email address'
  },
  {
    id: 'EP-Invalid_Format_3',
    email: '@dominio.com',
    expectDisabled: true,
    expectedError: 'Please enter a valid email address'
  },
  {
    id: 'BVA-Min_Boundary',
    email: 'a',
    expectDisabled: true,
    expectedError: 'Please enter a valid email address'
  },
  {
    id: 'BVA-Max_Boundary',
    email: 'a'.repeat(245) + '@mb.io',
    expectDisabled: true,
    expectedError: null,
    knownBug: true
  },
  {
    id: 'EP-Valid_Scenario',
    email: 'qa_automation@multibank.io',
    expectDisabled: false,
    expectedError: null
  }
];

export const tc03Scenarios = [
  { id: 'Submit_Via_Click',  method: 'click' },
  { id: 'Submit_Via_Enter', method: 'enter' }
];
