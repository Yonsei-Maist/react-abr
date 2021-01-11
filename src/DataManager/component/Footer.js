/**
 * Show AI Learning Result
 * Run AI Learning and testing
 * 
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.01.08
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import github from '../image/GitHub-Mark-32px.png'
import email from '../image/contact-us.png'

class Footer extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<footer className="footer">
                <div className="container">
                    ⓒ 2021. YWMC MAIST. All Rights Reserved.
                    <div className="fr">
                        <a href="mailto:arknell@yonsei.ac.kr">
                            <img className="contact-logo" src={email} alt="github" />
                        </a>
                        &nbsp;
                        <a className="contact-logo" href="https://github.com/Yonsei-Maist" target="_blank">
                            <img className="contact-logo" src={github} alt="github" />
                        </a>
                        </div>
                    </div>
			</footer>
		)
    }
}

export default Footer;