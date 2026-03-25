export const tc01Scenarios = [
  {
    id: 'EP-Empty',
    email: '', pass: '',
    expectError: true,
    expectedEmailError: 'This field is required',
    expectedPassError: 'This field is required'
  },
  {
    id: 'EP-Invalid_Format',
    email: 'usuario.com', pass: '   ',
    expectError: true,
    expectedEmailError: 'Please enter a valid email address!',
    expectedPassError: null
  },
  {
    id: 'BVA-Min_Boundary',
    email: 'a', pass: '1',
    expectError: true,
    expectedEmailError: 'Please enter a valid email address!',
    expectedPassError: null
  },
  {
    id: 'BVA-Max_Boundary',
    email: 'a'.repeat(256), pass: 'b'.repeat(128),
    expectError: true,
    expectedEmailError: 'Please enter a valid email address!',
    expectedPassError: null
  },
  {
    id: 'EP-Valid_Scenario',
    email: 'qa@dominio.com.br', pass: 'SenhaForte123!',
    expectError: false,
    expectedEmailError: null,
    expectedPassError: null
  }
];

export const tc03Scenarios = [
  { id: 'Admin-Visible',    email: 'admin@mb.io',    pass: 'admin123',   clickEye: true,  expectedType: 'text' },
  { id: 'Customer-Hidden',  email: 'cliente@mb.io',  pass: 'cliente123', clickEye: false, expectedType: 'password' },
  { id: 'Customer-Visible', email: 'cliente2@mb.io', pass: 'teste123',   clickEye: true,  expectedType: 'text' },
];
