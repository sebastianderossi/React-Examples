import React, {Component} from 'react'

class TaskDetails extends React.Component {
	constructor(props) {
		super();

		this.detail = null;
		//this.taskDetails = this.props.taskDetails;
		//this.detail.style = {}
		this.hasUpdated = false;

		this.state = {
			isEdit: true,
			notes:null//this.taskDetails.Notes
		}
	}

	updateText(event) {
		var value = event.target.value;
		var note = this.props.taskDetails.notes;//this.state.notes;
		note += value;

		this.setState({notes:note});
		//this.hasUpdated = true;
		this.props.taskDetails.notes = value;
	}

	handleEditToggle(event) {
		var isEdit = !this.state.isEdit;
		this.setState({isEdit:isEdit});
	}

	handleClose() {
		this.setState({isEdit:true});
		this.props.close();
	}

	render() {
		var taskDetails = this.props.taskDetails;

		if (this.state.notes) {
			//this.setState({notes:taskDetails.Notes});
		}
		this.detail = (<textarea id="notes"
								 data-gramm_editor="false"
								 disabled={this.state.isEdit}
								 onChange={this.updateText.bind(this)}
								 className={this.state.isEdit ? 'textAreaDisabled' : 'textAreaEnabled'}
								 value={taskDetails.notes}></textarea>);

		//console.log("Render 2")

		//<textarea id="notes" data-gramm_editor="false" disabled={this.state.isEdit} onChange={this.updateText.bind(this)} value={taskDetails.Notes}></textarea>
		//console.log(taskDetails);
		return(
				<div className="taskDetailsView">
					<div className="notesHeaderWrapper">
						<div className="detailDate">Date Created:{taskDetails.date}</div>
						<div className="status">Status:{(taskDetails.hasComplete) ? 'Complete' : "In Progress"}</div>
					</div>
					<div className="textWrapper">
						{this.detail}
					</div>
					<div className="detailControls">
						<input id="edit" className="headerNavigationButton" onClick={this.handleEditToggle.bind(this)} type="button" value="edit"></input>
						<input id="close" className="headerNavigationButton" type="button" onClick={this.handleClose.bind(this)} value="okay"></input>
					</div>
				</div>
		)
	}
}

export default TaskDetails;
