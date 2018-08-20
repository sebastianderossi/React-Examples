import React, { Component } from 'react'

class ProjectItem extends React.Component {

	handleProjectClick(event) {
		this.props.selectedItem(this.props.index);
	}

	handleDeleteItem(event) {
		this.props.deleteItem(this.props.index);
	}

	handleChangePriorty(event) {
		this.props.changePriority(this.props.index)
	}

	render() {
		var task = this.props.task;
		var title = task.title;
		var taskCount = 0;
		var index = this.props.index;
		this.refs = {index:index};
		if (task.tasks != null) {
			taskCount = task.tasks.length;
		}

		var deleteIcon = (this.props.task.canDelete) ? <div className="deleteButton" onClick={this.handleDeleteItem.bind(this)}>DELETE</div>  : null;

		var image = (task.selected) ? (<img className="cellImage" alt="" src={require('../images/Ribbon.png')} />): <img className="cellImage" alt="" src={require('../images/Ribbon-out.png')} />;
		return (
				<div>
					<div className="cell layout">
						<div onClick={this.handleChangePriorty.bind(this)}>
							{image}
						</div>
						<div className="flex" onClick={this.handleProjectClick.bind(this)}>
							<div>
								{title}
							</div>
							<div>
								Task Count:({taskCount})
							</div>
						</div>
						<div>{deleteIcon}</div>
						<div></div>
						<div>{(taskCount > 0) ? ">" : ""}</div>

					</div>
					<hr/>
				</div>

		)
	};
}

export default ProjectItem;
