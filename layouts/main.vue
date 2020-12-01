<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.light.background}">

    <v-app-bar app color="#4267B2" dark dense height="50">

        <v-toolbar-title style="width: 300px; margin-left: 1em;" class="ml-3 mr-8">
          <v-icon color="white" left class="ml-5 mt-n1">mdi-briefcase-search</v-icon> 
          <span class="hidden-sm-and-down font-weight-bold text-body-1 white--text">Eworks</span>
        </v-toolbar-title>


        <v-toolbar-title style="width: 200px; margin-left: -9em;" class="">
          <template>
            <span class="hidden-sm-and-down font-weight-bold text-caption white--text">Status: </span>
            <span class="text-caption ml-1 mr-4 font-weight-bold yellow--text">
              {{ status }}
            </span>
          </template>
          <template>
            <span class="hidden-sm-and-down font-weight-bold text-caption white--text">Tokens: </span>
            <span class="text-caption ml-1 font-weight-bold yellow--text">
              {{ $auth.user.tokens }}
            </span>
          </template>
        </v-toolbar-title>

            
        <!-- Search select field -->
        <v-select    
          solo-inverted
          hide-details="auto"
          flat
          item-value="name"
          item-text="name"
          prepend-inner-icon="mdi-briefcase-search"
          class="py-5 mr-10"
          dense
          placeholder="Search Order"
          clearable
          outlined
          style="width: 480px; font-size: .8em; margin-left: 33em; position: absolute;"
        ></v-select>
        <!-- End of serch select field -->

        <v-spacer></v-spacer>

        <template style="margin-left: 5em;">
          <v-btn icon class="mr-3 ml-6" dark color="#4267B2"> 
            <v-icon color="white">mdi-forum</v-icon>
          </v-btn>

          <!-- Button for the orders -->
          <v-btn icon class="mr-3" color="#4267B2">
            <v-icon color="white">mdi-bell-ring</v-icon>
          </v-btn>
          <!-- End of button for order -->

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                v-bind="attrs"
                v-on="on"
                text
                color="#4267B2"
                style="margin-right: 4em;"
                
              >
                <v-avatar size="33" class="mr-3 elevation-3" color="#4267B2"> 
                  <img 
                    alt="Avatar"
                    :src="$auth.user.profile_pic ? $auth.user.profile_pic : '/images/generic.png'"
                  >
                </v-avatar>

                <span class="hidden-sm-and-down font-weight-bold text-caption yellow--text text-capitalize mb-n1">
                  {{ $auth.user.full_name }}
                </span>
                
              </v-btn>
              
            </template>

            <v-list dense shaped>
              <!-- Option for getting unassigned orders -->
              <v-list-item color="purple darken-3" @click="logout">
                <v-list-item-title>
                  <v-icon small left color="grey">mdi-logout</v-icon>
                  <span class="text-capitalize info--text text-caption font-weight-bold"> My Draft Orders</span>
                </v-list-item-title>
              </v-list-item>
              <!-- End of unassgined orders -->

              <!-- Option for logging out the user -->
              <v-list-item color="purple darken-3" @click="logout">
                <v-list-item-title>
                  <v-icon small left color="grey">mdi-logout</v-icon>
                  <span class="text-capitalize info--text text-caption font-weight-bold">log out</span>
                </v-list-item-title>
              </v-list-item>
              <!-- End of options for logging out -->
            </v-list>
          </v-menu>
          
        </template>
  
    </v-app-bar>

    <!-- MAin content of the app -->
    <v-main>
      <v-container justify="center">
        <!-- MAin row -->
        <v-row class="mt-n1" justify="center">
          <v-col md=3 class="mr-n5" >
            <!-- Transaction menu -->
            <v-list dense rounded style="position: fixed;" width="270" elevation="2">
                <v-list-item class="mb-n3 mt-n2">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-subheader>
                        <v-icon small left color="teal">mdi-account</v-icon>
                        <span class="text-caption font-weight-bold teal--text ml-2"> My Account </span>
                      </v-subheader>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mx-3 cyan mt-2"></v-divider>

                <v-list-item link class="ml-5 mb-n2" :disabled="isDisabled" @click="() => $router.push({path: `/account/${$auth.user.id}/profile`})">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1" v-if="!showLock"> mdi-account-tie </v-icon>
                      <v-icon x-small left color="grey lighten-1" v-if="showLock"> mdi-lock</v-icon>
                      <span class="info--text text-caption font-weight-normal">My Profile </span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item class="ml-5 mb-n2" nuxt @click="() => $router.push({path: '/orders'})" :disabled="isDisabled">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1" v-if="!showLock"> mdi-briefcase-search </v-icon>
                      <v-icon x-small left color="grey lighten-1" v-if="showLock"> mdi-lock</v-icon>
                      <span class="info--text text-caption font-weight-normal">View Available Orders </span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link class="ml-5 mb-n2" nuxt @click="() => $router.push({path: '/contractors'})" :disabled="isDisabled">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1" v-if="!showLock"> mdi-briefcase-search </v-icon>
                      <v-icon x-small left color="grey lighten-1" v-if="showLock"> mdi-lock</v-icon>
                      <span class="info--text text-caption font-weight-normal">Find Contractors </span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link class="ml-5" @click="() => $router.push({path: '/collaborations'})" :disabled="isDisabled">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1" v-if="!showLock"> mdi-briefcase-search-outline </v-icon>
                      <v-icon x-small left color="grey lighten-1" v-if="showLock"> mdi-lock</v-icon>
                      <span class="info--text text-caption font-weight-normal">View Collaborations</span> 
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="cyan mx-3"></v-divider>

                <v-list-item link class="ml-5 mb-n2 mt-2" :disabled="isDisabled" @click="() => $router.push({path: `/account/${$auth.user.id}/saved/contractors`})">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1" v-if="!showLock"> mdi-content-save </v-icon>
                      <v-icon x-small left color="grey lighten-1" v-if="showLock"> mdi-lock</v-icon>
                      <span class="info--text text-caption font-weight-normal">Saved Contractors </span> 
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link class="ml-5" :disabled="isDisabled">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1" v-if="!showLock"> mdi-credit-card-settings-outline </v-icon>
                      <v-icon x-small left color="grey lighten-1" v-if="showLock"> mdi-lock</v-icon>
                      <span class="info--text text-caption font-weight-normal">Recent Transactions </span> 
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                
                <v-divider class="mx-3 cyan"></v-divider>

                <v-list-item class="ml-3 mb-n1">
                  <v-list-item-content>
                    <v-list-item-title>
                      <span class="teal--text text-caption font-weight-bold"> Deposit Amount: </span>
                      <span class="success--text text-caption font-weight-bold">Kes 40000</span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item class="mb-n3 mt-5">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-btn block small color="teal lighten-1" dark @click="showJobDialog"> 
                        <v-icon small left>mdi-briefcase-plus</v-icon>
                        <span class="text-capitalize font-weight-bold text-caption">
                          Post new job
                        </span>
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item> 
            </v-list>
            <!-- End of the transaction menu -->
          </v-col>
        
          <!-- main content -->
          <nuxt />
          <!-- End of main content -->
          
          <v-col md=3 class="ml-n7">
            <!-- Transaction menu -->
            <v-list dense subheader rounded style="position: fixed;" width="270" elevation="2">
                <v-list-item  class="mb-n2">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-subheader>
                         <v-icon small left color="teal">fa-bell</v-icon>
                        <span class="text-caption font-weight-bold teal--text ml-2">Quick Links </span>
                      </v-subheader>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2 mb-1 mx-3 cyan"></v-divider>

                <!-- Option for viewing the posted orders -->
                <v-list-item class="ml-5 mb-n2" color="purple darken-3" link @click="() => $router.push({path: `/account/${$auth.user.id}/orders`})" :disabled="isDisabled">
                  <v-list-item-title>
                    <v-icon small left color="grey lighten-1" v-if="!showLock">mdi-briefcase-check</v-icon>
                    <v-icon x-small left color="grey lighten-1" v-if="showLock"> mdi-lock</v-icon>
                    <span class="text-capitalize info--text text-caption" style="font-size: .9em;">my posted orders</span>
                  </v-list-item-title>
                </v-list-item>
                <!-- End of options for viewing posted orders -->

                <!-- Option for viewing the offers -->
                <v-list-item class="ml-5 mb-n2" color="purple darken-3" link nuxt @click="() => $router.push({path: `/account/${$auth.user.id}/collaborations/posted`})" :disabled="isDisabled">
                  <v-list-item-title>
                    <v-icon small left color="grey lighten-1" v-if="!showLock">mdi-handshake</v-icon>
                    <v-icon x-small left color="grey lighten-1" v-if="showLock"> mdi-lock</v-icon>
                    <span class="text-capitalize info--text text-caption">My Posted Invites</span>
                  </v-list-item-title>
                </v-list-item>
                <!-- End of options for viewing offers -->

                  <!-- Option for viewing the posted orders -->
                <v-list-item class="ml-5 mb-n2" color="purple darken-3" link nuxt @click="() => $router.push({path: `/account/${$auth.user.id}/assigned`})" :disabled="isDisabled">
                  <v-list-item-title>
                    <v-icon small left color="grey lighten-1" v-if="!showLock">mdi-briefcase-check</v-icon>
                    <v-icon x-small left color="grey lighten-1" v-if="showLock"> mdi-lock</v-icon>
                    <span class="text-capitalize info--text text-caption" style="font-size: .9em;">my assigned orders</span>
                  </v-list-item-title>
                </v-list-item>
                <!-- End of options for viewing posted orders -->

                <!-- Option for viewing the posted orders -->
                <v-list-item class="ml-5 mb-n2" color="purple darken-3" link @click="() => $router.push({path: `/account/${$auth.user.id}/drafts/orders`})" :disabled="isDisabled">
                  <v-list-item-title>
                    <v-icon small left color="grey lighten-1" v-if="!showLock">mdi-briefcase-remove</v-icon>
                    <v-icon x-small left color="grey lighten-1" v-if="showLock"> mdi-lock</v-icon>
                    <span class="text-capitalize info--text text-caption" style="font-size: .9em;">my draft orders</span>
                  </v-list-item-title>
                </v-list-item>
                <!-- End of options for viewing posted orders -->

                <v-divider class="mt-2 mb-1 mx-3 cyan"></v-divider>

                <!-- Option for viewing the offers -->
                <v-list-item class="ml-5 mb-n2" color="purple darken-3" link nuxt @click="() => $router.push({path: `/account/${$auth.user.id}/offers`})" :disabled="isDisabled">
                  <v-list-item-title>
                    <v-icon small left color="grey lighten-1" v-if="!showLock">mdi-offer</v-icon>
                    <v-icon x-small left color="grey lighten-1" v-if="showLock"> mdi-lock</v-icon>
                    <span class="text-capitalize info--text text-caption">my order offers</span>
                  </v-list-item-title>
                </v-list-item>
                <!-- End of options for viewing offers -->

                <!-- Option for viewing the offers -->
                <v-list-item class="ml-5 mb-n2" color="purple darken-3" link nuxt @click="() => $router.push({path: `/account/${$auth.user.id}/collaborations/offers`})" :disabled="isDisabled">
                  <v-list-item-title>
                    <v-icon small left color="grey lighten-1" v-if="!showLock">mdi-offer</v-icon>
                    <v-icon x-small left color="grey lighten-1" v-if="showLock"> mdi-lock</v-icon>
                    <span class="text-capitalize info--text text-caption">Collaboration Offers</span>
                  </v-list-item-title>
                </v-list-item>
                <!-- End of options for viewing offers -->

                <v-divider class="mt-2 mb-1 mx-3 cyan"></v-divider>
                
                <!-- Option for viewing the posted orders -->
                <v-list-item class="ml-5 mb-n2" color="purple darken-3" link @click="() => $router.push({path: `/account/${$auth.user.id}/drafts/invites`})" :disabled="isDisabled">
                  <v-list-item-title>
                    <v-icon small left color="grey lighten-1" v-if="!showLock">mdi-briefcase-remove</v-icon>
                    <v-icon x-small left color="grey lighten-1" v-if="showLock"> mdi-lock</v-icon>
                    <span class="text-capitalize info--text text-caption" style="font-size: .9em;">my draft invites</span>
                  </v-list-item-title>
                </v-list-item>
                <!-- End of options for viewing posted orders -->

                <!-- Option for viewing the offers -->
                <v-list-item class="ml-5 mb-n2" color="purple darken-3" link nuxt @click="() => $router.push({path: `/account/${$auth.user.id}/direct/hires`})" :disabled="isDisabled">
                  <v-list-item-title>
                    <v-icon small left color="grey lighten" v-if="!showLock">mdi-account-arrow-right</v-icon>
                    <v-icon x-small left color="grey lighten-1" v-if="showLock"> mdi-lock</v-icon>
                    <span class="text-capitalize info--text text-caption">Direct Hire Requests</span>
                  </v-list-item-title>
                </v-list-item>
                <!-- End of options for viewing offers -->

                <v-list-item class="mb-n3 mt-5">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-btn block small color="warning" dark @click="showUpgradeDialog"> 
                        <span class="text-capitalize font-weight-bold text-caption">
                          one time upgrade
                        </span>
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>  
            </v-list>
            <!-- End of the transaction menu -->            
          </v-col>
        </v-row>
        <!-- End of the main row -->

        <UpgradeDialog />

        <!-- Job dialog -->
        <JobDialog 
          :error="handleOrderError"
        />
        <!-- End of job dialog -->

        <!-- Type dialog -->
        <TypeDialog 
          :error="handleOrderError"
        />
        <!-- End of Type dialog -->

        <!-- Duration dialog -->
        <DurationDialog 
          :error="handleOrderError"
        />
        <!-- End of Duration dialog -->

        <!-- Payment dialog -->
        <PaymentDialog 
          :error="handleOrderError"
        />
        <!-- End of Payment dialog -->

        <!-- Description dialog -->
        <DescriptionDialog 
          :error="handleOrderError"
        />
        <!-- End of Description dialog -->

        <!-- Attachment dialog -->
        <AttachmentDialog 
          :error="handleOrderError"
          :review-order="reviewOrder"
        />
        <!-- End of Attachment dialog -->

      </v-container>
    </v-main>
    <!-- End of main content -->

    <!-- Snackbar for error while activation -->
    <v-snackbar v-model="error" color="error" top app elevation="2">
        <span class="text-caption font-weight-bold">
          {{ errorMessage }}
        </span>
    </v-snackbar>
    <!-- End of snackbar -->
 
  </v-app>
