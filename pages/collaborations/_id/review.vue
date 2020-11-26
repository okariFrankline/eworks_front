<template>
    <v-col md=6 class="ml-n3 mt-n3">
        <v-row align="center" justify="center">
            <v-col md="12" class="mb-n3">
                <v-card class="mx-auto" width="530" elevation="2" flat>
                    <v-card-title class="ml-4 mr-4">
                        <v-row justify="center" class="mb-n2">
                            <v-icon small left color="teal" class="ml-2 mr-3">mdi-spellcheck</v-icon>
                            <span class="text-caption font-weight-bold teal--text">
                                New Collaboration Summary and Review
                            </span>

                            <v-spacer></v-spacer>
                        </v-row>
                    </v-card-title>
                    <v-divider class="mt-1"></v-divider>

                    <!-- Category dialog -->
                    <v-row class="mt-n2 ml-3">
                        <v-col md=12>
                            <v-card-title>
                                <span class="text-caption font-weight-bold text-capitalize error--text">Collaboration Category and Specialty</span>
                            </v-card-title>
                        
                            <v-card-text>
                                <div class="mt-n1 ml-2">
                                    <v-icon small left color="teal">mdi-dots-hexagon</v-icon> 
                                    <span class="font-weight-bold text-capitalize teal--text text-caption">Collaboration Invite Category: </span>
                                    <span class="font-weight-bold text-capitalize grey--text ml-3 text-caption">
                                        {{ invite.category}}
                                    </span>
                                </div>
                                <div class="ml-2">
                                    <v-icon small left color="teal">mdi-wrap-disabled</v-icon> 
                                    <span class="font-weight-bold text-capitalize teal--text text-caption">Collaboration Invite  Specialty: </span>
                                    <span class="font-weight-bold text-capitalize grey--text ml-3 text-caption">
                                        {{ invite.specialty }}
                                    </span>
                                </div>
                                <!-- Edit button -->
                                <v-btn 
                                    depressed
                                    x-small
                                    text
                                    color="info"
                                    class="mt-3"
                                    @click="showJobDialog"
                                >
                                   <v-icon x-small left color="info">mdi-account-edit</v-icon> 
                                   <span class="text-capitalize font-weight-bold">Edit Information</span>
                                </v-btn>
                                <!-- End of edit button -->
                            </v-card-text>
                        </v-col>
                    </v-row>
                    <!-- End of the category dialog -->

                    <v-divider class="mx-6 mt-n2 cyan"></v-divider>
                    
                    <!-- Order Type -->
                    <v-row class="mt-n2 ml-3">
                        <v-col md=12>
                            <v-card-title>
                                <span class="text-caption font-weight-bold text-capitalize error--text">Collaboration Invite Deadline and Contractors</span>
                            </v-card-title>
                        
                            <v-card-text>
                                <div class="mt-n1 ml-2">
                                    <v-icon small left color="teal">mdi-dots-hexagon</v-icon> 
                                    <span class="font-weight-bold text-capitalize teal--text text-caption">Invite Offer Submission Deadline: </span>
                                    <span class="font-weight-bold text-capitalize grey--text ml-3 text-caption">
                                        {{ showDeadline(invite.deadline) }}
                                    </span>
                                </div>
                                <div class="ml-2">
                                    <v-icon small left color="teal">mdi-account-group</v-icon> 
                                    <span class="font-weight-bold text-capitalize teal--text text-caption">Number of required collaborators: </span>
                                    <span class="font-weight-bold text-capitalize grey--text ml-3 text-caption">
                                        {{ invite.required_collaborators }}
                                    </span>
                                </div>
                                <!-- Edit button -->
                                <v-btn 
                                    depressed
                                    x-small
                                    text
                                    color="info"
                                    class="mt-3"
                                    @click="showDeadlineDialog"
                                >
                                   <v-icon x-small left color="info">mdi-account-edit</v-icon> 
                                   <span class="text-capitalize font-weight-bold">Edit Information</span>
                                </v-btn>
                                <!-- End of edit button -->
                            </v-card-text>
                        </v-col>
                    </v-row>
                    <!-- End of Order type -->

                    <v-divider class="mx-6 mt-n2 cyan"></v-divider>

                    <!-- Order Payment -->
                    <v-row class="mt-n2 ml-3">
                        <v-col md=12>
                            <v-card-title>
                                <span class="text-caption font-weight-bold text-capitalize error--text">Collaboration Invite Payment</span>
                            </v-card-title>
                        
                            <v-card-text>
                                <div class="mt-n1 ml-2">
                                    <v-icon small left color="teal">mdi-calendar-clock</v-icon> 
                                    <span class="font-weight-bold text-capitalize teal--text text-caption">Payment to be made: </span>
                                    <span class="font-weight-bold text-capitalize grey--text ml-3 text-caption">
                                        {{ invite.payment_schedule }} 
                                    </span>
                                </div>
                                <div class="ml-2">
                                    <v-icon small left color="teal">mdi-cash-multiple</v-icon> 
                                    <span class="font-weight-bold text-capitalize teal--text text-caption">Accepting offers between: </span>
                                    <span class="font-weight-bold text-capitalize grey--text ml-3 text-caption">
                                        Kes {{ invite.payable_amount }} / Per Collaborator
                                    </span>
                                </div>
                                <!-- Edit button -->
                                <v-btn 
                                    depressed
                                    x-small
                                    text
                                    color="info"
                                    class="mt-3"
                                    @click="showPaymentDialog"
                                >
                                   <v-icon x-small left color="info">mdi-account-edit</v-icon> 
                                   <span class="text-capitalize font-weight-bold">Edit Information</span>
                                </v-btn>
                                <!-- End of edit button -->
                            </v-card-text>
                        </v-col>
                    </v-row>
                    <!-- End of Order Payment -->

                    <v-divider class="mx-6 mt-n2 cyan"></v-divider>

                    <!-- Order Description -->
                    <v-row class="mt-n2">
                        <v-col md=12>
                            <v-card-title>
                                <span class="text-caption font-weight-bold text-capitalize error--text">Collaboration Invite Description</span>
                            </v-card-title>
                        
                            <v-card-text>
                                <v-row class="mt-n7" >
                                     <p class="text-caption pa-4 font-weight-normal">
                                        {{ show_first_fifty(invite.description )}}
                                        <span id="dots-1" :style="invite.show_more ? 'display: none;' : 'display: inline;'">...</span> <span id="more-1" :style="invite.show_more ? 'display: inline;' : 'display: none;'">
                                            {{ show_hidden_description(invite.description )}}
                                        </span>
                                        <!-- Button for showing more description -->
                                        <v-btn icon @click="showMore" x-small>
                                            <v-icon x-small color="info"> 
                                                {{invite.show_more ? 'mdi-eye-off' : 'mdi-eye'}} 
                                            </v-icon>
                                        </v-btn>
                                        <!-- End of button for wshoing the description -->
                                    </p>
                                </v-row>
                                <!-- Edit button -->
                                <v-btn 
                                    depressed
                                    x-small
                                    text
                                    color="info"
                                    class="mt-n5"
                                    @click="showDescriptionDialog"
                                >
                                   <v-icon x-small left color="info">mdi-account-edit</v-icon> 
                                   <span class="text-capitalize font-weight-bold">Edit Description</span>
                                </v-btn>
                                <!-- End of edit button -->
                            </v-card-text>
                        </v-col>
                    </v-row>
                    <!-- End of order description -->

                    <v-divider class="mx-6 mt-n2"></v-divider>

                    <v-card-actions class="mt-n5">
                        <v-btn 
                            v-if="invite.is_draft"
                            color="success" 
                            block 
                            small 
                            depressed 
                            @click="getVerificationCode"
                        >
                            <span class="text-caption font-weight-bold text-capitalize">
                                verify invite
                            </span>
                        </v-btn>

                        <!-- Button for edit complete -->
                        <v-btn 
                            v-if="!invite.is_draft"
                            color="success" 
                            block 
                            small 
                            depressed 
                            @click="() => $router.back()"
                        >
                            <span class="text-capitalize font-weight-bold text-caption">edit complete</span>
                        </v-btn>
                        <!-- End of button for edit complete -->
                    </v-card-actions>

                </v-card>
            </v-col>
        </v-row>
        <!-- End of the practitioner card -->

       <!-- Dialog for creating a new job -->
        <v-dialog v-model="jobDialog" max-width="520" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-caption font-weight-bold white--text">
                  Select Collaboration Category and specialty
                </span>
            </v-card-title>

            <v-card-text class="mt-3">
                <v-form v-model="valid" ref="jobDialog">
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                    Q1. What is the professional category of your collaboration invite?
                  </span>
                  <!--Order type -->
                  <v-select 
                    :items="categories" 
                    prepend-icon="mdi-playlist-edit" 
                    placeholder="Choose Job Category" 
                    dense 
                    class="mt-3 mb-2" 
                    item-text="name" 
                    item-value="value" 
                    style="font-size: .9em;" 
                    :rules="selectRules"
                    v-model="formData.category"
                  ></v-select>
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q2. What specialty are you looking for in your collaboration invite?
                  </span>
                  <!-- Options for the category -->
                  <v-select 
                    :items="showServices()" 
                    prepend-icon="mdi-playlist-edit" 
                    placeholder="Choose Job Specialty" 
                    dense 
                    class="mt-3" 
                    item-text="name" 
                    item-value="name" 
                    style="font-size: .9em;"
                    :rules="selectRules"
                    v-model="formData.specialty"
                    :disabled="formData.category ? false : true"
                  ></v-select>
                  <!-- End of the options for the category -->
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <v-spacer></v-spacer>
                <!-- Cancel button -->
                <v-btn  
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="error" 
                  small
                  :disabled="loading"
                  @click="jobDialog = false"
                >cancel</v-btn>
                <!-- End of cacnel button -->

                <!-- Next button -->
                <v-btn 
                  dark 
                  depressed 
                  class="text-caption text-capitalize" 
                  color="info" 
                  small 
                  :loading="loading"
                  @click.stop="updateCategory"
                >
                  update category
                  <template v-slot:loader>
                      <span class="custom-loader">
                          <v-icon light color="white">mdi-cached</v-icon>
                      </span>
                  </template>
                </v-btn>
                <!-- End of next button -->
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for creating a new job -->

        <!-- Dialog for adding the type of project -->
        <v-dialog v-model="deadlineDialog" max-width="520" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-caption font-weight-bold white--text">
                  Collaboration Invite Deadline and required collaborators
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form v-model="valid" ref="deadlineDialog">
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q3. How many collaborator do you need for your project?
                  </span>
                  <v-text-field 
                    prepend-icon="mdi-account-group" 
                    placeholder="Number of required collaborators" 
                    dense 
                    class="mt-3 mb-2" 
                    style="font-size: .9em;"
                    type="number"
                    :rules="contractorsRules"
                    v-model="deadlineForm.required_collaborators"
                  ></v-text-field>
                  <!-- End of the options for the category -->
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q4. Enter invite offer submission date
                  </span>
                  <!-- Bidding deadline -->
                    <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="deadlineForm.deadline_string_date"
                            placeholder="Not accepting deadline beyond"
                            prepend-icon="mdi-calendar-outline"
                            readonly
                            style="font-size: .9em;"
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker 
                        no-title 
                        v-model="deadlineForm.deadline_string_date" 
                        @input="menu = false"
                        ></v-date-picker>
                    </v-menu>
                    <!--End of bidding deadline -->
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <v-spacer></v-spacer>
                <!-- Cancel button -->
                <v-btn  
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="error" 
                  small 
                  :disabled="loading"
                  @click="deadlineDialog = false"
                >cancel</v-btn>
                <!-- End of cancel button -->

                <!-- Next Button -->
                <v-btn 
                  dark 
                  depressed 
                  class="text-caption text-capitalize" color="info" 
                  small 
                  :loading="loading"
                  @click.stop="updateInviteDeadline"
                >
                  next
                  <template v-slot:loader>
                      <span class="custom-loader">
                          <v-icon light color="white">mdi-cached</v-icon>
                      </span>
                  </template>
                </v-btn>
                <!-- End of next button -->
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for type of project -->

        <!-- Dialog for adding the payment of project -->
        <v-dialog v-model="paymentDialog" max-width="520" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-caption font-weight-bold white--text">
                    Collaboration Invite Payment Details
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form v-model="valid" ref="paymentDialog">
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q5. When will your payments be made?
                  </span>
                  <!-- Options for the category -->
                  <v-select 
                    :items="paymentPlans" 
                    prepend-icon="mdi-credit-card-clock-outline" 
                    placeholder="Choose Payment Schedule" 
                    dense class="mt-3" 
                    item-text="name" 
                    item-value="name" 
                    style="font-size: .9em;" 
                    :rules="selectRules"
                    v-model="paymentForm.payment_schedule"
                  ></v-select>
                  <!-- End of the options for the category -->
                  <span class="text-caption font-weight-bold ml-10 teal--text">
                      Q6. Set acceptable offer range you will pay each collaborator <span class="pink--text text-lowercase">{{paymentForm.payment_schedule}}</span>
                  </span>
                  <v-row>
                      <v-col md=5 class="mt-n3">
                          <v-text-field 
                            placeholder="Minimum amount" 
                            prepend-icon="" 
                            append-icon="mdi-decimal" 
                            style="font-size: .9em;" 
                            v-model="paymentForm.min_amount"
                            :rules="amountRules"
                            :disabled="paymentForm.payment_schedule ? false : true"
                          ></v-text-field>
                      </v-col>
                      <v-col md=2 class="mt-3 ml-n5 mr-2">
                          <span class="text-body-2 font-weight-bold ml-10 primary--text">
                              To
                          </span>
                      </v-col>
                      <v-col md=5 class="mt-n3">
                          <v-text-field 
                            placeholder="Maximum amount" 
                            prepend-icon="" 
                            append-icon="mdi-decimal" 
                            style="font-size: .9em;" 
                            v-model="paymentForm.max_amount"
                            :rules="amountRules"
                            :disabled="paymentForm.payment_schedule ? false : true"
                          ></v-text-field>
                      </v-col>
                  </v-row>
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <v-spacer></v-spacer>
                <!-- Payment dialog -->
                <v-btn  
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="error" 
                  small 
                  :disabled="loading"
                  @click="paymentDialog = false"
                >cancel</v-btn>
                <!-- End of cancle button -->

                <!-- Next button -->
                <v-btn 
                  dark 
                  depressed 
                  class="text-caption text-capitalize" 
                  color="info" 
                  small 
                  :loading="loading"
                  @click="updateInvitePayment"
                >
                  Next
                  <template v-slot:loader>
                      <span class="custom-loader">
                          <v-icon light color="white">mdi-cached</v-icon>
                      </span>
                  </template>
                </v-btn>
                <!-- End of next button -->
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of dialog for payment of project -->

        <!-- Description dialog window -->
        <v-dialog v-model="descriptionDialog" max-width="750" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-caption font-weight-bold white--text">
                    Collaboration Invite Description
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form v-model="valid" ref="descriptionDialog">
                  <span class="text-caption font-weight-bold teal--text">
                      Q5. Add a detailed description for your job and it should include:
                      <ul>
                          <li class="text-caption font-weight-normal pink--text">Detailed description of what the job entails (requirements, special considerations timelines etc)</li>
                          <li class="text-caption font-weight-normal pink--text">Detailed description of and expectations from your practioner of choice</li>
                          <li class="text-caption font-weight-normal pink--text">A detailed description of the location, if required, of where the job should take place</li>
                          <li class="text-caption font-weight-normal pink--text">Any special notes/requirements for the practioner</li>
                      </ul>
                  </span>
                  <!-- Options for the category -->
                  <v-textarea  
                    auto-grow 
                    placeholder="Order Description" 
                    counter="5000" 
                    dense 
                    class="mt-3"  
                    style="font-size: .9em;"
                    v-model="descriptionForm.description"
                    :rules="descriptionRules"
                  ></v-textarea>
                  <!-- End of the options for the category -->
                </v-form>

            </v-card-text>

            <v-card-actions class="mt-n4">
                <v-spacer></v-spacer>
                <!-- Cancel button -->
                <v-btn  
                  dark 
                  depressed 
                  class="text-caption text-capitalize mr-3" 
                  color="error" 
                  small 
                  :disabled="loading"
                  @click="descriptionDialog = false"
                >cancel</v-btn>
                <!-- End of cancel button -->

                <!-- Next nutton -->
                <v-btn 
                  dark 
                  depressed 
                  class="text-caption text-capitalize" 
                  color="info" 
                  small 
                  :loading="loading"
                  @click="updateInviteDescription"
                >
                  Next
                  <template v-slot:loader>
                      <span class="custom-loader">
                          <v-icon light color="white">mdi-cached</v-icon>
                      </span>
                  </template>
                </v-btn>
                <!-- End of next button -->
            </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End of description window -->

        <!-- Submit offer dialog -->
        <v-dialog v-model="activationDialog" max-width="520" persistent>
        <v-card>
              <v-card-title class="my-card-title">
                  <v-icon dark left>mdi-account-lock</v-icon>
                  <span class="text-caption font-weight-bold white--text">
                    New Collboration Invite Verification
                  </span>
              </v-card-title>

              <v-card-text class="mt-3">
                  <v-form ref="activationDialog" v-model="valid" lazy-validation>
                      <span class="text-caption font-weight-bold ml-10 teal--text">
                        Enter verification code sent to {{ $auth.user.auth_email}}
                    </span>
                    <!--Order type -->
                    <v-text-field 
                        prepend-icon="mdi-lock-alert" 
                        placeholder="Activation Key" 
                        dense 
                        class="mt-3 mb-2" 
                        style="font-size: .9em;"
                        type="text"
                        :rules="activationRules"
                        v-model="verificationForm.verification_code"
                    ></v-text-field>
                  </v-form>
              </v-card-text>

              <v-card-actions class="">
                  <v-spacer></v-spacer>
                  <!-- Cnacel Dialog -->
                  <v-btn 
                    dark 
                    depressed 
                    text
                    class="text-caption text-capitalize mr-3" 
                    color="info" 
                    small 
                    :loading="resendLoading"
                    @click="resendVerificationCode"
                  >
                    <span class="text-capitalize font-weight-bold text-caption">resend code</span>
                    <template v-slot:resendLoader>
                        <span class="text-caption font-weight-bold success--text mr-2">sending...</span>
                        <span class="custom-loader">
                            <v-icon light color="success">mdi-cached</v-icon>
                        </span>
                    </template>
                  </v-btn>

                  <!-- button for getting invite verification code -->
                  <v-btn 
                    dark 
                    depressed 
                    class="text-caption text-capitalize mr-4" 
                    color="success" 
                    small 
                    :loading="loading"
                    @click="verifyInvite"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">verify invite</span>
                      <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon light color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>
                  <!-- End of verification button -->
              </v-card-actions>
        </v-card>
        </v-dialog>
        <!-- End of submit offer dialog -->

        <v-snackbar v-model="snackbar" :color="color" top app elevation="2">
            <span class="text-caption font-weight-bold">
            {{ message }}
            </span>
        </v-snackbar>
        <!-- End of snackbar -->
    </v-col>
