<template>
  <v-col md=7 class="ml-n10 mt-4">
    <v-row align="center" justify="center" class="mt-n3">
      <v-col md="12" class="mb-n3">
        <v-card flat class="pl-3 pr-3 pt-2">
            <v-card-title>
                <v-row justify="center" class="mt-n2 mb-n2">
                    <v-icon small left color="info darken-2">mdi-receipt</v-icon>
                    <span class="text-caption font-weight-bold primary--text">
                        Recent Transactions
                    </span>

                    <v-spacer></v-spacer>
                    <span class="text-caption font-weight-bold purple--text">
                        Current Balance: <span class="ml-3">Kes 40000</span>
                    </span>
                </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-row>
                <v-col md=3>
                    <span class="text-caption font-weight-bold error--text">
                        Transaction Type
                    </span>
                </v-col>
                <v-col md=3>
                    <span class="text-caption font-weight-bold primary--text">
                        Transaction Client
                    </span>
                </v-col>
                <v-col md=3>
                    <span class="text-caption font-weight-bold pink--text">
                        Transaction Date
                    </span>
                </v-col>
                <v-col md=3>
                    <span class="text-caption font-weight-bold info--text">
                        Transaction Amount
                    </span>
                </v-col>
            </v-row>
            <v-row class="info lighten-4">
                <v-col md=3>
                    <span class="text-caption">
                        Payment Approval
                    </span>
                </v-col>
                <v-col md=3>
                    <span class="text-caption font-weight-bold">
                        Frankline Okari
                    </span>
                </v-col>
                <v-col md=3> 
                    <span class="text-caption">
                        22-02-2020
                    </span>
                </v-col>
                <v-col md=3>
                    <span class="text-caption">
                        Kes 40000
                    </span>
                </v-col>
            </v-row>
            <v-row class="success lighten-4">
                <v-col md=3>
                    <span class="text-caption">
                        withdrawal
                    </span>
                </v-col>
                <v-col md=3>
                    <span class="text-caption font-weight-bold">
                        Frankline Okari
                    </span>
                </v-col>
                <v-col md=3> 
                    <span class="text-caption">
                        22-02-2020
                    </span>
                </v-col>
                <v-col md=3>
                    <span class="text-caption">
                        Kes 40000
                    </span>
                </v-col>
            </v-row>
            <v-row class="warning lighten-5">
                <v-col md=3>
                    <span class="text-caption">
                        Payment Reception
                    </span>
                </v-col>
                <v-col md=3>
                    <span class="text-caption font-weight-bold">
                        Frankline Okari
                    </span>
                </v-col>
                <v-col md=3> 
                    <span class="text-caption">
                        22-02-2020
                    </span>
                </v-col>
                <v-col md=3>
                    <span class="text-caption">
                        Kes 40000
                    </span>
                </v-col>
            </v-row>
            <v-row class="error lighten-5">
                <v-col md=3>
                    <span class="text-caption">
                        Payment Reversal
                    </span>
                </v-col>
                <v-col md=3>
                    <span class="text-caption font-weight-bold">
                        Frankline Okari
                    </span>
                </v-col>
                <v-col md=3> 
                    <span class="text-caption">
                        22-02-2020
                    </span>
                </v-col>
                <v-col md=3>
                    <span class="text-caption">
                        Kes 40000
                    </span>
                </v-col>
            </v-row>
        </v-card>
      </v-col>
    </v-row>

  </v-col>
</template>

<script>
  export default {
    layout: 'list',
    props: {
      source: String,
    },
    data: () => ({

    }),

    // methods
    methods: {
      computeChipColor(item) {
        if (item.text.startsWith('Accepted')) {
          return 'success lighten-1';
        } else if (item.text.startsWith('Rejected')) {
          return 'error lighten-1';
        } else {
          return 'info lighten-1';
        }
      },

      computeSavedChipMargin(item) {
        if (item.text == 'Tagged Orders') {
          return 'ml-7';
        } else if (item.text == 'Saved Orders') {
          return 'ml-8';
        } else {
          return 'ml-10';
        }
      },

      computeChipMargin(item) {
        if (item.text.startsWith('Accepted')) {
          return 'ml-8';
        } else if (item.text.startsWith('Rejected')) {
          return 'ml-9';
        } else {
          return 'ml-9';
        }
      },

      computeTransactionChipColor(item) {
        if (item.title.startsWith('Refunded')) {
          return 'error';
        } else if (item.title.startsWith('Approved')) {
          return 'success darken-1';
        } else if(item.title.startsWith('Recent')) {
          return 'primary';
        } else {
          return 'success';
        }
      },

      computeTransactionChipMargin(item) {
        if (item.title.startsWith('Refundend')) {
          return 'ml-8';
        } else if (item.title.startsWith('Approved')) {
          return 'ml-8';
        } else if(item.title.startsWith('Recent')) {
          return 'ml-6';
        } else {
          return 'ml-8';
        }
      },

      showMore(dotsId, moreId, btnId, iconId) {
        return this.showLess = !this.showLess;
      },

    },
  }
</script>
