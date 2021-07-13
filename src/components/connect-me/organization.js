import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { BsStarFill } from 'react-icons/bs';
import { GoLocation } from "react-icons/go";
import spotlightIcon from "../../assets/images/spotlight-4.png";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
class Organization extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render = () => 
        <div className="col-12 col-sm-6 col-md-4">
            <div className="organization">
                <div className="organizationHeader">
                    <div className="verticalCenterContainer">
                        { this.props.isSpotlight ? <img className="spotlightImgRight" src={spotlightIcon} alt="spotlight"/> : null }
                        <label className="organizationName" htmlFor="name">{this.props.name}</label>
                    </div>
                    <label className="organizationInfo" htmlFor="services">{this.props.services.join(", ")}</label>
                </div>
                <div className="organizationBody">
                    <div className="organizationColumn">
                        <div className="verticalCenterContainer">
                            <GoLocation className="organizationContactIcon"/>
                            <label className="organizationInfo" htmlFor="location">{this.props.location}</label>
                        </div>
                        <div className="verticalCenterContainer">
                            <HiOutlineMail className="organizationContactIcon"/>
                            <label className="organizationInfo" htmlFor="email">{this.props.email}</label>
                        </div>
                        <div className="verticalCenterContainer">
                            <FiPhone className="organizationContactIcon"/>
                            <label className="organizationInfo" htmlFor="phone">{this.props.phone}</label>
                        </div>
                    </div>
                    <div className="organizationColumn">
                        <div className=""></div>
                        <a href={this.props.website} target="_blank">
                            <input className="organizationWebsite" type="button" value="website" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
}

export default Organization;