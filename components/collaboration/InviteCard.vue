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
                    <v-btn dark v-bind="attrs" v-on="on" text color="teal" class="ml-1">
                      <v-icon left color="teal">mdi-handshake</v-icon>
                    <span class="text-capitalize font-weight-bold text-caption teal--text" >
                        {{ invite.category}} <span class="red--text">::</span> {{ invite.specialty}}
                    </span>
                    </v-btn>
                  </template>

                  <v-list dense shaped>
                    <!-- Owner of the job -->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title>
                        <v-icon x-small color="grey" left>mdi-account-tie</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Invite posted by:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ invite.owner_name }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of owner of the job -->

                    <!-- Date of posting the job-->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                      <v-list-item-title> 
                        <v-icon x-small color="grey" left>mdi-calendar</v-icon>
                        <span class="teal--text text-caption font-weight-bold mr-2">Invite posted on:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                          {{ postedOn(invite.posted_on) }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <!-- End of posted date of the job -->

                    <!-- Number of order attachements-->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                        <v-list-item-title>
                          <v-icon x-small color="grey" left>mdi-playlist-check</v-icon>
                            <span class="teal--text text-caption font-weight-bold mr-2">Invite Category:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                            {{ invite.category }}
                            </span>
                        </v-list-item-title>
                    </v-list-item>
                    <!-- End of number of attachments -->

                    <!-- Number of order attachements-->
                    <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                        <v-list-item-title>
                            <v-icon x-small color="grey" left>mdi-format-list-bulleted</v-icon>
                            <span class="teal--text text-caption font-weight-bold mr-2">Invite Specialty:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
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
                
                <div class="mr-3">
                  <v-icon small color="cyan lighten-1" class="mr-3">mdi-shield-check</v-icon>
                </div>
            
              </v-row>
            </v-card-title>
            <v-divider class="mt-n3 mx-3 mb-1 cyan"></v-divider>
            <!-- End of card title -->

            <!-- Card text for the description of the invite -->
            <v-card-text>
              <!-- Row for the skills -->
              <v-row class="mt-n3 ml-1"> 
                <v-chip small outlined color="cyan" class="ml-2 mt-1">
                  <span class="text-caption font-weight-normal ml-3 blue--text" style="font-size: .8em;"> 
                    Kes {{ invite.payable_amount }} /
                    <span class="blue--text font-weight-normal text-caption">
                        {{ invite.payment_schedule }}
                    </span>
                  </span>
                </v-chip>
              </v-row>
              
            <!-- End of row for skills -->
              <v-row class="mt-n2">
                <p class="text-caption pa-4 font-weight-normal" style="color: #636a6c">
                  {{ show_first_fifty(invite.description )}}
                  <span id="dots-1" :style="invite.show_more ? 'display: none;' : 'display: inline;'">...</span> <span id="more-1" :style="invite.show_more ? 'display: inline;' : 'display: none;'">
                      {{ show_hidden_description(invite.description )}}
                  </span>
                  <!-- Button for showing more description -->
                  <v-btn icon @click="showMore(invite.id)" x-small>
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
              <!-- Button for downloading the invite attachments -->
              <v-btn 
                x-small 
                color="teal" 
                dark 
                text
                depressed 
                @click="viewOrder(invite.order_id)"
                class="ml-3"
              >         
                <span class="text-capitalize font-weight-bold">view order attachment</span>
              </v-btn>
              <!-- End of button for downloading an invite's attachment -->
              <v-spacer></v-spacer>
              <!-- Buttn for shoing the offer dialog for this invite -->
              <v-btn 
                v-if="!inviteIds.includes(invite.id)"
                depressed 
                dark 
                x-small 
                color="teal lighten-1" 
                class="mr-4" 
                @click.stop="showOfferDialog(invite.id)"
              >  
                <span class="text-capitalize font-weight-bold">submit offer</span>
              </v-btn>

              <v-btn 
                v-if="inviteIds.includes(invite.id)"
                depressed 
                dark 
                text
                x-small 
                color="cyan lighten-1" 
                class="mr-1"
              >  
                <span class="text-capitalize font-weight-bold">offer submitted</span>
                <v-icon x-small right>mdi-check-bold</v-icon>
              </v-btn>
              
              <!-- End of button for showing the offer dialog for this invite -->
            </v-card-actions>
            <!-- End of card actions -->
          </v-card>
        </v-col>

        <!-- Submit offer dialog -->
        <v-dialog v-model="dialog" max-width="520" persistent>
          <v-card>
            <!-- Card title -->
            <v-card-title class="teal">
              <span class="text-caption font-weight-bold white--text">
                Collaboration invite offer submission
              </span>
            </v-card-title>
            <!-- End of card title -->

            <v-card-text class="mt-3">
              <v-form ref="form" v-model="valid" lazy-validation>
                <!--Questiong -->
                <span class="text-caption font-weight-bold ml-10 teal--text">
                  Enter your offer amount
                </span>
                  <!-- Questiong -->
                <v-text-field 
                  placeholder="Enter your offer" 
                  append-icon="mdi-decimal" 
                  prepend-icon="mdi-account-cash"
                  dense 
                  class="mt-3"
                  style="font-size: .9em;"
                  :rules="amountRules"
                  v-model="offerData.asking_amount"
                ></v-text-field>
              </v-form>
              
            </v-card-text>

            <v-card-actions class="mt-n5">
              <v-spacer></v-spacer>
              <!-- Buttin for cancelling -->
              <v-btn 
                dark 
                depressed 
                class="text-caption text-capitalize mr-3" 
                color="error" 
                small 
                text
                @click="hideOfferDialog">
                  <span class="text-caption font-weight-bold text--capitalize">cancel</span>
                </v-btn>
                <!-- End of button for cancelling -->

              <!-- Button for submitting -->
              <v-btn 
                dark 
                depressed 
                class="text-caption text-capitalize mr-5" 
                color="teal lighten-1" 
                small 
                :loading="loading"
                @click="submitOffer"
                
              >
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
    name: "inviteCard",
    // props for the component
    props: {
        invite: Object,
        inviteIds: Array
    },
    // data for the component
    data: () => ({
      // ne invite
      dialog: false,
      // loading
      loading: false,
      // loader
      loader: null,
      // valid
      valid: false,
      // snackbar
      snackbar: false,
      // message
      message: '',
      // colot
      color: 'success lighten-1',
      // inviteId
      inviteId: '',
      // offer data
      offerData: {
        asking_amount: ""
      },
      // amountRules
      amountRules: [
        v => !! v || 'Asking amount is required'
      ],
    }),
    // methods
    methods: {
        // show deadline
        showDeadline(date) {
          return moment(date, "YYYYMMDD").format('dddd Do MMMM, YYYY')
        },
        // posted on
        postedOn(date) {
          return moment(date, "YYYYMMDD").fromNow()
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
            return description.split(/\s+/).splice(0, 75).join(" ")
        },

        // function for showing the offer dialog
        showOfferDialog(inviteId) {
            console.log(inviteId)
            // emit an action
            this.dialog = true
            // set the inviteId
            this.inviteId = inviteId
        },

        // hide offer dialog
        hideOfferDialog() {
          // set the inviteid to false
          this.inviteId = ''
          // reset the form
          this.$refs.form.reset()
          // set the dialog to false
          this.dialog = false
        },

        // function for showing more information about the invite
        show_hidden_description(description) {
            // set the show more to true
            return description.split(/\s+/).splice(75).join(" ")
        },

        // view offer
        viewOrder(orderId) {
            // emit
            this.$emit('view-order', orderId)
        },

        // show more
        showMore(inviteId) {
          // toggle the invite
          this.$store.commit('collaborations/TOGGLE_SHOW_MORE', inviteId)
        },

        // function for submitting the offer
        submitOffer() {
          // validate the offer form
          if (!this.$refs.form.validate()) {return}
          // set the loading to true
          this.loading = true
          // set the loader
          this.loader = this.loading
          //submit the offer
          this.$axios.post(`/invites/offer/${this.inviteId}/new`, {
            asking_amount: this.offerData.asking_amount
          })
          .then(({ data }) => {
            // add the invite id to the list of invite ids
            this.$store.commit('collaborations/ADD_INVITE_ID', this.inviteId)
            // set the inviteid to false
            this.inviteId = ''
            // reset the form
            this.$refs.form.reset()
            // set the message
            this.message = data.data.details
            // hide the dialog
            this.dialog = false
            // set teh loading to false
            this.loading = false
            // set the loader
            this.loader = null
            // display the snackbar
            this.snackbar = true
          })
          .catch(error => {
             // check if the error has a response
            if (error.response && error.response.status == 403) {
              // the curren user is a client;  show the isClient dialog
              // reset the form
              this.$refs.form.reset()
              //set is loading to false
              this.loading = false
              // set eh loader to null
              this.loader = null
              // set the dialog to false
              this.dialog = false
              // emit event to show is client
              this.$emit('show-is-client')
              // set the snacbar to true
              this.message = error.response.data.errors.details
              // set the colot
              this.color = 'error lighten-1'
              // show the snakcbar
              this.snackbar = true
              
            } else {
              // reset the form
              this.$refs.form.reset()
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
        }
    },
}
</script>