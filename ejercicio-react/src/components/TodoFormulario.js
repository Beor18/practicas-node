import React, { Component } from 'react';

class TodoForm extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            responsible: '',
            description: '',
            priority: 'low'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAddTodo(this.state);
        this.setState({
            title: '',
            responsible: '',
            description: '',
            priority: 'low'
        });
    }

    handleInputChange(e) {
        const { value, name } = e.target;
        console.log(value, name);
        this.setState({
            [name]: value
        });
    }

    render() {
        return ( <
            div className = "card" >
            <
            form onSubmit = { this.handleSubmit }
            className = "card-body" >
            <
            div className = "form-group" >
            <
            input type = "text"
            name = "title"
            className = "form-control"
            value = { this.state.title }
            onChange = { this.handleInputChange }
            placeholder = "Titulo" /
            >
            <
            /div> <
            div className = "form-group" >
            <
            input type = "text"
            name = "responsible"
            className = "form-control"
            value = { this.state.responsible }
            onChange = { this.handleInputChange }
            placeholder = "Responsabilidad" /
            >
            <
            /div> <
            div className = "form-group" >
            <
            input type = "text"
            name = "description"
            className = "form-control"
            value = { this.state.description }
            onChange = { this.handleInputChange }
            placeholder = "Descripcion" /
            >
            <
            /div> <
            div className = "form-group" >
            <
            select name = "prioridad"
            className = "form-control"
            value = { this.state.priority }
            onChange = { this.handleInputChange } >
            <
            option > Bajo < /option> <
            option > Medio < /option> <
            option > Urgente < /option> < /
            select > <
            /div> <
            button type = "enviar"
            className = "btn btn-primary" >
            Guardar <
            /button> < /
            form > <
            /div>
        )
    }

}

export default TodoForm;