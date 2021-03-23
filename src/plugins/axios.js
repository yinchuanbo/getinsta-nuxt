export default function ({ $axios, redirect }) {
  // $axios.defaults.baseURL = 'https://test.easygetinsta.com/test/api/';

  $axios.onRequest(config => {
  });

  $axios.onResponse(config => {
  });

  $axios.onError(error => {
    // const code = parseInt(error.response && error.response.status);
    // if (code === 400) {
    //   redirect('/400');
    // }
  });
}
