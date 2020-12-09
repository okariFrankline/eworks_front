<template>
    <v-col md=6 class="mt-8">
        <v-card elevation="2" class="mt-8" width="500">
              <v-card-title class="teal lighten-1">
                  <v-row justify="center">
                    <v-icon dark left>mdi-lock-reset</v-icon>
                    <span class="text-body-2 font-weight-bold white--text ml-1">
                        Reset Account Password
                    </span>
                  </v-row>
              </v-card-title>

              <v-card-text class="mt-5">
                  <v-form ref="form" lazy-validation @submit.prevent>
                      <span class="text-caption font-weight-bold ml-6 teal--text">
                        Enter your account's email address
                    </span>
                    <!--Order type -->
                    <v-text-field 
                        prepend-icon="mdi-email" 
                        placeholder="Email Address" 
                        dense 
                        class="mt-3 mb-2 mx-8" 
                        style="font-size: .9em;"
                        type="email"
                        :rules="emailRules"
                        v-model.trim="formData.email"
                        @keydown.enter.prevent="confirmEmail"
                    ></v-text-field>
                  </v-form>
              </v-card-text>

              <v-card-actions class="mt-n3">
                  <v-spacer></v-spacer>

                  <!-- End of cancel dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-10" 
                    color="teal lighten-1" 
                    small 
                    :loading="loading"
                    @click.stop="confirmEmail"
                  >
                    <span class="text-capitalize font-weight-bold text-caption">continue</span>
                    <template v-slot:loader>
                        <span class="custom-loader">
                            <v-icon small light color="white">mdi-cached</v-icon>
                        </span>
                    </template>
                  </v-btn>
              </v-card-actions>
        </v-card>

         <!-- Snack bar for the shwoing of the activation key -->
        <v-snackbar v-model="snackbar" :color="color" app  elevation="2" bottom>
            <span class="text-caption font-weight-bold white--text">
                {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbbar -->

    </v-col>
</template>

<script>
// import the uuid
import { v4 as uuidv4 } from "uuid"
// import mapstate
import { mapState } from "vuex"
// component definition
export default {
    name: 'PasswordEmail',
    // layout
    layout: 'actions',
    // head
    head: {
        title: 'password reset'
    },
    // validate function for route
    // validate({ params, redirect}) {
    //     // ensure the code from params is similar to the one stored in local storage
    //     if ( params.code == localStorage.getItem('eworks-password-reset-code')) {
    //         return true
    //     }
    //     redirect('/account/login')
    // },
    // computed
    computed: {
        ...mapState('password', [
            'code'
        ])
    },
    //data
    data: () => ({
        formData: {
            email: ''
        },
        // email rules
        emailRules: [
            v => !!v || 'Email Address is required',
            v => /.+@.+\..+/.test(v) || 'Enter a valid email address',
        ],
        // snackbar
        snackbar: false,
        // errorMessage
        message: '',
        // color
        color: 'success lighten-1',
        // loading
        loading: false,
        // loader
        loader: null
        
    }),
    // methods for login in
    methods: {
        // function for entering the code sent
        async confirmEmail() {
            // validate the form
            if (!this.$refs.form.validate()) return
            // set the loading to true
            this.loading = true
            // set the loader
            this.loader = this.loading
            // confirm the email address
            await this.$axios.post('/password/email/confirmation', {auth_email: this.formData.email})
                .then(({ status, data }) => {
                    // check the status
                    if (status = 200) {
                        // set the new uuid for the password
                        this.$store.commit('password/SET_CODE', {code: uuidv4()})
                        // set the email address
                        this.$store.commit('password/SET_EMAIL', {email: this.formData.email})
                        // set the message
                        this.$store.commit('password/SET_MESSAGE', {message: data.data.details})
                        // direct the user to the password code page
                        this.$router.push({
                            path: `/account/password/${this.code}/code`
                        })
                        // reset the form
                        this.$refs.form.reset()
                        // set the loading to false
                        this.loading = false
                        // set the loader to null
                        this.loader = null
                    }
                })
                .catch(error => {
                    console.log(error)
                    // check if the error has a response
                    if (error.response) {
                        // set the message
                        this.message = error.response.data.errors.details
                    } else {
                        this.message = "Failed. There was a problem completing the request. Please check your connectiion and try again."
                    }
                    // set the color to red
                    this.color = "error"
                    // set the loading to true
                    this.loading = false
                    // set the loader to null
                    this.laoder = null
                    // set the snackbar to true
                    this.snackbar = true
                })
        }
    },
    // mounted
    mounted() {
        // store the email address 
    }
}
</script>