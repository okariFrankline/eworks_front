<template>
    <v-col md=6 class="ml-n3 mt-1">
        <v-card class="mx-auto" width="525" elevation="2">
              <v-card-title class="teal">
                  <v-icon dark left small>mdi-phone-classic</v-icon>
                  <span class="text-caption font-weight-bold white--text">
                    Add Account Phone Number Contact
                  </span>
              </v-card-title>

              <v-card-text class="mt-3">
                  <v-form ref="form" v-model="valid" lazy-validation v-on:submit.prevent>
                      <span class="text-caption font-weight-bold ml-10 teal--text">
                        Enter phone number
                    </span>
                    <!--Order type -->
                    <v-text-field 
                        prepend-icon="mdi-phone-classic" 
                        placeholder="Phone Number" 
                        dense 
                        class="mt-1" 
                        style="font-size: .9em;"
                        type="email"
                        :rules="phoneRules"
                        v-model.trim="formData.phone"
                        v-on:keyup.enter.prevent="addPhone"
                    ></v-text-field>
                  </v-form>
              </v-card-text>

              <v-card-actions class="mt-n2">
                  <v-spacer></v-spacer>

                  <!-- End of cancel dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-4" 
                    color="teal lighten-1" 
                    small 
                    :loading="loading"
                    @click.stop="addPhone"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">save phone</span>
                      <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon small light color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>
              </v-card-actions>
        </v-card>

         <!-- Snack bar for the shwoing of the activation key -->
        <v-snackbar v-model="snackbar" timeout="5000" :color="color" top app class="mt-3" elevation="2">
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
            phone: ''
        },
        // email rules
        phoneRules: [
            v => !!v || 'Phone number is required'
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
        async addPhone() {
            // validate the form
            if (!this.$refs.form.validate()) return
            //set the loading to true
            this.loading = true
            // set the loading to loading
            this.loader = this.loading
            // send the data to the backend
            await this.$axios.post('/user/update/phone', {
                phone: this.formData.phone
            })
            .then(response => {
                // refetch the current user
                this.$auth.fetchUser()
                    .then(() => {
                        // get the user type of the current user
                        let userType = this.$auth.user.user_type
                        // reset the form
                        this.$refs.form.reset()
                        // set the loading to false
                        this.loading = false,
                        // set the loader to null
                        this.loader = null
                        // redirect the user to the orders
                        userType == "Client" ? this.$router.push({path: '/account/profile/picture'}) : this.$router.push({path: '/account/skills'})
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
                    this.message = 'There was a problem adding your phone number. Please try again later.'
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