/* Copyright (C) Sebastian De Rossi - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Sebastian De Rossi <sebastian.derossi@gmail.com>, Aug 24 2018
 */

import React, { Component } from "react";
import '../styles/StatsStyles.css';

/**
 * This class is used to display statics on site.
 * Statics displayed are:
 * 	Average records added per hour
 * 	Average records deleted per hour
 * 	Ratio of records added per hour versus deleted per hour.
 * 	Total records added
 * 	Total records deleted
 * 	Total time on page
 *
 * 	**Note**
 * 	Average is calculated assuming that from 0 - 60 mins falls with the first hour, meaning that if one add 15 files within 0 - 60 mins the average
 * 	will be 15 files per hours, if the hour going past 61 mins the average will fall to 7.5 files per hours, since 15 / 2 = 7.5;
 */


class Stats extends Component {
	constructor (props) {
		super(props);
		//SD:Testing stats, set to true timer will be set to 59min 0s

		let debug = false;

		let start = new Date();
		if (debug === true) {
			start.setTime(start.getTime()-(1*59*60*1000))
		}

		this.state = {
			startTime:start,
			elaspedTime:0,
			totalAddRecords:0,
			removedRecords:0,
			totalAddedPerHour:0,
			totalRemovedPerHour:0,
			currentHour:0,
			activityRatio:0
		}
	}

	//SD:Update static every second
	update() {
		let currentTime = new Date();
		let start = this.state.startTime.getTime();

		let end = currentTime.getTime();

		var time = (end - start)/1000;
		var hours   = Math.floor(time / 3600 % 24);
		var minutes = Math.floor(time / 60 % 60);
		var seconds = Math.floor(time % 60);

		var displayTime = `${hours}h ${minutes}m ${seconds}s`;

		let activityRatio =  this.state.totalAddedPerHour / (this.state.totalRemovedPerHour === 0) ? 1 : this.state.totalRemovedPerHour;

		if (this.state.totalRemovedPerHour !== 0) {
			//SD:Ensuring that won't NAN or infinite
			activityRatio = this.state.totalAddedPerHour/ this.state.totalRemovedPerHour;
		}

		this.setState({
					elaspedTime:displayTime,
					totalAddedPerHour:this.state.totalAddRecords/(this.state.currentHour+1),
					totalRemovedPerHour: this.state.removedRecords/ (this.state.currentHour+1),
					activityRatio:activityRatio
	  });
	}

	//SD: New record added update state
	updateAddRecords() {
		var count = this.state.totalAddRecords;
		count++;

		this.setState({
						  totalAddRecords:count,
						  totalAddedPerHour:count/(this.state.currentHour+1)
					  });
	}

	//SD: remove record update state
	// count: array
	updateRemoveRecords(count) {
		var removedRecords = this.state.removedRecords;
		removedRecords += count;

		this.setState({
			removedRecords:removedRecords,
			totalRemovedPerHour:removedRecords/(this.state.currentHour+1)
		});
	}

	render() {
		return (
			<nav className="nav">
				<a className="nav-link">{this.state.totalAddRecords + " records added"}</a>
				<a className="nav-link">{this.state.removedRecords + " records removed"}</a>
				<a className="nav-link">{this.state.totalAddedPerHour.toFixed(2) + " AVG records aph"}</a>
				<a className="nav-link">{this.state.totalRemovedPerHour.toFixed(2) + " AVG records rph"}</a>
				<a className="nav-link">{this.state.activityRatio.toFixed(2) + " aph vs rph"}</a>
				<a className="nav-link">Current Time: {this.state.elaspedTime}</a>
			</nav>
		)
	}
}

export default Stats;
