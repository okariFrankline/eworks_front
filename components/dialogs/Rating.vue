<template>
    <v-dialog v-model="ratingDialog" max-width="490" persistent>
        <v-card>
            <v-card-title class="teal">
                <span class="text-caption font-weight-bold white--text">
                    Contractor Review: <span class="ml-2">Rate service recieved</span>
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form ref="rating">
                    <span class="text-caption font-weight-bold ml-3 teal--text">
                        How would you rate the services recieved by the contractor?
                    </span>
                    <!-- Options for the category -->

                    <v-rating
                        v-model="formData.rating"
                        background-color="orange lighten-3"
                        color="orange"
                        class="ml-7"
                        large
                        ripple
                    ></v-rating>

                    <template v-if="assetType == 'order'">
                        <span class="text-caption font-weight-bold teal--text ml-3">
                            Add a review comment on the service recieved by contractor
                        </span>

                        <v-textarea  
                            auto-grow 
                            placeholder="Order Description" 
                            dense 
                            rows="4"
                            outlined
                            class="mt-3 ml-2"  
                            style="font-size: .9em; width: 400px;"
                            v-model="formData.comment"
                            :rules="commentRules"
                        ></v-textarea>
                    </template>
                    <!-- End of the options for the category -->
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n6">
                <span class="text-caption font-weight-bold teal--text ml-8" v-if="assetType == 'order'"> 
                    Current word count:  {{ wordCount() }} / 50
                </span>
                <!-- Options for the category -->
                <v-spacer></v-spacer>
                <!-- Cancel button -->
                <v-btn  
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-3 mb-n2" 
                    color="error" 
                    text
                    small 
                    @click="cancelRating"
                >
                    <span class="text-caption font-weight-bold text-capitalize" id="cancel-text-description">cancel</span>
                </v-btn>
                <!-- End of cancel button -->

                <!-- Next nutton -->
                <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-5 mb-n2" 
                    color="teal lighten-1" 
                    small
                    text 
                    :loading="loading"
                    @click="postReview"
                >
                    <span class="text-caption font-weight-bold">proceed</span>
                    <template v-slot:loader>
                        <span class="text-caption font-weight-bold mr-2">paying...</span>
                        <span class="custom-loader">
                            <v-icon small light color="teal">mdi-cached</v-icon>
                        </span>
                    </template>
                </v-btn>
                <!-- End of next button -->
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
// import map state
import { mapState } from "vuex"
export default {
    // name
    name: "RatingDialog",
    // computed
    computed: {
        ...mapState('dialogs', [
            'ratingDialog'
        ])
    },
    // props
    props: {
        // id of the asset being paid for
        // asset type is determined by the asset type prop
        assetId: {
            type: String,
            required: true
        },
        // contractor id of the contractor being paid
        contractorId: {
            type: String,
            required: true
        },
        // asset type
        // can be invite or order
        assetType: {
            type: String,
            required: true
        }
    },
    // data
    data: () => ({
        // formdata
        formData: {
            // rating
            rating: 1,
            // comment
            comment: ''
        },
        // comment rules
        commentRules: [
            v => !!v || 'Review Comment Is required.'
        ],
        // loading
        loading: false,
        // loader
        loader: null
    }),
    // methods
    methods: {
        // function for returning the current word count
        wordCount() {
            if (this.formData.comment) {
                // return the word count
                return this.formData.comment.split(/\s+/).length - 1
            } else{
                // return 0
                return 0
            }
        },
        // function for cancelling the rating
        cancelRating () {
            // reset the form
            this.$refs.rating.reset()
            // hide the rating dialog
            this.$store.commit('dialogs/TOGGLE_RATING_DIALOG')
        },
        // function for posting review
        async postReview () {
            // validate the form
            if (!this.$refs.rating.validate()) return
            // set the loading to tru
            this.loading = true
            // set the loader to loading
            this.loader = this.loading
            // set the order url
            let orderUrl = `/order/${this.assetId}/pay/${this.contractorId}`
            // create the invite url
            let inviteUrl = `/invites/${this.assetId}/pay/${this.contractorId}`
            // get the url
            let url = this.assetType == "order" ? orderUrl : inviteUrl

            // check the asset type
            if (this.assetType == "order") {
                await this.$axios.post(orderUrl, this.formData)
                    .then(() => {
                        // set the message
                        let message = data.data.details
                        // set the loading to false
                        this.loading = false
                        // set the loader to null
                        this.loader = null
                        // hide the payment dialog
                        this.$store.commit('dialogs/TOGGLE_RATING_DIALOG')
                        // emit a show success
                        this.$emit('show-success', message)
                    })
                    .catch(err => this.handleError(err))

            } else {
                // post the rating
                await this.$axios.post(inviteUrl, {rating: this.formData.rating})
                    .then(({ data }) => {
                        // set the message
                        let message = data.data.details
                        // set the loading to false
                        this.loading = false
                        // set the loader to null
                        this.loader = null
                        // hide the payment dialog
                        this.$store.commit('dialogs/TOGGLE_RATING_DIALOG')
                        // emit an show success message
                        this.$emit('show-success', message)
                    })
                    .catch(error => this.handleError(error))
            }
        },

        // function for handling an error
        handleError(error) {
            console.log(error)
            // initialize message
            let message
            // check if the error has a response
            if (error.response) {
                // create a message
                message = error.response.data.errors.details
            } else {
                // set the message
                message = "There was a problem completing the payment. Please try again later"
            }
            // set the loading to false
            this.loading = false
            // set the loader to null
            this.loader = null
            // show the error to the user
            this.$emit('show-error', message)
               
        }
    }
}
</script>