<template>
    <v-col md=6 class="mt-10 ml-2">
        <v-card elevation="2" width="500">
              <v-card-title class="info darken-1">
                  <v-icon dark left class="ml-5">mdi-account-lock</v-icon>
                  <span class="text-body-2 font-weight-bold white--text ml-3">
                    Account Login
                  </span>
              </v-card-title>

              <v-card-text class="mt-3">
                  <v-form ref="loginForm" v-model="valid" lazy-validation>
                      <span class="text-caption font-weight-bold ml-10 teal--text">
                        Enter your Email Address
                    </span>
                    <!--Order type -->
                    <v-text-field 
                        prepend-icon="mdi-email-lock" 
                        placeholder="Email Address" 
                        dense 
                        class="mt-3 mb-2" 
                        style="font-size: .9em;"
                        type="email"
                        :rules="emailRules"
                        v-model="formData.auth_email"
                    ></v-text-field>

                    <span class="text-caption font-weight-bold ml-10 teal--text">
                        Enter your password
                    </span>
                    <!-- Options for the category -->
                    <v-text-field 
                        prepend-icon="mdi-account-lock" 
                        placeholder="Password" 
                        dense class="mt-3" style="font-size: .9em;"
                        type="password"
                        :rules="passwordRules"
                        v-model="formData.password"
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
                    class="text-caption text-capitalize mr-3 ml-2" 
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
                  >
                    <span class="text-capitalize font-weight-bold text-caption">forgot password?</span>
                  </v-btn>
                  
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-2" 
                    color="info" 
                    small 
                    @click.stop="login"
                    :loading="loading"
                >
                      <v-icon small left>mdi-login</v-icon>
                      <span class="text-capitalize font-weight-bold text-caption">login</span>
                        <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon light color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>
              </v-card-actions>
        </v-card>

        <!-- Snackbar for error while activation -->
        <v-snackbar v-model="error" color="error lighten-1" app elevation="2" timeout="5000">
            <span class="text-caption font-weight-bold">
                {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbar -->
    </v-col>
</template>

<script>
export default {
    name: 'Login',
    // layout
    layout: 'actions',
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
        error: false,
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
                    console.log(err.response)
                    // get the data
                    // let { data } = err.response
                    // // set the mesage
                    // this.message = errors.details
                } else {
                    console.log(err)
                    // set the message
                    this.message = "Sorry. There was a problem logging you in. Please try again later"
                }
                // set the error to tur
                this.loading = false
                // set the loader to null
                this.loader = null
                // set the error to true
                this.error = true
            })
        }
    }
}
</script>