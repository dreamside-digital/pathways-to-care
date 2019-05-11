import React from "react";


const MailchimpSubscriptionForm = props => {

  return (
    <div className="white-bg box-shadow px-3 py-3 radius wow slideInUp" data-wow-duration="500ms">
      <div className="col-12">
        <h4 className="">Subscribe</h4>
        {
          props.prompt &&
          <p>{props.prompt}</p>
        }
      </div>
      <div className="subscribe-form sm-mt-2 col-12">
        <form
          id="mc-embedded-subscribe-form"
          className="group validate"
          action="https://blackhealthalliance.us20.list-manage.com/subscribe/post?u=538e030e0d8a3cbfa9fa8c536&amp;id=b902029dd6"
          method="POST"
          name="mc-embedded-subscribe-form"
          target="_blank"
          noValidate
        >
          <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true"><input type="text" name="b_538e030e0d8a3cbfa9fa8c536_b902029dd6" tabIndex="-1" defaultValue="" /></div>
          <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" placeholder="Email Address" required={true} />
          <input className="btn btn-theme" type="submit" name="subscribe" />
        </form>
      </div>
    </div>
  );
}

export default MailchimpSubscriptionForm;
