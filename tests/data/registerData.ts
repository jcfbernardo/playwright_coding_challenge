export const tc01Scenarios = [
  {
    id: 'EP-Empty_No_Terms',
    email: '', pass: '', acceptTerms: false,
    expectDisabled: true,
    expectedEmailError: 'This field is required',
    expectedPassError: 'This field is required',
    expectedStrength: null
  },
  {
    id: 'EP-Invalid_Format',
    email: 'teste@.com', pass: 'Senha123!', acceptTerms: true,
    expectDisabled: true,
    expectedEmailError: 'Please enter a valid email address',
    expectedPassError: null,
    expectedStrength: 'Weak'
  },
  {
    id: 'BVA-Min_Boundary',
    email: 'a@b.com', pass: '1234567', acceptTerms: true,
    expectDisabled: true,
    expectedEmailError: null,
    expectedPassError: null,
    expectedStrength: 'Weak'
  },
  {
    id: 'EP-Valid_Scenario',
    email: 'qa_auto_mb@multibank.io', pass: 'Q@Testes2026!', acceptTerms: true,
    expectDisabled: false,
    expectedEmailError: null,
    expectedPassError: null,
    expectedStrength: null
  }
];

export const tc03Scenarios = [
  { id: 'Par1-Desktop_Enter', toggle: true,  method: 'enter', expectType: 'text' },
  { id: 'Par2-Mobile_Click',  toggle: false, method: 'click', expectType: 'password' }
];
