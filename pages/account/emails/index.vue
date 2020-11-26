<template>
    <v-col md=6 class="mt-3">
        <v-card elevation="2" class="mt-8">
              <v-card-title class="info darken-1">
                  <v-icon dark left small>mdi-email</v-icon>
                  <span class="text-caption font-weight-bold white--text">
                    Add Account Email Address Contact
                  </span>
              </v-card-title>

              <v-card-text class="mt-3">
                  <v-form ref="form" v-model="valid" lazy-validation>
                      <span class="text-caption font-weight-bold ml-10 teal--text">
                        Enter email address
                    </span>
                    <!--Order type -->
                    <v-text-field 
                        prepend-icon="mdi-email" 
                        placeholder="Email Address" 
                        dense 
                        class="mt-3 mb-2" 
                        style="font-size: .9em;"
                        type="email"
                        :rules="emailRules"
                        v-model="formData.email"
                    ></v-text-field>
                  </v-form>
              </v-card-text>

              <v-card-actions class="">
                  <v-spacer></v-spacer>
                  <!-- Cnacel Dialog -->

                  <!-- End of cancel dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-5" 
                    color="success" 
                    small 
                    @click.stop="addEmail"
                  >
                      <v-icon small left>mdi-save</v-icon>
                      <span class="text-capitalize font-weight-bold text-caption">save email</span>
                      <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon light color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>

                  <!-- End of cancel dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-3" 
                    color="info" 
                    small 
                    @click.stop="() => $router.push({path: '/account/phones'})"
                  >
                      <v-icon small left>mdi-arrow-right</v-icon>
                      <span class="text-capitalize font-weight-bold text-caption">continue</span>
                  </v-btn>
              </v-card-actions>
        </v-card>

         <!-- Snack bar for the shwoing of the activation key -->
        <v-snackbar v-model="snackbar" timeout="2000" :color="color" top app class="mt-3" elevation="2">
            <span class="text-caption font-weight-bold black--text">
                {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbbar -->

    </v-col>
</template>

<script>
// component definition
export default {
    name: 'Activation',
    // layout
    layout: 'main',
    //data
    data: () => ({
        formData: {
            email: ''
        },
        // email rules
        emailRules: [
            v => !!v || 'Email Address is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        // snackbar
        snackbar: true,
        // errorMessage
        message: '',
        // color
        color: 'success lighten-1',
        // loading
        loading: false,
        // loader
        loader: null,
        // valid
        valid: false,
        
    }),
    // methods for login in
    methods: {
        // login function
        async addEmail() {
            // validate the form
            if (!this.$refs.form.validate()) return
            //set the loading to true
            this.loading = true
            // set the loading to loading
            this.loader = this.loading
            // send the data to the backend
            await this.$axios.post('/user/profile/emails', {
                user_profile: {
                    new_email: this.formData.email
                }
            })
            .then(response => {
                // set the message
                this.message = 'Success. Your have successfully added an email address. You can add another email or click continue to proceed.'
                // set the loading to false
                this.loading = false,
                // set the loader to null
                this.loader = null
                // show the snackbar
                this.snackbar = true
                // redirect the user to the orders
                this.$router.push({path: '/account/phones'})
            })
            // catch the error
            .catch(error => {
                console.log(err)
                // check the error
                if (error.response) {
                    // set the errormessg
                    this.errorMessage = error.response.data.errors.details
                } else {
                    // set the error message
                    this.message = 'There was a problem adding the email address. Please try again later.'
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