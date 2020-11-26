<template>
  <v-col md=6 class="ml-n3 mt-n2">
    
    <OrderCard
      v-for="order in orders"
      :key="order.id"
      :order="order"
      @show-offer-dialog="show_offer_dialog"
    />
    <!-- Submit offer dialog -->
    <v-dialog v-model="dialog" max-width="520" persistent>
      <v-card>
        <!-- Card title -->
        <v-card-title class="my-card-title">
          <v-icon left color="white" small>mdi-offer</v-icon>
          <span class="text-caption font-weight-bold white--text">
            Submit Offer
          </span>
        </v-card-title>
        <!-- End of card title -->

        <v-card-text class="mt-3">
          <v-form ref="form" v-model="valid" lazy-validation>
            <!--Questiong -->
            <span class="text-caption font-weight-bold ml-10 primary--text">
              Q. Enter your offer amount
            </span>
              <!-- Questiong -->
            <v-text-field 
              placeholder="Enter your offer" 
              append-icon="mdi-decimal" 
              prepend-icon="mdi-cash-multiple"
              dense 
              class="mt-3"
              style="font-size: .9em;"
              :rules="amountRules"
              v-model="offer_data.asking_amount"
            ></v-text-field>
          </v-form>
          
        </v-card-text>

        <v-card-actions class="mt-n4">
          <v-spacer></v-spacer>
          <!-- Buttin for cancelling -->
          <v-btn 
            dark 
            depressed 
            class="text-caption text-capitalize mr-3" 
            color="error" 
            small 
            @click="cancel_offer_submission">
              <span class="text-caption font-weight-bold text--capitalize">cancel</span>
            </v-btn>
            <!-- End of button for cancelling -->

          <!-- Button for submitting -->
          <v-btn 
            dark 
            depressed 
            class="text-caption text-capitalize" 
            color="success" 
            small 
            :loading="loading"
            @click="submit_offer">
              <span class="text-caption font-weight-bold text--capitalize">submit</span>
              <template v-slot:loader>
                  <span class="custom-loader">
                      <v-icon light color="white">mdi-cached</v-icon>
                  </span>
              </template>
            </v-btn>
          <!-- End of button for submitting -->
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End of submit offer dialog -->

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
              :loading="loading"
              @click="submit_offer">
                <span class="text-caption font-weight-bold text--capitalize">upgrade account</span>
                <template v-slot:loader>
                    <span class="custom-loader">
                        <v-icon light color="white">mdi-cached</v-icon>
                    </span>
                </template>
              </v-btn>
          </v-row>

        </v-card-text>

        <v-card-actions class="mt-n4" >

            <!-- Buttin for cancelling -->
            <!-- <v-btn 
              dark 
              depressed 
              class="text-caption text-capitalize" 
              color="error" 
              small 
              @click="showIsClient = false">
                <span class="text-caption font-weight-bold text--capitalize">cancel</span>
              </v-btn> -->
              <!-- End of button for cancelling -->

            <!-- Button for submitting -->
            <!-- <v-btn 
              dark 
              depressed 
              class="text-caption text-capitalize" 
              color="success" 
              small 
              :loading="loading"
              @click="submit_offer">
                <span class="text-caption font-weight-bold text--capitalize">submit</span>
                <template v-slot:loader>
                    <span class="custom-loader">
                        <v-icon light color="white">mdi-cached</v-icon>
                    </span>
                </template>
              </v-btn> -->
          <!-- End of button for submitting -->
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End of dialog for is client -->

    <!-- Snackbar for error while activation -->
    <v-snackbar v-model="snackbar" :color="color" top app elevation="2" timeout="5000">
        <span class="text-caption font-weight-bold">
            {{ message }}
        </span>
    </v-snackbar>
    <!-- End of snackbar -->
  </v-col>       
</template>

<script>
  // import the work card
  import OrderCard from "~/components/order/OrderCard" 
  // import the map getters
  import { mapState } from 'vuex'

  export default {
    // layout
    layout: 'main',
    // componentes
    components: {
      OrderCard
    },
    // fetch function
    async fetch({ store }) {
      // dispatch an action to get all the unassigned orders
      await store.dispatch('orders/getUnAssignedOrders')
    },
    // computed
    computed: {
      // map the getters
      ...mapState('orders', [
        'orders'
      ])
    },
    // data
    data: () => ({
      dialog: false,
      // shoe is client
      showIsClient: false,
      // offer data
      offer_data: {
        asking_amount: ""
      },
      // amountRules
      amountRules: [
        v => !! v || 'Asking amount is required'
      ],
      valid: false,
      // snckbar
      snackbar: false,
      // message
      message: '',
      // loading
      loading: false,
      // color
      color: 'success lighten-1',
      // loader
      loader: null,
      // id of the order for which submission is for
      order_id: ""
    }),

    // methods
    methods: {
      // function for showing the offer dialogue
      show_offer_dialog(order_id) {
        // set the order id
        this.order_id = order_id
        // set the dialog to true
        return this.dialog = true
      },

      resetFields() {
        // reset the form
        this.$refs.form.reset()
        // set the loading to false
        this.loading = false
        // set the loader to null
        this.loader = null
        // set the order id to ""
        this.order_id = ''
        // return
        return
      },

      // function for canceling offer submission
      cancel_offer_submission() {
        // reset the form
        this.resetFields()
        // set the dialogue to false
        this.dialog = false
      },

      // functioin for submitting the the offer
      async submit_offer() {
        // validate the form
        if (!this.$refs.form.validate()) return
        // set the loading to true
        this.loading = true
        // set the loader to loading
        this.loader = this.loading
        // create the data
        let new_offer = {
          asking_amount: this.offer_data.asking_amount
        }

        await this.$axios.post(`/order/offer/${this.order_id}/new`, { new_offer })
          .then(result => {
            // add the current user's id to the order's offer owners
            this.$store.commit('orders/ADD_OFFER_OWNER', {userId: this.$auth.user.id, orderId: this.order_id})
            // reset the form
            this.resetFields()
            // set the snacbar to true
            this.message = result.data.data.message
            // show the snackbar
            this.snackbar = true
            //set is loading to false
            this.loading = false
            // set eh loader to null
            this.loader = null
            // set the dialog to false
            this.dialog = false
          })
          .catch(error => {
            // check if the error has a response
            if (error.response && error.response.status == 403) {
              // the curren user is a client;  show the isClient dialog
              // reset the form
              this.resetFields()
              //set is loading to false
              this.loading = false
              // set eh loader to null
              this.loader = null
              // set the dialog to false
              this.dialog = false
              // show theis client
              this.showIsClient = true
              // set the snacbar to true
              this.message = error.response.data.errors.details
              // set the color
              this.color = 'error lighten-1'
              // show the snackbar
              this.snackbar = true
              
            } else {
              // reset the form
              this.resetFields()
              // set the snacbar to true
              this.message = 'Failed. There was a problem placing your offer. Please try again later'
              //set is loading to false
              this.loading = false
              // set eh loader to null
              this.loader = null
              // show the snackbar
              this.snackbar = true
              // set the color of the snackbar to red
              this.color = 'error'
              // set the dialog to false
              this.dialog = false
            }
            
          })
      },
      // scroll function
      async scroll () {
        window.onscroll = () => {
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

          if (bottomOfWindow) {
            this.$store.dispatch('orders/getMoreUnassignedOrders')
          }
        };
      }
    },
    // mounted
    mounted() {
      this.scroll()
    }
    
  }
</script>
