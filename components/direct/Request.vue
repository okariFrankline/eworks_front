<template>
    <!-- Row for the work card -->
    <v-row justify="center">
        <v-col md="12" class="mb-n3 mt-n1">
          <v-card class="mx-auto" width="525"  elevation="2">
            <!-- Card title -->
            <v-card-title>
              <v-row class="mt-n2">

                <v-menu open-on-hover offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn dark v-bind="attrs" v-on="on" text color="teal" class="ml-n1">
                      <v-icon left color="teal">mdi-briefcase-check</v-icon>
                    <span class="text-capitalize font-weight-bold text-caption teal--text" >
                        {{ order.category}}
                    </span>
                    </v-btn>
                  </template>

                  <v-list dense shaped>
                    <!-- Owner of the job -->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title>
                        <span class="teal--text text-caption font-weight-bold mr-2">Posted by:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ order.owner_name }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of owner of the job -->

                    <!-- Date of posting the job-->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title> 
                        <span class="teal--text text-caption font-weight-bold mr-2">Posted on:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ postedOn(order.posted_on) }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of posted date of the job -->

                    <!-- Number of order attachements-->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title>
                        <span class="teal--text text-caption font-weight-bold mr-2">Order Specialty:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ order.specialty }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of number of attachments -->
                  </v-list>
                </v-menu>
                                
                <v-spacer></v-spacer>
                
                <div class="mt-n2">
                  <v-row class="mt-n1 mb-n2">
                      <v-col class="mr-5">
                          <span class="text-caption font-weight-bold error--text mr-1">Order Type: </span>
                          <span class="text-caption font-weight-bold teal--text text-capitalize">
                            Direct Hire Request
                          </span>
                      </v-col>

                  </v-row>
                </div>
            
              </v-row>
            </v-card-title>
            <v-divider class="mt-n4 mb-1"></v-divider>
            <!-- End of card title -->

            <!-- Card text for the description of the order -->
            <v-card-text>
              <!-- Row for the skills -->
              <v-row class="mt-n3 ml-1"> 
                <v-chip small outlined color="cyan" class="mt-1">
                  <span class="text-caption font-weight-normal ml-3 warning--text" style="font-size: .8em;"> 
                    Kes {{ order.payable_amount }} /
                    <span class="warning--text font-weight-normal text-caption">
                        {{ order.payment_schedule }}
                    </span>
                  </span>
                </v-chip>
              </v-row>
            <!-- End of row for skills -->
              <v-row class="mt-n2 mb-n3">
                <p class="text-caption pa-4 font-weight-normal" style="color: #636a6c">
                  {{ show_first_fifty(order.description )}}
                  <span id="dots-1" :style="order.show_more ? 'display: none;' : 'display: inline;'">....</span> <span id="more-1" :style="order.show_more ? 'display: inline;' : 'display: none;'">
                      {{ show_hidden_description(order.description )}}
                  </span>
                  <!-- Button for showing more description -->
                  <v-btn icon @click="() => $store.commit('direct_hire_request/TOGGLE_ORDER_SHOW_MORE')" x-small>
                    <v-icon color="info" x-small> 
                        {{order.show_more ? 'mdi-eye-off' : 'mdi-eye'}} 
                    </v-icon>
                  </v-btn>
                  <!-- End of button for wshoing the description -->
                </p>
              </v-row>
            </v-card-text>
            <!-- End of the card text for description for the order -->

            <!-- Card action -->
            <v-card-actions class="mt-n8">
              <!-- Button for approving payment -->
              <div class="ml-5">
                <span class="text-caption font-weight-bold error--text mr-1">Invite Status: </span>
                  <span class="text-caption font-weight-bold teal--text text-capitalize">
                    {{ showStatus() }}
                  </span>
              </div>
              <!-- End of button for approving payment -->  
              <v-spacer></v-spacer>
              <!-- Button for editing the order -->
              <v-btn
                x-small 
                color="info lighten" 
                dark 
                depressed 
                class="mr-2"
                :loading="assignLoading"
                @click="assignOrder"
              >         
                <span class="text-capitalize font-weight-bold">assign order</span>
                    <template v-slot:assignLoader>
                      <span class="custom-loader">
                          <v-icon light color="white">mdi-cached</v-icon>
                      </span>
                  </template>
              </v-btn>
              <!-- End of button for editing the order -->
 
              <!-- Button for cancelling the order -->
              <v-btn
                v-if="!request.is_cancelled"
                depressed 
                dark 
                x-small 
                color="error lighten-1" 
                class="mr-4"  
                :loading="loading"   
                @click="cancelInvite"    
              >  
                <span class="text-capitalize font-weight-bold">
                  cancel order
                </span>
                  <template v-slot:loader>
                      <span class="custom-loader">
                          <v-icon light color="white">mdi-cached</v-icon>
                      </span>
                  </template>
              </v-btn>
              <!-- End of button for cancelling the order -->
            </v-card-actions>
            <!-- End of card actions -->
          </v-card>
        </v-col>

        <!-- Snackbar -->
        <v-snackbar v-model="snackbar" :color="color"  top app elevation="2" timeout="5000">
            <span class="text-caption font-weight-bold">
              {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbar -->
    </v-row>
    <!-- End of row for card -->
</template>

<script>
// import moment
import moment from 'moment'
// impor mapState
import { mapState } from "vuex"
// component definition
export default {
  // name of component
  name: "Request",
  // props for the component
  props: {
      order: {
          type: Object
      }
  },
  // computed
  computed: {
    ...mapState('direct_hire_request', [
      'request'
    ])
  },
  // data for the component
  data: () => ({
    // snackbar
    snackbar: false,
    //message
    message: '',
    // color
    color: 'success lighten-1',
    // loading
    loading: false,
    // loader
    loader: null,
    // assign loading
    assignLoading: false,
    // assignLoader
    assignLoader: null
  }),
  // methods
  methods: {

      // function for showing the fist 50 words of the of the description
      show_first_fifty(description) {
          return description.split(/\s+/).splice(0, 40).join(" ")
      },

      // function for showing the offer dialog
      show_offer_dialog(order_id) {
          // emit an action
          this.$emit('show-offer-dialog', order_id)
      },

      // function for showing more information about the order
      show_hidden_description(description) {
          // set the show more to true
          return description.split(/\s+/).splice(40).join(" ")
      },

      // show more
      showMore() {
        this.$store.commit('order/TOGGLE_SHOW_MORE')
      },

      // show status
      showStatus() {
        if (this.request.is_cancelled) {
          // return order is cancelled
          return 'Cancelled'
        // order is not assigned
        } else if(this.request.is_accepted) {
          // return the unassigned
          return 'Accepted'
        // order is complete and unpaid
        } else if (this.request.is_rejected) {
          // reurn complete and unpaid
          'Rejected'
        // order is complete and paid for
        } else if (this.request.is_pending) {
          // return Complete and Paid
          return 'Pending'
        }

      },

      // display the posted on
      postedOn(date) {
        return moment(date, "YYYYMMDD").fromNow()
      },

      // handle error
      handleError(err) {
        // check if the error has a response
        if (err.response) {
            // set the message
            this.message = err.response.data.errors.details
        } else {
            this.message = 'Sorry. There was a problem completing your request. Try again later.'
        }
        // set the color
        this.color = "error"
        // set the loading to false
        this.loading ? this.loading = false : this.assignLoading = false
        // set the loader to false
        this.loader ? this.loader = null : this.assignLoader = null
        // set the snackbar to true
        this.snackbar = true
      },

      // function for cancelling an order
      async cancelInvite() {
        // set loading
        this.loading = true
        // loader
        this.loader = this.loading
        // cancel the order
        this.$axios.post(`/direct/hire/${this.$route.params.id}/cancel`)
          .then(({ data }) => {
            // cancel the order in the store
            this.$store.commit('direct_hire_request/CANCEL_REQUEST')
            // set the message
            this.message = data.data.details
            // set the loader to false
            this.loading = false
            // set the loader
            this.loader = null
            // set the snackbar
            this.snackbar = true
          })
          .catch(err => this.handleError(err))
      },

      // function for assigning an order
      async assignOrder(orderId) {
          // set loading
        this.assignLoading = true
        // loader
        this.assignLoader = this.assignLoading
        // assign the order
        this.$axios.post(`/direct/hire/${this.$route.params.id}/assign`)
          .then(({ data }) => {
            // set the message
            this.message = data.data.message
            // set the loader to false
            this.assignLoading = false
            // set the loader
            this.assignLoader = null
            // set the snackbar
            this.snackbar = true
          })
          .catch(err => this.handleError(err))
      }
    }
}
</script>