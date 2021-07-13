import React, { useState, useEffect } from "react";
import { connect } from "react-redux"

import PTCLogo from "../assets/images/ptc_logo.svg";

import Organization from "../components/connect-me/organization"
import spotlightIcon from "../assets/images/spotlight-4.png";
import { searchOrganizations } from "../utils/functions";
import { navigate } from "gatsby";
import Layout from '../layouts/default';
import bg06 from "../assets/images/bg/06.png";

import "../assets/css/connect-me.css"

const mapStateToProps = state => {
  console.log({state})
  return {
    searchTerms: state.search.searchTerms,
  };
};

function Results({searchTerms}) {

  const [searchResults, setSearchResults] = useState({});
  const [showEverything, setShowEverything] = useState(false);
  useEffect(() => {
    setShowEverything(false);
    setSearchResults(searchOrganizations(searchTerms));
  }, [searchTerms])

  const loadEverything = () => {
    setSearchResults(searchOrganizations({}));
    setShowEverything(true);
  }

  const returnToSearch = () => {
    setShowEverything(false);
    setSearchResults(searchOrganizations({}));
    navigate("/search/");
  }

  const createOrganizationCells = () => {
    if (Object.keys(searchResults).length < 1) {
      loadEverything();
    }

    return Object.keys(searchResults).map(
      (key) => {
        const nextOrg = searchResults[key]
        const address = nextOrg.address
        const contact = nextOrg.contact
        return <Organization key={key} name={nextOrg.name}
                            isSpotlight={nextOrg.spotlight}
                            services={nextOrg.services}
                            location={address.streetAddress.concat(", ", address.city, ", ", address.province)}
                            email={contact.email}
                            phone={contact.phone}
                            website={contact.web} />
      }
    )};

  return (
    <Layout title={'ConnectMe - Results'}>
      <div className="page-content">
        <section className="pos-r o-hidden">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-black">
                  <label className="organizationResultTitle">Here are the resources that best meet your specific needs:</label>
                  <br />
                  <div className="flex mb-2 align-item-middle">
                    <img className="spotlightImg mr-2" src={spotlightIcon} alt="spotlight"/>
                    <p className="mb-0">A Star indicates services that are Black-led, Black-Serving, and Black-focused</p>
                  </div>
                  <div className="row">
                    {
                      createOrganizationCells()
                    }
                  </div>
                  <br />
                  <br />
                  <center>
                    {!showEverything && <h2>Didn't find what you were looking for?</h2>}
                    {!showEverything && <button className="nextButton" onClick={() => loadEverything()}>Browse all organizations</button>}
                    <button className="nextButton" onClick={() => returnToSearch()}>Try the search again</button>
                  </center>
                 </div>
               </div>
             </div>
          </section>
        </div>
     </Layout>
  )
}

export default connect(mapStateToProps, null)(Results);