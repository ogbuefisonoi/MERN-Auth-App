import React, { Component } from 'react';

export default class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name:'',
        email:'',
        password:'',
        id:''
      };
       
    };

   
    updateProfile(){
       
    }
 
    getProfile(){
 
    }
     
    render() {
      return (
        <div className="page">
            <h2>Profile</h2>
            <form className="form" >
                <br styles="clear:both" />
                <div className="form-group">
                    <input value={this.state.name} type="text" onChange={this.handleNameChange} className="form-control" placeholder="Name" required />
                </div>
                <div className="form-group">
                    <input value={this.state.password} type="password" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required />
                </div>
                
                <button type="button" onClick={this.updateProfile} id="submit" name="submit" className="btn btn-primary pull-right">Update</button>
            </form>
        </div>
      )
    }
}