import React from "react"

const ResearchSection = props => {
  <section id="publications">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-md-12 ml-auto mr-auto">
          <div className="section-title">
            <h2 className="title">
              <EditableText content={content["publications-title"]} onSave={this.onSave("publications-title")} />
            </h2>
          </div>
        </div>
      </div>

      <Carousel
        collection={content["related-publications"]}
        SlideComponent={Publication}
        onSave={this.onSave('related-publications')}
        onAddItem={this.onAddItem('related-publications')}
        onDeleteItem={this.onDeleteItem('related-publications')}
        slidesToShow={3}
        isEditingPage={this.props.isEditingPage}
        defaultContent={DEFAULT_COMPONENT_CONTENT['related-publications']}
      />

    </div>
  </section>
}