</template>

<script>
// import moment
import moment from 'moment'
// import map getters
import { mapGetters, mapState } from 'vuex'
export default {
    // layout
    layout: 'main',
    // asyncData
    async fetch({ store, params, error}) {
        // get the order being referenced on the router
        await store.dispatch('invite/getInvite', params.id)
            .catch(err => {
                console.log(err)
                let { status } = err.response
                if (status == 400) {
                    error({statusCode: 400, message: 'There was a problem handling your request.'})
                } else if (status == 404) {
                    error({statusCode: 404, message: 'Order Not Found.'})
                } else {
                    error({statusCode: 500, message: 'There was a problem handling your request.'})
                }
            })
    },
    // computed
    computed: {
        ...mapState('invite', {
            invite: (state) => state.invite
        }),
        // get the select options
      ...mapState('select', {
        paymentPlans: state => state.paymentPlans,
        durations: state => state.durations,
        projectTypes: state => state.projectTypes,
        categories: state => state.categories,
        currencies: state => state.currencies,
        web: state => state.web,
        writing: state => state.writing,
        construction: state => state.construction,
        accounting: state => state.accounting,
        cleaning: state => state.cleaning,
        food: state => state.food,
        legal: state => state.legal,
        design: state => state.design,
        transport: state => state.transport,
        sales: state => state.sales,
        withdrawalOptions: state => state.withdrawalOptions
      })
    },
    // data
    data: () => ({
        // dialogs
        paymentDialog: false,
        // description dialog
        descriptionDialog: false,
        // job dialog
        jobDialog: false,
        // deadline dialog
        deadlineDialog: false,
        // emnu
        menu: false,
        // snackbar 
        snackbar: false,
        // activation dialog
        activationDialog: false,
        // color
        color: 'success lighten-1',
        // message
        message: '',
        // loading
        loading: false,
        // loading
        loader: null,
        // rensd loading
        resendLoading: false,
        // resend loader
        resendLoader: null,
        // form valid
        valid: false,
        // verificationForm
        verificationForm: {
            verification_code: ''
        },
        // category form
        formData: {
            category: '',
            specialty: ''
        },
        // deadline forme
        deadlineForm: {
            deadline_string_date: '',
            required_collaborators: 1
        },
        // payment form
        paymentForm: {
            min_amount: '',
            max_amount: '',
            payment_schedule: ''
        },
        // description form
        descriptionForm: {
            description: ''
        },
        // select rules
        selectRules: [
            v => !!v || 'Field is required'
        ],
        // contractor rules
        contractorsRules: [
            v => !!v || 'Number of contractors must be at least be 1.'
        ],
        // amount rules
        amountRules: [
            v => !!v || 'Amount cannot be less than 0.'
        ],
        // description form
        descriptionRules: [
            v => !!v || 'Description is required.',
            v => (v && v.length >= 500) || 'Description has to have a minimum of 200 characters.'
        ],
        // date rules
        dateRules: [
            v => !!v || 'Offer submission deadline is required.'
        ],
        // password rules
        activationRules: [
            v => !!v || 'Activation Key is required',
            v => (v && v.length == 6) || 'Activation key must be 6 digits.'
        ],
    }),
    methods: {
        // show deadline
        showDeadline(date) {
          return moment(date, "YYYYMMDD").format('dddd Do MMMM, YYYY')
        },
      // function for showing more information about the order
        show_hidden_description(description) {
            // set the show more to true
            return description.split(/\s+/).splice(60).join(" ")
        },
        // function for showing the fist 50 words of the of the description
        show_first_fifty(description) {
            return description.split(/\s+/).splice(0, 60).join(" ")
        },
        // function for showing more
        showMore() {
          this.$store.commit('invite/TOGGLE_SHOW_MORE')
        },
        // show description dialg
        showDescriptionDialog() {
            // set the description to the value of the order
            this.descriptionForm.description = this.invite.description
            // set the description dialog to true
            return this.descriptionDialog = true
        },
        // function for showing jobDialog
        showJobDialog() {
            // set the catgory
            this.formData.category = this.invite.category
            // set the specialty
            this.formData.specialty = this.invite.specialty
            // set the jobDialog to true
            return this.jobDialog = true
        },
        // show duration timeline
        showDeadlineDialog() {
            // set the dialog
            this.deadlineForm.deadline_string_date = this.invite.deadline_string_date
            // set the duration
            this.deadlineForm.required_collaborators = this.invite.required_collaborators
            // set the duration dialog to true
            this.deadlineDialog = true
        },
        // functioin for showing the paymnet dialog
        showPaymentDialog() {
            let amounts = this.invite.payable_amount.split("-")
            // set the payment scehdule
            this.paymentForm.payment_schedule = this.invite.payment_schedule
            // set the min amount
            this.paymentForm.min_amount = amounts[0].trim()
            // set the max amount
            this.paymentForm.max_amount = amounts[1].trim()
            // set the payment dilog to true
            this.paymentDialog = true
        },
        // handleerror function
        handleError(err) {
            console.log(err.response.data)
            if (err.response && err.response.status == 400) {
                // get the details
                let { data } = err.response
                // set the error message
                this.message = data.errors.details
                
            } else {
                // set the error message
                this.message = 'There was a problem sending the verification code. Try again'
            }
            // set the coloe
            this.color = 'error lighten-1'
            // set teh loading to false
            this.loading ? this.loading = false : this.resendLoading = false,
            // set the loader to null
            this.loader ? this.loader = null : this.resendLoader = null
            // set the error to true
            this.snackbar = true
        },  
        // show typre dialog
      async updateCategory() {
         // validat the form
            if (!this.$refs.jobDialog.validate()) return
            // set the loading to true
            this.loading = true
            // set the loader
            this.loader = this.loading

            // post the data
            await this.$store.dispatch('invite/updateInviteCategory', {
                data: this.formData
            })
            .then(() => {
                // reset the form
                this.$refs.jobDialog.reset()
                // set he loading to false
                this.loading = false
                // set loader to null
                this.loader = null
                // show the deadline dialog
                this.jobDialog = false
            })
            .catch(err => this.handleError(err))
      },

        // function for adding the deadline
        async updateInviteDeadline() {
            // validat the form
            if (!this.$refs.deadlineDialog.validate()) return
            // set the loading to true
            this.loading = true
            // set the loader
            this.loader = this.loading

            // post the data
            await this.$store.dispatch('invite/updateInviteDeadline', {
                data: this.deadlineForm
            })
            .then(() => {
                // reset the form
                this.$refs.deadlineDialog.reset()
                // set he loading to false
                this.loading = false
                // set loader to null
                this.loader = null
                // show the deadline dialog
                this.deadlineDialog = false
            })
            .catch(err => this.handleError(err))
        },

        // function for updating the payment
        async updateInvitePayment() {
            // validate the form
            if (!this.$refs.paymentDialog.validate()) return
            // set the loading to true
            this.loading = true
            // set the loader
            this.loader = this.loading

            // post the data
            await this.$store.dispatch('invite/updateInvitePayment', {
                data: this.paymentForm
            })
            .then(() => {
                // reset the form
                this.$refs.paymentDialog.reset()
                // set he loading to false
                this.loading = false
                // set loader to null
                this.loader = null
                // show the deadline dialog
                this.paymentDialog = false
            })
            .catch(err => this.handleError(err))
        },

        // function for updating the invite description
        async updateInviteDescription() {
            // validat the form
            if (!this.$refs.descriptionDialog.validate()) return
            // set the loading to true
            this.loading = true
            // set the loader
            this.loader = this.loading

            // post the data
            await this.$store.dispatch('invite/updateInviteDescription', {
                data: this.descriptionForm
            })
            .then(() => {
                // reset the dialog
                this.$refs.descriptionDialog.reset()
                // set he loading to false
                this.loading = false
                // set loader to null
                this.loader = null
                // show the deadline dialog
                this.descriptionDialog = false
            })
            .catch(err => this.handleError(err))
        },
      // function for getting verification code
      async getVerificationCode() {
          // set the loading to true
          this.loading = true
          // set the loader to true
          this.loader = this.loading
          // make the request
          await this.$axios.get(`/invites/${this.invite.id}/verification`)
            .then(result => {
                // set the message
                this.message = result.data.data.details
                // set teh loading to false
                this.loading = false,
                // set the loader to null
                this.loader = null
                // show the snackbar
                this.snackbar = true
                // set the activation code to true
                this.activationDialog = true
            })
            .catch(err => this.handleError(err))
      },
      // function for getting verification code
      async resendVerificationCode() {
          // set the loading to true
          this.resendLoading = true
          // set the loader to true
          this.resendLoader = this.resendLoading
          // make the request
          await this.$axios.get(`/invites/${this.invite.id}/verification/resend`)
            .then(result => {
                // set the message
                this.message = result.data.data.details
                // set teh loading to false
                this.resendLoading = false,
                // set the loader to null
                this.resendLoader = null
                // set the error to true
                this.snackbar = true
            })
            .catch(err => this.handleError(err))
      },

      // function for verifying the order
      async verifyInvite() {
          // validate the form
          if (!this.$refs.activationDialog.validate()) return
          // set the loading to true
          this.loading = true
          // set the loader to true
          this.loader = this.loading
          // console.log(this.verificationForm)
          // set the order
          await this.$axios.post(`/invites/${this.invite.id}/verify`, {verification_code: this.verificationForm.verification_code})
            .then((result) => {
                // reset the form
                this.$refs.activationDialog.reset()
                //set the message
                this.message = result.data.data.details
                // set the loading to false
                this.loading = false
                // set the loader to null
                this.loader = null
                // set teh activation dialog to false
                this.activationDialog = false
                // show the success message
                this.snackbar = true
                // redirect the user to the order page
                this.$router.push({
                    path: `/collaborations/${this.invite.id}`
                })
            }).catch(err => this.handleError(err))  
      },
        

      showServices() {
          switch(this.formData.category) {
                case 'Accounting and Finance': 
                    return this.accounting;
                    break;
                case 'Web, Mobile and Software':
                    return this.web;
                    break;
                case 'Construction and Repairs':
                    return this.construction;
                    break;
                case 'Cleaning Services':
                    return this.cleaning;
                    break;
                case 'Food, Catering and Nutrition':
                    return this.food;
                    break;
                case 'IT and Networking':
                    return this.it;
                    break;
                case 'Law and Legal Services':
                    return this.legal;
                    break;
                case 'Transport and Delivery':
                    return this.transport;
                    break;
                case 'Writing Services':
                    return this.writing;
                    break;
                case 'Law and Legal Services':
                    return this.legal;
                    break;
                case 'Branding and Design':
                    return this.design;
                    break;
                case 'Tansport and Delivery':
                    return this.transport;
                    break;
                default:
                    return this.sales;
          }
      },
    }
}
</script>