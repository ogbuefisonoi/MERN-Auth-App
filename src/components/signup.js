import React, { Component } from 'react';

export default class Signup extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Username: '',
            Password: '',
        }
    }

    onChangeUsername(e) {
        this.setState({
            Username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            Password: e.target.value
        });
    }

    
    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Username: ${this.state.Username}`);
        console.log(`Password: ${this.state.Password}`);
        
        this.setState({
            Username: '',
            Password: '',
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Signup</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Username: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeUsername}
                                />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.Password}
                                onChange={this.onChangeTodoResponsible}
                                />
                    </div>
                     
                    <div className="form-group">
                        <input type="submit" value="Signup" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}