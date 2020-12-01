<template>
    <v-col md=6 class="mt-8">
        <v-card elevation="2">
              <v-card-title class="teal">
                  <v-icon dark left class="ml-2">mdi-account-plus</v-icon>
                  <span class="text-body-2 font-weight-bold white--text ml-3">
                    Create Account
                  </span>
              </v-card-title>

              <v-card-text class="mt-3">
                  <v-form ref="form" v-model="valid" lazy-validation v-on:submit.prevent>
                      <v-row>
                            <v-col md=6 class="mt-n3">
                                <span class="text-caption font-weight-bold ml-7 teal--text">
                                    Registering as
                                </span>
                                <v-select 
                                    :items="userTypes" 
                                    prepend-icon="mdi-account-question" 
                                    placeholder="Regstering as a" 
                                    dense 
                                    class="mt-1" 
                                    item-text="name" 
                                    item-value="name" 
                                    style="font-size: .9em;" 
                                    :rules="userTypeRules"
                                    v-model.trim="new_user.user_type"
                                    v-on:keyup.enter.prevent="register"
                                ></v-select>
                            </v-col>

                            <v-col md=6 class="mt-n3">
                                <span class="text-caption font-weight-bold ml-7 teal--text">
                                    Are you a company?
                                </span>
                                <v-select 
                                    :items="companyTypes" 
                                    prepend-icon="mdi-office-building" 
                                    placeholder="Am I a company?" 
                                    dense 
                                    class="mt-1" 
                                    item-text="name" 
                                    item-value="value" 
                                    style="font-size: .9em;" 
                                    v-model.trim="new_user.is_company"
                                    v-on:keyup.enter.prevent="register"
                                ></v-select>
                            </v-col>
                    </v-row>

                    <v-row class="mb-n3">
                    
                        <v-col md=6 class="mt-n5">
                            <span class="text-caption font-weight-bold ml-7 teal--text">
                                Enter your Full Name
                            </span>
                            <v-text-field 
                                prepend-icon="mdi-account-tie" 
                                placeholder="Full name" 
                                dense 
                                class="mt-1 mb-2" 
                                style="font-size: .9em;"
                                type="text"
                                :rules="nameRules"
                                v-model.trim="new_user.full_name"
                                v-on:keyup.enter.prevent="register"
                            ></v-text-field>
                        </v-col>

                        <v-col md=6 class="mt-n5">
                            <span class="text-caption font-weight-bold ml-7 teal--text">
                                Enter your Email address
                            </span>
                            <!-- Options for the category -->
                            <v-text-field 
                                prepend-icon="mdi-email" 
                                placeholder="Email address" 
                                dense class="mt-1" 
                                style="font-size: .9em;"
                                type="email"
                                :rules="emailRules"
                                v-model.trim="new_user.auth_email"
                                v-on:keyup.enter.prevent="register"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <span class="text-caption font-weight-bold ml-7 teal--text">
                        Enter your password
                    </span>
                    <!-- Options for the category -->
                    <v-text-field 
                        prepend-icon="mdi-account-lock" 
                        placeholder="Password" 
                        dense class="mt-1" style="font-size: .9em;"
                        type="password"
                        :rules="passwordRules"
                        v-model.trim="new_user.password"
                        v-on:keyup.enter="register"
                    ></v-text-field>
                  <!-- End of the options for the category -->
                  </v-form>
              </v-card-text>

              <v-card-actions class="mt-n4">
                  <!-- Cnacel Dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    text
                    class="text-caption text-capitalize ml-5" 
                    color="info" 
                    small 
                    @click="() => this.$router.push({path: '/account/login'})"
                  >
                    <span class="text-capitalize font-weight-bold text-caption">already have an account?</span>
                  </v-btn>
                  <!-- End of cancel dialog --> 
                  <v-spacer></v-spacer>
                  
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-3" 
                    color="teal lighten-1" 
                    small 
                    :loading="loading" 
                    @click="register"
                >
                      <v-icon small left>mdi-account-plus</v-icon>
                      <span class="text-capitalize font-weight-bold text-caption mr-1">create</span>
                      <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon light color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>
              </v-card-actions>
        </v-card>

        <!-- Snackbar for error while activation -->
        <v-snackbar v-model="snackbarError" color="error" app elevation="2" timeout="-1">
            <span class="text-caption font-weight-bold">
                {{ errorMessage }}
            </span>
        </v-snackbar>
        <!-- End of snackbar -->
    </v-col>
