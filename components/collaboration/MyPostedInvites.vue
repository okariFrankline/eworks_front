<template>
    <v-row align="center" justify="center">
        <v-col md="12" class="mb-n3">
            <v-card class="mx-auto" width="535" elevation="2">
                <v-card-title class="ml-4 mr-4">
                    <v-row justify="center" class="mb-n2">
                        <v-icon small left color="teal">mdi-handshake</v-icon>
                        <span class="text-caption font-weight-bold teal--text text-capitalize">
                            My Posted Collaboration Invites
                        </span>
                        <v-spacer></v-spacer>
                        <v-btn 
                            text 
                            x-small 
                            color="info" 
                            outlined 
                            class="mr-2"
                            @click="getUnassignedInvites"
                        >
                            <span class="text-caption font-weight-bold error--text text-capitalize">
                                Not Assigned
                            </span>
                            <v-icon x-small right color="error" v-if="showing == 'unassigned'">mdi-check-bold</v-icon>
                        </v-btn>

                        <!-- Accepted offer sbutton -->
                        <v-btn 
                            text 
                            x-small 
                            color="warning" 
                            outlined 
                            class="mr-2"
                            @click="getAssignedInvites"
                        >
                            <span class="text-caption font-weight-bold warning--text text-capitalize">
                                In Progress
                            </span>
                            <v-icon x-small right v-if="showing == 'in progress'">mdi-check-bold</v-icon>
                        </v-btn>
                        <!-- End of the accepted offers -->
                        </v-row>
                </v-card-title>
                <v-divider></v-divider>
                
                <template>
                    <!-- No orders found -->
                    <NotFound 
                        :message="isClientMessage ? isClientMessage : notFoundMessage"
                        v-if="!invites.length"
                    />
                    <!-- End of orders not found -->

                    <!-- Row for each of the bids -->
                    <v-row class="mt-n2" v-for="invite in invites" :key="invite.id">
                        <v-col md=12>
                            <v-card-title class="mt-n1">
                                <v-row class="mt-n3 ml-n3">
                                    <v-menu open-on-hover offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn dark v-bind="attrs" v-on="on" text color="teal" class="">
                                            <v-icon left color="teal">mdi-briefcase-check</v-icon>
                                            <span class="text-capitalize font-weight-bold text-caption teal--text" >
                                                {{ invite.category}} <span class="red--text">::</span> {{ invite.specialty}}
                                            </span>
                                            </v-btn>
                                        </template>

                                        <v-list dense shaped>
                                            <!-- Date of posting the job-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title> 
                                                <span class="teal--text text-caption font-weight-bold mr-2">Posted on:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ postedOn(invite.posted_on) }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of posted date of the job -->

                                            <!-- Number of order attachements-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                                <v-list-item-title>
                                                    <span class="teal--text text-caption font-weight-bold mr-2">Invite Category:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                    {{ invite.category }}
                                                    </span>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of number of attachments -->

                                            <!-- Number of order attachements-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                                <v-list-item-title>
                                                    <span class="teal--text text-caption font-weight-bold mr-2">Invite Specialty:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                    {{ invite.specialty }}
                                                    </span>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of number of attachments -->

                                            <!-- Offer submission date-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                                <v-list-item-title> 
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
                                        <span class="text-caption font-weight-bold" :class="status_color(invite)">
                                            {{ render_order_status(invite) }}
                                        </span>
                                    </div>
                                </v-row>
                            </v-card-title>
                            <!-- Offer owner cover letter -->
                            <v-card-text>
                                <v-row class="mt-n4 ml-1"> 
                                    <v-chip small outlined color="cyan" class="mt-1">
                                    <span class="text-caption font-weight-normal ml-3 warning--text" style="font-size: .8em;"> 
                                        Kes {{ invite.payable_amount }} /
                                        <span class="warning--text font-weight-normal text-caption">
                                            {{ invite.payment_schedule }}
                                        </span>
                                    </span>
                                    </v-chip>
                                </v-row>                        
                                <!-- End of row for skills -->
                                <v-row class="mt-n3">
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
                            <!-- End of offer owner about -->

                            <v-card-actions class="mt-n9 mb-2">
                                <span class="text-caption font-weight-bold ml-2 text-capitalize warning--text"> 
                                    Active Offers:
                                    <span class="warning--text font-weight-bold text-caption ml-1">
                                        {{ invite.active_offers }}
                                    </span>
                                </span>

                                <v-spacer></v-spacer>

                                <!-- Button for cancelling a bid -->
                                <v-btn  
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
                                    color="info" 
                                    depressed 
                                    text 
                                    @click="() => $router.push({path: `/account/${$route.params.id}/collaborations/posted/order/${invite.order_id}`})"
                                >
                                    <span class="text-capitalize font-weight-bold">view order</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->

                                <!-- Button for cancelling a bid -->
                                <v-btn  
                                    dark 
                                    x-small 
                                    text
                                    color="teal" 
                                    depressed 
                                    @click="() => $router.push({path: `/collaborations/${invite.id}`})"
                                >
                                    <span class="text-capitalize font-weight-bold">View offers</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->

                                <!-- Button for cancelling a bid -->
                                <v-btn  
                                    dark 
                                    x-small
                                    color="error lighten-1" 
                                    depressed class="mr-5"  
                                    v-if="!invite.is_assigned"
                                    @click="cancelInvite(invite.id)"
                                >
                                    <span class="text-capitalize font-weight-bold" :id="`cancel-invite-text-${invite.id}`">Cancel Invite</span>
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
    <!-- End of the practitioner card -->
