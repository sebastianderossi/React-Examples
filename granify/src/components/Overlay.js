/* Copyright (C) Sebastian De Rossi - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Sebastian De Rossi <sebastian.derossi@gmail.com>, Aug 24 2018
 */

import React, {Component } from 'react';
import PropTypes from 'prop-types';

import {
		Button, Modal, ModalHeader,
		ModalBody, ModalFooter,
		FormGroup, Label,
		Input, ListGroup, ListGroupItem,
		ListGroupItemHeading, ListGroupItemText,
		Alert
	} from 'reactstrap';

import '../styles/DialogStyles.css';

/**
 * 	This component serves as an overlay/dialog view
 * 	which will display add/remove/display data for this application
 *	State dictates what view gets constructed
 */


class Overlay extends Component {

	constructor(props) {
		super(props);

		//this.handleCloseClick = this.handleCloseClick.bind(this);
		this.state = {
			isOpen:false,
			confirm: false,
			username:"",
			phonenumber:"",
			message:"",
			title:"",
			mode:null,
			messageVisible:false,
			disableAddButton:true,
			disableDeleteButton:true,
			deleteList:[]
		};

		this.onDismiss = this.onDismiss.bind(this);

		this.addUserButton = null;
		this.ids = [];
		this.usernameValue = "";
		this.phoneValue = "";
	}

	//Public methods
	show() {
		this.setState({isOpen:true});
	}

	hide() {
		this.setState({isOpen:false});
	}

	// Props from parent
	//SD: Show dialog by updating state
	addRecord() {
		this.setState({
			mode:"addRecord",
			isOpen: !this.state.isOpen,
			disableAddButton:true,
			title: "Add Record"
		});
	}


	displayRecords(data) {
		//fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then((json) => {

		var groupItems = this._buildRecordDisplay(data);
		this.dialogBody = (
			<div><ListGroup>{groupItems}</ListGroup></div>
		)

		this.dialogFooter = (
			<div>
				<Button color="primary" onClick={this.closeDialog.bind(this)}>Close</Button>
			</div>
		);
		this.setState({
			confirm: false
		});

		this.setState({
			mode:"displayRecords",
			isOpen: !this.state.isOpen,
			title: "Display Records"
		});
	}

	//SD: Show dialog by updating state
	removeRecords(data) {
		this.data = data;
		this.setState({
			mode:"removeRecords",
			disableDeleteButton:true,
			confirm: false,
			deleteList:data,
			title: "Remove Records"
		});
	}

	//SD:Display messag after adding record
	showConfirm(message) {
		this.setState(
				{
					message:message,
					confirm:true,
					messageVisible:true,
					disableAddButton:true,
					username:"",
					phonenumber:""
				}
		);
	}

	// Internal methods
	//SD:Event Handler from remove dialog
	deleteRecords() {
		if (this.ids.length === 0) { return; }
		this.props.deleteRecords(this.ids);
		this.ids=[];
	}
	//SD: Build add record dialog
	_getAddRecordBody () {
			this.dialogBody = (
					<div>
					<FormGroup >
						<Label for="username">User Name</Label>
						<Input type="text" ref={input => this.username = input}
							value={this.state.username}
							onChange={this.validateFields.bind(this)}
							name="username" id="username" placeholder="user name" />
						</FormGroup>
						<FormGroup>
						<Label for="examplePassword">Phone Number</Label>
						<Input type="text" ref={input => this.phone = input}
							onChange={this.validateFields.bind(this)}
							value={this.state.phonenumber}
							pattern="^-?[0-9]\d*\.?\d*$" name="phoneNumber" id="phoneNumber" placeholder="phoneNumber" />
					</FormGroup>
					</div>
			);
			this.dialogFooter = (
					<div>
						<Button color="primary" ref={btn => this.addUserButton = btn} disabled={this.state.disableAddButton} onClick={this.handleAddRecord.bind(this)} >Add User</Button>{' '}
						<Button color="secondary" onClick={this.closeDialog.bind(this)}>Cancel</Button>
					</div>
			)
		}

