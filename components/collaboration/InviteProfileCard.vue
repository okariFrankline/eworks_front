<template>
    <!-- Row for the work card -->
    <v-row justify="center">
        <v-col md="12" class="mb-n3 mt-n1">
          <v-card class="mx-auto" width="530" elevation="2">
            <!-- Card title -->
            <v-card-title>
              <v-row class="mt-n2">
                <v-menu open-on-hover offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn dark v-bind="attrs" v-on="on" text color="teal" class="ml-n1">
                      <v-icon left color="teal">mdi-handshake</v-icon>
                    <span class="text-capitalize font-weight-bold text-caption pink--text" >
                        <span class="teal--text mr-1">Invite :: </span> {{invite.category }}
                    </span>
                    </v-btn>
                  </template>

                  <v-list dense shaped>
                    <!-- Owner of the job -->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title>
                        <v-icon x-small color="grey" left>mdi-account-tie</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Posted by:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ invite.owner_name }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of owner of the job -->

                    <!-- Date of posting the job-->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title> 
                        <v-icon x-small color="grey" left>mdi-calendar</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Posted on:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ postedOn(invite.posted_on) }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of posted date of the job -->

                    <!-- Number of order attachements-->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                        <v-list-item-title>
                            <v-icon x-small color="grey" left>mdi-playlist-check</v-icon>
                            <span class="teal--text text-caption font-weight-bold mr-2">Order Category:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                            {{ invite.category }}
                            </span>
                        </v-list-item-title>
                    </v-list-item>
                    <!-- End of number of attachments -->

                    <!-- Number of order attachements-->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                        <v-list-item-title>
                            <v-icon x-small color="grey" left>mdi-format-list-bulleted</v-icon>
                            <span class="teal--text text-caption font-weight-bold mr-2">Order Specialty:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                            {{ invite.specialty }}
                            </span>
                        </v-list-item-title>
                    </v-list-item>
                    <!-- End of number of attachments -->

                    <!-- Number of invite attachements-->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title>
                        <v-icon x-small color="grey" left>mdi-account-group</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Required Collaborators:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ invite.required_collaborators }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of number of attachments -->

                    <!-- Offer submission date-->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title> 
                        <v-icon x-small color="grey" left>mdi-calendar-clock</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Submit offer before:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ showDeadline(invite.deadline) }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of offer submission date -->
                  </v-list>
                </v-menu>
                                
                <v-spacer></v-spacer>
                
                <div class="mt-n2">
                  <v-row class="mt-n1 mb-n2">
                      <v-col class="mr-5">
                          <span class="text-caption font-weight-bold error--text mr-1">Status: </span>
                          <span class="text-caption font-weight-bold warning--text text-capitalize">
                            {{ showStatus(invite) }}
                          </span>
                      </v-col>
                  </v-row>
                </div>
            
              </v-row>
            </v-card-title>
            <v-divider class="mt-n4 mb-1"></v-divider>
            <!-- End of card title -->

            <!-- Card text for the description of the invite -->
            <v-card-text>
              <!-- Row for the skills -->
              <v-row class="mt-n3 ml-1"> 
                <v-chip small outlined color="cyan" class="ml-2 mt-1">
                  <span class="text-caption font-weight-normal ml-3 warning--text" style="font-size: .8em;"> 
                    Kes {{ invite.payable_amount }} /
                    <span class="warning--text font-weight-normal text-caption">
                        {{ invite.payment_schedule }}
                    </span>
                  </span>
                </v-chip>
              </v-row>
              
            <!-- End of row for skills -->
              <v-row class="mt-n2">
                <p class="text-caption pa-4 font-weight-normal">
                  {{ show_first_fifty(invite.description )}}
                  <span id="dots-1" :style="invite.show_more ? 'display: none;' : 'display: inline;'">...</span> <span id="more-1" :style="invite.show_more ? 'display: inline;' : 'display: none;'">
                      {{ show_hidden_description(invite.description )}}
                  </span>
                  <!-- Button for showing more description -->
                  <v-btn icon @click="() => $store.commit('invite_details/TOGGLE_INVITE_SHOW_MORE')" x-small>
                    <v-icon color="info" x-small> 
                        {{invite.show_more ? 'mdi-eye-off' : 'mdi-eye'}} 
                    </v-icon>
                  </v-btn>
                  <!-- End of button for wshoing the description -->
                </p>
              </v-row>
            </v-card-text>
            <!-- End of the card text for description for the invite -->

            <!-- Card action -->
            <v-card-actions class="mt-n10">
              <v-spacer></v-spacer>
              <!-- Button for downloading the invite attachments -->
              <v-btn 
                x-small 
                color="teal" 
                dark 
                depressed 
                text 
                class="mr-3"
                @click="viewOrder(invite.order_id)"
              >         
                <span class="text-capitalize font-weight-bold">view order</span>
              </v-btn>
              <!-- End of button for downloading an invite's attachment -->

              <!-- Button for editing the order -->
              <v-btn 
                v-if="!invite.is_assigned"
                x-small 
                color="info" 
                dark 
                text
                depressed  
                class="mr-2"
                :disabled="invite.is_assigned"
                @click="() => this.$router.push(`/collaborations/${this.$route.params.id}/review`)"
              >         
                <span class="text-capitalize font-weight-bold">edit invite</span>
              </v-btn>
              <!-- End of button for editing the order -->
 
              <!-- Buttn for shoing the offer dialog for this invite -->
              <v-btn 
                v-if="!invite.is_assigned"
                depressed 
                dark 
                x-small 
                color="error lighten-1" 
                class="mr-4" 
                @click.stop="cancel_offer(invite.id)"
              >  
                <span class="text-capitalize font-weight-bold">cancel ivite</span>
              </v-btn>
              <!-- End of button for showing the offer dialog for this invite -->
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
    name: "inviteProfileCard",
    // props for the component
   props: {
     invite: Object
   },
    // data for the component
    data: () =>  ({

    }),
    // methods
    methods: {
        // posted on
        postedOn(date) {
          return moment(date, "YYYYMMDD").fromNow()
        },
        // show deadline
        showDeadline(date) {
          return moment(date, "YYYYMMDD").format('dddd Do MMMM, YYYY')
        },
        // function for showing the schedule
        show_schedule(schedule) {
            // check the schedule
            if (schedule == "Per Week") {
                return "per week"
            } else if (schedule == "Per Day") {
                return "per day"
            } else if(schedule == "Per Month") {
                return "per week"
            } else {
                return "end of contract"
            }
        },

        // function for showing the fist 50 words of the of the description
        show_first_fifty(description) {
            return description.split(/\s+/).splice(0, 60).join(" ")
        },

        // function for showing the offer dialog
        show_offer(invite_id) {
            // emit an action
            this.$emit('show-offer', invite_id)
        },

        // function for showing more information about the invite
        show_hidden_description(description) {
            // set the show more to true
            return description.split(/\s+/).splice(60).join(" ")
        },

        // show status
        showStatus(order) {
          if (!order.is_assigned) {
            return 'unassigned'
          // order is complete and unpaid
          } else if (order.is_complete && !order.is_paid_for) {
            // reurn complete and unpaid
            'Complete & Unpaid'
          // order is complete and paid for
          } else if (order.is_complete && order.is_paid_for) {
            // return Complete and Paid
            'Complete & Paid'
          } else {
            // return in progress
            return "In Progress"
          }

        },

        // view offer
        viewOrder(orderId) {
            // emit
            this.$emit('view-order', orderId)
        }
    }
}
</script>