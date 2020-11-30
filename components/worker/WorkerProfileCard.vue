<template>
    <!-- Row for the practioner -->
    <v-row align="center" class="mb-n1">
      <v-col md="12" class="mb-n3">
        <v-card class="mx-auto" width="530" elevation="2">
         <!-- Card title -->
          <v-card-title>
            <v-row class="mt-n2 ml-n4">
              <v-menu open-on-hover offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <!-- Button that displays the avatar of the user -->
                  <v-btn dark v-bind="attrs" v-on="on" text class="ml-2">
                    <v-avatar class="mr-3" size="35">
                        <img :src="worker.profile_pic ? worker.profile_pic : '/images/unknown1.png'">
                    </v-avatar>
                    <span class="teal--text mr-3 text-capitalize font-weight-bold text-caption ml-1 mb-n3">
                        {{ worker.full_name }}
                    </span>
                  </v-btn>
                  <!-- End of the button -->
                </template>

                <v-list dense shaped v-if="worker.profile_pic">
                  <v-list-item color="purple darken-3" class="text--red mb-n2">
                    <v-list-item-title>
                        <!-- Full image of the user -->
                        <v-avatar class="profile mb-2" color="grey" size="124">
                            <v-img :src="worker.profile_pic"></v-img>
                        </v-avatar>
                        <!-- End of the full image -->
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-icon x-small color="cyan lighten-1" class="mb-n2">mdi-shield-check</v-icon>
                              
              <v-spacer></v-spacer>
            
              <!-- Rating if the current user -->
              <div class="mr-4">
                <v-row class="mt-n1 mb-n3">
                    <v-col class="mr-5">
                        <span class="text-caption font-weight-bold teal--text mr-1">Rated:</span>
                    </v-col>
                    <v-col class="mr-3">
                        <v-rating
                            color="yellow darken-3"
                            background-color="grey darken-1"
                            empty-icon="$ratingFull"
                            half-increments
                            dense
                            small
                            :value="worker.work_profile.rating"
                            class="ml-n10"
                            readonly
                        ></v-rating>
                    </v-col>
                </v-row>
              </div>
            </v-row>
          </v-card-title>
          <v-divider class="mt-n1 mb-1 cyan mx-4"></v-divider>
          <!-- End of card title -->
        
          <!-- Card text for displaying the about of the worker -->
          <v-card-text>
            <!-- Row for the skills -->
            <v-row class="mt-n2 ml-1"> 
              <v-chip small outlined color="cyan" class="ml-3 mt-1" v-for="(skill, index) in worker.work_profile.skills" :key="index">
                <span class="blue--text">
                    {{ skill }}
                </span>
              </v-chip>
            </v-row>
            <!-- End of row for skills -->

            <!-- Row for about -->
            <v-row class="mt-n1" >
                <p class="text-caption pa-4 font-weight-normal">
                    {{ show_first_fifty(worker.work_profile.about )}}
                    <span id="dots-1" :style="worker.work_profile.show_more ? 'display: none;' : 'display: inline;'">...</span> <span id="more-1" :style="worker.work_profile.show_more ? 'display: inline;' : 'display: none;'">
                        {{ show_hidden_description(worker.work_profile.about )}}
                    </span>
                    <!-- Button for showing more description -->
                    <v-btn icon @click="showMore" x-small>
                    <v-icon color="info" x-small> 
                        {{worker.work_profile.show_more ? 'mdi-eye-off' : 'mdi-eye'}} 
                    </v-icon>
                    </v-btn>
                    <!-- End of button for wshoing the description -->
                </p>
            </v-row>
            <!-- End of row for about -->
        </v-card-text>
        <!-- End of card text for displaying the about of the worker -->


          <v-card-actions class="mt-n9">
            <!-- Section for displaying the work success of the current user -->
            <div class="ml-3 mb-1 mt-n3">                
              <span class="text-caption font-weight-normal teal--text ml-2">
                  {{ worker.work_profile.job_success}}% Job Success
              </span>
              <v-progress-linear 
                dark 
                :value="worker.work_profile.job_success" 
                class="mt-1" 
                rounded height="8" 
                color="cyan" 
                style="width: 180px;">
               </v-progress-linear>
            </div>
            <!-- End of secion for showing the job success -->
            <v-spacer></v-spacer>
            <!-- Button for reporting a user -->
            <v-btn  
                text 
                dark 
                x-small 
                color="info" 
                depressed 
                class="mr-1"
                :loading="hireLoader"
                @click.stop="directHire"
            >
                <span class="text-capitalize font-weight-bold">Direct Hire</span>
                <template v-slot:hireLoader>
                    <span class="custom-loader">
                        <v-icon light color="success">mdi-cached</v-icon>
                    </span>
                </template>
            </v-btn>
            <!-- End of button for reporting auser -->
            <!-- Button for saving a user -->
            <v-btn 
                v-if="!$auth.user.saved_workers.includes(worker.id)" 
                dark 
                x-small 
                color="teal" 
                depressed
                class="mr-3"
                text
                :loading=loading
                @click="saveWorker"
            >
                <span class="text-capitalize font-weight-bold">save contractor</span>
                <template v-slot:loader>
                    <span class="text-caption text-capitalize font-weight-bold success--text mr-2">Saving...</span>
                    <span class="custom-loader">
                        <v-icon light color="success">mdi-cached</v-icon>
                    </span>
                </template>
            </v-btn>
            <!-- End of button for saving a user -->

            <v-btn  
                v-if="$auth.user.saved_workers.includes(worker.id)"
                dark 
                x-small 
                color="error" 
                class="mr-3"
                depressed
                text
            >
                <span class="text-capitalize font-weight-bold mr-1">saved</span>
                <v-icon x-small color="error" class="mt-n1">mdi-check-bold</v-icon>
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Snackbar -->
        <v-snackbar v-model="snackbar" :color="color"  top app elevation="2">
            <span class="text-caption font-weight-bold">
              {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbar -->
    </v-row>
    <!-- End of the practitioner card -->
</template>

<script>
export default {
    // name of the component
    name: "WorkerProfileCard",
    // props
    props: {
        worker: {
            type: Object
        }
    },
    // data
    data: () => ({
      // loading
      loading: false,
      // loader:
      loader: null,
      // loading
      hireLoading: false,
      // loader:
      hireLoader: null,
      // color
      color: 'success lighten-1',
      // message:
      message: '',
      // snackbar
      snackbar: false
    }),
    // methods
    methods: {
        // function for showing the fist 50 words of the of the description
        show_first_fifty(description) {
            return description.split(/\s+/).splice(0, 75).join(" ")
        },

        // function for showing more information about the order
        show_hidden_description(description) {
            // set the show more to true
            return description.split(/\s+/).splice(75).join(" ")
        },

        // show more
        showMore() {
          this.$store.commit('contractor_profile/TOGGLE_CONTRACTOR_SHOW_MORE')
        },

        // function for saving the worker
        async saveWorker() {
          // set the loading to true
          this.loading = true
          // set the loader to tloading
          this.loader = this.loading
          // send the data to the db
          await this.$axios.post(`contractors/${this.$route.params.id}/save`)
            .then(({ data }) => {
              // refetch the curren user
              this.$auth.fetchUser()
                .then(() => {
                  // set the message
                  this.message = data.data.details
                  // set the snackbar to true
                  this.snackbar = true
                  // set the loading to false
                  this.loading = false
                  // set the loader to null
                  this.loader = null
                })
            })
            // handle the error
            .catch(err => {
              // check if there is a response
              if (err.response) {
                // get the response data
                let { data } = err.response.data
                // set the message
                this.message = data.errors.details
              } else {
                // access the error
                this.message = 'Failed. Contractor could not be saved. Please try again later.'
              }
              // set the color
              this.color = 'error lighten-1'
              // set the loading to false
              this.loading = false
              // set the loader to null
              this.loader = null
              // set the snackbar to true
              this.snackbar = true
            })
        },

        // direct hire function
        async directHire() {
          // set the hireloading to true
          this.hireLoading = true
          // set the hire loader to this.hireLoading
          this.hireLoader = this.hireLoading
          //get all the posted orders created by this user
          await this.$store.dispatch('new_direct_hires/getMyPostedOrders')
            .then(() => {
              // set the hireloading to false
              this.hireLoading = false
              // set the hire loader to null
              this.hireLoader = null
              //emit a direct hire event
              this.$emit('show-direct-hire-popup')
            })
            .catch(err => {
              // check if there is a response
                if (err.response) {
                  // get the response data
                  let { data } = err.response.data
                  // set the message
                  this.message = data.errors.details
                } else {
                  // access the error
                  this.message = 'There was a problem creating your direct hire request. Please try again later.'
                }
                // set the color
                this.color = 'error lighten-1'
                // set the loading to false
                this.hireLoading = false
                // set the loader to null
                this.hireLoader = null
                // set the snackbar to true
                this.snackbar = true
            })
        }

    }
}
</script>
