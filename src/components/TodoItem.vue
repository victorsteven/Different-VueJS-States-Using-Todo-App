<template>
  <div>
      <div class="todo-item-left">
        <!-- <input type="checkbox" v-model="completed"> -->
        <!-- this doneEdit method here, we help us the checkbox property only -->
          <input type="checkbox" v-model="completed" @change="doneEdit">
          <div v-if="!editing" 
            class="todo-item-label" 
            :class="{ completed : completed }"
            @click="editTodo(todo)"
            >
            {{ title  }}
          </div>
          <input v-else class="todo-item-edit" type="text" v-model="title" 
            @blur="doneEdit" 
            @keyup.enter="doneEdit" 
            @keyup.esc="cancelEdit" 
            v-focus
          >
        <div>
          <button @click="pluralize">Plural</button>
          <span class="remove-item" @click="removeTodo(index)">
            &times;
          </span>
        </div>
      </div>
      
  </div>
</template>

<script>


export default {
  
  props: {
    todo: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: '',
    }
  },

  watch: {
    checkAll() {
      // if(this.checkAll) {
      //   this.completed = true
      // } else {
      //   this.completed = this.todo.completed
      // }
      this.completed = this.checkAll ? true : this.todo.completed
    }
  },

  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },

  created() {
    eventBus.$on('pluralize', this.handlePluralize)
  },

  beforeDestroy() {
    eventBus.$off('pluralize', this.handlePluralize)
  },

  methods: {
    removeTodo(index) {
      eventBus.$emit('removedTodo', index);
    },
    editTodo(){
      this.beforeEditCache = this.title
      this.editing = true;

    },
    doneEdit() {
      console.log('this is the completed: ', this.completed);
      if(this.title.trim() == '') {
        this.title = this.beforeEditCache
      }
      this.editing = false
      eventBus.$emit('finishedEdit', {
        'index': this.index,
        'todo': {
          'id': this.id,
          'title': this.title,
          'completed': this.completed,
          'editing': this.editing
        }
      })
    },
    cancelEdit() {
      this.title = this.beforeEditCache
      this.editing = false
    },

    pluralize() {
      eventBus.$emit('pluralize')
    },

    handlePluralize(){
      this.title =  this.title + 's'

       eventBus.$emit('finishedEdit', {
        'index': this.index,
        'todo': { 
          'id': this.id,
          'title': this.title,
          'completed': this.completed,
          'editing': this.editing
        }
      })
    }
  }
}
</script>
