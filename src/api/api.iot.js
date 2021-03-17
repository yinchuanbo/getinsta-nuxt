const path = 'https://www.iotransfer.net/';
export default {
  submitByCash: `${path}payment/checkout.php?action=checkout`,
  submitFromGuest: `${path}payment/checkout.php?action=checkout&is_guest=1`,
  stripeRetrieve: `${path}payment/checkout.php?action=striperetrieve`,
  getTask: `${path}payment/checkout.php?action=gettask`,
  webCashEnable: `${path}payment/checkout.php?action=statuscheck`
};
