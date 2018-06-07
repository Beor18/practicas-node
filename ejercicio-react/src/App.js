import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// data
import { todos } from './todos.json';

// subcomponents
import TodoFormulario from './components/TodoFormulario';

class App extends Component {
    constructor() {
        super();
        this.state = {
            todos
        }
        this.handleAddTodo = this.handleAddTodo.bind(this);
    }

    removeTodo(index) {
        this.setState({
            todos: this.state.todos.filter((e, i) => {
                return i !== index
            })
        });
    }

    handleAddTodo(todo) {
        this.setState({
            todos: [...this.state.todos, todo]
        })
    }

    render() {
        const todos = this.state.todos.map((todo, i) => {
            return (
                <
                div className = "card mt-4" >
                <
                div className = "card-title text-center" >
                <
                h3 > { todo.title } < /h3> <
                span className = "badge badge-pill badge-danger ml-2" > { todo.priority } <
                /span> < /
                div > <
                div className = "card-body" > { todo.description } <
                /div> <
                div className = "card-footer" >
                <
                button className = "btn btn-danger"
                onClick = { this.removeTodo.bind(this, i) } >
                Borrar <
                /button> < /
                div > <
                /div> 
            )
        });

        return ( <
            div className = "App" >

            <
            nav className = "navbar navbar-dark bg-dark" >
            <
            a className = "navbar-brand"
            href = "/" >
            Productos <
            span className = "badge badge-pill badge-light ml-2" > { this.state.todos.length } <
            /span> < /
            a > <
            /nav>

            <
            div className = "container" >
            <
            div className = "row mt-4" >

            <
            div className = "col-md-4 text-center" >
            
            <
            TodoFormulario onAddTodo = { this.handleAddTodo } > < /TodoFormulario> < /
            div >

            <
            div className = "col-md-8" >
            <
            div className = "row" > { todos } <
            /div> < /
            div > <
            /div> < /
            div > <
            /div>
        );
    }
}

export default App;
