<template>
    <v-row align="center" justify="center">
        <v-col md="12" class="mb-n3">
            <v-card class="mx-auto" width="535" elevation="2" >
                <v-card-title class="ml-2">
                    <v-row justify="center" class="mb-n2">
                        <v-icon small color="teal" left class="ml-3">mdi-account-arrow-right</v-icon>
                        <span class="text-caption ml-1 font-weight-bold teal--text text-capitalize">
                            Direct Hire Requests Made out to me
                        </span>
                        <v-spacer></v-spacer>
                        <span class="text-caption font-weight-bold error--text text-capitalize mr-5">
                            Requests Count: <span class="ml-2">{{ requests.length }}</span>
                        </span>
                    </v-row>
                </v-card-title>
                <v-divider class="mx-4 cyan mt-2 mb-1"></v-divider>

                <template>
                    <NotFound
                        v-if="!requests.length"
                        :message="isClientMessage ? isClientMessage : notFoundMessage"
                    />
                    <!-- Row for each of the bids -->
                    <v-row class="mt-n2" v-for="request in requests" :key="request.id">
                        <v-col md=12>
                            <v-card-title class="mt-n1">
                                <v-row class="mt-n3 ml-n3">
                                    <v-menu open-on-hover offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn dark v-bind="attrs" v-on="on" text color="teal" class="ml-n1">
                                            <span class="text-capitalize font-weight-bold text-caption teal--text" >
                                                {{ request.order.category}} <span class="red--text">::</span> {{ request.order.specialty }}
                                            </span>
                                            </v-btn>
                                        </template>

                                        <v-list dense shaped>
                                            <!-- Owner of the job -->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title>
                                                <v-icon x-small color="grey" left>mdi-account-tie</v-icon>
                                                <span class="teal--text text-caption font-weight-bold mr-2">Reqeuest created by:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ request.order.owner_name }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of owner of the job -->

                                            <!-- Date of posting the job-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title> 
                                                <v-icon x-small color="grey" left>mdi-calendar</v-icon>
                                                <span class="teal--text text-caption font-weight-bold mr-2">Request created on:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ showDeadline(request.order.posted_on) }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of posted date of the job -->

                                            <!-- Number of order attachements-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title>
                                                <v-icon x-small color="grey" left>mdi-playlist-check</v-icon>
                                                <span class="teal--text text-caption font-weight-bold mr-2">Request order Category:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ request.order.category }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of number of attachments -->

                                            <!-- Number of order attachements-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title>
                                                <v-icon x-small color="grey" left>mdi-format-list-bulleted</v-icon>
                                                <span class="teal--text text-caption font-weight-bold mr-2">Request order Specialty:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ request.order.specialty }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of number of attachments -->

                                            <!-- Offer submission date-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title> 
                                                <v-icon x-small color="grey" left>mdi-calendar-clock</v-icon>
                                                <span class="teal--text text-caption font-weight-bold mr-2">Submit response before:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ showDeadline(request.order.deadline) }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of offer submission date -->
                                        </v-list>
                                    </v-menu>

                                    <v-spacer></v-spacer>
                                    <div class="mr-7">
                                        <v-icon small color="cyan lighten-1">mdi-shield-check</v-icon>
                                    </div>
                                </v-row>
                            </v-card-title>
                            <!-- Offer owner cover letter -->
                            <v-card-text> 
                                <!-- Row for the skills -->
                                <v-row class="mt-n4 ml-1"> 
                                    <v-chip small outlined color="cyan" class="mt-1">
                                    <span class="text-caption font-weight-normal ml-3 blue--text" style="font-size: .8em;"> 
                                        Kes {{ request.order.payable_amount }} /
                                        <span class="blue--text font-weight-normal text-caption">
                                            {{ request.order.payment_schedule }}
                                        </span>
                                    </span>
                                    </v-chip>
                                </v-row>                    
                                <!-- End of row for skills -->
                                <v-row class="mt-n1">
                                    <p class="text-caption pa-3 font-weight-normal" style="color: #636a6c">
                                    {{ show_first_fifty(request.order.description )}}
                                    <span id="dots-1" :style="request.order.show_more ? 'display: none;' : 'display: inline;'">....</span> <span id="more-1" :style="request.order.show_more ? 'display: inline;' : 'display: none;'">
                                        {{ show_hidden_description(request.order.description )}}
                                    </span>
                                    <!-- Button for showing more description -->
                                    <v-btn icon @click="showMore(request.id)" x-small>
                                        <v-icon color="info" x-small> 
                                            {{request.order.show_more ? 'mdi-eye-off' : 'mdi-eye'}} 
                                        </v-icon>
                                    </v-btn>
                                    <!-- End of button for wshoing the description -->
                                    </p>
                                </v-row>
                            </v-card-text>
                            <!-- End of offer owner about -->

                            <v-card-actions class="mt-n10 mb-2">
                                <!-- Button for downloading the order attachments -->
                                <v-btn 
                                    v-if="request.order.attachments"
                                    x-small 
                                    color="info" 
                                    dark 
                                    class="ml-2"
                                    depressed 
                                    text
                                    @click="downloadAttachments(request.order.attachments)"
                                >         
                                    <span class="text-capitalize font-weight-bold">downld attachments</span>
                                </v-btn>

                                <v-btn 
                                    v-if="!request.order.attachments"
                                    x-small 
                                    color="teal" 
                                    dark 
                                    class="ml-1"
                                    depressed 
                                    text
                                >         
                                    <span class="text-capitalize font-weight-bold">no attachments</span>
                                </v-btn>
                                <!-- End of button for downloading an order's attachment -->

                                <v-spacer></v-spacer>
                                <!-- Button for cancelling a bid -->
                                <v-btn
                                    v-if="!request.is_accepted"
                                    dark 
                                    x-small 
                                    text
                                    color="error" 
                                    depressed 
                                    class="mr-3"
                                    @click="rejectRequest(request.id)"
                                >
                                    <span class="text-capitalize font-weight-bold" :id="`reject-text-${request.id}`">reject</span>
                                    
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->

                                <!-- Button for cancelling a bid -->
                                <v-btn
                                    :id="`accept-${request.id}`"
                                    dark 
                                    x-small 
                                    class="mr-7"
                                    color="teal lighten-1" 
                                    depressed 
                                    v-if="!request.is_accepted"
                                    @click="acceptRequest(request.id)"
                                >
                                    <span class="text-capitalize font-weight-bold" :id="`accept-text-${request.id}`">accept</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->

                            </v-card-actions>
                            <v-divider class="mx-3 cyan mb-n3 mt-n1"></v-divider>
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
// component definiton
export default {
    // name
    name: "ContractorDirectHires",
    // props
    props: [
        'requests',
        'isClientMessage'
    ],
    // components
    components: {
        NotFound
    },
    // data
    data: () => ({
        // not found message
        notFoundMessage: 'Sorry. You do not have any direct hire requests at the moment.',
        // message
        message: '',
        // color
        color: 'success lighten-1',
        // snackbar
        snackbar: false,
    }),
    // methods
    methods: {
        // show deadline
        showDeadline(date) {
          return moment(date, "YYYYMMDD").format('dddd Do MMMM, YYYY')
        },


        // function for showing the fist 50 words of the of the description
        show_first_fifty(description) {
            return description.split(/\s+/).splice(0, 75).join(" ")
        },

        // function for showing more information about the order
        show_hidden_description(description) {
            // set the show more to true
            return description.split(/\s+/).splice(75).join(" ")
        },

        // posted on
        postedOn(date) {
          return moment(date, "YYYYMMDD").fromNow()
        },

        // show more
        showMore(requestId) {
            this.$store.commit('contractor_hire_requests/TOGGLE_SHOW_MORE', requestId)
        },

        // function for showing error
        handleError(err, element) {
            console.log(err)
            // set the message depending on the err.response
            if (err.response) {
                // set the message
                this.message = err.response.data.errors.details
            } else {
                // set the mesage
                this.message = "Failed. There was a problem cancelling the order. Please try again later"
            }
            //set the color of the snackbar
            this.color = 'error lighten-1'
            // set the loading to false
            element.innerHTML == 'rejecting...' ? element.innerHTML = 'reject' : element.innerHTML = 'accept'
            // show the snackbar
            this.snackbar = true
        },

        // function of cancelling an offer
        async acceptRequest(requestId) {
            // get the template
            let text = document.getElementById(`accept-text-${requestId}`)
            // get the btn
            let btn = document.getElementById(`accept-${requestId}`)
            // set the inner html
            text.innerHTML = 'accepting...'
            // cancel the order
            await this.$axios.post(`/direct/hire/${requestId}/accept`)
                .then( ({ data }) => {
                    // set the order to accepted
                    this.$store.commit('contractor_hire_requests/SET_ACCEPTED', requestId)
                    // set the message
                    this.message = data.data.details
                    // set the inner html
                    btn.setAttribute("disabled", true)
                    // set the inner html
                    text.innerHTML = 'accepted'
                    // show the snackbar
                    this.snackbar = true
                    
                })
                // handle the error
                .catch(err => this.handleError(err))
        },

        // function for getting unpaid orders
        async rejectRequest(requestId) {
            // get the template
            let text = document.getElementById(`reject-text-${requestId}`)
            // set the inner html
            text.innerHTML = 'rejecting...'
            // reject the invite
            await this.$axios.post(`/direct/hire/${requestId}/reject`)
                .then(( { data }) => {
                    // remove the invite from the list of request
                    this.$store.commit('contractor_hire_requests/REMOVE_REQUEST', requestId)
                    // set the message
                    this.message = data.data.details
                    // show the snackbar
                    this.snackbar = true
                })
                .catch(err => this.handleError(err, text))
        }

    },
}
</script>