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
                    <v-btn dark v-bind="attrs" v-on="on" text color="" class="ml-1">
                      <v-icon small left color="teal">mdi-briefcase-variant</v-icon>
                        <span class="text-capitalize font-weight-bold text-caption teal--text" >
                            {{ order.category}} <span class="red--text">::</span> {{ order.specialty}}
                        </span>
                    </v-btn>
                  </template>
                </v-menu>
                                
                <v-spacer></v-spacer>
                <div class="mr-3">
                  <v-icon small color="cyan lighten-1" class="mr-2">mdi-shield-check</v-icon>
                </div>
              </v-row>
            </v-card-title>
            <v-divider class="mt-n2 mb-1 mx-4 cyan"></v-divider>
            <!-- End of card title -->

            <!-- Card text for the description of the order -->
            <v-card-text>    
                <v-row>
                    <v-list dense shaped class="mt-n5">
                        <v-list-item class="mb-n3 mt-n4">
                            <v-list-item-content>
                                <v-list-item-title>
                                <v-subheader>
                                    <v-icon left color="cyan" small class="mb-n2">mdi-briefcase-check</v-icon>
                                    <span class="text-caption font-weight-bold cyan--text mb-n2 ml-1"> Order Summary </span>
                                </v-subheader>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <!-- Owner of the job -->
                        <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                            <v-list-item-title>
                                <v-icon x-small color="grey" class="mr-n5 ml-5">mdi-account-tie</v-icon>
                                <span class="teal--text text-caption font-weight-bold mr-2 ml-7">Order posted by:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                {{ order.owner_name }}
                                </span>
                            </v-list-item-title>
                        </v-list-item>
                        <!-- End of owner of the job -->

                        <!-- Date of posting the job-->
                        <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                            <v-list-item-title>  
                                <v-icon x-small color="grey" class="mr-n5 ml-5">mdi-calendar</v-icon>
                                <span class="teal--text text-caption font-weight-bold mr-2 ml-7">Order posted on:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                {{ showDeadline(order.posted_on) }}
                                </span>
                            </v-list-item-title>
                        </v-list-item>
                        <!-- End of posted date of the job -->

                        <!-- Number of order attachements-->
                        <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                            <v-list-item-title >
                                <v-icon x-small color="grey" class="mr-n5 ml-5">mdi-playlist-check</v-icon>
                                <span class="teal--text text-caption font-weight-bold mr-2 ml-7">Order Category:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                {{ order.category }}
                                </span>
                            </v-list-item-title>
                        </v-list-item>
                        <!-- End of number of attachments -->

                        <!-- Number of order attachements-->
                        <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                            <v-list-item-title>
                                <v-icon x-small color="grey" class="mr-n5 ml-5">mdi-format-list-bulleted</v-icon>
                                <span class="teal--text text-caption font-weight-bold mr-2 ml-7">Order Specialty:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                {{ order.specialty }}
                                </span>
                            </v-list-item-title>
                        </v-list-item>
                        <!-- End of number of attachments -->

                        <!-- Offer submission date-->
                        <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                            <v-list-item-title>  
                                <v-icon x-small color="grey" class="mr-n5 ml-5">mdi-calendar-clock</v-icon>
                                <span class="teal--text text-caption font-weight-bold mr-2 ml-7">Submit offer before:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                {{ showDeadline(order.deadline) }}
                                </span>
                            </v-list-item-title>
                        </v-list-item>
                        <!-- End of offer submission date -->
                    </v-list>    
                    
                </v-row>      
            <!-- End of row for skills -->
              <v-row class="mt-1">
                <h3 class="mt-3 ml-4 text-caption mb-n2 cyan--text font-weight-bold">
                    <v-icon left color="cyan" small>mdi-clipboard-text</v-icon>
                    Order Details
                </h3>
                <p class="text-caption pa-4 font-weight-bold" style="color: #636a6c">
                  {{ show_first_fifty(order.description )}}
                  <span id="dots-1" :style="order.show_more ? 'display: none;' : 'display: inline;'">...</span> <span id="more-1" :style="order.show_more ? 'display: inline;' : 'display: none;'">
                      {{ show_hidden_description(order.description )}}
                  </span>
                  <!-- Button for showing more description -->
                  <v-btn icon @click="() => order.show_more = !order.show_more" x-small>
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
            <v-card-actions class="mt-n10">
                <!-- Button for downloading the order attachments -->
              <v-btn 
                x-small 
                color="teal lighten-1" 
                dark 
                depressed 
                class="ml-5"
                @click="() => $router.back()"
              >         
                <span class="text-capitalize font-weight-bold tex-caption">go back</span>
              </v-btn>
              <!-- End of button for downloading an order's attachment -->
              <v-spacer></v-spacer>
              <!-- Button for downloading the order attachments -->
              <v-btn 
                v-if="order.attachments"
                x-small 
                color="info" 
                dark 
                text
                depressed 
                class="mr-5"
                @click="downloadAttachments(order.attachments)"
              >         
                <span class="text-capitalize font-weight-bold">downl attachments</span>
              </v-btn>
              <!-- End of button for downloading an order's attachment -->
              <!-- Button for downloading the order attachments -->
              <v-btn 
                v-if="!order.attachments"
                x-small 
                color="teal" 
                dark 
                text
                depressed 
                class="mr-5"
              >         
                <span class="text-capitalize font-weight-bold">no attachments</span>
              </v-btn>
              <!-- End of button for downloading an order's attachment -->
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
// component definition
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
            return description.split(/\s+/).splice(0, 70).join(" ")
        },

        // function for showing the offer dialog
        show_offer_dialog(order_id) {
            // emit an action
            this.$emit('show-offer-dialog', order_id)
        },

        // function for showing more information about the order
        show_hidden_description(description) {
            // set the show more to true
            return description.split(/\s+/).splice(50).join(" ")
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