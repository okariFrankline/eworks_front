<template>
    <!-- Row for the practioner -->
    <v-row align="center" justify="center" class="">
      <v-col md="12" class="mb-n3">
        <v-card class="mx-auto" width="530" elevation="2">
            <v-card-title class="ml-5">
                <v-row justify="center" class="mb-n2">
                    <v-icon small left color="teal">mdi-briefcase-check</v-icon>
                    <span class="text-caption font-weight-bold teal--text">
                        {{ full_name }}<span class="ml-1">'s</span> Previous Hires
                    </span>
                    <v-spacer></v-spacer>
                    <!-- <v-icon small left color="purple">mdi-briefcase-variant</v-icon> -->
                    <span class="text-caption font-weight-bold mr-8 error--text">
                        <span class="mr-2">Total Hires:</span> {{ orders.length }}
                    </span>
                </v-row>
            </v-card-title>
            <v-divider class="mt-1 cyan mx-4"></v-divider>

          <template>
            <NotFound
              :message="notFoundMessage()"
              v-if="!orders.length"
              :icon="'mdi-briefcase-variant-off'"
              :color="'teal'"
            />
            <!-- Row for a single previous hire -->
            <v-row class="mt-n2" v-for="order in orders" :key="order.id">
              <v-col md=12>
                  <v-card-title>
                    <v-row class="mt-n3 ml-n4">
                      <!-- Order category -->
                      <v-menu open-on-hover offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn dark v-bind="attrs" v-on="on" text>
                            <span class="text-capitalize font-weight-bold text-caption cyan--text ml-1" >
                                {{ order.category}} <span class="red--text">::</span> {{ order.specialty}}
                            </span>
                          </v-btn>
                        </template>

                        <v-list dense shaped>
                          <!-- Owner of the job -->
                          <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                            <v-list-item-title>
                              <v-icon x-small color="grey" left>mdi-account-tie</v-icon>
                              <span class="teal--text text-caption font-weight-bold mr-2">Client's name:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
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
                        </v-list>
                      </v-menu>
                      <!-- End of Order Category -->
                      <v-spacer></v-spacer>
                    </v-row>
                  </v-card-title>
                  <!-- Description of the order -->
                  <v-card-text>
                      <!-- Row for the skills -->
                      <v-row class="mt-n4 ml-3"> 
                        <v-chip small outlined color="cyan" class="mt-1">
                          <span class="text-caption font-weight-normal ml-3 blue--text" style="font-size: .8em;"> 
                            Kes {{ order.payable_amount }} /
                            <span class="blue--text font-weight-normal text-caption">
                                {{ order.payment_schedule }}
                            </span>
                          </span>
                        </v-chip>

                        <v-spacer></v-spacer>

                        <div class="mr-7 mt-n2">
                          <v-row class="mt-n1 mb-n2">
                              <v-col class="mr-3">
                                  <span class="text-caption font-weight-bold teal--text mr-3">Rated:</span>
                              </v-col>

                              <v-col class="">
                                  <v-rating
                                      color="yellow darken-3"
                                      background-color="grey darken-1"
                                      empty-icon="$ratingFull"
                                      half-increments
                                      dense
                                      small
                                      :value="order.rating"
                                      class="ml-n10"
                                      readonly
                                  ></v-rating>
                              </v-col>
                          </v-row>
                        </div>

                      </v-row>

                      <v-row class="mt-n2">
                          <p class="text-caption pa-4 font-weight-normal" style="color: #636a6c">
                              {{ show_first_fifty(order.description )}}
                              <span id="dots-1" :style="order.show_more ? 'display: none;' : 'display: inline;'">....</span> <span id="more-1" :style="order.show_more ? 'display: inline;' : 'display: none;'">
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
                  <!-- End of description of the order -->

                  <v-card-title class="mt-n5 mb-n2">
                    <v-row class="mt-n10" justify="start">
                      <div class="ml-4">
                        <!-- <v-icon small left color="info">mdi-message-settings-outline</v-icon> -->
                        <span class="text-caption font-weight-bold purple--text ml-1">
                          Client's Comments
                        </span>
                      </div>
                    </v-row>
                  </v-card-title>
                    <!-- Client Comment -->
                    <v-card-text class="mb-n5">
                      <v-row class="mt-n8" >
                      <p class="pa-4 px-5 font-weight-bold text-caption mt-n1 teal--text">
                          {{ order.comment }}
                      </p>
                      </v-row>
                  </v-card-text>
                  <!-- End of Client Comment -->
                  <v-divider class="ml-4 mr-4 cyan mb-n3"></v-divider>
              </v-col>
            </v-row>
            <!-- End of row for a previous hire -->
          </template>
        </v-card>
      </v-col>
    </v-row>
    <!-- End of the practitioner card -->
</template>

<script>
// import moment
import moment from 'moment'
// import not found
import  NotFound from "~/components/NotFound"
export default {
    //name
    name: "PrevireHireCard",
    // components
    components: {
      NotFound
    },
    // props
    props: {
        orders: Array,
        full_name: String
    },
    //data
    data: () => ({
    }),
    // methods
    methods: {
        // function for showing the fist 50 words of the of the description
        show_first_fifty(description) {
            return description.split(/\s+/).splice(0, 75).join(" ")
        },

        // function for showing more information about the order
        show_hidden_description(description) {
            // set the show more to true
            return description.split(/\s+/).splice(75).join(" ")
        },

        // function for formatin posted on date
        postedOn(date) {
          return moment(date, "YYYYMMDD").format('dddd Do MMMM, YYYY')
          
        },
        // show deadline
        showDeadline(date) {
          return moment(date, "YYYYMMDD").format('dddd Do MMMM, YYYY')
        },

        // funciton for showing more
        showMore(orderId) {
          // emit an event for showing more
          this.$emit('toggle-show-more', orderId)
          //this.$store.commit('contractor_profile/TOGGLE_ORDER_SHOW_MORE', {orderId: orderId})
        },

        // not found messag
        notFoundMessage () {
          return `No previous hires for ${this.full_name} at the moment.`
        }
    }
}
</script>