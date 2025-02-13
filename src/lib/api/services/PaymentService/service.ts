import * as paymentRequests from './requests/payment';
import * as userRequests from './requests/user';

const PaymentService = {
  ...paymentRequests,
  ...userRequests,
};

export default PaymentService;
