<template>
      <v-col md=6 class="ml-n3">
        <v-card class="mx-auto" width="535"  elevation="2">
          <!-- Card text for the description of the order -->
          <v-card-text>
          <!-- End of row for skills -->
            <v-row class="mt-n2" justify="center">
                <v-img 
                  :src="require('@/assets/images/Oops.jpg')"
                  max-height="100"
                  max-width="300"
                ></v-img>
            </v-row>

            <v-row justify="center">
              <h3 class="error--text">
                <span style="font-size: 1.5em;"> ):</span> <span class="ml-3">{{ error.message }}</span>
              </h3>
            </v-row>

            <v-row justify="center" class="mt-5">
              <v-col md=6>
                <v-btn 
                  color="teal lighten-1" 
                  depressed 
                  small
                  dark 
                  block
                  @click="() => this.$router.back()"
                >
                Go Back
              </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <!-- End of the card text for description for the order -->

        </v-card>
      </v-col>
</template>

<script>
export default {
    // name
    name: 'NotFoundError',
    // layout
    layout: 'main',
    // props
    props: [
        'error'
    ]
}
</script>