<template>
    <v-col md=6 class="ml-n3 mt-1">
        <v-card class="mx-auto" width="525" elevation="2">
              <v-card-title class="teal">
                  <v-icon dark left small>mdi-account-lock</v-icon>
                  <span class="caption font-weight-bold white--text ml-2">
                    Independent Contractor Skills
                  </span>
              </v-card-title>

              <v-card-text class="mt-1">
                  <v-form ref="form" v-model="valid" lazy-validation>
                      <span class="text-caption font-weight-bold ml-5 teal--text">
                        Select your professional skill set
                    </span>
                    <!--Order type -->
                    <v-select 
                        :items="skills" 
                        prepend-icon="mdi-playlist-edit" 
                        placeholder="Choose Job Category" 
                        dense 
                        multiple
                        class="mt-1" 
                        item-text="name" 
                        item-value="name" 
                        style="font-size: .9em;" 
                        :rules="selectRules"
                        v-model.trim="formData.skills"
                        v-on:keyup.enter="addSkills"
                    ></v-select>

                    <template v-if="formData.skills.includes('Other')">
                        <span class="text-caption font-weight-bold ml-5 teal--text">
                            Add your other skills seperated by a comma
                        </span>
                        <!--Order type -->
                        <v-text-field 
                            prepend-icon="mdi-playlist-edit" 
                            placeholder="Internal Designer, Potrait Artist, Driver" 
                            dense  
                            style="font-size: .9em;"
                            type="text"
                            v-model.trim="formData.otherSkills"
                            v-on:keyup.enter="addSkills"
                        ></v-text-field>
                    </template>
                  </v-form>
              </v-card-text>

              <v-card-actions class="">
                  <v-spacer></v-spacer>

                  <!-- End of cancel dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-4" 
                    color="teal" 
                    small 
                    :loading="loading"
                    @click.stop="addSkills"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">save skills</span>
                      <template v-slot:loader>
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
import { mapState } from "vuex"
export default {
    name: 'Activation',
    // layout
    layout: 'main',
    // computed
    computed: {
        // get the select options
      ...mapState('select', {
        skills: state => state.skills
      }),
    },
    //data
    data: () => ({
        formData: {
            skills: [],
            otherSkills: ''
        },
        // password rules
        // select rules
        selectRules: [
            v => !!v || 'At least one skill are required.'
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
        // valid
        valid: false,
        
    }),
    // methods for login in
    methods: {
        // login function
        async addSkills() {
            // validate the form
            if (!this.$refs.form.validate()) return
            // remove other from the skills
            let skills = this.formData.skills.filter(skill => skill != "Other")
            // check if other skills was filled
            if (this.formData.otherSkills) {
                // add the skills in other skills to skills
                skills.push(...this.formData.otherSkills.split(','))
            }
            console.log(skills)
            //set the loading to true
            this.loading = true
            // set the loading to loading
            this.loader = this.loading
            // send the data to the backend
            await this.$axios.post('/user/profile/skills', {
                user_profile: {
                    new_skills: skills
                }
            })
            .then(({ data }) => {
                // refetch the current user
                this.$auth.fetchUser()
                    // only respond to the user once the user has being refetched
                    .then(() => {
                        // reset the route
                        this.$refs.form.reset()
                        // set the message
                        this.message = 'Success. You have successfully update your professional skills.'
                        // set the loading to false
                        this.loading = false,
                        // set the loader to null
                        this.loader = null
                        // set the snackbar to true
                        this.snackbar = true
                        // redirect the user to the orders
                        this.$router.push({path: '/account/about'})
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
                    this.message = 'There was a problem saving your skills. Please try again later.'
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
