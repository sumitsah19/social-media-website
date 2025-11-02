import { Helmet } from 'react-helmet-async';

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - EntertainIndia</title>
      </Helmet>

      <div className="bg-primary-600 text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-heading font-bold">Terms of Service</h1>
        </div>
      </div>

      <div className="container-custom py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>Agreement to Terms</h2>
          <p>
            By accessing and using EntertainIndia, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on EntertainIndia's website for personal, non-commercial transitory viewing only.
          </p>
          <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to decompile or reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>

          <h2>User Comments</h2>
          <p>
            Certain parts of this website offer users the opportunity to post and exchange opinions and information. EntertainIndia does not filter, edit, publish or review Comments prior to their presence on the website.
          </p>
          <p>Comments do not reflect the views and opinions of EntertainIndia. We reserve the right to monitor and remove comments that are:</p>
          <ul>
            <li>Abusive, offensive, or defamatory</li>
            <li>Spam or promotional content</li>
            <li>Infringing on intellectual property rights</li>
            <li>Violating any applicable laws</li>
          </ul>

          <h2>Content Disclaimer</h2>
          <p>
            The materials on EntertainIndia's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
          </p>

          <h2>Limitations</h2>
          <p>
            In no event shall EntertainIndia or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on EntertainIndia's website.
          </p>

          <h2>Revisions</h2>
          <p>
            The materials appearing on EntertainIndia's website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at legal@entertainindia.com
          </p>
        </div>
      </div>
    </>
  );
}
