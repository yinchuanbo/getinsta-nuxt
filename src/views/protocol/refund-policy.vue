<template>
  <div class="page-text">
    <div class="header-blank"></div>
    <div class="wrapper">
      <div class="title">
        <h1>Refund Policy</h1>
        <p>Last Updated: March 13, 2020</p>
      </div>
      <div class="content">
        <p>
          This policy applies to all the products and services at our site.
          <br>
          Please understand that the goods you purchased are non-tangible irrevocable services.
        </p>
        <h2>Money Back Guarantee</h2>
        <p>
          Refund request will be only approved under the Eligible Refund Requests listed below. If a refund request is not submitted within the specified period and reason, no refund will be issued.
        </p>

        <h2>Eligible Refund Requests</h2>
        <p>
          <b>1. Non-delivery service</b><br>
          After the purchase, our system automatically processes your order instantly. You’ll see an increase of your followers or likes within 24 hours. In some cases, the process may take a little longer. Please wait for additional several hours. If there is no increase of likes or followers within 48 hours after the purchase, you can apply for a refund for the corresponding service you purchased. Claims for Non-delivery service must be submitted to our
          <nuxt-link to="/faqs">Support Center</nuxt-link>
          in writing after 48 hours since placing the order.
        </p>
        <p>
          <b>2. Unable to complete the service</b><br>
          If the service you purchased cannot be completed due to the related account is disabled or blocked, you can apply for a refund. Clear evidence must be provided to prove that the account is not able to continue the service.
        </p>

        <h2>Non-Eligible Refund Requests</h2>
        <p>
          Complaints which are based merely on the customer’s false expectations or wishes are not honored.
        </p>
        <p>
          If encountering any problem, you can contact us for assistance via
          <nuxt-link to="/faqs">Support Center</nuxt-link>
          . Our Customer Service Department will get back to you within 24-48 hours (usually less than 24 hours) with a review of your concern, and a solution.
        </p>

        <h2>Refund Process</h2>
        <p>
          After we received your eligible refund request, we will check your order information and issue the refund accordingly. Normally a refund is completed within 7 business days.
        </p>
        <p>
          Note: Once a refund is issued, the corresponding service will be cancelled.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RefundPolicy',
  metaInfo() {
    return {
      title: 'GetInsta - Right of Refund',
      meta: [
        {
          name: 'description',
          content: 'Want to gain real Instagram followers/likes fast and free? The best Instagram follower app GetInsta helps you get 5000+ Instagram followers & likes instantly.'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://www.easygetinsta.com/refund'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped src="./protocol.scss"></style>