</template>

<script>
export default {
    name: 'Register',
    // layout
    layout: 'actions',
    //data
    data: () => ({
        new_user: {
            full_name: '',
            is_company: false,
            user_type: '',
            password: '',
            auth_email: ''

        },
        // items
        userTypes: [
            {
                name: 'Independent Contractor'
            },
            {
                name: 'Client'
            }
        ],
        // company types
        companyTypes: [
            {
                name: 'Yes', value: true
            },
            {
                name: 'No', value: false
            }
        ],
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
        // full_name rules
        nameRules: [
            v => !! v || 'Full name is required.'
        ],
        userTypeRules: [
            v => !!v || 'User Type is required.'
        ],
        // disabled
        loading: false,
        // valid
        valid: false,
        // loder
        loader: null,
        // snckbar error
        snackbarError: false,
        // error message
        errorMessage: ''
    }),
    // methods for login in
    methods: {
        // login function
        async register() {
            // validate the form
            if (!this.$refs.form.validate()) return
            // set the is loading to true
            this.loading = true
            // set the register button to disabled
            this.loader = this.loading
            // create a new user
            await this.$axios.post('/account/register', { user: this.new_user })
                .then(response => {
                    // login the user
                    this.$auth.loginWith('local', {
                        // data for the login
                        data: {
                            credentials: {
                                password: this.new_user.password,
                                auth_email: this.new_user.auth_email
                            }
                        }
                    })
                    // add a dot then
                    .then(result => {
                        // reset the form
                        this.$refs.form.reset()
                        // set loading to false
                        this.loading = false
                        // set the loader to null
                        this.loader = null
                        // dispath actin to set activaton message
                        this.$store.commit('miscelleneous/setActivationMessage', {message: response.data.data.message})
                        // redirect the user to the activation page
                        this.$router.push({path: '/account/activation'})
                    })
                    // error
                    .catch(error => {
                        // check if there was a response
                        if (error.response) {
                            console.log(error.response)
                            // set the loading to false
                            this.loading = false
                            // set the loader to null
                            this.loader = null
                            // error message
                            // this.errorMessage = error.response.errors.details
                            // // show the snackbar
                            // this.snackbarError = true
                            // return 
                            return
                        } else if (error.request) {
                            // set the loading to false
                            this.loading = false
                            // set the loader to null
                            this.loader = null
                            // error message
                            this.errorMessage = 'There was a problem loggin you in. Please login manually.'
                            // show the snackbar
                            this.snackbarError = true
                            // return 
                            return
                        } else {
                            // set the loading to false
                            this.loading = false
                            // set the loader to null
                            this.loader = null
                            // error message
                            this.errorMessage = 'There was a problem loggin you.'
                            // show the snackbar
                            this.snackbarError = true
                            // return 
                            return
                        }
                    })
                })
                .catch(error => {
                    // check there was a response
                    if (error.response){
                        console.log(error.response)
                        // set the loading to false
                        this.loading = false
                        // set the loader to null
                        this.loader = null
                        // error message
                        this.errorMessage = error.response.data.errors.details
                        // show the snackbar
                        this.snackbarError = true
                        // return 
                        return
                    } else {
                        // set the loading to false
                        this.loading = false
                        // set the loader to null
                        this.loader = null
                        // error message
                        this.errorMessage = 'There was a problem creating your account. Please try again.'
                        // show the snackbar
                        this.snackbarError = true
                        // return 
                        return
                    }
                })
        }
    }
}
</script>
