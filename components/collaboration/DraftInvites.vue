<template>
    <v-row align="center" justify="center">
        <v-col md="12" class="mb-n3">
            <v-card class="mx-auto" width="535" elevation="2">
                <v-card-title class="ml-4 mr-4">
                    <v-row justify="center" class="mb-n2">
                        <v-icon color="teal" left small>mdi-text-box-remove</v-icon>
                        <span class="text-caption font-weight-bold teal--text text-capitalize ml-2 mb-n2">
                            My Draft Invites
                        </span>
                        <v-spacer></v-spacer>
                        <span class="text-caption font-weight-bold error--text text-capitalize mr-3">
                            Total Count: <span class="ml-1">{{ invites.length }}</span>
                        </span>

                        </v-row>
                </v-card-title>
                <v-divider class="mx-4 cyan mt-1"></v-divider>
                
                <template>
                    <!-- No invites found -->
                    <NotFound 
                        :message="notFoundMessage"
                        v-if="!invites.length"
                        :icon="'mdi-database-off'"
                        :color="'teal'"
                    />
                    <!-- End of invites not found -->

                    <!-- Row for each of the bids -->
                    <v-row class="mt-n2" v-for="invite in invites" :key="invite.id">
                        <v-col md=12>
                            <v-card-title class="mt-n1">
                                <v-row class="mt-n3 ml-n3">
                                    <v-menu open-on-hover offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn dark v-bind="attrs" v-on="on" text color="teal" class="ml-1">
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
                                                    <span class="teal--text text-caption font-weight-bold mr-2">Created on:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                    {{ postedOn(invite.posted_on) }}
                                                    </span>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of posted date of the job -->

                                            <!-- Number of invite attachements-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                                <v-list-item-title>
                                                    <v-icon x-small color="grey" left>mdi-playlist-check</v-icon>
                                                    <span class="teal--text text-caption font-weight-bold mr-2">invite Category:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                    {{ invite.category }}
                                                    </span>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of number of attachments -->

                                            <!-- Number of invite attachements-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                                <v-list-item-title>
                                                    <v-icon x-small color="grey" left>mdi-format-list-bulleted</v-icon>
                                                    <span class="teal--text text-caption font-weight-bold mr-2">invite Specialty:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                    {{ invite.specialty }}
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
                                    <div class="mr-5">
                                        <span class="text-caption font-weight-bold warning--text">
                                            <span class="mr-1 error--text">Status:</span> In Draft Mode
                                        </span>
                                    </div>
                                </v-row>
                            </v-card-title>
                            <!-- Offer owner cover letter -->
                            <v-card-text class>  
                                <v-row class="mt-n4 ml-4"> 
                                    <v-chip small outlined color="cyan" class="mt-1">
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
                                    <span id="dots-1" :style="invite.show_more ? 'display: none;' : 'display: inline;'">....</span> <span id="more-1" :style="invite.show_more ? 'display: inline;' : 'display: none;'">
                                        {{ show_hidden_description(invite.description )}}
                                    </span>
                                    <!-- Button for showing more description -->
                                    <v-btn icon @click="() => $store.commit('draft_invites/TOGGLE_READ_MORE', invite.id)" x-small>
                                        <v-icon x-small color="info"> 
                                            {{invite.show_more ? 'mdi-eye-off' : 'mdi-eye'}} 
                                        </v-icon>
                                    </v-btn>
                                    <!-- End of button for wshoing the description -->
                                    </p>
                                </v-row>
                            </v-card-text>
                            <!-- End of offer owner about -->

                            <v-card-actions class="mt-n10 mb-2">

                                <v-spacer></v-spacer>
                                <!-- Button for cancelling a bid -->
                                <v-btn  
                                    v-if="!invite.is_assigned"
                                    dark 
                                    x-small 
                                    color="info" 
                                    depressed 
                                    text 
                                    @click="() => $router.push({path: `/collaborations/${invite.id}/review`})"
                                >
                                    <span class="text-capitalize font-weight-bold">edit invite</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->

                                <!-- Button for cancelling a bid -->
                                <v-btn  
                                    dark 
                                    x-small
                                    text
                                    color="error lighten-1" 
                                    depressed class="mr-8"  
                                    @click="deleteinvite(invite.id)"
                                >
                                    <span class="text-capitalize font-weight-bold" :id="`delete-text-${invite.id}`">delete</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->
                            </v-card-actions>
                            <v-divider class="mx-4 mb-n3 cyan"></v-divider>
                        </v-col>
                    </v-row>
                    <!-- End of row for a previous hire -->
                </template>
            </v-card>
        </v-col>

        <!-- Snackbar -->
        <v-snackbar v-model="snackbar" :color="color"  top app elevation="2" timeout="2000">
            <span class="text-caption font-weight-bold">
              {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbar -->
    </v-row>
</template>

<script>
// import moment
import moment from "moment"
// componet definition
export default {
    // name
    name: 'Draftinvites',
    // props
    props: [
        'invites'
    ],
    // data
    data: () => ({
        // not found message
        notFoundMessage: 'Draft invites that are incomplete or unverified will show up here',
        // message
        message: '',
        // color
        color: 'success lighten-1',
        // snackbar
        snackbar: false
    }),
    // methods
    methods: {
        // function for showing the deadline
        showDeadline(date) {
            // intialize placeholder date
            let newDate = date ? date : Date.now().toLocaleString()
            // convert the string to moment
            return moment(newDate, "YYYYMMDD").fromNow()
        },
        // show deadline
        postedOn(date) {
          return moment(date, "YYYYMMDD").format('dddd Do MMMM, YYYY')
        },
        // function for showing the fist 50 words of the of the description
        show_first_fifty(description) {
            return description.split(/\s+/).splice(0, 75).join(" ")
        },
        // function for showing more information about the invite
        show_hidden_description(description) {
            // set the show more to true
            return description.split(/\s+/).splice(75).join(" ")
        },
        // function for deleting an invite
        async deleteinvite(inviteId) {
            // get the text for deleting an invite
            let text = document.getElementById(`delete-text-${inviteId}`)
            // set teh text to deleting
            text.innerHTML = "deleting..."
            // delete the invite
            await this.$axios.post(`/invites/${inviteId}/delete`)
                .then(({ data }) => {
                    // remove the invite from the list of drat invite
                    this.$store.commit('draft_invites/REMOVE_INVITE', inviteId)
                    // set the message
                    this.message = data.data.details
                    // set the snackabar
                    this.snackbar = true
                    // set the text to delete
                    text.innerHTML = "delete"
                })
                // handle the error
                .catch(error => {
                    // check if the error has an response
                    if (error.response) {
                        // set the message
                        this.message = error.response.data.errors.details
                    } else {
                        // set the message
                        this.message = "There was a problem deleting the invite. Please try again."
                    }
                    // set the color
                    this.color = "error lighten-1"
                    // set the text to delete
                    text.innerHTML = "delete"
                    // show the snackbar
                    this.snackbar = true
                })
        }
    }
}
</script>