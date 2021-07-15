import React, { useState } from "react"
import { navigate } from "gatsby"
import { connect } from "react-redux"

import { QuestionMulitple } from "../components/connect-me/question"
import Banner from "../components/connect-me/banner"
import Layout from '../layouts/default';
import bg06 from "../assets/images/bg/06.png";

import "../assets/css/connect-me.css"

import {
  getCities,
  getLanguages,
  getServices,
  getPopulation,
  getCost,
} from "../utils/data"

import {
  saveSearchValues
} from "../redux/actions";

const mapDispatchToProps = dispatch => {
  return {
    saveSearchValues: (data) => {
      dispatch(saveSearchValues(data));
    }
  };
};

const mapStateToProps = state => {
  console.log({state})
  return {
    searchTerms: state.search.searchTerms,
  };
};


function Search({ saveSearchValues }) {
  const [questionAnswers, setQuestionAnswers] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState("city")

  const updateAnswers = (id, value) => {
    const updatedAnswers = questionAnswers
    updatedAnswers[id] = value
    setQuestionAnswers(updatedAnswers)
  }

  const onClickToNextQuestion = (id, value, nextId, skip) => {
    if (!skip) {
      updateAnswers(id, value)
    }
    setCurrentQuestion(nextId)
  }

  const onClickToResults = async (id, value, nextId, skip) => {
    if (!skip) {
      updateAnswers(id, value)
    }
    saveSearchValues(Object.assign({}, questionAnswers))
    navigate("/results/")
  }

  const getCurrentQuestion = () => {
    let questionComponent
    switch (currentQuestion) {
      case "city":
      default:
        questionComponent = (
          <QuestionMulitple
            id={currentQuestion}
            headerText="What area(s) are you looking for services in? (select all that apply)"
            optionsArray={getCities()}
            next="services"
            onClickHandler={onClickToNextQuestion}
          />
        )
        break
      case "services":
        questionComponent = (
          <QuestionMulitple
            id={currentQuestion}
            headerText="What type of service are you looking for?"
            optionsArray={getServices()}
            next="cost"
            onClickHandler={onClickToNextQuestion}
          />
        )
        break
      case "cost":
        questionComponent = (
          <QuestionMulitple
            id={currentQuestion}
            headerText="What are your budgetary needs?"
            optionsArray={getCost()}
            next="languages"
            onClickHandler={onClickToNextQuestion}
          />
        )
        break
      case "languages":
        questionComponent = (
          <QuestionMulitple
            id={currentQuestion}
            headerText="What language would you prefer services to be offered in?"
            optionsArray={getLanguages()}
            next="population"
            onClickHandler={onClickToNextQuestion}
          />
        )
        break
      case "population":
        questionComponent = (
          <QuestionMulitple
            id={currentQuestion}
            headerText="Are you looking for resources that serve any of the following populations? (select all that apply)"
            optionsArray={getPopulation()}
            onClickHandler={onClickToResults}
          />
        )
        break
    }
    return questionComponent
  }

  return (
    <Layout title={'ConnectMe - Search'}>
        <div className="page-content pt-10">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center text-black">
                {getCurrentQuestion()}
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
