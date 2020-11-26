<template>
    <v-col md=6 class="ml-n3 mt-n3">
        <v-row align="center" justify="center">
            <v-col md="12" class="mb-n3">
                <v-card class="mx-auto" width="530" elevation="2" flat>
                    <v-card-title class="ml-4 mr-4">
                        <v-row justify="center" class="mb-n2">
                            <v-icon small left color="teal" class="ml-1 mr-3">mdi-clipboard-text</v-icon>
                            <span class="text-caption font-weight-bold teal--text">
                                Order Summary and Review
                            </span>

                            <v-spacer></v-spacer>
                        </v-row>
                    </v-card-title>
                    <v-divider class="mt-1"></v-divider>

                    <!-- Category dialog -->
                    <v-row class="mt-n2 ml-3">
                        <v-col md=12>
                            <v-card-title>
                                <span class="text-caption font-weight-bold text-capitalize error--text">Order Category and Specialty</span>
                            </v-card-title>
                        
                            <v-card-text>
                                <div class="mt-n1 ml-2">
                                    <v-icon small left color="teal">mdi-dots-hexagon</v-icon> 
                                    <span class="font-weight-bold text-capitalize teal--text text-caption">Order Category: </span>
                                    <span class="font-weight-bold text-capitalize grey--text ml-3 text-caption">
                                        {{ order.category}}
                                    </span>
                                </div>
                                <div class="ml-2">
                                    <v-icon small left color="teal">mdi-wrap-disabled</v-icon> 
                                    <span class="font-weight-bold text-capitalize teal--text text-caption">Order Specialty: </span>
                                    <span class="font-weight-bold text-capitalize grey--text ml-3 text-caption">
                                        {{ order.specialty }}
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
                                <span class="text-caption font-weight-bold text-capitalize error--text">Order Type and Contractors</span>
                            </v-card-title>
                        
                            <v-card-text>
                                <div class="mt-n1 ml-2">
                                    <v-icon small left color="teal">mdi-dots-hexagon</v-icon> 
                                    <span class="font-weight-bold text-capitalize teal--text text-caption">Order Type: </span>
                                    <span class="font-weight-bold text-capitalize grey--text ml-3 text-caption">
                                        {{ order.order_type }}
                                    </span>
                                </div>
                                <div class="ml-2">
                                    <v-icon small left color="teal">mdi-account-group</v-icon> 
                                    <span class="font-weight-bold text-capitalize teal--text text-caption">Number of required contractors: </span>
                                    <span class="font-weight-bold text-capitalize grey--text ml-3 text-caption">
                                        {{ order.required_contractors }}
                                    </span>
                                </div>
                                <!-- Edit button -->
                                <v-btn 
                                    depressed
                                    x-small
                                    text
                                    color="info"
                                    class="mt-3"
                                    @click="showTypeDialog"
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
                    
                    <!-- Order duration -->
                    <v-row class="mt-n2 ml-3">
                        <v-col md=12>
                            <v-card-title>
                                <span class="text-caption font-weight-bold text-capitalize error--text">Order Deadline and Duration</span>
                            </v-card-title>
                        
                            <v-card-text>
                                <div class="mt-n1 ml-2">
                                    <v-icon small left color="teal">mdi-clock-outline</v-icon> 
                                    <span class="font-weight-bold text-capitalize teal--text text-caption">Order expected to last: </span>
                                    <span class="font-weight-bold text-capitalize grey--text ml-3 text-caption">
                                        {{ order.duration }}
                                    </span>
                                </div>
                                <div class="ml-2">
                                    <v-icon small left color="teal">mdi-calendar-remove-outline</v-icon> 
                                    <span class="font-weight-bold text-capitalize teal--text text-caption">Not accepting offers past: </span>
                                    <span class="font-weight-bold text-capitalize grey--text ml-3 text-caption">
                                        {{ showDeadline(order.deadline) }}
                                    </span>
                                </div>
                                <!-- Edit button -->
                                <v-btn 
                                    depressed
                                    x-small
                                    text
                                    color="info"
                                    class="mt-3"
                                    @click="showDurationDialog"
                                >
                                   <v-icon x-small left color="info">mdi-account-edit</v-icon> 
                                   <span class="text-capitalize font-weight-bold">Edit Information</span>
                                </v-btn>
                                <!-- End of edit button -->
                            </v-card-text>
                        </v-col>
                    </v-row>
                    <!-- End of order duration -->

                    <v-divider class="mx-6 mt-n2 cyan"></v-divider>

                    <!-- Order Payment -->
                    <v-row class="mt-n2 ml-3">
                        <v-col md=12>
                            <v-card-title>
                                <span class="text-caption font-weight-bold text-capitalize error--text">Order Payment</span>
                            </v-card-title>
                        
                            <v-card-text>
                                <div class="mt-n1 ml-2">
                                    <v-icon small left color="teal">mdi-calendar-clock</v-icon> 
                                    <span class="font-weight-bold text-capitalize teal--text text-caption">Payment to be made: </span>
                                    <span class="font-weight-bold text-capitalize grey--text ml-3 text-caption">
                                        {{ order.payment_schedule }}
                                    </span>
                                </div>
                                <div class="ml-2">
                                    <v-icon small left color="teal">mdi-cash-multiple</v-icon> 
                                    <span class="font-weight-bold text-capitalize teal--text text-caption">Accepting offers between: </span>
                                    <span class="font-weight-bold text-capitalize grey--text ml-3 text-caption">
                                        KES {{ order.payable_amount }}
                                    </span>
                                </div>
                                <!-- Edit button -->
                                <v-btn 
                                    depressed
                                    x-small
                                    text
                                    color="info"
                                    class="mt-3"
                                    @click="() => paymentDialog = true"
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
                                <span class="text-caption font-weight-bold text-capitalize error--text">Order Description</span>
                            </v-card-title>
                        
                            <v-card-text>
                                <v-row class="mt-n7" >
                                     <p class="text-caption pa-4 font-weight-normal">
                                        {{ show_first_fifty(order.description )}}
                                        <span id="dots-1" :style="order.show_more ? 'display: none;' : 'display: inline;'">....</span> <span id="more-1" :style="order.show_more ? 'display: inline;' : 'display: none;'">
                                            {{ show_hidden_description(order.description )}}
                                        </span>
                                        <!-- Button for showing more description -->
                                        <v-btn icon @click="showMore" x-small>
                                            <v-icon x-small color="info"> 
                                                {{order.show_more ? 'mdi-eye-off' : 'mdi-eye'}} 
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
                            v-if="!order.is_verified"
                            color="success" 
                            block 
                            small 
                            depressed 
                            @click="getVerificationCode"
                        >
                            <span class="text-caption font-weight-bold text-capitalize">
                                verify order
                            </span>
                        </v-btn>

                        <v-btn 
                            v-if="order.is_verified"
                            color="success" 
                            block 
                            small 
                            depressed 
                            @click="() => $router.back()"
                        >
                            <span class="text-caption font-weight-bold text-capitalize">
                                edit complete
                            </span>
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-col>
        </v-row>
        <!-- End of the practitioner card -->

        <!-- Dialog for creating a new job -->
        <v-dialog v-model="jobDialog" max-width="520" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-body-2 font-weight-bold white--text">
                    Edit the service Required
                </span>
            </v-card-title>

            <v-card-text class="mt-3">
                <v-form ref="jobDialog" v-model="valid">
                  <span class="text-caption font-weight-bold ml-10 primary--text">
                    Q1. What category is the job you have in mind?
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
                    v-model="formData.category"
                    :value="order.category"
                  ></v-select>
                  <span class="text-caption font-weight-bold ml-10 primary--text">
                      Q2. What specialty does your job fall into?
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
                    v-model="formData.specialty"
                    :value="order.specialty"
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
        <v-dialog v-model="typeDialog" max-width="520" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-body-2 font-weight-bold white--text">
                Update Order Type
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form v-model="valid" ref="typeDialog">
                  <span class="text-caption font-weight-bold ml-10 primary--text">
                      Q3. What kind of job type do you need?
                  </span>
                  <!-- Options for the category -->
                  <v-select 
                    :items="projectTypes" 
                    prepend-icon="mdi-briefcase-plus-outline" 
                    placeholder="Choose Job Specialty" 
                    dense 
                    class="mt-3" 
                    item-text="name" 
                    item-value="name" 
                    :rules="selectRules"
                    style="font-size: .9em;"
                    :value="order.order_type"
                    v-model="typeForm.order_type"
                  ></v-select>
                  <!-- End of the options for the category -->
                  <span class="text-caption font-weight-bold ml-10 primary--text">
                      Q4. How many contractors does your job need?
                  </span>
                  <!-- Options for the category -->
                  <v-text-field 
                    prepend-icon="mdi-account-group" 
                    placeholder="Number of required contractors" 
                    dense 
                    class="mt-3 mb-2" 
                    style="font-size: .9em;"
                    type="number"
                    :rules="contractorsRules"
                    :value="order.required_contractors"
                    v-model="typeForm.required_contractors"
                  ></v-text-field>
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
                  @click="() => typeDialog = false" 
                >cancel</v-btn>
                <!-- End of cancel button -->

                <!-- Next Button -->
                <v-btn 
                  dark 
                  depressed 
                  class="text-caption text-capitalize" color="info" 
                  small 
                  :loading="loading"
                  @click.stop="updateOrderType"
                >
                  update Type
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

        <!-- Dialog for adding the type of project -->
        <v-dialog v-model="durationDialog" max-width="520" persistent>
            <v-card>
            <v-card-title class="my-card-title">
                <span class="text-caption font-weight-bold white--text">
                  Update Order Duration and Deadline
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form v-model="valid" ref="durationDialog">
                  <span class="text-caption font-weight-bold ml-10 primary--text">
                      Q3. How long will your order last?
                  </span>
                  <!-- Options for the category -->
                  <v-select 
                    :items="durations" 
                    prepend-icon="mdi-briefcase-plus-outline" 
                    placeholder="Choose Job Specialty" 
                    dense 
                    class="mt-3 mb-2" 
                    item-text="name" 
                    item-value="name" 
                    :rules="selectRules"
                    style="font-size: .9em;"
                    v-model="durationForm.duration"
                  ></v-select>
                  <!-- End of the options for the category -->
                  <span class="text-caption font-weight-bold ml-10 primary--text">
                      Q4. When is the deadline for offer submission for your order?
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
                        v-model="durationForm.deadline_string_date"
                        placeholder="Not accepting deadline beyond"
                        prepend-icon="mdi-calendar-outline"
                        readonly
                        :rules="dateRules"
                        v-bind="attrs"
                        v-on="on"
                        style="font-size: .9em;"
                    ></v-text-field>
                    </template>
                    <v-date-picker 
                      no-title 
                      v-model="durationForm.deadline_string_date" 
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
                  @click="() => durationDialog = false"
                >cancel</v-btn>
                <!-- End of cancel button -->

                <!-- Next Button -->
                <v-btn 
                  dark 
                  depressed 
                  class="text-caption text-capitalize" color="info" 
                  small 
                  :loading="loading"
                  @click.stop="updateOrderDuration"
                >
                  update Timeline
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
                <span class="text-body-2 font-weight-bold white--text">
                    Update Payment information 
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form v-model="valid" ref="paymentDialog">
                  <span class="text-caption font-weight-bold ml-10 primary--text">
                      Q5. How will your payments be made?
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
                    v-model="payForm.payment_schedule"
                  ></v-select>
                  <!-- End of the options for the category -->
                  <span class="text-caption font-weight-bold ml-10 primary--text">
                      Q6. Set acceptable offer range you will pay  <span class="pink--text text-lowercase">{{payForm.payment_schedule}}</span>
                  </span>
                  <v-row>
                      <v-col md=5 class="mt-n3">
                          <v-text-field 
                            placeholder="Minimum amount" 
                            prepend-icon="" 
                            append-icon="mdi-decimal" 
                            style="font-size: .9em;" 
                            v-model="payForm.min_payment"
                            :rules="amountRules"
                            :disabled="payForm.payment_schedule ? false : true"
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
                            v-model="payForm.max_payment"
                            :rules="amountRules"
                            :disabled="payForm.payment_schedule ? false : true"
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
                  @click="() => paymentDialog = false"
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
                  @click="updateOrderPayment"
                >
                  Update payment
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
                <span class="text-body-2 font-weight-bold white--text">
                    Update Order Description
                </span>
            </v-card-title>

            <v-card-text class="mt-3"> 
                <v-form v-model="valid" ref="descriptionDialog">
                  <span class="text-caption font-weight-bold primary--text">
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
                  @click="() => descriptionDialog = false"
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
                  @click="updateOrderDescription"
                >
                  update description
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
                    New Order Verification
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
                            <v-icon small light color="success">mdi-cached</v-icon>
                        </span>
                    </template>
                  </v-btn>

                  <!-- End of cancel dialog -->
                  <v-btn
                    dark 
                    depressed 
                    class="mr-4 text-caption text-capitalize" 
                    color="success" 
                    small 
                    :loading="loading"
                    @click="verifyOrder"
                  >
                      <span class="text-capitalize font-weight-bold text-caption">verfify Order</span>
                      <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon light color="white">mdi-cached</v-icon>
                            </span>
                        </template>
                  </v-btn>
              </v-card-actions>
        </v-card>
        </v-dialog>
        <!-- End of submit offer dialog -->

        <v-snackbar v-model="error" :color="color" top app elevation="2">
            <span class="text-caption font-weight-bold">
            {{ errorMessage }}
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
    async fetch({ store, params}) {
        // get the order being referenced on the router
        await store.dispatch('created_order/getOrder', params.id)
            .catch(err => {
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
        ...mapGetters('created_order', {
            order: 'currentOrder'
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
        typeDialog: false,
        paymentDialog: false,
        descriptionDialog: false,
        attachmentDialog: false,
        withdrawalDialog: false,
        jobDialog: false,
        durationDialog: false,
        menu: false,
        activationDialog: false,
        error: false,
        errorMessage: '',
        color: 'error lighten-1',
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
        // form data
        formData: {
            category: '',
            specialty: ''
        },
        // verificationForm
        verificationForm: {
            verification_code: ''
        },
        // type form
        typeForm: {
            order_type: '',
            required_contractors: 0
        },
        // duration form
        durationForm: {
            duration: '',
            deadline_string_date: ''
        },
        // payForms
        payForm: {
            payment_schedule: '',
            min_payment: '',
            max_payment: ''
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
          this.$store.commit('created_order/TOGGLE_SHOW_MORE')
        },
        // show description dialg
        showDescriptionDialog() {
            // set the description to the value of the order
            this.descriptionForm.description = this.order.description
            // set the description dialog to true
            return this.descriptionDialog = true
        },
        // function for showing jobDialog
        showJobDialog() {
            // set the catgory
            this.formData.category = this.order.category
            // set the specialty
            this.formData.specialty = this.order.specialty
            // set the jobDialog to true
            return this.jobDialog = true
        },
        // function for showing typeDialog
        showTypeDialog() {
            // set the required contractors
            this.typeForm.required_contractors = this.order.required_contractors
            // set the order type
            this.typeForm.order_type = this.order.order_type
            // set the jobDialog to true
            return this.typeDialog = true
        },
        // show duration timeline
        showDurationDialog() {
            // set the dialog
            this.durationForm.deadline_string_date = this.order.deadline_string_date
            // set the duration
            this.durationForm.duration = this.order.duration
            // set the duration dialog to true
            this.durationDialog = true
        },
        // handleerror function
        handleError(error) {
            // check if the error has a response
            if (err.response) {
                // get the message from the eresponse
                this.errorMessage = error.response.data.errors.details
            } else {
                this.errorMessage = 'Update Failed. Please try again later.'
            }
            // set the loading to true
            this.loading = false
            // set loader to this.loading
            this.loader = null
            // set the error tot true in order to dispay the error snackbar
            this.error = true
        },  
        // show typre dialog
      async updateCategory() {
          // validate the dialog form
          if (!this.$refs.jobDialog.validate()) return

          // set the loading to true
          this.loading = true
          // set loader to this.loading
          this.loader = this.loading
          // 
          await this.$store.dispatch('created_order/updateOrderCategory', {data: this.formData, action: 'Update' })
            .then(() => {
              // set the loading to true
              this.loading = false
              // set loader to this.loading
              this.loader = null
              // reset the form
              this.$refs.jobDialog.reset()
              // hide the job dialog
              this.jobDialog = false
            })
            .catch(err => this.handle_error(err))
      },

      // show payment dialog
      async updateOrderType() {
        // validate the dialog form
        if (!this.$refs.typeDialog.validate()) return

        // set the loading to true
        this.loading = true
        // set loader to this.loading
        this.loader = this.loading
        // post the data
        await this.$store.dispatch('created_order/addOrderType', {data: this.typeForm, action: 'Update'})
          .then(() => {
            // set the loading to true
              this.loading = false
              // set loader to this.loading
              this.loader = null
              // reset the form
              this.$refs.typeDialog.reset()
              // hide the dialog
              this.typeDialog = false
          })
          .catch(err => this.handleError(err))
        
      },

      // show payment dialog
      async updateOrderDuration() {
        // validate the dialog form
        if (!this.$refs.durationDialog.validate()) return

        // set the loading to true
        this.loading = true
        // set loader to this.loading
        this.loader = this.loading
        // post the data
        await this.$store.dispatch('created_order/addOrderDuration', {data: this.durationForm, action: 'Update'})
          .then(() => {
            // set the loading to true
              this.loading = false
              // set loader to this.loading
              this.loader = null
              // reset the form
              this.$refs.durationDialog.reset()
              // hide the dialog
              this.durationDialog = false
          })
          .catch(err => this.handleError(err)) 
      },

      // show description dialog
      async updateOrderPayment() {
          // validate the dialog form
        if (!this.$refs.paymentDialog.validate()) return
        // set the loading to true
        this.loading = true
        // set loader to this.loading
        this.loader = this.loading
        // post the data
        await this.$store.dispatch('created_order/addOrderPayment', {data: this.payForm, action: 'Update'})
          .then(() => {
            // set the loading to true
              this.loading = false
              // set loader to this.loading
              this.loader = null
              // reset the form
              this.$refs.paymentDialog.reset()
              // hide the payment dialog
              this.paymentDialog = false
          })
          .catch(err => this.handleError(err))
      },

      // show attachment dialog
      async updateOrderDescription() {
        // validate the form
        if (!this.$refs.descriptionDialog.validate()) return
        // set the loading to true
        this.loading = true
        // set loader to this.loading
        this.loader = this.loading
        // post the data
        await this.$store.dispatch('created_order/addOrderDescription', {data: this.descriptionForm, action: 'Update'})
          .then(() => {
            // set the loading to true
              this.loading = false
              // set loader to this.loading
              this.loader = null
              // reset the form
              this.$refs.descriptionDialog.reset()
              // hide the description dialog
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
          await this.$axios.get(`/order/${this.order.id}/verification`)
            .then(result => {
                // set teh loading to false
                this.loading = false,
                // set the loader to null
                this.loader = null
                // set the activation code to true
                this.activationDialog = true
            })
            .catch(err => {
                if (err.response && err.response.status == 400) {
                    // get the details
                    let { data } = err.response
                    // set the error to true
                    this.error = true
                    // set the error message
                    this.errorMessage = data.errors.details
                } else {
                   // set the error to true
                    this.error = true
                    // set the error message
                    this.errorMessage = 'There was a problem sending the verification code. Try again'
                }
                // set teh loading to false
                this.loading = false,
                // set the loader to null
                this.loader = null
            })
      },
      // function for getting verification code
      async resendVerificationCode() {
          // set the loading to true
          this.resendLoading = true
          // set the loader to true
          this.resendLoader = this.resendLoading
          // make the request
          await this.$axios.get(`/order/${this.order.id}/verification/resend`)
            .then(result => {
                console.log(result)
                // set the message
                this.errorMessage = result.data.data.message
                // set the color for the snackbar
                this.color = 'success lighten-1'
                // set the error to true
                this.error = true
                // set teh loading to false
                this.resendLoading = false,
                // set the loader to null
                this.resendLoader = null
            })
            .catch(err => {
                if (err.response && err.response.status == 400) {
                    // get the details
                    let { data } = err.response
                    // show the error
                    // set the error to true
                    this.error = true
                    // set the error message
                    this.errorMessage = data.errors.details
                } else {
                    // show the error
                    // set the error to true
                    this.error = true
                    // set the error message
                    this.errorMessage = 'There was a problem sending the verification code. Try again'
                }
                // set teh loading to false
                this.resendLoading = false,
                // set the loader to null
                this.resendLoader = null
            })
      },

      // function for verifying the order
      async verifyOrder() {
          // validate the form
          if (!this.$refs.activationDialog.validate()) return
          // set the loading to true
          this.loading = true
          // set the loader to true
          this.loader = this.loading
          // console.log(this.verificationForm)
          // set the order
          await this.$axios.post(`/order/${this.order.id}/verify`, {new_order: {verification_code: this.verificationForm.verification_code}})
            .then(() => {
                // set the loading to false
                this.loading = false
                // set the loader to null
                this.loader = null
                // reset the form
                this.$refs.activationDialog.reset()
                // set teh activation dialog to false
                this.activationDialog = false
                // redirect the user to the order page
                this.$router.push({
                    path: `/orders/${this.order.id}`
                })
            }).catch(err => {
                if (err.response && err.response.status == 400) {
                    // get the details
                    let { data } = err.response
                    // show the error
                    // set the error to true
                    this.error = true
                    // set the error message
                    this.errorMessage = data.errors.details
                } else {
                    // set the error to true
                    this.error = true
                    // set the error message
                    this.errorMessage = 'There was a problem sending the verification code. Try again'
                }
                // set the loading to false
                this.loading = false
                // set the loader to null
                this.loader = null
            })  
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