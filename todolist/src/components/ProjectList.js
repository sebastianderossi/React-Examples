import React, { Component } from "react";
import ProjectItem from './ProjectItem';
import TaskDetails from './TaskDetails';
import TaskItem from './TaskItem';
import Header from './Header';

class ProjectList extends React.Component {

	constructor() {
		super();

		var headerData = {
			actionButtonTitle:"+",
			backButtonTitle:"Back",
			title:"Task List"
		};

		var projectHeaderData = {
			actionButtonTitle:"+",
			backButtonTitle:"Edit",
			title:"Get it done"
		};

		this.state = {
			taskList: [],
			currentTaskDetail:{},
			closeState:true,
			transition:false,
			projectTaskShow:false,
			headerData: headerData,
			projectHeaderData: projectHeaderData
		}
	}

	handleSelect(index) {
		var tasks = this.state.taskList;
		tasks = this.props.projectList[index].tasks;

		var headerData = this.state.headerData;
		headerData.actionButtonTitle = "+";
		headerData.backButtonTitle = "Get it done";
		headerData.title = this.props.projectList[index].title;

		this.setState({headerData:headerData});
		this.setState({taskList:tasks});
		this.setState({transition:true});
		this.setState({closeState:false});

	}

	handleTaskDetails(details) {
		var currentTaskDetail = this.state.currentTaskDetail;
		currentTaskDetail = details;
		this.setState({currentTaskDetail:currentTaskDetail});
		this.setState({projectTaskShow:true});
		//this.setState({closeState:true});

	}

	/*handleCloseClick(event) {
		console.log("close");
		this.setState({closeState:true});
		this.setState({transition:false});
	}*/

	handleClick(event) {
		this.props.addProject();
	}

	handleChangePriority (index) {
		this.props.changePriority(index);
	}

	handleSavedItem() {
		console.log("SAVE");
	}
	//SD:No longer needed, We'll just keep task list persistent
	/*getStyle () {
		let style;
		let paddingW = 1;
		let paddingH = 1;
		if (this.state.closeState) {
			style = {
				position:'absolute',
				display:'none',
				top: '0px'
			}
		}else {
			style = {
				display:'block',
				position:'absolute',
				//width: "100%",//window.innerWidth * paddingW,
				//height: "100%",
				top: '0px',//(window.innerHeight -  (window.innerHeight * paddingH)) >> 1,
				//right: -window.innerWidth+"px"// -  (window.innerWidth * paddingW)) >> 2) + 'px'
				//transform: 'translateX(100%)'
				//transform: 'translate3d(100px, 0px, 0px)'
				//-webkit-transform: 'translateX(-100%)'
			}
		}
		return style;
	}*/

	handleChangeProgressStatus(index) {
		var task = this.state.taskList[index];
		task.hasComplete = !task.hasComplete;
		//this.state.taskList[index] = task;
		var taskList = this.state.taskList;
		console.log(taskList)
		this.setState({taskList:taskList});
	}

	handleTaskClick() {
		this.props.addTask();
	}

	handleNavBack() {
		//this.setState({closeState:true});
		this.setState({transition:false});
	}

	getTodaysDate() {
		var today = new Date();
		var day = today.getDate();
		var month = today.getMonth() + 1;
		var year = today.getFullYear();
		return day + '-' + month + '-' + year;
	}

	handleAddTask() {
		var currentTaskList = this.state.taskList;
		var count = currentTaskList.length;
		var task = prompt("Enter New Task:", "Task Name: " + (count+1));
		if (task != null) {
			var listItem = {title:task, details:{
				"date": this.getTodaysDate(),
				"notes": ""
			}};
			currentTaskList.push(listItem);
			//this.state.taskList = currentTaskList;
			this.setState({taskList:currentTaskList});
		}
	}

	handleCloseDetails() {
		this.setState({projectTaskShow:!this.state.projectTaskShow})
	}

	handleEditProject() {
		this.props.editProject();
	}

	handleDeleteItem(index) {
		this.props.deleteItem(index);
	}

	render() {
		//this.style = this.getStyle();//this.state.closeState ? {display:'none'} : {display:'block'};
		var projects = [];
		var tasks = [];
		var projectHeader = <Header
				action={this.handleClick.bind(this)}
				navBack={this.handleEditProject.bind(this)}
				data={this.state.projectHeaderData}/>
		var projectList = this.props.projectList;
		var l = projectList.length;
		for(var i=0;i<l;i++) {
			var project = projectList[i];
			projects.push(<ProjectItem
							task={project}
							index={i}
							deleteItem={this.handleDeleteItem.bind(this)}
							selectedItem={this.handleSelect.bind(this)}
							changePriority={this.handleChangePriority.bind(this)}>
						</ProjectItem>);
		}
		var taskList = this.state.taskList;
		if (taskList != null) {
			l = taskList.length;
			for(i=0;i<l;i++) {
				var taskItem = taskList[i];
				tasks.push(<TaskItem
						task={taskItem}
						index={i}
						changeProgressStatus={this.handleChangeProgressStatus.bind(this)}
						taskDetails={this.handleTaskDetails.bind(this)}></TaskItem>);
			}

			/*var header = (<div className="ProjectListHeader">
				<div><h1>Task List</h1></div>
				<input className="navigationButton" type="button" value="Add Task" onClick={this.handleTaskClick.bind(this)}></input>
				<input className="navigationButton" type="button" value="Back" onClick={this.handleTaskClick.bind(this)}></input>
			</div>)*/

			var header = <Header navBack={this.handleNavBack.bind(this)} action={this.handleAddTask.bind(this)} data={this.state.headerData}/>
			//var butt = <input id="button1" type="button" value="X" onClick={this.handleCloseClick.bind(this)}></input>;
			tasks.unshift(header);
		}
		if (this.state.closeState) {
			tasks = null;
		}
		/*
		<div><h1>Project List</h1></div>
								<input className="navigationButton" type="button" value="Add Project" onClick={this.handleClick.bind(this)}></input>
		 */
		return(
				<div className="wrapper">
					<div className={(this.state.transition ? 'closeTrans' : 'openTrans')}>
						<div className={"overlayOpen" + (this.state.transition ? ' fade-in' : ' fade-out ' )}/>
						<div className="ProjectListHeader">
							{projectHeader}
						</div>
						<div className="ProjectWrapper">
							<div className="ProjectListView">
								{projects}
							</div>
						</div>
					</div>
					<div id="tasksSection"

						 className={"Tasks "  + (this.state.transition ? 'slideOpen' : 'slideClose')}>
						{tasks}
					</div>
					<div className={"ProjectTaskDetails " + (this.state.projectTaskShow ? 'fade-in' : '') } >
						<TaskDetails
								close={this.handleCloseDetails.bind(this)}
								taskDetails={this.state.currentTaskDetail}>
						</TaskDetails>
					</div>
				</div>
		)
	}
}



export default ProjectList
