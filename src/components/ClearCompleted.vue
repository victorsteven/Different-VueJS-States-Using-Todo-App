<template>
  <div v-if="showClearCompletedButton">
    <transition name="fade">
      <button 
        @click="clearCompleted"
      >
        Clear Completed
      </button>
    </transition>
  </div>
</template>

<script>
export default {

  props: {
    showClearCompletedButton: {
      type: Boolean,
      required: true
    }
  },
  name: 'clear-completed',

  methods: {
    clearCompleted() {
      // alert('yo')
      eventBus.$emit('clearCompletedTodos');
    }
  }
}
</script>

