<template>
    <v-col md=6 class="ml-n3 mt-n2">
      <!-- InviteProfileCard -->
      <InviteProfileCard 
        :invite="invite"
        @view-order="viewOrder"
      />
      <!-- End of InviteProfileCard -->

      <!-- OfferCard -->
        <InviteOfferCard 
            :offers="offers"
            :inviteIsAssigned="invite.is_assigned"

          />
        
        <!-- End of offer card -->
    </v-col>
</template>

<script>
  // import invite profile card
  import InviteProfileCard from "~/components/collaboration/InviteProfileCard"
  // import he inviteOfferCard
  import inviteOfferCard from "~/components/collaboration/InviteOfferCard"
  // import the map state
  import { mapState } from 'vuex'
  // component definiton
  export default {
      // layout
      layout: 'main',
      // components
      components: {
        InviteProfileCard,
        inviteOfferCard
      },
      // fetch
      async fetch({ store, params, error}) {
        // dispatch action to get the inte
        await store.dispatch('invite_details/getInvite', params.id)
          // handle the error
          .catch(err => {
            console.error(err)
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
      // computed
      computed: {
        // invite
        ...mapState('invite_details', [
          'invite',
          'offers'
        ])
      },
      // before leve
      beforeRouteLeave (to, from, next) {
        // when the route changes, set the showingPending to true
          this.$store.commit('invite_details/SET_SHOWING_PENDING')
          // go to next page
          next()
      },
      // data
      data: () => ({
      }),
      // methods
      methods: {
         // view order
        viewOrder(orderId) {
            // go to the order details
            this.$router.push({
                path: `/collaborations/${this.$route.params.id}/order/${orderId}`
            })
        }
      },
  }
</script>