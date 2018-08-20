import React, {Component} from 'react'

class Header extends React.Component {

	handleClose() {
		this.props.navBack();
	}

	handleAction() {
		this.props.action();
	}

	render() {
		var props = this.props.data;
		var title = props.title;
		var backButtonTitle = props.backButtonTitle;
		var backButton = null;
		if (backButtonTitle != null) {
			backButton = <input className="headerNavigationButton" onClick={this.handleClose.bind(this)} type="button" value={backButtonTitle}></input>
		}

		var actionButton = props.actionButtonTitle;
		return (
				<div>
					<div className="header layout">
						<div>
							{backButton}
						</div>
						<div className="flex">
							<h1>{title}</h1>
						</div>
						<div>
							<input className="headerNavigationButton" onClick={this.handleAction.bind(this)} type="button" value={actionButton}></input>
						</div>
					</div>
					<hr/>
				</div>
		)

	}
}

export default Header;
