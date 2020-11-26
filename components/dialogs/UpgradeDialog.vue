<template>
    <div>
        <!-- Dialog for adding the type of project -->
        <v-dialog v-model="showUpgrade" max-width="520" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <v-icon left small color="white">mdi-account-cog</v-icon>
                <span class="text-caption font-weight-bold white--text">
                    Account Upgrade Length
                </span>
                <v-spacer></v-spacer>
                <span class="text-caption font-weight-bold white--text">
                    Payment: <span class="ml-1">Mpesa</span>
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form v-model="valid" ref="form">
                    
                    <ul class="mb-4">
                        <li class="text-caption font-weight-bold pink--text">Ensure you have your phone close</li>
                        <li class="text-caption font-weight-bold pink--text">Ensure you have the required amount in your Mpesa</li>
                    </ul>
                  
                    <!-- End of the options for the category -->
                    <span class="text-caption font-weight-bold ml-5 teal--text">
                        Enter duration of upgrade (In Days)
                    </span>
                    <!-- Options for the category -->
                    <v-text-field 
                        prepend-icon="mdi-calendar-clock" 
                        placeholder="Upgrade Length" 
                        dense
                        min="1"
                        max="30"
                        class="mt-3" 
                        style="font-size: .9em;"
                        type="number"
                        :rules="lengthRules"
                        v-model="formData.length"
                    ></v-text-field>
                    <!-- End of the options for the category -->

                    <span class="text-caption font-weight-bold ml-5 teal--text">
                        Enter your Mpesa phone number
                    </span>
                    <!--Order type -->
                    <v-text-field 
                        prepend-icon="mdi-phone-classic" 
                        placeholder="Phone Number" 
                        dense 
                        class="mt-3 mb-2" 
                        style="font-size: .9em;"
                        type="email"
                        :rules="phoneRules"
                        v-model.trim="formData.phone"
                    ></v-text-field>
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <span class="text-caption font-weight-bold ml-5 text-capitalize warning--text"> 
                    <span class="ml-5 mr-2 teal--text">Payable Amount:</span> Kes {{ formData.length * 50 }}
                </span>
                <v-spacer></v-spacer>
                <!-- Cancel button -->
                <v-btn  
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-3" 
                    color="error" 
                    small
                    text 
                    @click="hideUpgrade"
                >
                    <span class="text-caption font-weight-bold text-capitalize" id="cancel-text-type">cancel</span>
                </v-btn>
                <!-- End of cancel button -->

                <!-- Next Button -->
                <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-3" 
                    color="warning" 
                    small 
                    :loading="loading"
                    @click.stop="upgradeAccount"
                >
                    <span class="text-caption font-weight-bold">upgrade account</span>
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

        <!-- Snackbar for error while activation -->
        <v-snackbar v-model="snackbar" :color="color" top app elevation="2">
            <span class="text-caption font-weight-bold">
            {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbar -->
    </div>
</template>

<script>
// import state
import { mapState } from "vuex"
// component definition
export default {
    // name
    name: 'UpgradeDialog',
    // conmputed
    computed: {
        ...mapState('dialogs', [
            'showUpgrade'
        ])
    },
    // data
    data: () => ({
        // formData
        formData: {
            // defualts to 1
            length: 1,
            phone: ''
        },
        // length rules
        lengthRules: [
            v => !!v || 'Number of contractors must be at least be 1.'
        ],
        // email rules
        phoneRules: [
            v => !!v || 'Phone number is required'
        ],
        // valid
        valid: false,
        // loading
        loading: false,
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
        // function for resetting the form
        resetDialog() {
            // reset the form
            this.formData.length = 1
            // set the phone number to nul
            this.formData.phone = ''
        },
        // hide dialog
        hideUpgrade () {
            // reset the form
            this.resetDialog()
            // emit this hide upgrade
            this.$store.commit('dialogs/HIDE_UPGRADE')
        },

        // function for upgrading the account
        async upgradeAccount() {
            // set the loading to true
            this.loading = true
            // function for ssetting the loader
            this.loader = this.loading
            // update the account
            await this.$axios.post(`/user/client/upgrade`, {upgrade_data: this.formData})
                .then(({ data }) => {
                    // refetch the user
                    this.$auth.fetchUser()
                        .then(() => {
                            // get the current user
                            let user = this.$auth.user
                            // set the message
                            this.message = data.data.details
                            // show the snackbar
                            this.snackbar = true
                            // check if the user's has a complete work profile
                            if (user.is_upgraded_contractor && user.has_complete_work_profile) {
                                // set the loading and loader to default
                                this.loading = false
                                // set loader to null
                                this.loader = null
                                // reset the dialog
                                this.resetDialog()
                                // hide the dialog
                                this.$store.commit('dialogs/HIDE_UPGRADE')
                            // redict the user to complete his/her work profile
                            } else {
                                // set the loading and loader to default
                                this.loading = false
                                // set loader to null
                                this.loader = null
                                // reset the dialog
                                this.resetDialog()
                                // hide the dialog
                                this.$store.commit('dialogs/HIDE_UPGRADE')
                                // redirect the user to skills
                                this.$router.push({
                                    path: `/account/skills`
                                })
                            }
                        })
                })
                // handle the error
                .catch(error => {
                    console.log(error)
                    // check if the error has a response
                    if (error.response) {
                        // set the message
                        this.message = error.response.data.errors.details
                    } else if (error.request) {
                        // set the message
                        this.message = 'Failed. Check your connection and try again.'
                    } else {
                        // set the message
                        this.message = 'Failed. Account could not be upgraded. Please try again later.'
                    }
                    // set the color
                    this.color = 'error lighten-1'
                    // set the loading to false
                    this.loading = false
                    // set the loader to null
                    this.loader = null
                    // set the snackbar to true
                    this.snackbar = true 
                })
        }
    }
}
</script>