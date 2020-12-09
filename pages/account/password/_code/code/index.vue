<template>
    <v-col md=6 class="mt-10">
        <v-card class="mx-auto" width="500" elevation="2">
              <v-card-title class="teal lighten-1">
                  <v-row justify="center">
                    <v-icon dark left>mdi-lock-reset</v-icon>
                    <span class="text-body-2 font-weight-bold white--text ml-2">
                        Password Account Reset
                    </span>
                  </v-row>
              </v-card-title>

              <v-card-text class="mt-5">
                  <v-form ref="form" lazy-validation @submit.prevent>
                      <span class="text-caption font-weight-bold ml-5 teal--text">
                        Enter verification code sent to {{ email }}
                    </span>
                    <!--Order type -->
                    <v-text-field 
                        prepend-icon="mdi-lock-alert" 
                        placeholder="Activation Key" 
                        dense  
                        style="font-size: .9em;"
                        type="text"
                        class="mt-4 mx-8"
                        :rules="activationRules"
                        v-model.trim="formData.verification_code"
                        @keyup.enter.prevent="verifyCode"
                    ></v-text-field>
                  </v-form>
              </v-card-text>

              <v-card-actions class="">
                  <v-btn 
                    dark 
                    depressed 
                    text
                    class="text-caption text-capitalize ml-6" 
                    color="info" 
                    small 
                    :loading="loading"
                    @click="newKey"
                  >
                    <span class="text-capitalize font-weight-bold text-caption">resend code</span>
                    <template v-slot:loader>
                        <span class="text-caption font-weight-bold teal--text mr-2">sending...</span>
                        <span class="custom-loader">
                            <v-icon small light color="teal">mdi-cached</v-icon>
                        </span>
                    </template>
                  </v-btn>

                  <v-spacer></v-spacer>
                  <!-- Cnacel Dialog -->
                  

                  <!-- End of cancel dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-10" 
                    color="teal lighten-1" 
                    small 
                    :loading="activateLoading"
                    @click.stop="verifyCode"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">verify code</span>
                      <template v-slot:activateLoader>
                            <span class="custom-loader">
                                <v-icon small light color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>
              </v-card-actions>
        </v-card>

        <!-- Snack bar for the shwoing of the activation key -->
        <v-snackbar v-model="snackbar" :color="color" app elevation="2" bottom>
            <span class="text-caption font-weight-bold white--text">
                {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbbar -->

    </v-col>
</template>

<script>
// import map setters
import { mapState, mapGetters } from "vuex"
// import the uuid
import { v4 as uuidv4 } from "uuid"
// component definition
export default {
    name: 'PasswordCode',
    // layout
    layout: 'actions',
    // computed
    computed: {
        ...mapState('password', [
            'notificationMessage'
        ]),

        ...mapGetters('password', [
            'code',
            'email'
        ])
    },
    //data
    data: () => ({
        formData: {
            verification_code: ''
        },
        // password rules
        activationRules: [
            v => !!v || 'Activation Key is required',
            v => (v && v.length == 6) || 'Activation key must be 6 digits.'
        ],
        // snackbar
        snackbar: false,
        // message
        message: '',
        // color
        color: 'success',
        // loading
        loading: false,
        // loader
        loader: null,
        // loading
        activateLoading: false,
        // loader
        activateLoader: null,
        // valid
        valid: false,
        
    }),
    // methods for login in
    methods: {
        // function for requesting for a new activation key
        async newKey() {
            // set the loading to true
            this.loading = true
            // set the loading to loading
            this.loader = this.loading
            // make the request 
            await this.$axios.get('/password/code/resend', {
                params: {auth_email: this.email}
            })
                .then(response => {
                    // set the message
                    this.message = response.data.data.details
                    // set the color
                    this.color = "success"
                    // set the loading to false
                    this.loading = false
                    // set the loader to null
                    this.loader = null
                    // set the snakbar to true
                    this.snackbar = true
                })
                // catch error
                .catch(error => {
                    // check the error
                    if (error.response) {
                        // set the errormessg
                        this.message = error.response.data.errors.details
                    
                    } else {
                        // set the error message
                        this.message = 'There was a problem activating your account. Please try again later.'
                    }
                    // set the color
                    this.color = 'error lighten-1'
                     // set the loading to false
                    this.loading = false,
                    // set the loader to null
                    this.loader = null
                    // set the snackbar to true
                    this.snackbar = true
                })
        },

        // function for verifying
        async verifyCode() {
             // validate the form
            if (!this.$refs.form.validate()) return
            //set the loading to true
            this.activateLoading = true
            // set the loading to loading
            this.activateLoader = this.activateLoading
            // vrify the code
            await this.$axios.post('/password/code/verify', {verification_code: this.formData.verification_code, auth_email: this.email})
                // handle the result
                .then(({ status }) => {
                    // check the status
                    if (status == 200) {
                        // set a new uuid
                        this.$store.commit('password/SET_CODE', {code: uuidv4()})
                        // direct the user to the reset password page
                        this.$router.push({
                            path: `/account/password/${this.code}/new`
                        })
                        //set the loading to true
                        this.activateLoading = false
                        // set the loading to loading
                        this.activateLoader = null
                    }
                })
                // handle the error
                .catch(error => {
                    // check if the error has a response
                    if (error.response) {
                        // set the message
                        this.message = error.response.data.errors.details
                    } else {
                        this.message = "Failed. There was a problem verifying your code. Please check your connectiion and try again."
                    }
                    // set the color to red
                    this.color = "error"
                    //set the loading to true
                    this.activateLoading = false
                    // set the loading to loading
                    this.activateLoader = null
                    // set the snackbar to true
                    this.snackbar = true
                })
        }
    },
    // mounted
    mounted() {
        // set the message to the message
        this.message = this.notificationMessage
        // set the color
        this.color = "success"
        // show the snackbar
        this.snackbar = true
    }
}
</script>
