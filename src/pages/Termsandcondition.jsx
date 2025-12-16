import React from "react";
import PageTransition from "../components/Pagetransition";

const TermsAndConditions = () => {
  return (
    <PageTransition>

    <div className="p-6 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
     

      <p className="mb-4">
        This document is published in accordance with Rule 3(1) of the Information Technology (Intermediaries Guidelines) Rules, 2011, requiring publishing of the rules and regulations, privacy policy, and Terms of Use for access or usage of domain name <a href="https://www.trendoor.in" className="text-blue-600 underline">https://www.trendoor.in</a> (the "Website"), including the related mobile site and application (the "Platform").
      </p>

      <p className="mb-4">
        The Platform is owned by krishna sankhyadhar, a company incorporated under the Companies Act, 1956 with its registered office at Hathras (hereinafter referred to as ‘Platform Owner’, 'we', 'us', 'our').
      </p>

      <p className="mb-4">
        Your use of the Platform and services/tools is governed by these Terms and Conditions (“Terms of Use”) along with applicable policies. By mere use of the Platform, you agree to be bound by these terms.
      </p>

      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>
          You must provide true, accurate and complete information during and after registration.
        </li>
        <li>
          We do not guarantee the accuracy, completeness, or timeliness of any content on the Platform.
        </li>
        <li>
          Use of the Platform and Services is at your own risk. We are not liable for any damages arising from use.
        </li>
        <li>
          All content is proprietary to us. You have no rights to claim intellectual property or design elements.
        </li>
        <li>
          Unauthorized use may result in legal action as per applicable laws.
        </li>
        <li>
          You agree to pay charges associated with availing our Services.
        </li>
        <li>
          You must not use the Platform for illegal or prohibited activities.
        </li>
        <li>
          Third-party website links are governed by their respective terms and policies.
        </li>
        <li>
          Initiating a transaction constitutes a legally binding agreement with us.
        </li>
        <li>
          You agree to indemnify us from any third-party claims arising from your actions.
        </li>
        <li>
          We are not liable for performance failures due to force majeure events.
        </li>
        <li>
          These Terms are governed by Indian laws and disputes shall be subject to courts in Hathras, Uttar Pradesh.
        </li>
      </ul>

      <p className="mb-4">
        For any concerns or communications relating to these Terms, please contact us using the details provided on the website.
      </p>

      <p className="text-sm text-gray-600">
        Last updated: July 28, 2025
      </p>
    </div>
    </PageTransition>
  );
};

export default TermsAndConditions;