</template>

<script>
// import moment
import moment from 'moment'
// import not found
import NotFound from "~/components/NotFound"
// import map state
import { mapState } from "vuex"
// component definiton
export default {
    // name
    name: "MyPostedOrder",
    // props
    props: {
        // pending offers
        invites: {
            type: Array
        },
        isClientMessage: String
    },
    // components
    components: {
        NotFound
    },
    // computed
    computed: {
        ...mapState('my_posted_invites', [
            'showing'
        ])
    },
    // data
    data: () => ({
        // not found message
        notFoundMessage: 'Sorry. You do not have any unassigned invites at the moment.',
        // message
        message: '',
        // color
        color: 'success lighten-1',
        // snackbar
        snackbar: false,
    }),
    // methods
    methods: {
        // function for rendering the offer status
        render_order_status(order) {
            // check the status
            if (!order.is_assigned) {
                return "Unassigned"
            } else if(order.is_assigned && !order.is_complete) {
                return "In Progress"
            } else {
                return "Completed"
            }
        },
        // show deadline
        showDeadline(date) {
          return moment(date, "YYYYMMDD").format('dddd Do MMMM, YYYY')
        },

        // status color
        status_color(order) {
            // check the status
            if (!order.is_assigned) {
                return "error--text"
            } else if(order.is_assigned && !order.is_complete) {
                return "warning--text"
            } else {
                return "sucess--text"
            }
        },

        // function for showing the fist 50 words of the of the description
        show_first_fifty(description) {
            return description.split(/\s+/).splice(0, 50).join(" ")
        },

        // function for showing more information about the order
        show_hidden_description(description) {
            // set the show more to true
            return description.split(/\s+/).splice(50).join(" ")
        },

        // posted on
        postedOn(date) {
          return moment(date, "YYYYMMDD").fromNow()
        },

        // show more
        showMore(inviteId) {
            this.$store.commit('my_posted_invites/TOGGLE_SHOW_MORE', inviteId)
        },

        // function for showing error
        handleError() {
            // check if there was an error
            // set the message
            this.message = 'Failed. There was a problem completing your request. Please try again later.'
            // set the color
            this.color =  'error lighten-1'
            // set the snackbar to true
            this.snackbar = true
        },

        // function of cancelling an offer
        async cancelInvite(inviteId) {
            // get the text with the id
            let text = document.getElementById(`cancel-invite-text-${inviteId}`)
            // set teh text to cancelling
            text.innerHTML = "cancelling..."
            // cancel the order
            await this.$axios.post(`/invites/${inviteId}/cancel`)
                .then(response => {
                    // remove the order from the list of orders
                    this.$store.commit('my_posted_invites/REMOVE_INVITE', {inviteId: inviteId})
                    // set message
                    this.message = response.data.data.details
                    // show the snackbar
                    this.snackbar = true
                })
                // handle the error
                .catch(err => {
                    // set the message depending on the err.response
                    if (err.response) {
                        // set the message
                        this.message = err.response.errors.details
                    } else {
                        // set the mesage
                        this.message = "Failed. There was a problem cancelling the order. Please try again later"
                    }
                    //set the color of the snackbar
                    this.color = 'error lighten-1'
                    // set the text back to cancel invite
                    text.innerHTML = 'cancel invite'
                    // show the snackbar
                    this.snackbar = true
                })
        },

        // function for getting the unassigned orders
        async getUnassignedInvites() {
            // set the not found message
            this.notFoundMessage = 'Sorry. You do not have any unassigned invites at the moment.'
            // get unassigned
            await this.$store.dispatch('my_posted_invites/getMyInvites', {filter: "unassigned"})
                .then(response => {
                    // set teh showing to unassigned
                    this.$store.commit('my_posted_invites/SET_SHOWING', "unassigned")
                })
                // handle error
                .catch(err => this.handleError())
        },

        // function for getting the assigned order
        async getAssignedInvites() {
            // set the not found message
            this.notFoundMessage = 'Sorry. You do not have any invites in progress at the moment.'
            // gt orders that are not in progress
            await this.$store.dispatch('my_posted_invites/getMyInvites', {filter: "in_progress"})
                .then(response => {
                    // set teh showing to unassigned
                    this.$store.commit('my_posted_invites/SET_SHOWING', "in progress")
                })
                // handle error
                .catch(err => this.handleError())
        }
    },
}
</script>