	//SD: Build remove dialog
	_getRemoveRecordBody () {
		var groupItems = this._buildRecordDisplay(this.data);

		this.dialogBody = (
			<div><ListGroup id="deleteList" key="displayBody">{groupItems}</ListGroup></div>
		);

		this.dialogFooter = (
			<div>
				<Button color="primary" disabled={this.state.disableDeleteButton} onClick={this.deleteRecords.bind(this)}>Remove</Button>{' '}
				<Button color="secondary" onClick={this.closeDialog.bind(this)}>Cancel</Button>
			</div>
		);
	}

	//SD: Build view for displaying records
	_buildRecordDisplay(records) {
		let groupItems = [];
		let person, item = null;

		for(let id in records) {
			person = records[id];
			item = this._getRenderer(person);
			groupItems.push(item);
		}
		return groupItems;
	}

	//SD: util function that will check for duplicate ids
	_checkId(id) {
		for(var i=0;i<this.ids.length;i++) {
			var _id = this.ids[i];
			if (_id === id) {
				this.ids.splice(i, 1);
				return true;
			}
		}
	}
	//SD:Build cell render for list display
	_getRenderer(data) {
		return  (
			<ListGroupItem id={data.id} key={data.id} className="" onClick={this.handleSelectRenderer.bind(this)} >
				<ListGroupItemHeading>{data.name}</ListGroupItemHeading>
				<ListGroupItemText>id: {data.id}</ListGroupItemText>
				<ListGroupItemText>Phone: {data.phone}</ListGroupItemText>
			</ListGroupItem>
			)
	}

	// Event handlers
	//SD: Selecting a cells for deletion
	handleSelectRenderer(event) {
		if (this.state.mode === "displayRecords") { return; }
		var target = event.target;
		//SD: Make sure you are not selecting parent element
		if (target.id === "deleteList") { return; }

		target.classList.toggle("list-group-item-selected");

		if (!this._checkId(target.id)) {
			this.ids.push(target.id);

		}

		this.setState({
			title: "Delete Count: "+ this.ids.length,
			disableDeleteButton: (this.ids.length > 0) ? false:true
		})
	}

	//SD:Event handle from addRecord view
	handleAddRecord(event) {
		if (this.state.username === "" || this.state.phonenumber === "") {
			this.setState(
					{
						message:"Please fill out information properly",
						confirm:true,
						messageVisible:true
					}
			);
			return;
		}
		this.props.addRecord({username:this.state.username, phone:this.state.phonenumber})
	}
	//SD:On Change event handler, valids new record form inputs
	validateFields(event) {
		const val = event.target.value;
		if (event.target.id === 'username') {
			this.usernameValue = val;
			this.setState({username:this.usernameValue})
		} else if (event.target.id === 'phoneNumber') {
			this.phoneValue = val;
			if (event.target.validity.valid) {
				this.setState({phonenumber: this.phoneValue});
			} else if (val === '' || val === '-') {
				this.setState({phonenumber: this.phoneValue});
			}
		}

		let isActive = (this.usernameValue.length > 0 && this.phoneValue.length > 0) ? false : true;

		this.setState({
			  disableAddButton:isActive
		  });
	}
	//SD: Event handle for alert message
	onDismiss() {
		this.setState({messageVisible:false})
	}

	closeDialog() {
		this.hide();
	}

	render() {
		var alert = (this.state.confirm !== false) ? (<Alert color="warning" isOpen={this.state.messageVisible} toggle={this.onDismiss}> {this.state.message }</Alert>) : null;
		if (this.state.mode === "addRecord") {
			this._getAddRecordBody();
		} else if (this.state.mode === "removeRecords") {
			this._getRemoveRecordBody();
		}
		return (
			<div>
				<Modal isOpen={this.state.isOpen} centered={true} className={this.props.className}>
					<ModalHeader>{this.state.title}</ModalHeader>
						<ModalBody>
							{alert}
							{this.dialogBody}
						</ModalBody>
					<ModalFooter>
						{this.dialogFooter}
					</ModalFooter>
				</Modal>
			</div>
		)
	};
}

Overlay.propTypes = {
	className: PropTypes.string,
	addRecord: PropTypes.func,
	deleteRecords: PropTypes.func

};

export default Overlay;
