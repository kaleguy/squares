<template>
  <div class="note-veil" @click="$emit('close')">
    <div class="note-card settings-card" @click.stop>
      <div class="note-title settings-title">Settings</div>

      <!-- No sentence under it: the swatches are the whole of what the
           choice does, drawn as the thing it changes. -->
      <div class="settings-heading">Theme</div>
      <themepicker></themepicker>

      <!-- Everyone this device is keeping scores for. The X asks first: a
           name goes with everything that name has ever done here. -->
      <div class="settings-heading">Names</div>
      <!-- Room for the question when one is being asked, so the buttons are
           never half off the bottom of the list. -->
      <div class="settings-names" :style="{ maxHeight: confirming ? '260px' : '148px' }">
        <div class="settings-empty" v-if="!names.length">Nothing kept on this device.</div>
        <template v-for="name in names">
          <div class="settings-confirm" v-if="confirming === name" :key="'c' + name">
            <div>Delete this user. This will also delete the user&rsquo;s data.</div>
            <div class="settings-confirm-buttons">
              <button type="button" class="settings-keep"
                      @click="confirming = null">Keep</button>
              <button type="button" class="settings-delete"
                      @click="removeUser(name)">Delete</button>
            </div>
          </div>
          <div class="settings-name" v-else :key="'n' + name">
            <span>{{name}}</span>
            <button type="button" class="settings-x"
                    :aria-label="'Delete ' + name"
                    @click="confirming = name">
              <x width="15"></x>
            </button>
          </div>
        </template>
      </div>

      <button type="button" class="settings-done" @click="$emit('close')">Done</button>
    </div>
  </div>
</template>

<script>
// What the gear opens: the colour the app is drawn in, and the names it is
// keeping scores for. It stood on the screen that asked Steps or Grid; that
// screen is gone, and the gear stands on the operator menu now.
import * as analytics from '../lib/analytics'
import { titleCase, users, deleteUser } from '../lib/name'
import ThemePicker from './ThemePicker'
import X from './X'

const vm = {
  name: 'settingscard',
  components: {
    themepicker: ThemePicker,
    x: X
  },
  data () {
    return {
      names: users(),
      // The name whose delete has been asked for but not yet confirmed.
      confirming: null
    }
  },
  methods: {
    removeUser (name) {
      deleteUser(name)
      analytics.capture('name deleted')
      this.names = users()
      this.confirming = null
      // Deleting whoever is playing leaves nobody playing.
      if (titleCase(this.$store.state.username) === name) {
        this.$store.commit('SETUSER', { username: '' })
        this.$router.replace('/')
      }
    }
  }
}

export default vm
</script>
