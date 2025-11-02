import { Helmet } from 'react-helmet-async';

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - EntertainIndia</title>
      </Helmet>

      <div className="bg-primary-600 text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-heading font-bold">Privacy Policy</h1>
        </div>
      </div>

      <div className="container-custom py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>Introduction</h2>
          <p>
            EntertainIndia ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>

          <h2>Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Name and email address (when subscribing to our newsletter or creating an account)</li>
            <li>Comments and other content you submit</li>
            <li>Communication preferences</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Send you newsletters and updates (with your consent)</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze usage patterns and trends</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to collect and use personal information about you. For more information about the cookies we use, please see our Cookie Policy.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We may use third-party services (such as Google Analytics) to analyze website traffic. These third parties have their own privacy policies addressing how they use such information.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to our use of your data</li>
            <li>Withdraw consent</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at privacy@entertainindia.com
          </p>
        </div>
      </div>
    </>
  );
}
