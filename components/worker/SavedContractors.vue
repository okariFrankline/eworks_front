<template>
    <v-row align="center" justify="center">
        <v-col md="12" class="mb-n3 mt-n2">
            <v-card class="mx-auto" width="535" elevation="2">
                <v-card-title class="ml-4 mr-4">
                    <v-row justify="center" class="mb-n2">
                        <v-icon small left color="teal" class="ml-1">mdi-content-save-move</v-icon>
                        <span class="text-caption font-weight-bold teal--text text-capitalize">
                            My Saved Contractors
                        </span>

                        <v-spacer></v-spacer>
                        <span class="text-caption font-weight-bold teal--text text-capitalize mr-3">
                            Total Count: <span class="ml-1">{{ workers.length }}</span>
                        </span>

                        <!-- End of rejected offers button -->
                    </v-row>
                </v-card-title>
                <v-divider></v-divider>

                <template>
                    <NotFound
                        v-if="!workers.length"
                        :message="notFoundMessage"
                    />
                    <!-- Row for each of the bids -->
                    <v-row class="mt-n2" v-for="worker in workers" :key="worker.id">
                        <v-col md=12>
                                                        <!-- cARD Title -->
                            <v-card-title>
                                <v-row class="mt-n2 ml-n4">
                                    <!-- Menu containing the profile picture of the person who has placed the bid -->
                                    <v-menu open-on-hover offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn dark v-bind="attrs" v-on="on" class="" color="" text>
                                                <v-avatar size="30" class="mr-3 ml-3">
                                                    <img :src="worker.profile_pic ? worker.profile_pic : '/images/unknown1.png'">
                                                </v-avatar>
                                                <span class="text-capitalize font-weight-bold text-caption teal--text">
                                                    {{ worker.full_name }}
                                                </span>
                                            </v-btn>
                                        </template>

                                        <v-list dense shaped v-if="worker.profile_pic">
                                        <v-list-item color="purple darken-3" class="text--red mb-n2">
                                            <v-list-item-title>
                                            <v-avatar class="profile ml-3" color="grey" size="124" rounded>
                                                    <v-img :src="worker.profile_pic"></v-img>
                                                </v-avatar>
                                            </v-list-item-title>
                                        </v-list-item>
                                        </v-list>
                                    </v-menu>
                                    <!-- End of menu -->
                                                    
                                    <v-spacer></v-spacer>

                                    <div class="mr-3 mt-n1">
                                        <v-row class="mt-n2">
                                            <v-col class="mr-5">
                                                <span class="text-caption font-weight-bold teal--text">Rated:</span>
                                            </v-col>
                                            <v-col class="">
                                                <v-rating color="yellow darken-3" background-color="grey darken-1" empty-icon="$ratingFull"
                                                    half-increments
                                                    dense
                                                    small
                                                    :value="worker.rating"
                                                    class="ml-n10"
                                                    readonly
                                                ></v-rating>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </v-row>
                            </v-card-title>
                            <!-- End of card title -->
                            <!-- Offer owner cover letter -->
                            <v-card-text>     
                                <!-- Row for the skills -->
                                <v-row class="mt-n3 ml-1"> 
                                    <v-chip small outlined color="cyan" class="ml-2 mt-1" v-for="(skill, index) in worker.skills" :key="index">
                                        <span class="warning--text">
                                            {{ skill }}
                                        </span>
                                    </v-chip>
                                </v-row>
                                <!-- End of row for skills -->

                                <v-row class="mt-n2">
                                    <p class="text-caption pa-4 font-weight-normal" style="color: #636a6c">
                                    {{ show_first_fifty(worker.about )}}
                                    <span id="dots-1" :style="worker.show_more ? 'display: none;' : 'display: inline;'">....</span> <span id="more-1" :style="worker.show_more ? 'display: inline;' : 'display: none;'">
                                        {{ show_hidden_description(worker.about)}}
                                    </span>
                                    <!-- Button for showing more description -->
                                    <v-btn icon @click="showMore(worker.id)" x-small>
                                        <v-icon color="info" x-small> 
                                            {{worker.show_more ? 'mdi-eye-off' : 'mdi-eye'}} 
                                        </v-icon>
                                    </v-btn>
                                    <!-- End of button for wshoing the description -->
                                    </p>
                                </v-row>
                            </v-card-text>
                            <!-- End of offer owner about -->

                            <v-card-actions class="mt-n9 mb-2">
                                <!-- Section for displaying the work success of the current user -->
                                <div class="ml-3 mb-1 mt-n3">                
                                    <span class="text-caption font-weight-normal teal--text ml-2">
                                        {{ worker.job_success}}% Job Success
                                    </span>
                                    <v-progress-linear 
                                        dark 
                                        :value="worker.job_success" 
                                        class="mt-1" 
                                        rounded height="8" 
                                        color="cyan" 
                                        style="width: 180px;">
                                    </v-progress-linear>
                                </div>
                                <!-- End of button for downloading an order's attachment -->

                                <v-spacer></v-spacer>
                                <!-- Button for saving a user -->

                                <!-- Buttong for viwing the profile of the worker -->
                                <v-btn  
                                    dark 
                                    x-small 
                                    color="teal" 
                                    depressed 
                                    text
                                    @click="viewProfile(worker.id)">
                                    <span class="text-capitalize font-weight-bold">view profile</span>
                                </v-btn>
                                <!-- End of button for viewing the profile of the worker -->

                                <!-- Button for cancelling a bid -->
                                <v-btn  
                                    dark 
                                    x-small 
                                    color="info lighten-1" 
                                    class="mr-2"
                                    depressed 
                                    @click.stop="directHire(worker.id)"
                                >
                                    <span class="text-capitalize font-weight-bold" :id="`hire-text-${worker.id}`">Direct Hire</span>
                                </v-btn>
                                <!-- End of button for cacneliing a bod -->

                                <v-btn  
                                    dark 
                                    x-small 
                                    color="error lighten-1" 
                                    depressed
                                    class="mr-4"
                                    @click="unSaveWorker(worker.id)"
                                >
                                    <span class="text-capitalize font-weight-bold" :id="`unsave-text-${worker.id}`">unsave</span>
                                </v-btn>
                                <!-- End of button for saving a user -->
                            </v-card-actions>
                            <v-divider class="mx-5 cyan mb-n3 mt-n1"></v-divider>
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
// compoent definition
export default {
    // name
    name: "SavedWorkersCard",
    // props
    props: [
        'workers'
    ],
    // components
    components: {
        NotFound
    },
    // data
    data: () => ({
        // not found message
        notFoundMessage: 'You do not have any saved contractors at the moment.',
        // LOADING
        loading: false,
        // loader
        loader: null,
        // loading
        hireLoading: false,
        // loader:
        hireLoader: null,
        // LOADING
        rejecting: false,
        // loader
        rejectLoader: null,
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
            if (order.is_complete && !order.is_paid_for) {
                return "Not Paid"
            } else if(!order.is_complete) {
                return "In Progress"
            } else {
                return "Paid"
            }
        },
        // show deadline
        showDeadline(date) {
          return moment(date, "YYYYMMDD").format('dddd Do MMMM, YYYY')
        },

        // status color
        status_color(order) {
            // check the status
            if (order.is_complete && !order.is_paid_for) {
                return "pink--text"
            } else if(!order.is_complete) {
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
        showMore(workerId) {
            this.$store.commit('saved_contractors/READ_MORE', workerId)
        },

        // function of viewing profile
        viewProfile(workerId) {
            // emit an event
            this.$emit('view-profile', workerId)
        },

        // function for showing error
        handleError(err) {
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
            this.loading = false
            // set the loader to null
            this.loader = null
            // show the snackbar
            this.snackbar = true
        },

         // direct hire function
        async directHire(workerId) {
            // get the text
            let text = document.getElementById(`hire-text-${workerId}`)
            // set text
            text.innerHTML = 'initializing...'
          //get all the posted orders created by this user
          await this.$store.dispatch('new_direct_hires/getMyPostedOrders')
            .then(() => {
              // set the text
              text.innerHTML = 'direct hire'
              //emit a direct hire event
              this.$emit('show-direct-hire-popup', workerId)
            })
            .catch(err => {
              // check if there is a response
                if (err.response) {
                  // get the response data
                  let { data } = err.response.data
                  // set the message
                  this.message = data.errors.details
                } else {
                  // access the error
                  this.message = 'There was a problem creating your direct hire request. Please try again later.'
                }
                // set the color
                this.color = 'error lighten-1'
                // set the text
                text.innerHTML = 'direct hire'
                // set the snackbar to true
                this.snackbar = true
            })
        },

        // function for saving the worker
        async unSaveWorker(workerId) {
            // get the text
            let text = document.getElementById(`unsave-text-${workerId}`)
            // set the unsaving text
            text.innerHTML = 'unsaving...'
            // send the data to the db
            await this.$axios.post(`contractors/${workerId}/unsave`)
                .then(({ data }) => {
                    // refetch the user
                    this.$auth.fetchUser()
                        .then(() => {
                            // remove the user from the list of saved contractors
                            this.$store.commit('saved_contractors/REMOVE_WORKER', workerId)
                            // set the message
                            this.message = data.data.details
                            // set the snackbar to true
                            this.snackbar = true
                            // set the unsaving text
                            text.innerHTML = 'removed'
                        })
                })
                // handle the error
                .catch(err => {
                // check if there is a response
                if (err.response) {
                    // get the response data
                    let { data } = err.response.data
                    // set the message
                    this.message = data.errors.details
                } else {
                    // access the error
                    this.message = 'Failed. Contractor could not be saved. Please try again later.'
                }
                // set the color
                this.color = 'error lighten-1'
                // set the unsaving text
                text.innerHTML = 'unsave'
                // set the snackbar to true
                this.snackbar = true
                })
        },

    }
}
</script>