</template>

<script>
  // import UpgradeDialog
  import UpgradeDialog from "~/components/dialogs/UpgradeDialog"
  // import socket
  import { Socket } from 'phoenix'
  // import mapState
  import { mapState, mapGetters, mapActions } from "vuex"
  // import job dialog
  import JobDialog from "~/components/jobDialogs/JobDialog"
  // import job dialog
  import TypeDialog from "~/components/jobDialogs/TypeDialog"
  // import duration
  import DurationDialog from "~/components/jobDialogs/DurationDialog"
  // import description dialog
  import DescriptionDialog from "~/components/jobDialogs/DescriptionDialog"
  // import description dialog
  import PaymentDialog from "~/components/jobDialogs/PaymentDialog"
  // imporAttachmentDialog dialog
  import AttachmentDialog from "~/components/jobDialogs/AttachmentDialog"
  // component definition
  export default {
    // name
    name: 'MainLayout',
    // middleware
    middleware: 'auth',
    // components
    components: {
      UpgradeDialog,
      JobDialog,
      TypeDialog,
      DurationDialog,
      DescriptionDialog,
      PaymentDialog,
      AttachmentDialog
    },

    // data
    data: () => ({
      // error
      error: false,
      // errorMessage
      errorMessage: '',
    }),

    // computed
    computed: {
      // is disabled
      isDisabled() {
        // ensure the user is active and is not suspended
        if (!this.$auth.user.is_active || this.$auth.user.is_suspended || !this.$auth.user.profile_complete) {
          // return true
          return true
        } else {
          // return false
          return false
        }
      },

      // show lock
      showLock() {
        // ensure the user is active and is not suspended
        if (!this.$auth.user.is_active ||this.$auth.user.is_suspended || !this.$auth.user.profile_complete) {
          // return true
          return true
        } else {
          // return false
          return false
        }
      },

      // status
      status() {
        if (this.$auth.user.is_suspended) {
          // return suspended
          return 'Suspended'
        } else if (this.$auth.user.is_active && this.$auth.user.profile_complete) {
          // return active
          return "Active"
        } else if(!this.$auth.user.is_active || !this.$auth.user.profile_complete) {
          // return unactivated
          return "Inactive"
        }
      }
    },

    // methods
    methods: {
      ...mapActions('notification', [
        'connectToSocket'
      ]),
      // handle order error
      handleOrderError(message) {
        // set error message
        this.errorMessage = message
        // show the snackbar
        this.error = true
      },
      // function for logging out the user
      async logout() {
        // log out the user
        await this.$auth.logout()
        .then(() => {
          // redirect the user to the login page
          return this.$router.push({path: '/account/login'})
        })
      },

      // handleerror function
      handleError(error) {
          // check if the error has a response
          if (error.response) {
              // get the message from the eresponse
              this.errorMessage = error.response.data.errors.details
          } else {
              this.errorMessage = 'Save Process Failed. Please try again later.'
          }
          // set the loading to true
          this.loading = false
          // set loader to this.loading
          this.loader = null
          // set the error tot true in order to dispay the error snackbar
          this.error = true
      }, 
    
      // function for canceling the attachment form
      reviewOrder(orderId) {
        // redirect the user 
        this.$router.push({
          path: `/orders/${orderId}/review`
        })
      },

      // function for showing upgrade dialog
      showUpgradeDialog() {
        // check if the user is active
        if (this.status !== 'Active') return
        // show the dialog
        this.$store.commit('dialogs/SHOW_UPGRADE')
      },

      // show job dialog function
      showJobDialog() {
        // check if the user is active
        if (this.status !== 'Active') return
        // show the dialog
        this.$store.commit('dialogs/toggleJobDialog')
      }

    },

    mounted() {
        // get the token
        let token = window.localStorage.getItem('auth._token.local')
        // commit to get the 
        this.$store.commit('created_order/SET_TOKEN', {token: token})

        // await the socket connection
        // let socket = new Socket('ws://localhost:4000/socket', {params: {token: token}})
        // // connect to the socket
        // socket.connect()

        // if (socket.isConnected) {
        //   console.log('Socket successfully connected.')
        // }

        // // create a new channel to join the notification channel
        // const notificationChannel = socket.channel(`notification:${this.$auth.user.id}`)

        // // handle the notification for unviewed notifications
        // notificationChannel.on("notification::unviewed_notifications", ({ notifications }) => {
        //   console.log(notifications)
        //   this.$store.dispatch('notification/handleNotifications', notifications)
        // })

        // // listen for any new notification
        // notificationChannel.on("new_notification", ({ notification }) => {
        //   // log the notification
        //   console.log(notification)
        //   // handle the notification
        //   this.$store.dispatch('notification/handleNewNotification', notification)
        // })

        // // join the notification channel
        // notificationChannel.join()
        //   .receive("ok", () => {
        //     console.log('Joined channel successfully.')
        //   })
        //   .receive("error", () => {
        //     console.log("Unable to join the channel")
        //   })
    }
  }
</script>

<style>
  .my-card-title {
    background-color: #4267B2;
  }

  .form-card-title {
        background-color:  #6ecbea ;
    }
</style>