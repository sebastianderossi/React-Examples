/* Copyright (C) Sebastian De Rossi - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Sebastian De Rossi <sebastian.derossi@gmail.com>, Aug 24 2018
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import SiteContent from './SiteContent';
import Stats from './Stats';
import Overlay from './Overlay';
import Model from '../data/Model';

/**
 * 	This is the main class which will hold all view components and model for this application.
 * 	Model is used to hold data and used as a fake API for fetching external data
 * 	The model will load data from url, model will dispatch events when needed ex: complete data loaded and parsed, loading errors, etc.
 * 	The model is also used to feed view data so that their UI can be adjusted
 *
 *	Header and siteContent (page's body portion) are constructed only when data comes back from the model
 */

class Main extends Component {

	constructor(props) {
		super(props);
		this.debug = 0;

		this.state = {
			header:"",
			siteContent:""
		}

		this.model = new Model();
		this.model.loadData('https://cdn.rawgit.com/sebastianderossi/topsecret/9e616b89/siteData.json');

		//SD: User record has been added successfully
		this.model.on("userAdded", ()=> {
			this.refs.overlay.showConfirm("New entry has been added successfully!");
			this.refs.stats.updateAddRecords();
		});

		//SD: Loading error, surface to user via alert
		this.model.on("error", ()=> {
			alert("Loading Error")
		});

		this.model.on("recordsRemoved", (event)=> {
			let overlay = this.refs.overlay;
			let data = this.model.displayAllRecords();
			overlay.removeRecords(data);

			this.refs.stats.updateRemoveRecords(event.data.count);
		});

		//SD:Initial load is complete
		this.model.on("complete", ()=> {
			console.log("site loaded!");
			//SD: Data is ready to populate header component
			this.header = (
					<Header
						ref={header => this.header = header}
						headerInfo={this.model.getHeaderInfo()}
						headerName={"Site Name"}
						addRecord={this.handleShowAddRecord.bind(this)}
						deleteRecords={this.handleShowDeleteRecords.bind(this)}
						displayRecords={this.handleShowDisplayRecords.bind(this)}
					/>
			)
			this.siteContent = (
					<SiteContent siteContent={this.model.getSiteContent()}/>
			)

			this.setState({
				header:this.header,
				siteContent:this.siteContent
			})
		})

		//SD: Simulates polling, in this case it will be every second. Used to update stats section
		setInterval(()=> {
			this.refs.stats.update();
		}, 1000)
	}

	//SD:Event handlers navigation menu items
	handleShowAddRecord() {
		let overlay = this.refs.overlay;
		overlay.show();
		overlay.addRecord();
	}

	//SD:Event handlers navigation menu items
	handleShowDeleteRecords() {
		let overlay = this.refs.overlay;
		overlay.show();
		let data = this.model.displayAllRecords();
		overlay.removeRecords(data);
	}

	//SD:Event handlers navigation menu items
	handleShowDisplayRecords() {
		let overlay = this.refs.overlay;
		overlay.show();
		let data = this.model.displayAllRecords();
		overlay.displayRecords(data);
	}

	//SD:Event handlers from Overlay component
	handleAddRecord(userData) {
		this.model.addRecord(userData);
	}

	//SD:Event handlers from Overlay component
	handleDeleteRecords(records) {
		this.model.removeRecord(records);
	}

	render () {
		return (
			<div>
				{this.header}
				<Stats ref="stats"/>
				{this.siteContent}
				<Overlay ref="overlay"
					addRecord={this.handleAddRecord.bind(this)}
					deleteRecords={this.handleDeleteRecords.bind(this)}
				/>
			</div>
		)
	}
}

Main.propTypes = {
	addRecord: PropTypes.func,
	deleteRecords: PropTypes.func
};


export default Main
