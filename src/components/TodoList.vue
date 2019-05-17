<template>
  <div class="hello">
    <input type="text" class="todo-input" placeholder="what needs to be done" v-model="newTodo" @keyup.enter="addTodo">
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <todo-item  
          v-for="(todo, index) in todosFiltered" 
          :key="todo.id" 
          class="todo-item"
          :todo="todo" 
          :index="index"
          :checkAll="!anyRemaining"
      >
      </todo-item>
    </transition-group>

    <div class="extra-container">
      
      <todo-check-all
        :anyRemaining="anyRemaining"
      >
      </todo-check-all>
      
      <todo-items-remaining 
        :remaining="remaining"
      >
      </todo-items-remaining>


    </div>

    <div class="extra-container">
      <todo-filtered></todo-filtered>
        <clear-completed
          :showClearCompletedButton="showClearCompletedButton"
        >
        </clear-completed>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem';
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import ClearCompleted from './ClearCompleted'



export default {
  name: 'todo-list',

  components: {
    TodoItem, TodoItemsRemaining, TodoCheckAll, TodoFiltered, ClearCompleted
  },

  data() {
    return {
      filter: 'all',
      newTodo: '',
      idForTodo: 3,
      beforeEditCache: '',
      todos: [
        {
          'id': 1,
          'title': 'Finish Vue Screencast',
          'completed': false,
          'editing': false 
        },
        {
          'id': 2,
          'title': 'Take the world',
          'completed': false,
          'editing': false 

        }
      ]
    }
  },

  created() {
    eventBus.$on('removedTodo', index => this.removeTodo(index));
    eventBus.$on('finishedEdit', data => this.finishEdit(data));
    eventBus.$on('checkAllChanged', checked => this.checkAllTodos(checked));
    eventBus.$on('filterChanged', filter => this.filter = filter);
    eventBus.$on('clearCompletedTodos', () => this.clearCompleted());
  }, 

  beforeDestroy() {
    eventBus.$off('removedTodo', index => this.removeTodo(index));
    eventBus.$off('finishedEdit', data => this.finishEdit(data));
    eventBus.$off('checkAllChanged', checked => this.checkAllTodos(checked));
    eventBus.$off('filterChanged', filter => this.filter = filter);
    eventBus.$off('clearCompletedTodos', () => this.clearCompleted());
  },

  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length
    },

    anyRemaining() {
      return this.remaining != 0;
    },

    todosFiltered() {
      if(this.filter === 'all') {
        return this.todos;
      } else if(this.filter === 'active') {
        return this.todos.filter(todo => !todo.completed)
      } 
      else if(this.filter === 'completed') {
        return this.todos.filter(todo => todo.completed)
      } 
      return this.todos;
    },

    showClearCompletedButton() {
      return this.todos.filter(todo => todo.completed).length > 0
    }
  },

  methods: {

    //splice method updates an item in an array, with new data
    finishEdit(data) {
      this.todos.splice(data.index, 1, data.todo)
    },

    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    },

    addTodo() {
      if(this.newTodo.trim().length == 0) {
        return;
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
      })
      this.newTodo = ''
      this.idForTodo++
    },

    removeTodo(index) {
      this.todos.splice(index, 1);
    },

    checkAllTodos() {
      this.todos.forEach(todo => {
        todo.completed = event.target.checked
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
      outline: 0;
    }
  }

  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s
  }

  .remove-item {
    cursor: pointer;
    margin-left: 40px;
    // margin-right: auto;
    &:hover {
      color: black;
    }
  }

  .todo-item-left {
    display: flex;
    align-items: center;
    // justify-content: space-between;
  }

  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }

  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Arial, Helvetica, sans-serif;

    &:focus {
      outline: none;
    }
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  button {
    font-size: 14px;
    background-color: white;
    appearance: none;

    &:hover {
      background: lightgreen;
    }
    &:focus {
      outline: none;
    }
  }

  .active {
    background: lightgreen;
  }

  .fade-enter-action, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
 
  
</style>
