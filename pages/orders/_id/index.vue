<template>
  <v-col md=6 class="ml-n3 mt-n2">
    <!-- OrderProfileCard -->
    <OrderProfileCard 
      :order="order"
    />
    <!-- End of OrderProfileCard -->

    <!-- OrderOfferCard -->
    <OrderOfferCard 
      :offers="offers"
      :assignees="assignees"
      @view-profile="viewOwnerProfile"
    />
    <!-- End of order offer card -->
  </v-col>
</template>

<script>
  // import order profile card
  import OrderProfileCard from "~/components/order/OrderProfileCard"
  // import order offer card
  import OrderOfferCard from "~/components/order/OrderOfferCard"
  // import map getters
  import { mapState } from 'vuex'

  export default {
    // layout
    layout: 'main',
    // components
    components: {
      OrderProfileCard,
      OrderOfferCard
    },
    // get the order
    async fetch({ store, params, error }) {
      // get the order
      await store.dispatch('order/getOrder', params.id)
        // handle the error
        .catch(err => {
          console.log(err)
          // check if the error is a 404
          if (err.response && err.response.status == 404) {
            // display error page
            error({ statusCode: 404, message: err.response.data.errors.details})
          } else {
            // display error page
            error({ message: 'An Error Occurred. Please try again later'})
          }
        })
    },
    computed: {
      ...mapState('order', [
        'order',
        'offers',
        'assignees'
      ])
    },
    data: () => ({
    
    }),
    // before leave route
    beforeRouteLeave (to, from, next) {
      // set the showing to pending
      this.$store.commit('order/SET_SHOWING', "pending")
      // call next
      next()
    },

    // methods
    methods: {
      // function for accepting the offer
        accept_offer(offer_id) {
          // send the data to the back end
          
          // push this order to the accepted orders
          let accepted_offer = this.offers.find(offer => offer.id == offer_id)
          // push offer to accepted offers
          this.accepted_offers.push(accepted_offer)
          // filter the offers to remove it from the pending offers
          this.offers = this.offers.filter(offer => offer.id != offer_id)
        },

        // function for rejecting an offer
        reject_offer(offer_id) {
          // remove the offer from the array
          this.offers = this.offers.filter(offer => offer.id != offer_id)
          // send the data to the back end
        },

        // function for viewing profile
        viewOwnerProfile(ownerId) {
            // direct user to owner of the profile
            this.$router.push({
                path: `/contractors/${ownerId}`
            })
        }
    },
  }
</script>