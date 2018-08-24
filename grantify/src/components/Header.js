/* Copyright (C) Sebastian De Rossi - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Sebastian De Rossi <sebastian.derossi@gmail.com>, Aug 24 2018
 */

import React, {Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/HeaderStyles.css';

/**
 * This class is used to display header on site. It holds the navigation items and is construction based on data passed from model
 */

class Header extends Component {

	_addRecord() {
		this.props.addRecord();
	}

	_deleteRecord() {
		this.props.deleteRecords();
	}

	_displayRecords() {
		this.props.displayRecords();
	}

	_buildMenu(data) {
		let menu = [];
		for(let n in data) {
			let item = data[n];
			menu.push(<li className="nav-item" key={"nav-time"+item.id}>
						<a className="nav-link" id={item.id} onClick={this.handleClick.bind(this)}>{item.label}</a>
					</li>)
		}
		return menu;
	}

	handleClick(event) {
		let id = event.target.id;
		switch(id) {
			case 'add':
					this._addRecord();
				break;
			case 'remove':
					this._deleteRecord();
				break;
			case 'display':
					this._displayRecords();
				break;
			default:
					console.log("CHECK TARGET ID");
				break;
		}
	}

	render() {
		let menu = this._buildMenu(this.props.headerInfo);
		return (
			<nav className="navbar navbar-expand-lg navbar-light">
				<a className="navbar-brand">{this.props.headerName}</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">{menu}</ul>
				</div>
			</nav>
		)
	};
}

Header.propTypes = {
	headerInfo: PropTypes.object,
	headerName: PropTypes.string,
	addRecord: PropTypes.func,
	deleteRecords: PropTypes.func,
	displayRecords: PropTypes.func
};

export default Header;
