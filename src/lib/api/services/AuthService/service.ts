import * as authRequests from './requests/auth';
import * as usersRequests from './requests/users';

const AuthService = {
  ...authRequests,
  ...usersRequests,
};

export default AuthService;
