import React, { Component } from 'react'

class TaskItem extends React.Component {

	handleTaskClick(event) {
		var details = this.props.task.details;
		//SD:Inject status;
		details.hasComplete = this.props.task.hasComplete;
		this.props.taskDetails(details);
	}

	handleProgressChange(event) {
		this.props.changeProgressStatus(this.props.index)
	}

	render() {
		var task = this.props.task;
		var title = task.title;
		var details = task.details;
		var hasNote = details.notes;
		var hasComplete = task.hasComplete;
		var image = (hasNote) ? (<img className="commentImage" alt="" src={require('../images/comment.png')} />) : null ;
		var statusIcon = (hasComplete) ? (<img className="commentImage" alt="" src={require('../images/statusComplete.png')} />) : (<img className="commentImage" alt="" src={require('../images/statusProgress.png')} />) ;

		var el = (
				<div>
					<div className="cell layout">
						<div>

						</div>
						<div className="flex" onClick={this.handleTaskClick.bind(this)}>
							{title}
						</div>
						<div>
							{image}
						</div>
						<div onClick={this.handleProgressChange.bind(this)}>
							{statusIcon}
						</div>
						<div></div>
					</div>
					<hr/>
				</div>
				)

		return (el);
	};
}

export default TaskItem;
