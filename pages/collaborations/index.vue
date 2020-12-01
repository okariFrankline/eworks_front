<template>
    <v-col md=6 class="ml-n3 mt-n1">
        <!-- Show not found -->
        <v-row justify="center" v-if="!invites.length">
              <v-col md="12" class="mb-n3 mt-n1">
                <v-card class="mx-auto" width="525"  elevation="2">
                  <!-- Card title -->
                  <v-card-title>
                    <span class="text-caption text-capitalize font-weight-bold ml-5 error--text">
                        No Results Found
                      </span>
                  </v-card-title>
                  <v-divider class="mt-n2 mx-3 mb-1 cyan"></v-divider> 
                  <!-- End of card title -->

                  <!-- Card text for the description of the invite -->
                  <v-card-text>
                    <NotFound
                      :message="'There are no Colloboration Invites at the moment. Check again later.'"
                      :icon="'mdi-database-off'"
                      :color="'teal'"
                    />
                  </v-card-text>
                  <!-- End of the card text for description for the invite -->
                </v-card>
              </v-col>
          </v-row>
        <!-- End of not found -->
        <!-- InviteCard -->
        <InviteCard
            :inviteIds="inviteIds"
            v-for="invite in invites"
            :key="invite.id"
            :invite="invite"
            @view-order="viewOrder"
            @show-is-client="showIsClient = true"
        />
        <!-- End of invite card -->

        <!-- Dialof for is client -->
    <v-dialog v-model="showIsClient" max-width="520" persistent>
      <v-card>
        <!-- Card title -->
        <v-card-title class="my-card-title">
          <v-icon left color="white" small>mdi-offer-off</v-icon>
          <span class="text-caption font-weight-bold white--text">
            Offer could not be submitted
          </span>
          
          <v-spacer></v-spacer>

          <v-btn color="error" x-small depressed outlined @click="showIsClient = false">
            <span class="text-caption text-capitalize font-weight-bold error--text">cancel</span>
          </v-btn>
        </v-card-title>
        <!-- End of card title -->

        <v-card-text class="mt-5">
          <v-row class="mt-3" justify="center">
              <v-icon color="error" x-large>mdi-upload-off</v-icon>
          </v-row>

          <v-row class="mt-2" justify="center">
              <h4 class="error--text">
                Offer Could not be sumitted.
              </h4>
          </v-row>

          <v-row justify="center" class="mt-3">
              <p class=" font-weight-bold teal--text px-3 text-caption">
                Your account is of type: <span class="warning--text">Client Account</span> and client accounts
                cannot place offers for orders or collaboration invites .<span class="purple--text">However, your offer can still be 
                submitted upon a <span class="warning--text">One Time Upgrade</span></span>
              </p>
          </v-row>

          <v-row justify="center" class="mt-3">
            <!-- Button for submitting -->
            <v-btn 
              dark 
              depressed 
              class="text-caption text-capitalize px-5" 
              color="warning" 
              small 
              block
            >
                <span class="text-caption font-weight-bold text--capitalize">upgrade account</span>
                <template v-slot:loader>
                    <span class="custom-loader">
                        <v-icon light color="white">mdi-cached</v-icon>
                    </span>
                </template>
              </v-btn>
          </v-row>

        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- End of dialog for is client -->
    </v-col>
</template>

<script>
// import the invite card
import InviteCard from "~/components/collaboration/InviteCard"
// import not found
import NotFound from "~/components/NotFound"
// import mapGetters
import { mapState } from 'vuex'
// component definiton
export default {
    // layout
    layout: 'main',
    // components
    components: {
        InviteCard,
        NotFound
    },
    // fetch
    async fetch({ store, error }) {
        // get the collaborations
        await store.dispatch('collaborations/getInvites')
    },
    // computed
    computed: {
        ...mapState('collaborations', [
            'invites',
            'inviteIds'
        ])
    },
    data: () => ({
        // shoe is client
      showIsClient: false,
        
    }),
    // methods
    methods: {
        // function for viewing order
        viewOrder(orderId) {
            // log the order
            this.$router.push({
                path: `/collaborations/order/${orderId}`
            })
        }, 

        // handle new collaboration
        newCollaboration(orderId) {
            // set the orderId
            this.orderId = orderId
            // set the job dialoag to true
            this.jobDialog = true
        },
    },
}
</script>