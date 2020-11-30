<template>
  <v-col md=6 class="ml-n3 mt-n3">
    <!-- WorkerProfileCard -->
    <WorkerProfileCard 
      :worker="contractor"
      @show-direct-hire-popup="showDirectHirePopup"
    />
    <!-- End of WorkerProfileCard -->

    <!-- Previous hire card -->
    <PreviousHireCard 
      :orders="hires"
      :full_name="contractor.full_name"
      @toggle-show-more="showOrderMore"
    />
    <!-- End of previous hire card -->

    <!-- DirectHirePopup -->
    <DirectHirePopup
      :showDirectHire="showDirectHire"
      :contractorId="$route.params.id"
      :orders="orders"
      @hide-dialog="hideDirectHirePopup"
      @show-new_invite="showNewInvite"
    />
    <!-- End of direct hire popup -->
  </v-col>
</template>

<script>
  // import workprofile card
  import WorkerProfileCard from "~/components/worker/WorkerProfileCard"
  // import previous hires
  import PreviousHireCard from "~/components/worker/PreviousHireCard"
  // import direct hire popup
  import DirectHirePopup from "~/components/dialogs/DirectHirePopup"
  // import mapGetters
  import { mapGetters, mapState } from 'vuex'

  export default {
    // layout
    layout: 'main',
    // components
    components: {
      WorkerProfileCard,
      PreviousHireCard,
      DirectHirePopup
    },
    // fetch function
    async fetch({ store, params, error}) {
      // get the contractor
      await store.dispatch('contractor_profile/getContractor', params.id)
        // handle the error
        .catch(err => {
          // check if the error has response
          if (err.response && err.response.status == 404) {
            // get the data
            let { data } = err.response
            // log the error
            console.log(data)
            // display the error
            error({statusCode: 404, message: data.errors.details})
          } else {
            // log the error
            console.log(err)
            // set the error
            error({message: 'There was a problem getting the contractor. Try again later.'})
          }
        })
    },
    // computed
    computed: {
      ...mapGetters('contractor_profile', [
        'contractor',
        'hires'
      ]),

      // get the orders for the direct hires
      ...mapState('new_direct_hires', [
        'orders'
      ])
    },
    data: () => ({
      // show direct hire
      showDirectHire: false
    }),

    // methods
    methods: {
      // function for showing direct hire
      showDirectHirePopup() {
        // set the show hire to true
        this.showDirectHire = true
      },

      // function for hiding direct hire popup
      hideDirectHirePopup() {
        // set the show hire to false
        this.showDirectHire = false
      },

      // show new invite
      showNewInvite(inviteId) {
        // set the show hire to false
        this.showDirectHire = false
        // redirect the user to new invite
        this.$router.push({
          path: `/direct/hire/${inviteId}`
        })
      },

      // function for showing the order's more details
        showOrderMore (orderId) {
            // commit to the store
            this.$store.commit('contractor_profile/TOGGLE_ORDER_SHOW_MORE', {orderId: orderId})
        }
    },
  }
</script>

