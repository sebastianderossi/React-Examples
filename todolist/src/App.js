import React, { Component } from 'react';
import $ from 'jquery';
import ProjectList from './components/ProjectList';


import './App.css';

class App extends Component {

	constructor() {
	//SD: Call super class
		super();

		//SD:Don't want to keep your data here in the state
		this.state = {
			projectList: [] //Array of Tasks
		}
	}

    loadData() {
		var urlOnline = "https://rawgit.com/sebastianderossi/topsecret/master/todolist.json";
		$.ajax({
				   url:urlOnline,
				   dataType:"json",
				   cache:false,
				   success: function (data) {
					   var l = data.length;
					   for(var i=0;i<l;i++) {
						   var item = data[i];
						   //SD:Shortcut to load dataItem with defaults not in loaded data source
						   item.selected = item.canDelete = false;
					   }
					  this.setState({projectList:data}, function () {
						   console.log(this.state);
					   })
			   }.bind(this),
				   error:function (err) {
					console.log("ERROR*****", err)
				}
			})
	}

    componentDidMount() {


		this.loadData();
   	}

   	componentWillMount() {
   	}

	handleChangePriority(index) {
		var projectList = this.state.projectList;
		var selectedItem = projectList[index];

		if (selectedItem.selected) {
			projectList[index].selected = false;
		}else {
			projectList.splice(index, 1);
			projectList.unshift(selectedItem);
			projectList[0].selected = true;
		}
		this.setState(projectList);
	}

	handleDeleteItem(index) {
		var projectList = this.state.projectList;
		projectList.splice(index, 1);
		this.setState(projectList);
	}

	handleEditProject() {
		var projectList = this.state.projectList;
		var l = projectList.length;
		var listItem;
		for(var i=0;i<l;i++) {
			listItem = projectList[i];
			listItem.canDelete = (listItem.canDelete === true) ? false : true;
		}
		this.setState({projectList:projectList});
	}

	turnOffEditMode() {
		var projectList = this.state.projectList;
		var l = projectList.length;
		var listItem
		for(var i=0;i<l;i++) {
			listItem = projectList[i];
			listItem.canDelete = false;
		}
		this.setState({projectList:projectList});
	}

	addProject() {
		this.turnOffEditMode();
		var projectList = this.state.projectList;
		var count = projectList.length;
		var project = prompt("Enter New Project:", "List " + (count+1));
		var listItem
		if (project != null) {
			listItem = {title:project, tasks:[]};
			listItem.selected = false;
			projectList.push(listItem);
			this.setState(projectList);
		};

	}

    render() {
    return (
      <div className="App">
        <ProjectList
				projectList={this.state.projectList}
				editProject = {this.handleEditProject.bind(this)}
				deleteItem = {this.handleDeleteItem.bind(this)}
				changePriority={this.handleChangePriority.bind(this)}
				addProject={this.addProject.bind(this)}>
		</ProjectList>
      </div>
    );
  }
}

export default App;
