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
                    <v-btn dark v-bind="attrs" v-on="on" text  class="ml-n1">
                    <span class="text-capitalize font-weight-bold text-caption teal--text" >
                        {{ order.category}} <span class="red--text">::</span> {{ order.specialty}}
                    </span>
                    </v-btn>
                  </template>

                  <v-list dense shaped>
                    <!-- Owner of the job -->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title>
                        <v-icon x-small color="grey" left>mdi-account-tie</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Posted by:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ order.owner_name }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of owner of the job -->

                    <!-- Date of posting the job-->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title> 
                        <v-icon x-small color="grey" left>mdi-calendar</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Posted on:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ showDeadline(order.posted_on) }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of posted date of the job -->

                    <!-- Number of order attachements-->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title>
                        <v-icon x-small color="grey" left>mdi-playlist-check</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Order Category:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ order.category }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of number of attachments -->

                    <!-- Number of order attachements-->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title>
                        <v-icon x-small color="grey" left>mdi-format-list-bulleted</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Order Specialty:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ order.specialty }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of number of attachments -->

                    <!-- Offer submission date-->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title> 
                        <v-icon x-small color="grey" left>mdi-calendar-clock</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Submit offer before:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ showDeadline(order.deadline) }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of offer submission date -->
                  </v-list>
                </v-menu>
                                
                <v-spacer></v-spacer>
                
                <div class="mt-n2">
                  <v-row class="mt-n1 mb-n2">
                      <v-col class="mr-6">
                          <v-icon color="cyan lighten-1" small>mdi-shield-check</v-icon>
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
                  <span class="text-caption font-weight-normal ml-3 blue--text" style="font-size: .8em;"> 
                    Kes {{ order.payable_amount }} /
                    <span class="blue--text font-weight-normal text-caption">
                        {{ order.payment_schedule }}
                    </span>
                  </span>
                </v-chip>
              </v-row>
            <!-- End of row for skills -->
              <v-row class="mt-n2">
                <p class="text-caption pa-4 font-weight-normal" style="color: #636a6c">
                  {{ show_first_fifty(order.description )}}
                  <span id="dots-1" :style="order.show_more ? 'display: none;' : 'display: inline;'">....</span> <span id="more-1" :style="order.show_more ? 'display: inline;' : 'display: none;'">
                      {{ show_hidden_description(order.description )}}
                  </span>
                  <!-- Button for showing more description -->
                  <v-btn icon @click="() => $store.commit('order/TOGGLE_SHOW_MORE')" x-small>
                    <v-icon x-small color="info"> 
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
              <v-btn 
                x-small 
                color="teal" 
                dark 
                text
                depressed 
                class="ml-3"
                v-if="!order.attachments"
              >         
                <span class="text-capitalize font-weight-bold">No attachments</span>
              </v-btn>
              <!-- End of button for approving payment -->  

              <!-- Button for approving payment -->
              <v-btn 
                x-small 
                color="teal" 
                dark 
                text
                depressed 
                class="ml-3"
                v-if="order.attachments"
              >         
                <span class="text-capitalize font-weight-bold">downl attachments</span>
              </v-btn>
              <!-- End of button for approving payment --> 

              <v-spacer></v-spacer>
              <!-- Button for editing the order -->
              <v-btn 
                v-if="!order.is_assigned"
                x-small 
                color="info" 
                dark 
                text
                depressed  
                class="mr-2"
                :disabled="order.is_assigned"
                @click="() => this.$router.push(`/orders/${this.$route.params.id}/review`)"
              >         
                <span class="text-capitalize font-weight-bold">edit order</span>
              </v-btn>
              <!-- End of button for editing the order -->
 
              <!-- Button for cancelling the order -->
              <v-btn
                v-if="!order.is_assigned"
                depressed 
                dark 
                x-small 
                color="error lighten-1" 
                class="mr-6"     
                @click="cancelOrder(order.id)"    
              >  
                <span class="text-capitalize font-weight-bold">
                  cancel
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
// component definition
export default {
  // name of component
  name: "OrderProfileCard",
  // props for the component
  props: {
      order: {
          type: Object
      }
  },
  // data for the component
  data: () => ({
    // snackbar
    snackbar: false,
    //message
    message: '',
    // color
    color: 'success lighten-1'
  }),
  // methods
  methods: {

      // function for showing the fist 50 words of the of the description
      show_first_fifty(description) {
          return description.split(/\s+/).splice(0, 75).join(" ")
      },

      // function for showing the offer dialog
      show_offer_dialog(order_id) {
          // emit an action
          this.$emit('show-offer-dialog', order_id)
      },

      // function for showing more information about the order
      show_hidden_description(description) {
          // set the show more to true
          return description.split(/\s+/).splice(75).join(" ")
      },

      // show more
      showMore() {
        this.$store.commit('order/TOGGLE_SHOW_MORE')
      },

      showDeadline(date) {
        return moment(date, "YYYYMMDD").format('dddd Do MMMM, YYYY')
      },

      // show status
      showStatus(order) {
        if (!order.is_assigned) {
          // return order is cancelled
          return 'unassigned'
        // order is not assigned
        } else if(order.is_assigned && !order.is_complete) {
          // return the unassigned
          return 'in progress'
        // order is complete and unpaid
        } else if (order.is_complete && !order.is_paid_for) {
          // reurn complete and unpaid
          'Complete & Unpaid'
        // order is complete and paid for
        } else if (order.is_complete && order.is_paid_for) {
          // return Complete and Paid
          'Complete & Paid'
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
        this.color = "error lighten-1"
        // set the loading to false
        this.loading = false
        // set the loader to false
        thisloader = null
        // set the snackbar to true
        this.snackbar = true
      },

      // function for cancelling an order
      async cancelOrder(orderId) {
        // set loading
        this.loading = true
        // loader
        this.loader = this.loading
        // cancel the order
        this.$axios.post(`/order/${orderId}/cancel`)
          .then(({ data }) => {
            // cancel the order in the store
            this.$store.commit('order/CANCEL_ORDER')
            // set the message
            this.message = data.data.message
            // set the loader to false
            this.loading = false
            // set the loader
            this.loader = null
            // set the snackbar
            this.snackbar = true
          })
          .catch(err => this.handleError(err))
      }
    }
}
</script>