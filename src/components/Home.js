/*
  @author Félix Fuin
  Copyright Nokia 2018. All rights reserved.
*/
import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import ScrollableAnchor from 'react-scrollable-anchor';
import { Message } from 'semantic-ui-react';

import '../css/Home.css';
import userLibrary from '../userLibrary';
import HeaderBanner from './Header';
import Browse from './Browse';
import ModalForm from './ModalForm';
import FaShareAlt from 'react-icons/lib/fa/share-alt';
import FaExclamation from 'react-icons/lib/fa/exclamation';
import FaThList from 'react-icons/lib/fa/th-list';



export default class Home extends Component {

    state = { openModal: false, typeModal: "", message: []};
    
    componentWillMount(){
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showMessage = this.showMessage.bind(this);
        
        this.user = userLibrary.get();
    }


    showModal(type){
        this.setState( {openModal: true, typeModal: type});
    }
    hideModal(){
        this.setState( {openModal: false});
    }
    
    showMessage(color, text){
        this.setState({message: [color, text]});
        setTimeout( () => { 
            this.setState({message: []});
        }, 3000);

    }
    
    render() {
        
        return (
            <div className="home">
                <HeaderBanner />
                <div className="wrapper">
                    {this.state.message.length > 0 ? (<Message color={this.state.message[0]}>{this.state.message[1]}</Message>) : null}

                    <Grid columns={3} stackable container divided>
                        <Grid.Row className="presentations">
                            <Grid.Column>
                                <div className="presentation" onClick={this.showModal.bind(this,'share')}>
                                    <FaShareAlt size={45} className="icon" color='#474747'/>
                                    <h2>Share knowledge</h2>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <a href='#browse' className="presentation">
                                    <FaThList size={45} className="icon" color='#474747' />
                                    <h2>Browse topics</h2>
                                </a>
                            </Grid.Column>
                            <Grid.Column>
                                <div className="presentation" onClick={this.showModal.bind(this,'request')}>
                                    <FaExclamation size={45} className="icon" color='#474747' />
                                    <h2>Post a request</h2>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
                <ScrollableAnchor id={'browse'}>
                    <Browse />
                </ScrollableAnchor>
                
                {this.state.openModal && this.state.typeModal === "share" ? (
                    <ModalForm modalFormMessage={this.showMessage} modalFormHide={this.hideModal} type="share" />
                ) : null}
                {this.state.openModal && this.state.typeModal === "request" ? (
                    <ModalForm modalFormMessage={this.showMessage}  modalFormHide={this.hideModal} type="request" />
                ) : null}
            </div>
        );
    }
}