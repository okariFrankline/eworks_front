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
                    <span class="text-caption font-weight-bold mr-5 error--text">
                        <span class="mr-2">Total Hires:</span> {{ orders.length }}
                    </span>
                </v-row>
            </v-card-title>
            <v-divider class="mt-1"></v-divider>

          <template>
            <NotFound
              :message="notFoundMessage()"
              v-if="!orders.length"
              :icon="'mdi-briefcase-variant-off'"
              :color="'success'"
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
                            <v-icon left color="error">mdi-shield-check</v-icon>
                          <span class="text-capitalize font-weight-bold text-caption error--text" >
                              {{ order.category}}
                          </span>
                          </v-btn>
                        </template>

                        <v-list dense shaped>
                          <!-- Owner of the job -->
                          <v-list-item dense color="purple darken-3" class="mb-n2">
                            <v-list-item-title>
                              <span class="error--text text-caption font-weight-bold mr-2">Posted by:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                {{ order.owner_name }}
                              </span>
                            </v-list-item-title>
                          </v-list-item>
                          <!-- End of owner of the job -->

                          <!-- Date of posting the job-->
                          <v-list-item dense color="purple darken-3" class="mb-n2">
                            <v-list-item-title> 
                              <span class="error--text text-caption font-weight-bold mr-2">Posted on:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                {{ postedOn(order.posted_on) }}
                              </span>
                            </v-list-item-title>
                          </v-list-item>
                          <!-- End of posted date of the job -->

                          <!-- Number of order attachements-->
                          <v-list-item dense color="purple darken-3" class="mb-n2">
                            <v-list-item-title>
                              <span class="error--text text-caption font-weight-bold mr-2">Order Specialty:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                {{ order.specialty }}
                              </span>
                            </v-list-item-title>
                          </v-list-item>
                          <!-- End of number of attachments -->


                          <!-- End of offer submission date -->
                        </v-list>
                      </v-menu>
                      <!-- End of Order Category -->
                      <v-spacer></v-spacer>
                      <!-- Rating of the order -->
                      <div class="mr-3 mt-n2">
                        <v-row class="mt-n2">
                            <v-col class="mr-5">
                                <span class="text-caption font-weight-bold error--text mr-2">Rated:</span>
                            </v-col>
                            <v-col class="">
                                <v-rating half-increments dense small readonly
                                  color="yellow darken-3"
                                  background-color="grey darken-1"
                                  empty-icon="$ratingFull"
                                  :value="order.rating"
                                  class="ml-n10"
                                ></v-rating>
                            </v-col>
                        </v-row>
                      </div>
                      <!-- End of rating of the order -->
                    </v-row>
                  </v-card-title>
                  <!-- Description of the order -->
                  <v-card-text>
                      <v-row class="mt-n9">
                          <p class="text-caption pa-4 font-weight-normal">
                              {{ show_first_fifty(order.description )}}
                              <span id="dots-1" :style="order.show_more ? 'display: none;' : 'display: inline;'">....</span> <span id="more-1" :style="order.show_more ? 'display: inline;' : 'display: none;'">
                                  {{ show_hidden_description(order.description )}}
                              </span>
                              <!-- Button for showing more description -->
                              <v-btn text @click="showMore(order.id)" x-small>
                                  <span class="text-capitalize font-weight-normal info--text"> 
                                      {{order.show_more ? 'read less' : 'read more'}} 
                                  </span>
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
                        <span class="text-caption font-weight-bold purple--text">
                          Client's Comments
                        </span>
                      </div>
                    </v-row>
                  </v-card-title>
                    <!-- Client Comment -->
                    <v-card-text class="mb-n5">
                      <v-row class="mt-n8" >
                      <p class="pa-4 font-weight-normal text-caption mt-n1 info--text">
                          {{ order.comment }}
                      </p>
                      </v-row>
                  </v-card-text>
                  <!-- End of Client Comment -->
                  <v-divider class="ml-4 mr-4"></v-divider>
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
            return description.split(/\s+/).splice(0, 50).join(" ")
        },

        // function for showing more information about the order
        show_hidden_description(description) {
            // set the show more to true
            return description.split(/\s+/).splice(50).join(" ")
        },

        // function for formatin posted on date
        postedOn(date) {
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