<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes.light.background}">

    <v-app-bar app color="#4267B2" dark>

        <v-toolbar-title style="width: 300px" class="ml-10">
          <v-icon large color="white" left class="ml-5 mt-n1">mdi-briefcase-search</v-icon> 
          <span class="hidden-sm-and-down font-weight-bold text-capitalize ml-1">eworks</span>
        </v-toolbar-title>
    
        <!-- End of serch select field -->
        <v-spacer></v-spacer>

      

        <div class="mr-5">
          <v-btn small dark color="info" class="mr-10" @click="() => this.$router.push({path: '/account/login'})">
              <v-icon small left dark>mdi-login</v-icon>
              <span class="text-capitalize font-weight-bold text-caption">login</span>
          </v-btn>

          <v-btn small dark color="success" @click="() => this.$router.push({path: '/account/register'})">
              <v-icon small left dark>mdi-account</v-icon>
              <span class="text-capitalize font-weight-bold text-caption">Register</span>
          </v-btn>
        </div>
        
      
    </v-app-bar>

    <!-- MAin content of the app -->
    <v-main>
      <v-container justify="center">
        <!-- MAin row -->
        <v-row class="ml-3" justify="center">
          <v-col md=6 class="mt-6 mr-n2">

            <v-card-title class="mt-10">
              <v-icon large color="teal" left class="ml-5">mdi-briefcase-search</v-icon> 
              <h3 class="teal--text ml-2">Eworks</h3>
            </v-card-title>

            <v-card-text>
              <h4 class="px-5 text-body-1 font-weight-bold" style="line-height: 1.7em;">
                Eworks helps freelancers, small businesses or corporation access various contracts while ensuring
                clients have access to the best expertise at their stipulated price.
              </h4>
            </v-card-text>
          </v-col>
          <!-- main content -->
          <nuxt />
          <!-- End of main content -->
        
        </v-row>
        <!-- End of the main row -->
      </v-container>
    </v-main>
    <!-- End of main content -->

    <v-footer dark padless app height="50">
      <v-card class="flex mt-n3" flat tile>
        <v-card-title class="grey">
          <strong class="text-body-1 ml-5 text-capitalize font-weight-bold">Contact us: </strong>

          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-2"
            dark
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <span class="mr-10 text-body-1">
            &copy; {{ new Date().getFullYear() }} — <strong>Eworks</strong>
          </span>

        </v-card-title>


      </v-card>
    </v-footer>
 
  </v-app>
</template>

<script>
  // component definition
  export default {
    // name
    name: 'Actions',
    // data
    data: () => ({
      userActions: [
        {title: "My Account", to: "#8"},
        {title: "Logout", to: "#9"}
      ],
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
    // methods
    methods: {
      // function for logging out the user
      logout() {
        // log out the user
        this.$auth.logout()
          .then((result) => {
            // log the user is logged out
            console.log('User Logged out')
            // redirect user to login page
            this.$router.push({path: '/account/login'})
          })
          // handle error
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .my-footer {
    background-color: #4267B2;
  }
</style>




