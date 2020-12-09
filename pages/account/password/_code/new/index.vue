<template>
    <v-col md=6 class="mt-8">
        <v-card elevation="2" width="500">
              <v-card-title class="teal lighten-1">
                  <v-row justify="center">
                      <v-icon dark left color="white">mdi-account-lock</v-icon>
                        <span class="text-caption font-weight-bold white--text ml-3">
                            Account Password Reset
                        </span>
                  </v-row>
              </v-card-title>


              <v-card-text class="mt-5">
                  <v-form ref="form" lazy-validation @submit.prevent>

                    <span class="text-caption font-weight-bold ml-7 teal--text">
                        Enter your new password
                    </span>
                    <!-- Options for the category -->
                    <v-text-field 
                        prepend-icon="mdi-eye-off"
                        placeholder="Password" 
                        dense 
                        class="mt-2 mb-2 mx-8" 
                        style="font-size: .9em;"
                        type="password"
                        :rules="passwordRules"
                        v-model.trim="formData.password"
                        v-on:keyup.enter.prevent="resetPassword"
                    ></v-text-field>
                  <!-- End of the options for the category -->

                    <span class="text-caption font-weight-bold ml-7 teal--text">
                        Re-enter your new password
                    </span>
                    <!-- Options for the category -->
                    <v-text-field 
                        prepend-icon="mdi-eye-off"
                        dense class="mt-3 mx-8" 
                        style="font-size: .9em;"
                        type="password"
                        placeholder="Re-enter your password"
                        :rules="passwordRules"
                        v-model.trim="formData.password_conf"
                        v-on:keyup.enter.prevent="resetPassword"
                    ></v-text-field>
                  <!-- End of the options for the category -->
                  </v-form>
              </v-card-text>

              <v-card-actions class="mt-n4">
                  <v-spacer></v-spacer>
                  
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-8" 
                    color="teal lighten-1" 
                    small 
                    :loading="loading" 
                    @click="resetPassword"
                >
                      <span class="text-capitalize font-weight-bold text-caption mr-1">reset password</span>
                      <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon small light color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>
              </v-card-actions>
        </v-card>

        <!-- Snackbar for error while activation -->
        <v-snackbar v-model="snackbar" :color="color" app elevation="2">
            <span class="text-caption font-weight-bold">
                {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbar -->
    </v-col>
</template>

<script>
// import map state
import { mapGetters } from "vuex"
// component defintion
export default {
    name: 'PasswordReset',
    // layout
    layout: 'actions',
    // computed
    computed: {
        ...mapGetters('password', [
            'code',
            'email'
        ])
    },
    //data
    data: () => ({
        formData: {
            password: '',
            password_conf: ''
        },
        // password rules
        passwordRules: [
            v => !!v || ' Password is required',
            v => (v && v.length >= 8) || 'Password must be less than 8 characters'
        ],
        loading: false,
        // loder
        loader: null,
        // snckbar error
        snackbar: false,
        // error message
        message: '',
        // color
        color: 'success lighten-1'
    }),
    // methods for login in
    methods: {
        // login function
        async resetPassword() {
            // decouple the formdata
            const { password, password_conf } = this.formData
            // validate the form
            if (!this.$refs.form.validate()) return
            // ensure the passwords are similar
            if (password !== password_conf) {
                // set the message
                this.message = "The passwords entered do not match."
                // set the color
                this.color = "error lighten-1"
                // set snackbar to true
                this.snackbar = true
                // return
                return
            }
            // set the is loading to true
            this.loading = true
            // set the register button to disabled
            this.loader = this.loading
            // create a new user
            await this.$axios.post('/password/new', {password: password, auth_email: this.email})
                .then(({ data }) => {
                    // set the message
                    this.$store.commit('password/SET_MESSAGE', {message: data.data.details})
                    // delete the items in the local storage
                    localStorage.removeItem('eworks-password-reset-code')
                    // set the email to null
                    localStorage.removeItem('eworks-password-reset-email')
                    // redirect the user to login page
                    this.$router.push({
                        path: '/account/login'
                    })
                    // set loading
                    this.loading = false
                    // set the loader
                    this.loader = null
                })
                .catch((error) => {
                    // check if the error has a response
                    if (error.response) {
                        // set the message
                        this.message = error.data.errors.details
                    } else {
                        this.message = "Failed. There was a problem resetting your password. Please try again."
                    }
                    // set teh caolor
                    this.color = "error lighten-1"
                    // set loading
                    this.loading = false
                    // set the loader
                    this.loader = null
                    // show the snackbar
                    this.snackbar = true
                    
                })
        }
    }
}
</script>
