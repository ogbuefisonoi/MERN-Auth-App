import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Breadcrumb extends Component {
    state = {
        crumbs : window.location.pathname.split("/")
    }
    render() {
        // console.log(this.state);

        var last =  this.state.crumbs.length-1;
        var breads = [];
        var link_str = "/";
        var sublink = [];
        for(var i = 1; i<this.state.crumbs.length; i++){
            breads[i] = window.location.pathname.split("/")[i];
            link_str += breads[i] + "/";
            sublink[i] = link_str;
        }
        return (
            <div>
                <ol className = "flex capitalize">
                    {this.state.crumbs.map((crumb, index) => {
                        return index !== last & index>0 ?(
                            <li key = {index}>
                                {/* <Link to = {sublink[index]}>{crumb}</Link> */}
                                <span >/</span>
                            </li>
                        ):(
                            <li key = {index}>
                                {/* <Link to = {sublink[index]}>{crumb}</Link> */}
                            </li>
                        )
                    })
                }
                </ol>
            </div>
        )
    }
}
