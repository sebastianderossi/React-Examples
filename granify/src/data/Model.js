/* Copyright (C) Sebastian De Rossi - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Sebastian De Rossi <sebastian.derossi@gmail.com>, Aug 24 2018
 */

import EventDispatcher from "../events/EventDispatcher";
import Event from "../events/Event";

import $ from 'jquery'

export default class Model extends EventDispatcher {
	constructor(props) {
		super();
		this.allRecords = [];
		this.uniqueIds = {};
		this.headerInfo = {};
	}

	/**
	 * This will be the initial load to pull from a server.
	 * Once data has been loaded, a complete event will be dispatched.
	 * @param url
	 */

	/*loadData(url) {
		fetch(url).then(response => response.json()).then((json) => {
			this.allRecords = json;
			this.dispatchEvent("complete");
		});
	}*/

	loadData(data, debug) {
		if (debug === 1) {
			this.allRecords = data;
			this._parseData(this.allRecords.users);
			this.dispatchEvent("complete")
		}else {
			var urlOnline = data;//"https://rawgit.com/sebastianderossi/topsecret/master/todolist.json";
			$.ajax({
					url:urlOnline,
					dataType:"json",
					cache:false,
					success: function (data) {
						this.siteData = data;
						this._parseData(this.siteData);
						this.dispatchEvent("complete");
				   }.bind(this),
						error:function (err) {
						//console.log("ERROR*****", err)
						this.dispatchEvent("error");
						}.bind(this)
				})
		}

	}
	//SD: Parse out all data from load JSON
	_parseData(data) {
		this._parseHeaderInfo(data.headerInfo);
		this._parseUserInfo(data.users);
		this.siteContent = data.siteContent;

	}
	//SD: Parse out all data from load JSON, navigation menu is constructed based on loaded data
	_parseHeaderInfo(data) {
		var l = data.length;
		for(var i=0;i<l;i++) {
			var section = data[i];
			this.headerInfo[section.id] = data[i];
		}
	}
	//SD: Build list based on user initial data
	_parseUserInfo(data) {
		var item = null;
		var l = data.length;
		for(var i=0;i<l;i++) {
			item = data[i];
			item.id = Math.random().toString(36).substr(2, 9);
			//SD: ensure not duplicates
			if (this.uniqueIds[item.id] == null) {
				this.uniqueIds[item.id] = item;
			}
		}
	}

	getSiteContent() {
		return this.siteContent;
	}

	removeRecord(list) {
		var count = 0;
		for(var i=0;i<list.length;i++) {
			var id = list[i];
			if (this.uniqueIds[id].id === id) {
				count++;
				delete this.uniqueIds[id]
			}
		}

		var event = new Event();
		event.type ="recordsRemoved";
		event.data = {count:count};
		this.dispatchEvent(event);
	}

	/**
	 * User entry object is passed along to model
	 * @param data : User entry type
	 */
	addRecord(data) {
		var name = data.username;
		var phone = data.phone;
		var id =  (this._isEmpty(this.uniqueIds)) ? Math.random().toString(36).substr(2, 9)  : this._getUniqueId();

		if (this.uniqueIds != null) {
			console.log("BROKE")
		}
		this.uniqueIds[id] = {id: id, name:name, phone:phone};
		this.dispatchEvent("userAdded");

	}
	//SD: Util function to check for empty object properties
	_isEmpty(obj) {
	    for(var key in obj) {
	        if(obj.hasOwnProperty(key))
	            return false;
	    }
	    return true;
	}

	//SD:Returns content for building header
	getHeaderInfo() {
		return this.headerInfo;
	}

	//SD: Util get 10 digit id and ensure its unique
	_getUniqueId() {
		var id = Math.random().toString(36).substr(2, 9);
		var ids = [];
		for(var n in this.uniqueIds) {
			ids.push(n); // get all ids
		}
		var isComplete = false;
		var l = ids.length;
		var count = 0;
		while (isComplete === false) {
			for(var i=0;i<l;i++) {
				var _id = ids[i];
				if (_id === id) {
					id = Math.random().toString(36).substr(2, 9);
					count = 0;
				}else {
					count++;
				}
				if (count === l) {
					isComplete = true;
				}
			}
		}
		return id;
	}

	/**
	 * Returns array containing all user records
	 */
	displayAllRecords() {
		return this.uniqueIds;
	}
}

//export default Model;

