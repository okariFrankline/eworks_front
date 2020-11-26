<template>
    <!-- Row for the practioner -->
    <v-row align="center" justify="center">
        <v-col md="12" class="mb-n3">
            <v-card class="mx-auto" width="520" elevation="0" flat>
                <v-card-title class="ml-4 mr-4">
                    <v-row justify="center" class="mb-n2">
                        <!-- <v-icon small left color="info darken-2">mdi-briefcase-variant-outline</v-icon> -->
                        <span class="text-caption font-weight-bold teal--text">
                            My Saved Contractors
                        </span>

                        <v-spacer></v-spacer>
                        <span class="text-caption font-weight-bold cyan--text text-capitalize">
                            Contractors Count: {{ workers_count }}
                        </span>
                    </v-row>
                </v-card-title>
                <v-divider class="mt-1"></v-divider>

                <v-row class="mt-n2" v-for="worker in workers" :key="worker.id">
                    <v-col md=12>
                        <!-- cARD Title -->
                        <v-card-title>
                            <v-row class="mt-n2 ml-n4">
                                <!-- Menu containing the profile picture of the person who has placed the bid -->
                                <v-menu open-on-hover offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn dark v-bind="attrs" v-on="on" class="" color="teal" text>
                                            <v-avatar size="30" class="mr-3 ml-3">
                                                <img :src="worker.profile_pic">
                                            </v-avatar>
                                            <span class="text-capitalize font-weight-bold text-caption teal--text">
                                                {{ worker.full_name }}
                                            </span>
                                        </v-btn>
                                    </template>

                                    <v-list dense shaped>
                                    <v-list-item color="purple darken-3" class="text--red mb-n2">
                                        <v-list-item-title>
                                        <v-avatar class="profile ml-3" color="grey" size="124" rounded>
                                                <v-img :src="worker.profile_pic"></v-img>
                                            </v-avatar>
                                        </v-list-item-title>
                                    </v-list-item>
                                    </v-list>
                                </v-menu>
                                <!-- End of menu -->
                                                
                                <v-spacer></v-spacer>
                                <div class="mr-3 mt-n2">
                                    <v-row class="mt-n2">
                                        <v-col class="mr-5">
                                            <span class="text-caption font-weight-bold teal--text mr-2">Rated:</span>
                                        </v-col>
                                        <v-col class="">
                                            <v-rating color="yellow darken-3" background-color="grey darken-1" empty-icon="$ratingFull"
                                                half-increments
                                                dense
                                                small
                                                :value="worker.rating"
                                                class="ml-n10"
                                                readonly
                                            ></v-rating>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-row>
                        </v-card-title>
                        <!-- End of card title -->
                    
                        <!-- About of the worker -->
                        <v-card-text>
                            <!-- Row for the skills -->
                            <v-row class="mt-n3 ml-1"> 
                                <v-chip small outlined color="cyan" class="ml-2 mt-1" v-for="(skill, index) in worker.skills" :key="index">
                                    <span class="warning--text">
                                        {{ skill }}
                                    </span>
                                </v-chip>
                            </v-row>
                            <!-- End of row for skills -->
                            <v-row class="mt-n2">
                                <p class="text-caption pa-4 font-weight-normal">
                                {{ show_first_fifty(worker.about )}}
                                <span id="dots-1" :style="worker.show_more ? 'display: none;' : 'display: inline;'">...</span> <span id="more-1" :style="worker.show_more ? 'display: inline;' : 'display: none;'">
                                    {{ show_hidden_description(worker.about )}}
                                </span>
                                <!-- Button for showing more description -->
                                <v-btn icon @click="worker.show_more = !worker.show_more" x-small>
                                    <v-icon color="info" x-mall> 
                                        {{worker.show_more ? 'mdi-eye-off' : 'mdi-eye'}} 
                                    </v-icon>
                                </v-btn>
                                <!-- End of button for wshoing the description -->
                                </p>
                            </v-row>
                        </v-card-text>
                        <!-- End of the professional cover letter -->

                        <v-card-actions class="mt-n9">
                            <!-- Section for displaying the work success of the current user -->
                            <div class="ml-3 mb-1 mt-n3">                
                            <span class="text-caption font-weight-normal teal--text ml-2">
                                {{ worker.job_success}}% Job Success
                            </span>
                            <v-progress-linear 
                                dark 
                                :value="worker.job_success" 
                                class="mt-1" 
                                rounded height="8" 
                                color="cyan" 
                                style="width: 180px;">
                            </v-progress-linear>
                            </div>
                            <!-- End of secion for showing the job success -->
                            <v-spacer></v-spacer>
                            <!-- Buttong for viwing the profile of the worker -->
                            <v-btn  
                                dark 
                                x-small 
                                color="teal" 
                                depressed 
                                text
                                @click="view_user_profile(worker.id)">
                                <span class="text-capitalize font-weight-bold">direct hire</span>
                            </v-btn>
                            <!-- End of button for viewing the profile of the worker -->

                            <!-- Buttong for viwing the profile of the worker -->
                            <v-btn  
                                dark 
                                x-small 
                                color="teal" 
                                depressed 
                                text
                                @click="view_user_profile(worker.id)">
                                <span class="text-capitalize font-weight-bold">view profile</span>
                            </v-btn>
                            <!-- End of button for viewing the profile of the worker -->

                            <!-- Button for saving the current worker -->
                            <v-btn 
                                x-small 
                                color="error" 
                                dark 
                                depressed 
                                text
                                class="mr-2"
                                @click="unsave_worker(worker.id)">
                                <span class="text-capitalize font-weight-bold">unsave</span>
                            </v-btn>
                            <!-- End of button for saving the current worker -->
                        </v-card-actions>
                        <v-divider class="ml-4 mr-4"></v-divider>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
    <!-- End of the practitioner card -->
</template>

<script>
export default {
    // name
    name: "SavedWorkerCard",
    // props
    props: {
        workers: Array
    },
    //data
    data: () => ({

    }),
    // computed
    computed: {
        // function for finding the number of saved hires
        workers_count() {
            return this.workers.length
        }
    },
    // methods
    methods: {
        // function for showing more information about the order
        show_hidden_description(description) {
            // set the show more to true
            return description.split(/\s+/).splice(35).join(" ")
        },

        // function for showing the fist 50 words of the of the description
        show_first_fifty(description) {
            return description.split(/\s+/).splice(0, 35).join(" ")
        },

        // function for viewing profile
        view_offer_owner_profile(owner_id) {
            // direct user to owner of the profile
            this.$emit('view-profile', owner_id)
        }, 

        // function for unsaving the worker
        unsave_worker(worker_id) {
            // emit
            this.$emit('unsave-worker', worker_id)
        },

        // function for directly hiring the worker
        directly_hire_worker(worker_id) {
            // emit the event
            this.$emit('direct-hire', worker_id)
        }
    }
}
</script>