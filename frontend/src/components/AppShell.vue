<template>
<div>
  <v-toolbar dense flat color="rgba(0, 0, 0, 0)">
    <v-toolbar-side-icon @click="drawer = !drawer" v-if="validPage"></v-toolbar-side-icon>
    <v-spacer></v-spacer>
    <dark-mode-switch></dark-mode-switch>
  </v-toolbar>

  <nav v-if="validPage">
    <v-navigation-drawer app v-model="drawer">
      <v-toolbar flat class="transparent py-2">
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <img :class="{'logo--dark': $store.state.settings.darkMode}" src="@/assets/ts3_manager_text_new.svg" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list dense class="pt-2">
        <v-list-tile v-for="(entry, i) in menuEntries" v-if="!entry.submenu" :key="i" :to="entry.path">
          <v-list-tile-action>
            <v-icon>{{ entry.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            {{ entry.title }}
            <v-icon v-if="entry.experimental">mdi-test-tube</v-icon>
          </v-list-tile-title>
        </v-list-tile>
        <v-list-group v-else value="true" :prepend-icon="entry.icon" active-class="" no-action>
          <template slot="activator">
            <v-list-tile>
              <v-list-tile-title>
                {{ entry.title }}
              </v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile v-for="(subEntry, j) in entry.submenu" :key="j" :to="subEntry.path" :exact="true">
            <v-list-tile-action>
              <v-icon>{{ subEntry.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>
              {{ subEntry.title }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</div>
</template>

<script>
export default {
  components: {
    DarkModeSwitch: () => import('@/components/DarkModeSwitch')
  },
  data() {
    return {
      mini: true,
      drawer: null,
      menuEntries: [{
          title: 'Server List',
          icon: 'dns',
          path: '/servers',
        },
        {
          title: 'Backup/Restore',
          icon: 'settings_backup_restore',
          path: '/snapshot'
        },
        {
          title: 'Server Viewer',
          icon: 'remove_red_eye',
          path: '/serverviewer',
        },
        {
          title: 'List All Clients',
          icon: 'person',
          path: '/clients',
        },
        {
          title: 'Ban List',
          icon: 'not_interested',
          path: '/bans'
        },
        {
          title: 'Console',
          icon: 'mdi-console',
          path: '/console'
        },
        {
          title: 'Complaints List',
          icon: 'warning',
          path: '/complaints'
        },
        {
          title: 'Server Groups',
          icon: 'group',
          path: '/servergroups',
        },
        {
          title: 'Channel Groups',
          icon: 'chat_bubble',
          path: '/channelgroups'
        },
        {
          title: 'Permissions',
          icon: 'mdi-format-section',
          submenu: [{
              title: 'Server Group',
              icon: 'group',
              path: '/permissions/servergroup/',
            },
            {
              title: 'Client Permissions',
              icon: 'person',
              path: '/permissions/client/',
            },
            {
              title: 'Channel Permissions',
              icon: 'chat_bubble',
              path: '/permissions/channel/',
            },
            {
              title: 'Channel Groups',
              icon: 'chat_bubble',
              path: '/permissions/channelgroup/',
            },
            {
              title: 'Channel Client Permissions',
              icon: 'chat_bubble',
              path: '/permissions/channel/0/client/0',
            },
          ]
        },
        {
          title: 'Logout',
          icon: 'exit_to_app',
          path: '/logout'
        }
      ],
    }
  },
  computed: {
    validPage() {
      if (this.$route.name === 'login' || this.$route.name === '404') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style>
.logo--dark {
  filter: brightness(10);
}
</style>
