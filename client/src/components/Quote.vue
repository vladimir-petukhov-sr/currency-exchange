<template>
  <v-card class="elevation-12">
    <v-toolbar color="indigo lighten-2" dark flat>
      <v-toolbar-title>Quote</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <div class="title white--text font-weight-light">Your rate is: {{ exchangeRate }}</div>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <div class="title white--text font-weight-light">You will get: {{ amount }} {{ currencyCode }}</div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Quote',
  props: {
    exchangeRate: {
      type: Number,
      required: true
    },
    currencyCode: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  }
};
</script>
