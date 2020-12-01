<template>
    <v-col md=6 class="ml-n3 mt-1">
        <v-card class="mx-auto" width="525" elevation="2">
              <v-card-title class="teal">
                  <v-icon dark left small>mdi-account-lock</v-icon>
                  <span class="caption font-weight-bold white--text ml-2">
                    Account Activation
                  </span>
              </v-card-title>

              <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                      <span class="text-caption font-weight-bold ml-5 teal--text">
                        Enter Activation Code sent to {{ $auth.user.auth_email }}
                    </span>
                    <!--Order type -->
                    <v-text-field 
                        prepend-icon="mdi-lock-alert" 
                        placeholder="Activation Key" 
                        dense  
                        style="font-size: .9em;"
                        type="text"
                        :rules="activationRules"
                        v-model.trim="formData.activation_key"
                        v-on:keyup.enter="activate"
                    ></v-text-field>
                  </v-form>
              </v-card-text>

              <v-card-actions class="">
                  <v-spacer></v-spacer>
                  <!-- Cnacel Dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    text
                    class="text-caption text-capitalize mr-3" 
                    color="info" 
                    small 
                    :loading="loading"
                    @click="newKey"
                  >
                    <span class="text-capitalize font-weight-bold text-caption">resend code</span>
                    <template v-slot:loader>
                        <span class="text-caption font-weight-bold success--text mr-2">sending...</span>
                        <span class="custom-loader">
                            <v-icon light color="success">mdi-cached</v-icon>
                        </span>
                    </template>
                  </v-btn>

                  <!-- End of cancel dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize" 
                    color="teal" 
                    small 
                    :loading="activateLoading"
                    @click.stop="activate"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">activate</span>
                      <template v-slot:activateLoader>
                            <span class="custom-loader">
                                <v-icon small light color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>
              </v-card-actions>
        </v-card>

        <!-- Snack bar for the shwoing of the activation key -->
        <v-snackbar v-model="snackbar" timeout="3000" :color="color" app class="mt-3" elevation="2">
            <span class="text-caption font-weight-bold black--text">
                {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbbar -->

    </v-col>
</template>

<script>
// import map setters
import { mapGetters } from "vuex"
export default {
    name: 'Activation',
    // layout
    layout: 'main',
    //data
    data: () => ({
        formData: {
            activation_key: ''
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
        color: 'success lighten-1',
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
        // login function
        async activate() {
            // validate the form
            if (!this.$refs.form.validate()) return
            //set the loading to true
            this.activateLoading = true
            // set the loading to loading
            this.activateLoader = this.activateLoading
            // send the data to the backend
            await this.$axios.post('/account/activate', { activation: this.formData})
                .then(({ data }) => {
                    // refetch the current user
                    this.$auth.fetchUser()
                        // only respond to the user once the user has being refetched
                        .then(() => {
                            // reset the route
                            this.$refs.form.reset()
                            // set the message
                            this.message = data.data.details
                            // set the loading to false
                            this.activateLoading = false,
                            // set the loader to null
                            this.activateLoader = null
                            // set the snackbar to true
                            this.snackbar = true
                            // redirect the user to the orders
                            this.$router.push({path: '/account/location'})
                        })
                    
                })
                // catch the error
                .catch(error => {
                    // check the error
                    if (error.response) {
                        // set the errormessg
                        this.message = error.response.data.errors.details
                    } else  {
                        // set the error message
                        this.message = 'There was a problem activating your account. Please request a new key and try again.'
                    }
                    // set the color
                    this.color = 'error lighten-1'
                    // set the loading to false
                    this.activateLoading = false,
                    // set the loader to null
                    this.activateLoader = null
                    // set the snackbar to true
                    this.snackbar = true
                })          
        },
        // function for requesting for a new activation key
        async newKey() {
            // set the loading to true
            this.loading = true
            // set the loading to loading
            this.loader = this.loading
            // make the request 
            await this.$axios.get('/account/activation/key/resend')
                .then(response => {
                    // set the message
                    this.message = response.data.data.details
                    // set the loading to false
                    this.loading = false
                    // set the loader to null
                    this.loader = null
                    // set the snakbar to true
                    this.snackbar = true
                    // return
                    return
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
        }
    }
}
</script>
