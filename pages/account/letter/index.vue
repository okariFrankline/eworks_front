<template>
    <v-col md=8>
        <v-card elevation="2" class="mt-8">
              <v-card-title class="info darken-1">
                  <v-icon dark left>mdi-account-lock</v-icon>
                  <span class="text-body-2 font-weight-bold white--text">
                    Add Account Cover Letter
                  </span>
              </v-card-title>

              <v-card-text class="mt-3">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <span class="text-caption font-weight-bold teal--text">
                      Add your account's cover letter, which will be visible for every offer that you submit
                  </span>
                  <!-- Options for the category -->
                  <v-textarea  
                    placeholder="Account Cover Letter" 
                    counter="5000" 
                    dense 
                    class="mt-3"  
                    style="font-size: .9em;"
                    v-model="formData.letter"
                    :rules="descriptionRules"
                  ></v-textarea>
                  </v-form>
              </v-card-text>

              <v-card-actions class="">
                  <v-spacer></v-spacer>
                  <!-- Cnacel Dialog -->

                  <!-- End of cancel dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-4" 
                    color="success" 
                    small 
                    @click.stop="addCoverLetter"
                  >
                      <v-icon small left>mdi-arrow-right</v-icon>
                      <span class="text-capitalize font-weight-bold text-caption">save letter</span>
                      <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon light color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>

                  <!-- End of cancel dialog -->
              </v-card-actions>
        </v-card>

         <!-- Snack bar for the shwoing of the activation key -->
        <v-snackbar v-model="snackbar" timeout="3000" :color="color" app elevation="2">
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
    name: 'UserAbout',
    // layout
    layout: 'main',
    //data
    data: () => ({
        formData: {
            letter: ''
        },
        // description form
        descriptionRules: [
            v => !!v || 'Cover letter is required.',
            v => (v && v.length >= 200) || 'Cover letter has to have a minimum of 200 characters.'
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
        loader: null,
        // valid
        valid: false,
        
    }),
    // methods for login in
    methods: {
        // login function
        async addCoverLetter() {
            // validate the form
            if (!this.$refs.form.validate()) return
            //set the loading to true
            this.loading = true
            // set the loading to loading
            this.loader = this.loading
            // send the data to the backend
            await this.$axios.post('/user/profile/letter', {
                user_profile: {
                    cover_letter: this.formData.letter
                }
            })
            .then(response => {
                // reset the form
                this.$refs.form.reset()
                // set the loading to false
                this.loading = false,
                // set the loader to null
                this.loader = null
                // redirect the user to the orders
                this.$router.push({path: '/orders'})
            })
            // catch the error
            .catch(error => {
                // check the error
                if (error.response) {
                    // set the errormessg
                    this.errorMessage = error.response.data.errors.details
                } else {
                    // set the error message
                    this.message = 'There was a problem saving your cover letter. Please try again later.'
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