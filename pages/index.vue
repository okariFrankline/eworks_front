<template>
    <v-col md=6 class="mt-10 ml-2">
        <v-card elevation="2" width="500">
              <v-card-title class="teal lighten-1">
                  <v-row justify="center">
                    <v-icon dark left>mdi-login</v-icon>
                    <span class="text-body-2 font-weight-bold white--text ml-2">
                        Account Login
                    </span>
                  </v-row>
              </v-card-title>

              <v-card-text class="mt-3">
                  <v-form ref="loginForm" v-model="valid" lazy-validation v-on:submit.prevent>
                      <span class="text-caption font-weight-bold ml-7 teal--text">
                        Enter your Email Address
                    </span>
                    <!--Order type -->
                    <v-text-field 
                        prepend-icon="mdi-email-lock" 
                        placeholder="Email Address" 
                        dense 
                        class="mt-3 mb-2 mx-8" 
                        style="font-size: .9em;"
                        type="email"
                        :rules="emailRules"
                        v-model.trim="formData.auth_email"
                        v-on:keyup.enter.prevent="login"
                    ></v-text-field>

                    <span class="text-caption font-weight-bold ml-7 teal--text">
                        Enter your password
                    </span>
                    <!-- Options for the category -->
                    <v-text-field 
                        prepend-icon="mdi-account-lock" 
                        placeholder="Password" 
                        dense 
                        class="mt-3 mx-8" 
                        style="font-size: .9em;"
                        type="password"
                        :rules="passwordRules"
                        v-model.trim="formData.password"
                        v-on:keyup.enter.prevent="login"
                    ></v-text-field>
                  <!-- End of the options for the category -->
                  </v-form>
              </v-card-text>

              <v-card-actions class="">
                  <!-- Cnacel Dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    text
                    class="text-caption text-capitalize ml-6" 
                    color="info" 
                    small 
                    @click="() => this.$router.push({path: '/account/register'})"
                  >
                    <span class="text-capitalize font-weight-bold text-caption">don't have an account?</span>
                  </v-btn>
                  <!-- End of cancel dialog -->
                  
                  <v-spacer></v-spacer>
                  <v-btn 
                    dark 
                    depressed 
                    text
                    class="text-caption text-capitalize ml-7 mr-2" 
                    color="error" 
                    small 
                    @click="forgotPassword"
                  >
                    <span class="text-capitalize font-weight-bold text-caption">forgot password?</span>
                  </v-btn>
                  
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-6" 
                    color="teal lighten-1" 
                    small 
                    @click.stop="login"
                    :loading="loading"
                >
                      <v-icon small left>mdi-login</v-icon>
                      <span class="text-capitalize font-weight-bold text-caption">login</span>
                        <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon small light color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>
              </v-card-actions>
        </v-card>

        <!-- Snackbar for error while activation -->
        <v-snackbar v-model="snackbar" :color="color" app elevation="2" bottom>
            <span class="text-caption font-weight-bold white--text">
                {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbar -->
    </v-col>
</template>

<script>
// import the uuid
import { v4 as uuidv4 } from "uuid"
// import mapstate
import { mapState, mapGetters } from "vuex"
// component definition
export default {
    name: 'Login',
    // layout
    layout: 'actions',
    // head
    head: {
        // title
        title: 'login page',
        // meta
        meta: [
            // head
            {
                hid: 'login-base',
                name: 'description',
                content: `Login to Eworks, get assigned orders and get paid instantly upon completion`
            }
        ]
    },
    // computed
    computed: {
        ...mapState('password', [
            'notificationMessage'
        ]),

        ...mapGetters('password', [
            'code'
        ])
    },
    //data
    data: () => ({
        formData: {
            auth_email: '',
            password: ''

        },
        // valid
        valid: false,
        // email rules
        emailRules: [
            v => !!v || 'Email Address is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        // password rules
        passwordRules: [
            v => !!v || ' Password is required',
            v => (v && v.length >= 8) || 'Password must be less than 8 characters'
        ],
        // loading
        loading: false,
        // loader
        loader: null,
        // error
        snackbar: false,
        // set the cokor
        color: 'success',
        // error message
        message: ''
    }),
    // methods for login in
    methods: {
        // login function
        async login() {
            // validate the form
            if (!this.$refs.loginForm.validate()) return
            // set the loading to true
            this.loading = true
            // set loader to lading
            this.loader = this.loading
            // login into the account
            await this.$auth.loginWith('local', {
                // data for the login
                data: {
                    credentials: {
                        auth_email: this.formData.auth_email,
                        password: this.formData.password
                    }
                }
            })
            // redirect the user to the ordes page
            .then(result => {
                // reset the form
                this.$refs.loginForm.reset()
                // set loading to false
                this.loading = false
                // set the loader to null
                this.loader = null
                // redirect the user to the activation page
                this.$router.push({path: '/orders'})
            })
            // handle login errors
            .catch(err => {
                //console.log(err)
                // check if the error has a response
                if (err.response) {
                    // get the data
                    let { data } = err.response
                    // // set the mesage
                    this.message = data.errors.details
                } else {
                    // set the message
                    this.message = "Sorry. There was a problem logging you in. Please try again later"
                }
                // set the color
                this.color = 'error'
                // set the error to tur
                this.loading = false
                // set the loader to null
                this.loader = null
                // set the error to true
                this.snackbar = true
            })
        },

        // function for handling forgot passwrord
        forgotPassword() {
            console.log('Called')
            // generate a new unique code and add it to the password state
            this.$store.commit('password/SET_CODE', {code: uuidv4()})
            // once this has being set, direct the user to the email page
            this.$router.push({
                path: `/account/password/${this.code}/email`
            })   
        }
    },

    // mounted
    mounted() {
        // check if the notification message is available
        if (this.notificationMessage != null) {
            // set the message
            this.message = this.notificationMessage
            // set the color
            this.color = "success"
            // show the snckbar
            this.snackbar = true
        }
    }
}
</script>