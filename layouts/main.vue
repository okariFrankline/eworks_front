<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.light.background}">

    <v-app-bar app color="#4267B2" dark dense height="50">

        <v-toolbar-title style="width: 300px" class="ml-10">
          <v-avatar size="30" class="mr-1">
            <img src="/images/eworks.png" alt="" srcset="">
          </v-avatar>
          <span class="hidden-sm-and-down font-weight-bold text-caption">Eworks</span>
        </v-toolbar-title>

        <v-toolbar-title style="width: 300px" class="ml-n10">
          <v-icon color="red">mdi-access-point</v-icon>
          <!-- <span class="text-caption text-capitalize font-weight-bold mr-4 warning--text">
            {{ status }}
          </span> -->
        </v-toolbar-title>

      
        <!-- Button for the orders -->
       
        <!-- End of button for order -->

        <!-- Buttin for contractors -->
        <!-- <v-btn text class="mr-10" color="#4267B2" style="position: fixed; margin-left: 15em;">
          <v-icon small left color="white">mdi-credit-card-outline</v-icon>
          <span class="text-caption text-capitalize font-weight-bold mr-4 white--text">Balance: Kes 40000</span>
        </v-btn> -->
        <!-- End of button for contractors -->
        
        <!-- Search select field -->
        <v-select    
          solo-inverted
          hide-details="auto"
          flat
          :items="web"
          item-value="name"
          item-text="name"
          prepend-inner-icon="mdi-briefcase-search"
          class="pa-5 offset-y"
          dense
          placeholder="Search Order"
          clearable
          outlined
          style="width: 550px; font-size: .8em; font-weight: bolder; padding-left: 1em; margin-left: -18em;"
        ></v-select>
        <!-- End of serch select field -->

        <v-spacer></v-spacer>

        <!-- Account management -->
        <v-menu light offset-y class="ml-n10">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              icon
              color="#4267B2"
            >
              <v-icon color="white">mdi-chevron-double-down</v-icon>
            </v-btn>
          </template>

          <v-list dense shaped>
            <!-- Option for viewing the posted orders -->
            <v-list-item color="purple darken-3" link @click="() => $router.push({path: `/account/${$auth.user.id}/orders`})" :disabled="isDisabled">
              <v-list-item-title>
                <v-icon x-small left color="grey" v-if="!showLock">mdi-briefcase</v-icon>
                <v-icon x-small left color="grey lighten-1" class="ml-2" v-if="showLock"> mdi-lock</v-icon>
                <span class="text-capitalize info--text text-caption" style="font-size: .9em;">my posted orders</span>
              </v-list-item-title>
            </v-list-item>
            <!-- End of options for viewing posted orders -->

            <!-- Option for viewing the posted orders -->
            <v-list-item color="purple darken-3" link nuxt @click="() => $router.push({path: `/account/${$auth.user.id}/assigned`})" :disabled="isDisabled">
              <v-list-item-title>
                <v-icon x-small left color="grey" v-if="!showLock">mdi-briefcase-check</v-icon>
                <v-icon x-small left color="grey lighten-1" class="ml-2" v-if="showLock"> mdi-lock</v-icon>
                <span class="text-capitalize info--text text-caption" style="font-size: .9em;">my assigned orders</span>
              </v-list-item-title>
            </v-list-item>
            <!-- End of options for viewing posted orders -->

            <!-- Option for viewing the offers -->
            <v-list-item color="purple darken-3" link nuxt @click="() => $router.push({path: `/account/${$auth.user.id}/offers`})" :disabled="isDisabled">
              <v-list-item-title>
                <v-icon x-small left color="grey" v-if="!showLock">mdi-cash-multiple</v-icon>
                <v-icon x-small left color="grey lighten-1" class="ml-2" v-if="showLock"> mdi-lock</v-icon>
                <span class="text-capitalize info--text text-caption">my offers</span>
              </v-list-item-title>
            </v-list-item>
            <!-- End of options for viewing offers -->

            <!-- Option for viewing the offers -->
            <v-list-item color="purple darken-3" link nuxt @click="() => $router.push({path: `/account/${$auth.user.id}/direct/hires`})" :disabled="isDisabled">
              <v-list-item-title>
                <v-icon x-small left color="grey" v-if="!showLock">mdi-cash-multiple</v-icon>
                <v-icon x-small left color="grey lighten-1" class="ml-2" v-if="showLock"> mdi-lock</v-icon>
                <span class="text-capitalize info--text text-caption">Direct Hire Requests</span>
              </v-list-item-title>
            </v-list-item>
            <!-- End of options for viewing offers -->

            <!-- Option for viewing the offers -->
            <v-list-item color="purple darken-3" link nuxt @click="() => $router.push({path: `/account/${$auth.user.id}/collaborations/offers`})" :disabled="isDisabled">
              <v-list-item-title>
                <v-icon x-small left color="grey" v-if="!showLock">mdi-cash-multiple</v-icon>
                <v-icon x-small left color="grey lighten-1" class="ml-2" v-if="showLock"> mdi-lock</v-icon>
                <span class="text-capitalize info--text text-caption">Collaboration Offers</span>
              </v-list-item-title>
            </v-list-item>
            <!-- End of options for viewing offers -->

            <!-- Option for viewing the offers -->
            <v-list-item color="purple darken-3" link nuxt @click="() => $router.push({path: `/account/${$auth.user.id}/collaborations/posted`})" :disabled="isDisabled">
              <v-list-item-title>
                <v-icon x-small left color="grey" v-if="!showLock">mdi-cash-multiple</v-icon>
                <v-icon x-small left color="grey lighten-1" class="ml-2" v-if="showLock"> mdi-lock</v-icon>
                <span class="text-capitalize info--text text-caption">My Posted Invites</span>
              </v-list-item-title>
            </v-list-item>
            <!-- End of options for viewing offers -->
          </v-list>
        </v-menu>
        <!-- End of account management button -->

        <!-- Button for the orders -->
        <!-- <v-btn text class="ml-n10" color="#4267B2">
          <v-icon small color="error">mdi-map-marker-plus</v-icon>
          <span class="text-caption text-capitalize font-weight-bold mr-4 error--text ml-1">
            {{ $auth.user.city }}, {{ $auth.user.country }}
          </span>
        </v-btn> -->
        <!-- End of button for order -->

        <!-- <v-btn icon class="" dark color="#4267B2"> 
          <v-icon color="white">mdi-chevron-double-down</v-icon>
        </v-btn> -->

        <v-btn icon class="" dark color="#4267B2"> 
          <v-icon color="white">mdi-forum</v-icon>
        </v-btn>

        <!-- Button for the orders -->
        <v-btn icon class="mr-10" color="#4267B2">
          <v-icon color="white">mdi-bell-ring</v-icon>
        </v-btn>
        <!-- End of button for order -->

          
       
        <!-- Account management -->
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              text
              color="#4267B2"
              class="mr-10 ml-n3"
            >
              <v-avatar size="35" class="mr-8 elevation-3" color="#4267B2"> 
                <img 
                  alt="Avatar"
                  :src="$auth.user.profile_pic ? $auth.user.profile_pic : '/images/generic.png'"
                >
              </v-avatar>

              <!-- <span class="text-caption text-lowercase font-weight-bold ml-1 mr-n2 white--text">
                {{ $auth.user.username }}
              </span> -->
              
            </v-btn>
          </template>

          <v-list dense shaped>
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
        <!-- End of account management button -->

        
      
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
                        <span class="text-caption font-weight-bold teal--text"> My Account </span>
                      </v-subheader>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>

                <v-list-item link class="ml-5 mb-n2" :disabled="isDisabled" @click="() => $router.push({path: `/account/${$auth.user.id}/profile`})">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1"> mdi-account-tie </v-icon>
                      <span class="info--text text-caption font-weight-normal">My Profile </span>
                      <v-icon x-small right color="grey lighten-1" class="ml-3" v-if="showLock"> mdi-lock</v-icon>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item class="ml-5 mb-n2" nuxt @click="() => $router.push({path: '/orders'})" :disabled="isDisabled">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1"> mdi-briefcase-search </v-icon>
                      <span class="info--text text-caption font-weight-normal">View Available Orders </span>
                      <v-icon x-small right color="grey lighten-1" class="ml-3" v-if="showLock"> mdi-lock</v-icon>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link class="ml-5 mb-n2" nuxt @click="() => $router.push({path: '/contractors'})" :disabled="isDisabled">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1"> mdi-briefcase-search </v-icon>
                      <span class="info--text text-caption font-weight-normal">Find Contractors </span>
                      <v-icon x-small right color="grey lighten-1" class="ml-10" v-if="showLock"> mdi-lock</v-icon>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link class="ml-5" @click="() => $router.push({path: '/collaborations'})" :disabled="isDisabled">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1"> mdi-briefcase-search-outline </v-icon>
                      <span class="info--text text-caption font-weight-normal">View Collaborations</span> 
                      <v-icon x-small right color="grey lighten-1" class="ml-5" v-if="showLock"> mdi-lock</v-icon>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item link class="ml-5 mb-n2 mt-2" :disabled="isDisabled" @click="() => $router.push({path: `/account/${$auth.user.id}/saved/contractors`})">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1"> mdi-content-save </v-icon>
                      <span class="info--text text-caption font-weight-normal">Saved Contractors </span> 
                      <v-icon x-small right color="grey lighten-1" class="ml-7" v-if="showLock"> mdi-lock</v-icon>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link class="ml-5" :disabled="isDisabled">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1"> mdi-credit-card-settings-outline </v-icon>
                      <span class="info--text text-caption font-weight-normal">Recent Transactions </span> 
                      <v-icon x-small right color="grey lighten-1" class="ml-4" v-if="showLock"> mdi-lock</v-icon>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                
                <v-divider></v-divider>

                <v-list-item class="ml-2 mb-n1">
                  <v-list-item-content>
                    <v-list-item-title>
                      <span class="success--text text-caption font-weight-bold"> Current Balance: </span>
                      <span class="success--text text-caption font-weight-bold">Kes 40000</span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1">mdi-eye</v-icon>
                      <span class="teal--text text-caption font-weight-normal">View Recent transactions </span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item class="ml-4 mb-n3">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-btn block small color="info lighten-1" dark @click="() => this.$store.commit('dialogs/toggleJobDialog')"> 
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
                        <span class="text-caption font-weight-bold teal--text"> Notifications </span>
                      </v-subheader>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>

                <v-list-item link class="ml-4 mb-n2" @click="showNotificationDialog('Created Orders')" :disabled="isDisabled">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1">mdi-briefcase-variant</v-icon>
                      <span class="info--text text-caption font-weight-normal"> Created Orders </span>
                      <v-icon x-small right color="grey lighten-1" class="ml-8" v-if="showLock"> mdi-lock</v-icon>
                      <v-chip class="ma-1 ml-8" color="warning lighten-2" x-small pill v-if="showCreatedChip && !showLock">
                        <span class="font-weight-bold">
                          New
                        </span>
                      </v-chip>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <!-- Assigned orders -->
                <v-list-item link class="ml-4 mb-n2" @click="showNotificationDialog('Assigned Orders')" :disabled="isDisabled">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1">mdi-briefcase-check</v-icon>
                      <span class="info--text text-caption font-weight-normal"> Assigned Orders </span>
                      <v-icon x-small right color="grey lighten-1" class="ml-6" v-if="showLock"> mdi-lock</v-icon>
                      <v-chip class="ma-1 ml-6" color="warning lighten-2" x-small pill v-if="showAssignedChip && !showLock">
                        <span class="font-weight-bold">
                          New
                        </span>
                      </v-chip>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <!-- End of assigned orders -->

                <!-- Assigned orders -->
                <v-list-item link class="ml-4" @click="showNotificationDialog('Collaborations')" :disabled="isDisabled">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1">mdi-handshake</v-icon>
                      <span class="info--text text-caption font-weight-normal"> Collaborations </span>
                      <v-icon x-small right color="grey lighten-1" class="ml-9" v-if="showLock"> mdi-lock</v-icon>
                      <v-chip class="ma-1 ml-9" color="warning lighten-2" x-small pill v-if="showCollaborationChip && !showLock">
                        <span class="font-weight-bold">
                          New
                        </span>
                      </v-chip>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <!-- End of assigned orders -->

                <v-divider></v-divider>

                <!-- Accepted Offer -->
                <v-list-item link class="ml-4 mb-n2" @click="showNotificationDialog('Accepted Offers')" :disabled="isDisabled">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1">mdi-check-all</v-icon>
                      <span class="info--text text-caption font-weight-normal"> Accepted </span>
                      <v-icon x-small right color="grey lighten-1" class="ml-8" v-if="showLock"> mdi-lock</v-icon>
                      <v-chip class="ma-1 ml-9" color="warning lighten-2" x-small pill v-if="showAcceptedChip && !showLock">
                        <span class="font-weight-bold">
                          New
                        </span>
                      </v-chip>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <!-- End of Accepted Offers -->

                <!-- Accepted Offer -->
                <v-list-item link class="ml-4 mb-n2" @click="showNotificationDialog('Rejected Offers')" :disabled="isDisabled">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1">mdi-inbox-remove</v-icon>
                      <span class="info--text text-caption font-weight-normal"> Rejected </span>
                      <v-icon x-small right color="grey lighten-1" class="ml-9" v-if="showLock"> mdi-lock</v-icon>
                      <v-chip class="ma-1 ml-10" color="warning lighten-2" x-small pill v-if="showRejectedChip && !showLock">
                        <span class="font-weight-bold">
                          New
                        </span>
                      </v-chip>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <!-- End of Accepted Offers -->

                <!-- Accepted Offer -->
                <v-list-item link class="ml-4" @click="showNotificationDialog('Direct Hires')" :disabled="isDisabled">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1">mdi-account-arrow-right</v-icon>
                      <span class="info--text text-caption font-weight-normal"> Direct Hires </span>
                      <v-icon x-small right color="grey lighten-1" class="ml-5" v-if="showLock"> mdi-lock</v-icon>
                      <v-chip class="ma-1 ml-6" color="warning lighten-2" x-small pill v-if="showDirectHireChip && !showLock">
                        <span class="font-weight-bold">
                          New
                        </span>
                      </v-chip>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <!-- End of Accepted Offers -->

                <v-divider></v-divider>

                <!-- Accepted Offer -->
                <v-list-item link class="ml-4" @click="showNotificationDialog('Payments')" :disabled="isDisabled">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small left color="grey lighten-1">mdi-credit-card</v-icon>
                      <span class="info--text text-caption font-weight-normal"> Order Payments </span>
                      <v-icon x-small right color="grey lighten-1" class="ml-8" v-if="showLock"> mdi-lock</v-icon>
                      <v-chip class="ma-1 ml-8" color="warning lighten-2" x-small pill v-if="showPaymentChip && !showLock">
                        <span class="font-weight-bold">
                          New
                        </span>
                      </v-chip>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <!-- End of Accepted Offers -->

                <v-list-item class="mb-n3 mt-10">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-btn block small color="warning" dark @click="() => $store.commit('dialogs/SHOW_UPGRADE')"> 
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

        <!-- Dialog for creating a new job -->
        <v-dialog v-model="notificationDialog" max-width="400" persistent scrollable>
            <v-card>
              <v-card-title class="my-card-title"  style="height: 50px;">
                  <v-icon small left color="white">fa-bell</v-icon>
                  <span class="text-caption font-weight-bold white--text">
                    Recent Notifications
                  </span>
                  <v-spacer></v-spacer>
                  <!-- Close button -->
                  <v-btn  
                    text
                    dark  
                    depressed 
                    class="text-caption text-capitalize mr-3" 
                    color="white" 
                    small 
                    @click="() => this.$store.commit('dialogs/toggleNotificationDialog')"
                  >
                    <span class="text-caption font-weight-bold">Close</span>
                  </v-btn>
                  <!-- End of clos button -->
              </v-card-title>

              <v-card-text class="mt-3"  style="height: 350px;">
                <!-- Notification row -->
                  <v-row 
                    class=" notification mt-n4 mb-n5" 
                    justify="" 
                    v-for="(notification, index) in notifications" 
                    :key="index" 
                  >
                    <v-col md=12 class="mb-2 ">
                      <v-row>
                        
                          <v-btn text class="mb-n1" color="error">
                            <span class="text-caption font-weight-normal cyan--text text-capitalize font-weight-bold">
                              {{ notification.notification_type}}
                            </span>
                          </v-btn>

                          <v-spacer></v-spacer>
                          <v-btn color="info" icon class="mr-3" small>
                            <v-icon color="info lighten-1" small class="mb-n3">mdi-eye</v-icon>
                          </v-btn>

                          <v-btn color="error" icon class="mr-8" small>
                            <v-icon color="error lighten-1" small class="mb-n3">mdi-close-circle-outline</v-icon>
                          </v-btn>
                            
                          <br>
                          <p class="font-weight-bold ml-6" style="color: grey; font-size: .85em;">
                            {{ notification.message }}
                          </p>
                        
                      </v-row>

                      <v-divider class="mb-n1 grey"></v-divider>
                    </v-col>
                    
                  </v-row> 
                <!-- End of notification row -->
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text dark depressed class="text-caption text-capitalize font-weight-bold mr-5" color="info" small @click.stop="showTypeDialog">
                  clear notifications
                </v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for creating a new job -->

        <!-- Dialog for creating a new job -->
        <v-dialog v-model="withdrawalDialog" max-width="520" persistent>
            <v-card>
              <v-card-title class="info">
                  <span class="text-body-2 font-weight-bold white--text">
                    Withdrawal initialization
                  </span>
              </v-card-title>

              <v-card-text class="mt-3">
                  <span class="text-caption font-weight-bold ml-10 primary--text">
                      Q1. How much money would you like to withdraw?
                  </span>
                  <!--Order type -->
                  <v-text-field append-icon="mdi-decimal" prepend-icon="mdi-cash-multiple" placeholder="Withdrawal amount" dense class="mt-3" style="font-size: .9em;"
                    v-model="paymentData.depositAmount"></v-text-field>
                  <span class="text-caption font-weight-bold ml-10 primary--text">
                      Q2. Where would you like the money to be deposited?
                  </span>
                  <!-- Options for the category -->
                  <v-select :items="withdrawalOptions" prepend-icon="mdi-playlist-edit" placeholder="Deposit place option" 
                      dense class="mt-3" item-text="name" item-value="name" style="font-size: .9em;" v-model="paymentData.depositAccountType"
                  ></v-select>
                  <!-- End of the options for the category -->

              </v-card-text>

              <v-card-actions class="mt-n4">
                  <v-spacer></v-spacer>
                  <!-- Cnacel Dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-3" 
                    color="error" 
                    small 
                    @click="() => this.$store.commit('dialogs/toggleWithdrawalDialog')"
                  >cancel</v-btn>
                  <!-- End of cancel dialog -->
                  <v-btn dark depressed class="text-caption text-capitalize" color="info" small @click.stop="showAccountDialog">Next</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for creating a new job -->

        <!-- Dialog for creating a new job -->
        <v-dialog v-model="mpesaDialog" max-width="520" persistent>
            <v-card>
            <v-card-title class="info">
                <span class="text-body-2 font-weight-bold white--text">
                  Mpesa Account Details
                </span>
            </v-card-title>

            <v-card-text class="mt-3">
                <span class="text-caption font-weight-bold ml-10 primary--text">
                    Q1. Enter the mpesa account number?
                </span>
                <!--Order type -->
                <v-text-field prepend-icon="mdi-phone" placeholder="Mpesa phone number" dense class="mt-3" style="font-size: .9em;"
                  v-model="paymentData.depositAccount"></v-text-field>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <v-spacer></v-spacer>

                <v-btn  dark depressed class="text-caption text-capitalize mr-3" color="error" small @click="mpesaDialog = false">cancel</v-btn>

                <v-btn dark depressed class="text-caption text-capitalize" color="info" small @click.stop="showTypeDialog">Next</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for creating a new job -->

        <!-- Dialog for creating a new job -->
        <v-dialog v-model="bankDialog" max-width="600" persistent>
            <v-card>
            <v-card-title class="info">
                <span class="text-body-2 font-weight-bold white--text">
                  Bank Account Details
                </span>
            </v-card-title>

            <v-card-text class="mt-3">
                <span class="text-caption font-weight-normal ml-10 primary--text">
                    Q1. What bank should the money be sent to?
                </span>
                <!--Order type -->
                <v-text-field prepend-icon="mdi-bank-outline" placeholder="Bank Name" dense class="mt-1" style="font-size: .9em;"
                  v-model="paymentData.bankName">
                </v-text-field>

                <span class="text-caption font-weight-normal ml-10 primary--text">
                    Q2. What branch of the bank should the money be deposited to?
                </span>
                <!--Order type -->
                <v-text-field prepend-icon="mdi-bank" placeholder="Bank branch" dense class="mt-1" style="font-size: .9em;"
                  v-model="paymentData.bankBranch" :disabled="paymentData.bankName ? false : true">
                </v-text-field>

                <span class="text-caption font-weight-normal ml-10 primary--text">
                    Q3. What bank account number should the money be deposited to?
                </span>
                <!--Order type -->
                <v-text-field prepend-icon="mdi-bank-plus" placeholder="Bank Account Number" dense class="mt-1" style="font-size: .9em;"
                  v-model="paymentData.depositAccount" :disabled="paymentData.bankBranch ? false : true">
                </v-text-field>

            </v-card-text>

            <v-card-actions class="mt-n7">
                <v-spacer></v-spacer>

                <v-btn  dark depressed class="text-caption text-capitalize mr-3" color="error" small @click="bankDialog = false">cancel</v-btn>

                <v-btn dark depressed class="text-caption text-capitalize" color="info" small @click.stop="showTypeDialog">Next</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for creating a new job -->

        <!-- Dialog for creating a new job -->
        <v-dialog v-model="jobDialog" max-width="520" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-caption font-weight-bold white--text">
                  Select Service Required
                </span>
            </v-card-title>

            <v-card-text class="mt-3">
                <v-form v-model="valid" ref="jobDialog">
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                    Q1. What category is the job you have in mind?
                  </span>
                  <!--Order type -->
                  <v-select 
                    :items="categories" 
                    prepend-icon="mdi-playlist-edit" 
                    placeholder="Choose Job Category" 
                    dense 
                    class="mt-3 mb-2" 
                    item-text="name" 
                    item-value="value" 
                    style="font-size: .9em;" 
                    :rules="selectRules"
                    v-model="formData.category"
                  ></v-select>
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q2. What specialty does your job fall into?
                  </span>
                  <!-- Options for the category -->
                  <v-select 
                    :items="showServices()" 
                    prepend-icon="mdi-playlist-edit" 
                    placeholder="Choose Job Specialty" 
                    dense 
                    class="mt-3" 
                    item-text="name" 
                    item-value="name" 
                    style="font-size: .9em;"
                    :rules="selectRules"
                    v-model="formData.specialty"
                    :disabled="formData.category ? false : true"
                  ></v-select>
                  <!-- End of the options for the category -->
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <v-spacer></v-spacer>
                <!-- Cancel button -->
                <v-btn  
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="error" 
                  small 
                  @click="cancelJobDialog"
                >
                  <span class="text-caption font-weight-bold text-capitalize" id="cancel-text">cancel</span>
                </v-btn>
                <!-- End of cacnel button -->

                <!-- Next button -->
                <v-btn 
                  dark 
                  depressed 
                  class="text-caption text-capitalize" 
                  color="info" 
                  small 
                  :loading="loading"
                  @click.stop="showTypeDialog"
                >
                  <span class="text-caption font-weight-bold">continue</span>
                  <template v-slot:loader>
                      <span class="custom-loader">
                          <v-icon light color="white">mdi-cached</v-icon>
                      </span>
                  </template>
                </v-btn>
                <!-- End of next button -->
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for creating a new job -->

        <!-- Dialog for adding the type of project -->
        <v-dialog v-model="typeDialog" max-width="520" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-caption font-weight-bold white--text">
                  Choose type of project
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form v-model="valid" ref="typeDialog">
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q3. What kind of job type do you need?
                  </span>
                  <!-- Options for the category -->
                  <v-select 
                    :items="projectTypes" 
                    prepend-icon="mdi-briefcase-plus-outline" 
                    placeholder="Choose Job Specialty" 
                    dense 
                    class="mt-3" 
                    item-text="name" 
                    item-value="name" 
                    :rules="selectRules"
                    style="font-size: .9em;"
                    v-model="typeForm.order_type"
                  ></v-select>
                  <!-- End of the options for the category -->
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q4. How many contractors does your job need?
                  </span>
                  <!-- Options for the category -->
                  <v-text-field 
                    prepend-icon="mdi-account-group" 
                    placeholder="Number of required contractors" 
                    dense 
                    class="mt-3 mb-2" 
                    style="font-size: .9em;"
                    type="number"
                    :rules="contractorsRules"
                    v-model="typeForm.required_contractors"
                  ></v-text-field>
                  <!-- End of the options for the category -->
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <v-spacer></v-spacer>
                <!-- Cancel button -->
                <v-btn  
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="error" 
                  small 
                  @click="cancelTypeDialog"
                >
                  <span class="text-caption font-weight-bold text-capitalize" id="cancel-text-type">cancel</span>
                </v-btn>
                <!-- End of cancel button -->

                <!-- Next Button -->
                <v-btn 
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="info" 
                  small 
                  :loading="loading"
                  @click.stop="showDurationDialog"
                >
                  <span class="text-caption font-weight-bold">continue</span>
                  <template v-slot:loader>
                      <span class="custom-loader">
                          <v-icon light color="white">mdi-cached</v-icon>
                      </span>
                  </template>
                </v-btn>
                <!-- End of next button -->
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for type of project -->

        <!-- Dialog for adding the type of project -->
        <v-dialog v-model="durationDialog" max-width="520" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-caption font-weight-bold white--text">
                  Order Duration and Deadline
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form v-model="valid" ref="durationDialog">
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q3. How long will your order last?
                  </span>
                  <!-- Options for the category -->
                  <v-select 
                    :items="durations" 
                    prepend-icon="mdi-briefcase-plus-outline" 
                    placeholder="Choose Job Specialty" 
                    dense 
                    class="mt-3" 
                    item-text="name" 
                    item-value="name" 
                    :rules="selectRules"
                    style="font-size: .9em;"
                    v-model="durationForm.duration"
                  ></v-select>
                  <!-- End of the options for the category -->
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q4. When is the deadline for offer submission for your order?
                  </span>
                  <!-- Bidding deadline -->
                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="durationForm.deadline_string_date"
                        placeholder="Not accepting deadline beyond"
                        prepend-icon="mdi-calendar-outline"
                        readonly
                        style="font-size: .9em;"
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker 
                      no-title 
                      v-model="durationForm.deadline_string_date" 
                      @input="menu = false"
                    ></v-date-picker>
                </v-menu>
                <!--End of bidding deadline -->
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <v-spacer></v-spacer>
                <!-- Cancel button -->
                <v-btn  
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="error" 
                  small 
                  @click="cancelDurationDialog"
                >
                  <span class="text-caption font-weight-bold text-capitalize" id="cancel-text-duration">cancel</span>
                </v-btn>
                <!-- End of cancel button -->

                <!-- Next Button -->
                <v-btn 
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="info" 
                  small 
                  :loading="loading"
                  @click.stop="showPaymentDialog"
                >
                  <span class="text-caption font-weight-bold">continue</span>
                  <template v-slot:loader>
                      <span class="custom-loader">
                          <v-icon light color="white">mdi-cached</v-icon>
                      </span>
                  </template>
                </v-btn>
                <!-- End of next button -->
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for type of project -->

        <!-- Dialog for adding the payment of project -->
        <v-dialog v-model="paymentDialog" max-width="520" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-caption font-weight-bold white--text">
                Add Payment Plan for the project
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form v-model="valid" ref="paymentDialog">
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q5. How will your payments be made?
                  </span>
                  <!-- Options for the category -->
                  <v-select 
                    :items="paymentPlans" 
                    prepend-icon="mdi-credit-card-clock-outline" 
                    placeholder="Choose Payment Schedule" 
                    dense class="mt-3" 
                    item-text="name" 
                    item-value="name" 
                    style="font-size: .9em;" 
                    :rules="selectRules"
                    v-model="payForm.payment_schedule"
                  ></v-select>
                  <!-- End of the options for the category -->
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q6. Set acceptable offer range you will pay  <span class="pink--text text-lowercase">{{payForm.payment_schedule}}</span>
                  </span>
                  <v-row>
                      <v-col md=5 class="mt-n3">
                          <v-text-field 
                            placeholder="Minimum amount" 
                            prepend-icon="" 
                            append-icon="mdi-decimal" 
                            style="font-size: .9em;" 
                            v-model="payForm.min_payment"
                            :rules="amountRules"
                            :disabled="payForm.payment_schedule ? false : true"
                          ></v-text-field>
                      </v-col>
                      <v-col md=2 class="mt-3 ml-n5 mr-2">
                          <span class="text-body-2 font-weight-bold ml-10 primary--text">
                              To
                          </span>
                      </v-col>
                      <v-col md=5 class="mt-n3">
                          <v-text-field 
                            placeholder="Maximum amount" 
                            prepend-icon="" 
                            append-icon="mdi-decimal" 
                            style="font-size: .9em;" 
                            v-model="payForm.max_payment"
                            :rules="amountRules"
                            :disabled="payForm.payment_schedule ? false : true"
                          ></v-text-field>
                      </v-col>
                  </v-row>
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <v-spacer></v-spacer>
                <!-- Payment dialog -->
                <v-btn  
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="error" 
                  small 
                  @click="cancelPaymentDialog"
                >
                  <span class="text-caption font-weight-bold text-capitalize" id="cancel-text-payment">cancel</span>
                </v-btn>
                <!-- End of cancle button -->

                <!-- Next button -->
                <v-btn 
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="info" 
                  small 
                  :loading="loading"
                  @click="showDescriptionDialog"
                >
                  <span class="text-caption font-weight-bold">continue</span>
                  <template v-slot:loader>
                      <span class="custom-loader">
                          <v-icon light color="white">mdi-cached</v-icon>
                      </span>
                  </template>
                </v-btn>
                <!-- End of next button -->
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for payment of project -->

        <!-- Description dialog window -->
        <v-dialog v-model="descriptionDialog" max-width="750" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-caption font-weight-bold white--text">
                  Add decription for the job
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form v-model="valid" ref="descriptionDialog">
                  <span class="text-caption font-weight-bold teal--text">
                      Q5. Add a detailed description for your job and it should include:
                      <ul>
                          <li class="text-caption font-weight-normal pink--text">Detailed description of what the job entails (requirements, special considerations timelines etc)</li>
                          <li class="text-caption font-weight-normal pink--text">Detailed description of and expectations from your practioner of choice</li>
                          <li class="text-caption font-weight-normal pink--text">A detailed description of the location, if required, of where the job should take place</li>
                          <li class="text-caption font-weight-normal pink--text">Any special notes/requirements for the practioner</li>
                      </ul>
                  </span>
                  <!-- Options for the category -->
                  <v-textarea  
                    auto-grow 
                    placeholder="Order Description" 
                    counter="5000" 
                    dense 
                    class="mt-3"  
                    style="font-size: .9em;"
                    v-model="descriptionForm.description"
                    :rules="descriptionRules"
                  ></v-textarea>
                  <!-- End of the options for the category -->
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <v-spacer></v-spacer>
                <!-- Cancel button -->
                <v-btn  
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="error" 
                  small 
                  @click="cancelDescriptionDialog"
                >
                  <span class="text-caption font-weight-bold text-capitalize" id="cancel-text-description">cancel</span>
                </v-btn>
                <!-- End of cancel button -->

                <!-- Next nutton -->
                <v-btn 
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="info" 
                  small 
                  :loading="loading"
                  @click="showAttachmentDialog"
                >
                  <span class="text-caption font-weight-bold">continue</span>
                  <template v-slot:loader>
                      <span class="custom-loader">
                          <v-icon light color="white">mdi-cached</v-icon>
                      </span>
                  </template>
                </v-btn>
                <!-- End of next button -->
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of description window -->

        <!-- Dialog for adding the attachment files -->
        <v-dialog v-model="attachmentDialog" max-width="650" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-caption font-weight-bold white--text">
                  Attach Additional job documents
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form v-model="valid" ref="attachmentDialog">
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q5. Add attachemts to compliment your job description 
                  </span>
                  <span class="font-weight-normal pink--text text-caption">(skip if none is required.)</span>

                  <dropzone 
                    id="foo" 
                    ref="dropzone" 
                    :options="dropzoneOptions" 
                    :destroyDropzone="true" 
                    style="margin-top: 2em;"
                    @vdropzone-complete-multiple="uploadSuccess"
                    @vdropzone-sending="uploadingFiles"
                  ></dropzone>
                </v-form>
            </v-card-text>

            <v-card-actions class="mt-n4">
                <!-- Cance button -->
                <v-btn  
                  dark 
                  depressed 
                  class="text-caption text-capitalize ml-6" 
                  color="error"
                  small 
                  @click="cancelAttachmentDialog"
                >cancel</v-btn>
                <!-- End of cancel button -->
                <v-spacer></v-spacer>
                <!-- Skip button -->
                <v-btn 
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-6" 
                  color="info" 
                  small
                  text
                  :loading="loading"
                  @click="reviewOrder"
                >
                  skip uploads
                  <template v-slot:loader>
                      <span class="text-caption pl-3 pr-4">Uploading..</span>
                      <span class="custom-loader">
                          <v-icon small light color="white">mdi-cached</v-icon>
                      </span>
                  </template>
                </v-btn>
                <!-- End of Skip button -->
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for attachments -->

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
  // import dropzone for the attachment uploads
  import Dropzone from 'nuxt-dropzone'
  // import UpgradeDialog
  import UpgradeDialog from "~/components/dialogs/UpgradeDialog"
  // import the dropzone css
  import 'nuxt-dropzone/dropzone.css'
  // import socket
  import { Socket } from 'phoenix'
  // import mapState
  import { mapState, mapGetters, mapActions } from "vuex"
  // component definition
  export default {
    // name
    name: 'MainLayout',
    // middleware
    middleware: 'auth',
    // components
    components: {
      Dropzone,
      UpgradeDialog
    },

    // data
    data: () => ({
      // error
      error: false,
      // errorMessage
      errorMessage: '',
      // for showing the date
      menu: false,
      // user actions
      userActions: [
        {title: "My Account", to: "#8"},
        {title: "Logout", to: "#9"}
      ],
      // form data
      formData: {
          category: '',
          specialty: ''
      },
      // duration form
      durationForm: {
        duration: '',
        deadline_string_date: ''
      },
      // type form
      typeForm: {
        order_type: '',
        required_contractors: 0
      },
      // payForms
      payForm: {
        payment_schedule: '',
        min_payment: '',
        max_payment: ''
      },
      paymentData: {
        depositAmount: '',
        depositAccountType: '',
        depositAccount: '',
        bankName: '',
        bankBranch: ''
      },
      descriptionForm: {
        description: ''
      },
      attachmentForm: {
        data: []
      },
      // form is valid
      valid: false,
      // loading
      loading: false,
      skipLoading: false,
      // loader
      loader: null,
      skipLoader: null,
      // notifications
      notifications: [],
      // select rules
      selectRules: [
        v => !!v || 'Field is required'
      ],
      // contractor rules
      contractorsRules: [
        v => !!v || 'Number of contractors must be at least be 1.'
      ],
      // amount rules
      amountRules: [
        v => !!v || 'Amount cannot be less than 0.'
      ],
      // description form
      descriptionRules: [
        v => !!v || 'Description is required.',
        v => (v && v.length >= 500) || 'Description has to have a minimum of 200 characters.'
      ]
    }),

    // computed
    computed: {
      // get the select options
      ...mapState('select', {
        paymentPlans: state => state.paymentPlans,
        durations: state => state.durations,
        projectTypes: state => state.projectTypes,
        categories: state => state.categories,
        currencies: state => state.currencies,
        web: state => state.web,
        writing: state => state.writing,
        construction: state => state.construction,
        accounting: state => state.accounting,
        cleaning: state => state.cleaning,
        food: state => state.food,
        legal: state => state.legal,
        design: state => state.design,
        transport: state => state.transport,
        sales: state => state.sales,
        withdrawalOptions: state => state.withdrawalOptions
      }),
      // get the dialog state
      ...mapState('dialogs', {
        paymentDialog: state => state.paymentDialog,
        mpesaDialog: state => state.mpesaDialog,
        typeDialog: state => state.typeDialog,
        notificationDialog: state => state.notificationDialog,
        bankDialog: state => state.bankDialog,
        descriptionDialog: state => state.descriptionDialog,
        attachmentDialog: state => state.attachmentDialog,
        withdrawalDialog: state => state.withdrawalDialog,
        jobDialog: state => state.jobDialog,
        durationDialog: state => state.durationDialog
      }),

      // notification getter
      ...mapGetters('notifications', [
        'createdOrderNotifications',
        'assignedOrderNotifications',
        'acceptedOfferNotifications',
        'rejectedOfferNotifications',
        'directHireNotifications',
        'paymentNotifications',
        'collaborationNotifications'
      ]),

      // notifications state
      ...mapState('notifications', {
        showCreatedChip: state => state.showCreatedChip,
        showAssignedChip: state => state.showCreatedChip,
        showAcceptedChip: state => state.showAcceptedChip,
        showRejectedChip: state => state.showRejectedChip,
        showDirectHireChip: state => state.showDirectHireChip,
        showPaymentChip: state => state.showPaymentChip,
        showCollaborationChip: state => state.showCollaborationChip
      }),

      // get the current
      ...mapGetters('created_order', [
        'dropzoneOptions',
        'currentOrder'
      ]),

      // map created order
      ...mapState('created_order', [
        'order'
      ]),

      // is disabled
      isDisabled() {
        // ensure the user is active and is not suspended
        if (!this.$auth.user.is_active || this.$auth.user.is_suspended) {
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
        if (!this.$auth.user.is_active ||this.$auth.user.is_suspended) {
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
        } else if (this.$auth.user.is_active) {
          // return active
          return "Active"
        } else if(!this.$auth.user.is_active) {
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
      // function for logging out the user
      async logout() {
        // log out the user
        await this.$auth.logout()
        .then(() => {
          // redirect the user to the login page
          return this.$router.push({path: '/account/login'})
        })
      },
      // function for canceling job dialog
      cancelJobDialog() {
        // reset the form
        this.$refs.jobDialog.reset()
        return this.$store.commit('dialogs/toggleJobDialog')
      },
      // cancel the type dialog
      async cancelTypeDialog() {
        console.log('called')
        // get cancel text
        let text = document.getElementById('cancel-text-type')
        // set the text to cancelling
        text.innerHTML = 'cancelling...'
        // delete the order
        await this.$axios.post(`/order/${this.order.id}/delete`)
          .then(() => {
            // reset the form
            this.$refs.typeDialog.reset()
            // dismiss the dialog
            this.$store.commit('dialogs/toggleTypeDialog')
            // set text to cancel
            text.innerHTML = 'cancel'
          })
          .catch(error => {
            // set the error message
            this.errorMessage = "Cancel Failed. Order could not be cancelled. Please try again later"
            // set text to cancel
            text.innerHTML = 'cancel'
          })
      },
      // cancel for the durationDialog
      async cancelDurationDialog() {
         // get cancel text
        let text = document.getElementById('cancel-text-duration')
        // set the text to cancelling
        text.innerHTML = 'cancelling...'
        // delete the order
        await this.$axios.post(`/order/${this.order.id}/delete`)
          .then(() => {
            // reset the form
            this.$refs.durationDialog.reset()
            // dismiss the dialog
            this.$store.commit('dialogs/toggleDurationDialog')
            // set text to cancel
            text.innerHTML = 'cancel'
          })
          .catch(error => {
            // set the error message
            this.errorMessage = "Cancel Failed. Order could not be cancelled. Please try again later"
            // set text to cancel
            text.innerHTML = 'cancel'
          })
      },
      // function for canceling the payment dialog
      async cancelPaymentDialog() {
         // get cancel text
        let text = document.getElementById('cancel-text-payment')
        // set the text to cancelling
        text.innerHTML = 'cancelling...'
        // delete the order
        await this.$axios.post(`/order/${this.order.id}/delete`)
          .then(() => {
            // reset the form
            this.$refs.paymentDialog.reset()
            // hide the dialog
            this.$store.commit('dialogs/togglePaymentDialog')
            // set text to cancel
            text.innerHTML = 'cancel'
          })
          .catch(error => {
            // set the error message
            this.errorMessage = "Cancel Failed. Order could not be cancelled. Please try again later"
            // set text to cancel
            text.innerHTML = 'cancel'
          })
      },
      // function for cancelling the description
      async cancelDescriptionDialog() {
         // get cancel text
        let text = document.getElementById('cancel-text-description')
        // set the text to cancelling
        text.innerHTML = 'cancelling...'
        // delete the order
        await this.$axios.post(`/order/${this.order.id}/delete`)
          .then(() => {
            // reset the description dialog
            this.$refs.descriptionDialog.reset()
            // hide the dialog
            this.$store.commit('dialogs/toggleDescriptionDialog')
            // set text to cancel
            text.innerHTML = 'cancel'
          })
          .catch(error => {
            // set the error message
            this.errorMessage = "Cancel Failed. Order could not be cancelled. Please try again later"
            // set text to cancel
            text.innerHTML = 'cancel'
          })
      },
      // cancel attachement dialog
      cancelAttachmentDialog() {
        // set loading to false
        this.loading = false
        // set loader to null
        this.loader = null
        this.$store.commit('dialogs/toggleAttachmentDialog')
      },
      // funciton for showing the services
      showServices() {
          switch(this.formData.category) {
                case 'Accounting and Finance': 
                    return this.accounting;
                    break;
                case 'Web, Mobile and Software':
                    return this.web;
                    break;
                case 'Construction and Repairs':
                    return this.construction;
                    break;
                case 'Cleaning Services':
                    return this.cleaning;
                    break;
                case 'Food, Catering and Nutrition':
                    return this.food;
                    break;
                case 'IT and Networking':
                    return this.it;
                    break;
                case 'Law and Legal Services':
                    return this.legal;
                    break;
                case 'Transport and Delivery':
                    return this.transport;
                    break;
                case 'Writing Services':
                    return this.writing;
                    break;
                case 'Law and Legal Services':
                    return this.legal;
                    break;
                case 'Branding and Design':
                    return this.design;
                    break;
                case 'Tansport and Delivery':
                    return this.transport;
                    break;
                default:
                    return this.sales;
          }
      },

      // funciton for shoing withdrawal dialog
      showWithdrawalDialog() {
        this.$store.commit('dialogs/toggleWithdrawalDialog')
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
      
      /**
       * Initiates the creation of a new order, hides the jobDialog
       * and shows the type dilog
       */
      async showTypeDialog() {
          // validate the dialog form
          if (!this.$refs.jobDialog.validate()) return
          // set the loading to true
          this.loading = true
          // set loader to this.loading
          this.loader = this.loading
          // create the new
          await this.$store.dispatch('created_order/createNewOrder', {data: this.formData, action: 'New'})
            .then(() => {
              // set the loading to true
              this.loading = false
              // set loader to this.loading
              this.loader = null
              // reset the form
              this.$refs.jobDialog.reset()
              // hide the job dialog
              this.$store.commit('dialogs/toggleJobDialog')
              // show the type dialog
              this.$store.commit('dialogs/toggleTypeDialog')
            })
            .catch(err => this.handleError(err))
          
      },
      // function for showing the duration dialog
      async showDurationDialog(){
        // validate the dialog form
        if (!this.$refs.typeDialog.validate()) return

        // set the loading to true
        this.loading = true
        // set loader to this.loading
        this.loader = this.loading
        // post the data
        await this.$store.dispatch('created_order/addOrderType', {data: this.typeForm, action: 'New'})
          .then(() => {
            // set the loading to true
              this.loading = false
              // set loader to this.loading
              this.loader = null
              // reset the form
              this.$refs.typeDialog.reset()
              // hide the dialog
              this.$store.commit('dialogs/toggleTypeDialog')
              // show the duration dialog
              this.$store.commit('dialogs/toggleDurationDialog')
          })
          .catch(err => this.handleError(err))
        
      },
      // show payment dialog
      async showPaymentDialog() {
        // validate the dialog form
        if (!this.$refs.durationDialog.validate()) return
        // set the loading to true
        this.loading = true
        // set loader to this.loading
        this.loader = this.loading
        // post the data
        await this.$store.dispatch('created_order/addOrderDuration', {data: this.durationForm, action: 'New'})
          .then(() => {
            // set the loading to true
              this.loading = false
              // set loader to this.loading
              this.loader = null
              // reset the form
              this.$refs.durationDialog.reset()
              // hide the dialog
              this.$store.commit('dialogs/toggleDurationDialog')
              // show the payment dialog
              this.$store.commit('dialogs/togglePaymentDialog')
          })
          .catch(err => this.handleError(err))
        
      },
      // show description dialog
      async showDescriptionDialog() {
          // validate the dialog form
        if (!this.$refs.paymentDialog.validate()) return
        // get the min and max amount
        let { min_payment, max_payment } = this.payForm
        // ensure the max amount is more than min amount
        if (parseInt(max_payment) < parseInt(min_payment)) {
          // set error
          this.errorMessage = "Invalid. Max amount must be more than Min Amount"
          // show error
          this.error = true
          // return 
          return
        }
        // set the loading to true
        this.loading = true
        // set loader to this.loading
        this.loader = this.loading
        // post the data
        await this.$store.dispatch('created_order/addOrderPayment', {data: this.payForm, action: 'New'})
          .then(() => {
            // set the loading to true
              this.loading = false
              // set loader to this.loading
              this.loader = null
              // reset the form
              this.$refs.paymentDialog.reset()
              // hide the payment dialog
              this.$store.commit('dialogs/togglePaymentDialog')
              // show the description dialog
              this.$store.commit('dialogs/toggleDescriptionDialog')
          })
          .catch(err => this.handleError(err))
      },
      // show attachment dialog
      async showAttachmentDialog() {
        // validate the form
        if (!this.$refs.descriptionDialog.validate()) return
        // set the loading to true
        this.loading = true
        // set loader to this.loading
        this.loader = this.loading
        // post the data
        await this.$store.dispatch('created_order/addOrderDescription', {data: this.descriptionForm, action: 'New'})
          .then(() => {
            // set the loading to true
              this.loading = false
              // set loader to this.loading
              this.loader = null
              // reset the form
              this.$refs.descriptionDialog.reset()
              // hide the description dialog
              this.$store.commit('dialogs/toggleDescriptionDialog')
              // show the attachmentDialog
              this.$store.commit('dialogs/toggleAttachmentDialog')
          })
          .catch(err => this.handleError(err))
        
      },

      // function for canceling the attachment form
      reviewOrder() {
        // reset the dropzone
        this.$refs.dropzone.removeAllFiles()
        // hide the dialog
        this.$store.commit('dialogs/toggleAttachmentDialog')
        // redirect the user 
        this.$router.push({
          path: `/orders/${this.currentOrder.id}/review`
        })
      },
      // function for uploading files
      uploadingFiles() {
        // set the loading to true
        this.loading = true
        // set the loader to loading
        this.loader = this.loading
      },
      // function for upload success
      uploadSuccess(file, response) {
        // set the loading to false
        this.loading = false
        // set the loader to null
        this.loader = null
        // call the review order
        return this.reviewOrder()
      },
      // show account dialog
      showAccountDialog() {
        // set the withdrawal dialog to false
        this.$store.commit('dialogs/toggleWithdrawalDialog')
        let { depositAccountType } = this.paymentData;
        // display the correct account dialog
        depositAccountType == 'Mpesa Account' ? this.$store.commit('dialogs/toggleMpesaDialog') : this.$store.commit('dialogs/toggleBankDialog');
      },
      // function for showing the notification dialog
      showNotificationDialog(notificationType) {
        // display the notification dialog
        this.$store.commit('dialogs/toggleNotificationDialog')

        // set the notifications
        switch (notificationType) {
          case 'Created Orders':
            // hide the new chip
            this.$store.commit('notifications/toggleCreatedChip')
            // set the notifications to created notifications
            this.notifications = this.createdOrderNotifications;
            break;

          case 'Assigned Orders':
            // hide the new chip
            this.$store.commit('notifications/toggleAssignedChip')
            // set the notifications to assigned notifications
            this.notifications = this.assignedOrderNotifications;
            break;

          case 'Accepted Offers':
            // hide the new chip
            this.$store.commit('notifications/toggleAcceptedChip')
            // set the notifications to accepted offers notifications
            this.notifications = this.acceptedOfferNotifications;
            break;

          case 'Rejected Offers':
            // hide the new chip
            this.$store.commit('notifications/toggleRejectedChip')
            // set the notifications to rejected Offers notifications
            this.notifications = this.rejectedOfferNotifications;
            break;

          case 'Direct Hires':
            // hide the new chip
            this.$store.commit('notifications/toggleDirectHireChip')
            // set the notifications to direct hires notifications
            this.notifications = this.directHireNotifications;
            break;

          case 'Collaborations':
            // hide the new chip
            this.$store.commit('notifications/toggleCollaborationChip')
            // set the notifications to direct hires notifications
            this.notifications = this.collaborationNotifications;
            break;

          case 'Payments':
            // hide the new chip
            this.$store.commit('notifications/togglePaymentChip')
            // set the notifications to payment notifications
            this.notifications = this.paymentNotifications;
            break;

          default:
            // set the notifications to created notifications
            this.notifications = [];
            break;
        }
      }

    },

    mounted() {
        // get the token
        let token = window.localStorage.getItem('auth._token.local')
        // commit to get the 
        this.$store.commit('created_order/SET_TOKEN', {token: token})

        // await the socket connection
        let socket = new Socket('ws://localhost:4000/socket', {params: {token: token}})
        // connect to the socket
        socket.connect()

        if (socket.isConnected) {
          console.log('Socket successfully connected.')
        }

        // create a new channel to join the notification channel
        const notificationChannel = socket.channel(`notification:${this.$auth.user.id}`)

        // handle the notification for unviewed notifications
        notificationChannel.on("notification::unviewed_notifications", ({ notifications }) => {
          console.log(notifications)
          this.$store.dispatch('notification/handleNotifications', notifications)
        })

        // listen for any new notification
        notificationChannel.on("new_notification", ({ notification }) => {
          // log the notification
          console.log(notification)
          // handle the notification
          this.$store.dispatch('notification/handleNewNotification', notification)
        })

        // join the notification channel
        notificationChannel.join()
          .receive("ok", () => {
            console.log('Joined channel successfully.')
          })
          .receive("error", () => {
            console.log("Unable to join the channel")
          })
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