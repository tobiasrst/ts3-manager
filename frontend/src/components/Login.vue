<template>
  <v-container>
    <v-layout align-center justify-center fill-height>
      <v-flex xs12 sm8 md6 lg5 xl4>
        <v-card>
          <v-card-title></v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-layout justify-space-between wrap>
                <v-flex xs12 md6>
                  <v-text-field label="Server" placeholder="IP or Domain" v-model="form.host" :rules="[rules.required]"></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="Port" type="number" v-model="form.port" :rules="[rules.required]">
                    <template slot="prepend">
                      <v-tooltip bottom>
                        <template slot="activator">
                          <v-icon>mdi-help-circle-outline</v-icon>
                        </template>
                        <span>Enter the SeverQuery port of your server. The default ones are 10011 or 10022 (encrypted).</span>
                      </v-tooltip>
                    </template>
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Name" v-model="form.username" :rules="[rules.required]" placeholder="e.g. serveradmin" name="username" browser-autocomplete="username"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password" type="password" v-model="form.password" :rules="[rules.required]" name="password" browser-autocomplete="current-password"></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" :disabled="!valid" @click="connect" :loading="loading">
              <v-icon>arrow_forward</v-icon>Connect
              <template slot="loader">
                <span>Connecting...</span>
              </template>
            </v-btn>
          </v-card-actions>
          <span :style="{color: '#BDBDBD', marginLeft: '5px'}">Version {{ appVersion }}</span>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {version} from '../../package.json'

export default {
  data() {
    return {
      valid: false,
      loading: false,
      rules: {
        required: value => !!value || 'Required.'
      },
      form: {
        host: '',
        port: 10022,
        username: '',
        password: '',
      },
      appVersion: version
    }
  },
  methods: {
    connect() {
      this.loading = true

      this.$socket.emit('connect TeamSpeak', this.form, response => {
        this.loading = false

        if(response.token) {
          this.$store.commit('isConnected', true)
          this.$store.commit('saveToken', response.token)
          this.$router.push({name: 'servers'})
        } else {
          this.$toast.error(response.error, {icon: 'error'})
          this.$store.commit('isConnected', false)
        }
      })
    }
  }
}
</script>