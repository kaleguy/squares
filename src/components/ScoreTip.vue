<template>
  <div class="note-veil" @click="$emit('close')">
    <div class="note-card">
      <div class="note-title">Scores</div>
      <div class="note-body">A round counts down from {{seconds}} seconds. Finish it and whatever is left on the clock is the score, so a faster round is worth more.</div>
      <div class="note-body tip-gap">The top box is the clock. The two under it are your last two scores here.</div>
      <button type="button" class="settings-done tip-done" @click="$emit('close')">Got it</button>
    </div>
  </div>
</template>

<script>
// What the three boxes beside the problem are, raised by touching them.
//
// A score is what was left of the clock, and nothing on the screen says so:
// the number arrives in a box, and a number in a box could be anything.
const vm = {
  name: 'scoretip',
  props: {
    seconds: { default: 70 }
  }
}

export default vm
</script>

<style lang="sass">
.tip-gap
  margin-top: 12px
.tip-done
  margin-top: 16px
</style>
