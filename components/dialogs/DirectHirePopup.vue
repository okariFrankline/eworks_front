<template>
    <div>
        <!-- Dialog for creating a new job -->
        <v-dialog v-model="showDirectHire" max-width="600" persistent>
            <v-card width="600">
                <v-card-title class="my-card-title"  style="height: 50px;">
                    <v-row justify="center" class="mb-n2">
                        <span class="text-caption font-weight-bold white--text text-capitalize ml-5">
                            <v-icon left small color="white">mdi-form-select</v-icon>
                            Select Order for direct hire
                        </span>
                        <v-spacer></v-spacer>
                        <!-- Close button -->
                        <v-btn  
                            dark
                            depressed 
                            class="text-caption text-capitalize mr-3" 
                            color="white" 
                            small 
                            icon
                            @click="$emit('hide-dialog')"
                        >
                            <v-icon close small color="white">mdi-close</v-icon>
                            <!-- <span class="text-caption font-weight-bold">Dismiss </span> -->
                        </v-btn>
                        <!-- End of clos button -->
                        </v-row>
                </v-card-title>
                <v-divider></v-divider>

                <template>
                    <NotFound
                        v-if="!orders.length"
                        :message="'You do not have any unasigned orders at the moment. Create a new order to continue'"
                    />

                    <!-- Row for each of the bids -->
                    <v-row class="mt-n2" v-for="order in orders" :key="order.id">
                        <v-col md=12>
                            <v-card-title class="mt-n1">
                                <v-row class="mt-n3 ml-n3">
                                    <v-menu open-on-hover offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn dark v-bind="attrs" v-on="on" text color="teal" class="">
                                            <v-icon left color="teal">mdi-shield-check</v-icon>
                                            <span class="text-capitalize font-weight-bold text-caption teal--text" >
                                                {{ order.category}}
                                            </span>
                                            </v-btn>
                                        </template>

                                        <v-list dense shaped>
                                            <!-- Date of posting the job-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title> 
                                                <span class="teal--text text-caption font-weight-bold mr-2">Posted on:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ postedOn(order.posted_on) }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of posted date of the job -->

                                            <!-- Number of order attachements-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title>
                                                <span class="teal--text text-caption font-weight-bold mr-2">Order Specialty:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ order.specialty }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of number of attachments -->

                                            <!-- Offer submission date-->
                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title> 
                                                <span class="teal--text text-caption font-weight-bold mr-2">Submit offer before:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                {{ showDeadline(order.deadline) }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>

                                            <v-list-item dense color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title> 
                                                <span class="teal--text text-caption font-weight-bold mr-2">Order Payment:</span> <span class="text-caption font-weight-bold" style="color: #636a6c">
                                                KES {{ order.payable_amount }} / {{ order.payment_schedule }}
                                                </span>
                                            </v-list-item-title>
                                            </v-list-item>
                                            <!-- End of offer submission date -->
                                        </v-list>
                                    </v-menu>

                                    <v-spacer></v-spacer>
                                    <div class="mr-7">
                                        <span class="text-caption font-weight-bold warning--text">
                                            <span class="mr-2 error--text">Status:</span> {{ render_order_status(order) }}
                                        </span>
                                    </div>
                                </v-row>
                            </v-card-title>
                            <!-- Offer owner cover letter -->
                            <v-card-text>                            
                                <!-- End of row for skills -->
                                <v-row class="mt-n7 mb-n3">
                                    <p class="text-caption pa-4 font-weight-normal" style="color: #636a6c">
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
                            <!-- End of offer owner about -->

                            <v-card-actions class="mt-n10 mb-2">

                                <v-spacer></v-spacer>
                                <!-- Button for selecting the order -->
                                <v-btn  
                                    dark 
                                    x-small
                                    color="info" 
                                    depressed class="mr-7"  
                                    :loading="loading" 
                                    @click="selectOrder(order.id)"
                                >
                                    <span class="text-capitalize font-weight-bold">Select order</span>
                                    <template v-slot:loader>
                                        <span class="custom-loader">
                                            <v-icon light color="white">mdi-cached</v-icon>
                                        </span>
                                    </template>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->
                            </v-card-actions>
                            <v-divider class="mx-4 mb-n3 cyan"></v-divider>
                        </v-col>
                    </v-row>
                    <!-- End of row for a previous hire -->
                </template>
            </v-card> 
        </v-dialog>
        <!-- End of dialog for creating a new job -->

        <!-- Snackbar -->
        <v-snackbar v-model="snackbar" :color="color"  top app elevation="2" timeout="5000">
            <span class="text-caption font-weight-bold">
            {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbar -->
    </div>
</template>

<script>
// import moment
import moment from 'moment'
// impot not found
import NotFound from "~/components/NotFound"
// component definition
export default {
    // name
    name: 'DirectHirePopup',
    // COMPONENTS
    components: {
        NotFound
    },
    // props
    props: {
        // pending offers
        orders: {
            type: Array
        },
        showDirectHire: Boolean,
        contractorId: String
    },
    // data
    data: () =>({
        // loading
        loading: false,
        // loader
        loader: null,
        // color
        color: 'success lighten-1',
        // message
        message: '',
        // snackbar
        snackbar: false
    }),
    // methods
    methods: {
        // show deadline
        showDeadline(date) {
          return moment(date, "YYYYMMDD").format('dddd Do MMMM, YYYY')
        },
        // render the order status
        render_order_status(order) {
            // check the status
            if (!order.is_assigned) {
                return "Not Assigned"
            } else if(order.is_assigned && !order.is_complete) {
                return "In Progress"
            } else {
                return "Completed"
            }
        },
        // status color
        status_color(order) {
            // check the status
            if (!order.is_assigned) {
                return "info--text"
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

        // function for showing more details about the order
        showMore(orderId) {
            this.$store.commit('new_direct_hires/TOGGLE_SHOW_MORE', orderId)
        },

        // function for selecting the order
        async selectOrder(orderId) {
            // set loading to true
            this.loading = true
            // set the loader to this.loading
            this.loader = this.loading
            // initiate the call to the db
            this.$axios.post(`/direct/hire/${orderId}/contractor/${this.contractorId}/new`)
                .then(({ data }) => {
                    // set the message
                    this.message = data.data.details
                    // set the loading to false
                    this.loading = false
                    // set the loader to null
                    this.loader = null
                    // set the snackbar to true
                    this.snackbar = true
                    // show new invite
                    this.$emit('show-new_invite', data.data.hire_id)
                })
                // handle error
                .catch(err => {
                    // check if the error has a response
                    if (err.response) {
                        // set the message
                        this.message = err.response.data.errors.details
                    } else {
                        this.message = 'There was a problem sending your direct hire request. Please try again later.'
                    }
                    // set the color
                    this.color = 'error lighten-1'
                    // set the loading to false
                    this.loading = false
                    // set the loader to null
                    this.loader = null
                    // set the snackbar to true
                    this.snackbar = true
                    // emit an event to hide the dialog 

                }) 
        }
    }
}
</script>