<template>
    <!-- Dialof for is client -->
    <v-dialog v-model="showIsClient" max-width="520" persistent>
      <v-card>
        <!-- Card title -->
        <v-card-title class="teal">
          <v-icon left color="white" small>mdi-offer-off</v-icon>
          <span class="text-caption font-weight-bold white--text">
            Action not allowed
          </span>
          
          <v-spacer></v-spacer>

          <v-btn 
            color="error" 
            x-small 
            depressed 
            outlined
            @click="hideDialog"
        >
            <span class="text-caption text-capitalize font-weight-bold error--text">cancel</span>
          </v-btn>
        </v-card-title>
        <!-- End of card title -->

        <v-card-text class="mt-5">
          <v-row class="mt-3" justify="center">
              <v-icon color="error" x-large>
                  {{ icon }}
              </v-icon>
          </v-row>

          <v-row class="mt-2" justify="center">
              <h4 class="error--text">
                {{ message }}
              </h4>
          </v-row>

          <v-row justify="center" class="mt-3">
              <p class=" font-weight-bold teal--text px-3 text-caption">
                Your account is of type: <span class="warning--text">Client Account</span> and client accounts
                cannot place offers for orders or collaboration invites .<span class="purple--text">However, your offer can still be 
                submitted upon a <span class="warning--text">One Time Upgrade</span></span>
              </p>
          </v-row>

          <v-row justify="center" class="mt-3">
            <!-- Button for submitting -->
            <v-btn 
              dark 
              depressed 
              class="text-caption text-capitalize px-5" 
              color="teal" 
              small 
              block
              :loading="loading"
            >
                <span class="text-caption font-weight-bold text--capitalize">upgrade account</span>
                <template v-slot:loader>
                    <span class="custom-loader">
                        <v-icon light color="white">mdi-cached</v-icon>
                    </span>
                </template>
              </v-btn>
          </v-row>

        </v-card-text>

        <v-card-actions class="mt-n4" >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End of dialog for is client -->
</template>

<script>
export default {
    // name
    name: 'IsClient',
    // props
    props: [
        'showIsClient',
        'message',
        'icon'
    ],
    // data
    data: () => ({
        // loading
        loading: false,
        // loader
        loader: null
    }),
    // methods
    methods: {
        // hide dialog
        hideDialog() {
            // emit a hide dialog event
            this.$emit('hide-dialog')
        }
    }
}
</script>