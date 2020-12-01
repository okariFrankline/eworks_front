<template>
    <v-col md=6 class="ml-n3 mt-1">
        <v-card class="mx-auto" width="525" elevation="2">
              <v-card-title class="teal">
                  <v-icon dark left small>mdi-account-details</v-icon>
                  <span class="text-caption font-weight-bold white--text">
                    Add Detailed Description about who you are and your professional experience
                  </span>
              </v-card-title>

              <v-card-text class="mt-3">
                  <v-form ref="form" v-model="valid" lazy-validation v-on:keyup:enter="addDescription">
                    <span class="text-caption font-weight-bold info--text"> 
                      Current word count:  {{ wordCount() }} / 200
                    </span>
                  <!-- Options for the category -->
                  <v-textarea  
                    :hint="hint"
                    auto-grow 
                    placeholder="Professional Details" 
                    dense 
                    class="mt-1"  
                    style="font-size: .9em;"
                    v-model="formData.description"
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
                    class="text-caption text-capitalize" 
                    color="teal" 
                    small 
                    :loading="loading"
                    @click.stop="addDescription"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">save about</span>
                      <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon light small color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>

                  <!-- End of cancel dialog -->
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
// component definition
export default {
    name: 'UserAbout',
    // layout
    layout: 'main',
    //data
    data: () => ({
        formData: {
            description: ''
        },
        // description form
        descriptionRules: [
            v => !!v || 'Description is required.',
            v => (v && v.split(/\s+/).length - 1 == 200) || 'Description has to have a minimum of 300 words.'
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
        // hint
        hint: `
            Your Description should include: 
                1. A full introduction of who you are, including your name\n
                2. A detailed description of your profession, skills, experience and any other professional information necessary\n
                3. An explanation of why you are the best in your field and why the client should hire you for their job\n
                4. Any other information you may find necessay for the client to know about you to aid in their hiring you.
        `
        
    }),
    // methods for login in
    methods: {
        // function for returning the current word count
        wordCount() {
            if (this.formData.description) {
                // return the word count
                return this.formData.description.split(/\s+/).length - 1
            } else{
                // return 0
                return 0
            }
        },
        // login function
        async addDescription() {
            // validate the form
            if (!this.$refs.form.validate()) return
            //set the loading to true
            this.loading = true
            // set the loading to loading
            this.loader = this.loading
            // send the data to the backend
            await this.$axios.post('/user/profile/intro', {
                user_profile: {
                    professional_intro: this.formData.description
                }
            })
            .then(response => {
                 // refetch the current user
                this.$auth.fetchUser()
                    // only respond to the user once the user has being refetched
                    .then(() => {
                        // reset the route
                        this.$refs.form.reset()
                        // set the loading to false
                        this.loading = false,
                        // set the loader to null
                        this.loader = null
                        // redirect the user to the orders
                        this.$router.push({path: '/account/profile/picture'})
                    })
            })
            // catch the error
            .catch(error => {
                // check the error
                if (error.response) {
                    // set the errormessg
                    this.errorMessage = error.response.data.errors.details
                } else {
                    // set the error message
                    this.message = 'There was a problem saving your description. Please try again later.'
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