<template>
    <!-- Row for the work card -->
    <v-row justify="center">
        <v-col md="12" class="mb-n3 mt-n1">
          <v-card class="mx-auto" width="525" elevation="2">
            <!-- Card title -->
            <v-card-title>
              <v-row class="mt-n2">

                <v-menu open-on-hover offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn dark v-bind="attrs" v-on="on" text color="teal" class="">
                      <v-icon left color="teal">mdi-briefcase-check</v-icon>
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
                <div class="mr-5">
                  <v-icon small color="cyan lighten-1" class="mr-1">mdi-shield-check</v-icon>
                </div>
              </v-row>
            </v-card-title>
            <v-divider class="mt-n3 mb-2 cyan mx-2"></v-divider>
            <!-- End of card title -->

            <!-- Card text for the description of the order -->
            <v-card-text>
              <!-- Row for the skills -->
              <v-row class="mt-n4 ml-1"> 
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
              <v-row class="mt-n1">
                <p class="text-caption pa-3 font-weight-normal" style="color: #636a6c">
                  {{ show_first_fifty(order.description )}}
                  <span id="dots-1" :style="order.show_more ? 'display: none;' : 'display: inline;'">...</span> <span id="more-1" :style="order.show_more ? 'display: inline;' : 'display: none;'">
                      {{ show_hidden_description(order.description )}}
                  </span>
                  <!-- Button for showing more description -->
                  <v-btn icon @click="showMore(order.id)" x-small>
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
            <v-card-actions class="mt-n10">
              <v-btn 
                v-if="order.attachments"
                x-small 
                color="info" 
                dark 
                depressed 
                class="ml-5"
                text
                @click="downloadAttachments(order.attachments)"
              >         
                <span class="text-capitalize font-weight-bold">download attachments</span>
              </v-btn>
              <!-- End of button for downloading an order's attachment -->

              <v-btn 
                v-if="!order.attachments"
                x-small 
                color="teal" 
                dark 
                class="ml-3"
                depressed 
                text
              >         
                <span class="text-capitalize font-weight-bold">no attachments</span>
              </v-btn>
              <!-- End of button for downloading an order's attachment -->
              <v-spacer></v-spacer>
 
              <!-- Buttn for shoing the offer dialog for this order -->
              <v-btn 
                v-if="!order.offer_owners.includes($auth.user.id)"
                depressed 
                dark 
                x-small 
                color="teal lighten-1" 
                class="mr-4" 
                @click.stop="show_offer_dialog(order.id)"
              >  
                <span class="text-capitalize font-weight-bold">submit offer</span>
              </v-btn>
              <!-- End of button for showing the offer dialog for this order -->

              <!-- Buttn for shoing the offer dialog for this order -->
              <v-btn 
                v-if="order.offer_owners.includes($auth.user.id)"
                depressed 
                dark
                text
                x-small 
                color="cyan lighten-1" 
                class="mr-1" 
              >  
                <span class="text-capitalize font-weight-bold">submitted</span>
                <v-icon x-small right >mdi-check-bold</v-icon>
              </v-btn>
              <!-- End of button for showing the offer dialog for this order -->
            </v-card-actions>
            <!-- End of card actions -->
          </v-card>
        </v-col>
    </v-row>
    <!-- End of row for card -->
</template>

<script>
// import moment
import moment from 'moment'
export default {
    // name of component
    name: "OrderCard",
    // props for the component
    props: {
        order: {
            type: Object
        }
    },
    // data for the component
    data: () => ({

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

        // function for showing more
        showMore(orderId) {
          this.$store.commit('orders/TOGGLE_SHOW_MORE', {orderId: orderId})
        },

        // posted on
        postedOn(date) {
          return moment(date, "YYYYMMDD").fromNow()
        },

        // show deadline
        showDeadline(date) {
          return moment(date, "YYYYMMDD").format('dddd Do MMMM, YYYY')
        },

        // function for downloading the attachments
        async downloadAttachments(url) {
          // download the attachemtns
          await this.$axios.get(url)
        }
    }
}
</script>