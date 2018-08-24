/* Copyright (C) Sebastian De Rossi - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Sebastian De Rossi <sebastian.derossi@gmail.com>, Aug 24 2018
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * 	This component serves as placeholders for text.
 * 	This is the body portion of the application.
 * 	Data is passed through by parent component
 *
 */

class SiteContent extends Component  {

	constructor (props) {
		super();
	}

	_buildJumbotronContent(data) {
		return (
			<div>
				<h1 className="display-3">{data.title}</h1>
				<p>{data.content}</p>
				<p><a className="btn btn-primary btn-lg" role="button">{data.button}</a></p>
			</div>
		)
	}

	_buildSection(data) {
		let l = data.length;
			var content = [];
		for(let i=0;i<l;i++) {
			let item = data[i];
			content.push(this._getSection(item));
		}
		return content;
	}

	_getSection(data) {
		return  (
			<div className="col-md-4" key={data.title}>
				<h2>{data.title}</h2>
				<p>{data.content}</p>
				<p><a className="btn btn-secondary" role="button">{data.button}</a></p>
			</div>
		)
	}

	render() {

		let props = this.props.siteContent;
		let jumbotronContent = this._buildJumbotronContent(props.jumbotron);
		let sectionContent = this._buildSection(props.sections);

		return (
			<div>
				<div className="jumbotron">
					<div className="container">
						{jumbotronContent}
					</div>
				</div>
			<div className="rowWrapper">
				<div className="row">
					{sectionContent}
				</div>
				<br/>
			</div>
			</div>
		)
	}

}

SiteContent.propTypes = {
	siteContent: PropTypes.object,
	jumbotron: PropTypes.object,
	sections: PropTypes.array
}

export default SiteContent
