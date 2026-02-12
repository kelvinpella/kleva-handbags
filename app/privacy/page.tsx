import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Kleva Handbags",
  description: "Privacy Policy for Kleva Handbags",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-neutral-900 mb-8">Privacy Policy</h1>

      <div className="prose prose-neutral max-w-none">
        <p className="text-sm text-neutral-600 mb-8">
          <strong>Last Updated:</strong> February 12, 2026
        </p>

        <section className="mb-8">
          <p className="text-neutral-700 mb-4">
            Kleva Handbags ("we," "our," or "us") is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit our website, mobile application, or use our services (collectively, the "Service").
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">1. Information We Collect</h2>

          <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">1.1 Information You Provide</h3>
          <p className="text-neutral-700 mb-4">We may collect information that you voluntarily provide to us, including:</p>
          <ul className="list-disc pl-6 text-neutral-700 mb-4">
            <li>Contact information (name, phone number, email address)</li>
            <li>WhatsApp messages and communications</li>
            <li>Purchase and transaction information</li>
            <li>Preferences and interests related to our products</li>
          </ul>

          <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">1.2 Automatically Collected Information</h3>
          <p className="text-neutral-700 mb-4">When you access our Service, we may automatically collect:</p>
          <ul className="list-disc pl-6 text-neutral-700 mb-4">
            <li>Device information (device type, operating system, browser type)</li>
            <li>Usage data (pages visited, time spent, links clicked)</li>
            <li>IP address and approximate location</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">1.3 Social Media Information</h3>
          <p className="text-neutral-700 mb-4">
            When you interact with our Service through social media platforms (including TikTok),
            we may collect:
          </p>
          <ul className="list-disc pl-6 text-neutral-700 mb-4">
            <li>Your public profile information (username, profile picture, display name)</li>
            <li>Information about your interactions with our content</li>
            <li>Information you authorize the social media platform to share with us</li>
          </ul>
          <p className="text-neutral-700 mb-4">
            <strong>Note:</strong> Our use of TikTok API and data is subject to TikTok's Terms of Service
            and Privacy Policy. We only access information that you explicitly authorize.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">2. How We Use Your Information</h2>
          <p className="text-neutral-700 mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 text-neutral-700 mb-4">
            <li>Provide, maintain, and improve our Service</li>
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about products, services, and promotions</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Analyze usage patterns and trends to improve user experience</li>
            <li>Detect, prevent, and address technical issues and fraud</li>
            <li>Comply with legal obligations</li>
            <li>Enable social media sharing and integration features</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">3. TikTok Integration and Data</h2>
          <p className="text-neutral-700 mb-4">
            Our Service integrates with TikTok's API to provide enhanced features. Regarding TikTok data:
          </p>
          <ul className="list-disc pl-6 text-neutral-700 mb-4">
            <li>We only access data you explicitly authorize through TikTok's permission flow</li>
            <li>We use TikTok data solely to provide our Service and as described in this Privacy Policy</li>
            <li>We do not sell or share TikTok data with third parties for their marketing purposes</li>
            <li>We comply with TikTok's Developer Terms and API policies</li>
            <li>You can revoke our access to your TikTok data at any time through TikTok's settings</li>
            <li>TikTok data is stored securely and retained only as long as necessary</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">4. How We Share Your Information</h2>
          <p className="text-neutral-700 mb-4">We may share your information in the following circumstances:</p>

          <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">4.1 Service Providers</h3>
          <p className="text-neutral-700 mb-4">
            We may share your information with third-party service providers who perform services on our behalf,
            such as:
          </p>
          <ul className="list-disc pl-6 text-neutral-700 mb-4">
            <li>Hosting and infrastructure providers</li>
            <li>Analytics providers</li>
            <li>Communication platforms (WhatsApp)</li>
            <li>Social media platforms (TikTok, Facebook, Instagram)</li>
          </ul>

          <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">4.2 Legal Requirements</h3>
          <p className="text-neutral-700 mb-4">
            We may disclose your information if required by law or in response to valid requests by
            public authorities.
          </p>

          <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">4.3 Business Transfers</h3>
          <p className="text-neutral-700 mb-4">
            In the event of a merger, acquisition, or sale of assets, your information may be transferred
            to the acquiring entity.
          </p>

          <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">4.4 With Your Consent</h3>
          <p className="text-neutral-700 mb-4">
            We may share your information for any other purpose with your explicit consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">5. Data Security</h2>
          <p className="text-neutral-700 mb-4">
            We implement appropriate technical and organizational measures to protect your information
            against unauthorized access, alteration, disclosure, or destruction. However, no method of
            transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee
            absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">6. Data Retention</h2>
          <p className="text-neutral-700 mb-4">
            We retain your information for as long as necessary to fulfill the purposes outlined in this
            Privacy Policy, unless a longer retention period is required or permitted by law. When we no
            longer need your information, we will securely delete or anonymize it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">7. Your Rights and Choices</h2>
          <p className="text-neutral-700 mb-4">You have the following rights regarding your information:</p>
          <ul className="list-disc pl-6 text-neutral-700 mb-4">
            <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Objection:</strong> Object to our processing of your information</li>
            <li><strong>Portability:</strong> Request transfer of your information to another service</li>
            <li><strong>Withdraw Consent:</strong> Withdraw consent for specific processing activities</li>
            <li><strong>Revoke Social Media Access:</strong> Disconnect third-party integrations through platform settings</li>
          </ul>
          <p className="text-neutral-700 mb-4">
            To exercise these rights, please contact us using the information provided at the end of this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">8. Cookies and Tracking Technologies</h2>
          <p className="text-neutral-700 mb-4">
            We use cookies and similar tracking technologies to track activity on our Service and hold
            certain information. You can instruct your browser to refuse all cookies or to indicate when
            a cookie is being sent. However, if you do not accept cookies, you may not be able to use
            some portions of our Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">9. Third-Party Links</h2>
          <p className="text-neutral-700 mb-4">
            Our Service may contain links to third-party websites and services, including TikTok,
            Facebook, Instagram, and WhatsApp. We are not responsible for the privacy practices of
            these third parties. We encourage you to read their privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">10. Children's Privacy</h2>
          <p className="text-neutral-700 mb-4">
            Our Service is not directed to children under the age of 13 (or the applicable age of
            consent in your jurisdiction). We do not knowingly collect personal information from children.
            If you become aware that a child has provided us with personal information, please contact us,
            and we will take steps to delete such information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">11. International Data Transfers</h2>
          <p className="text-neutral-700 mb-4">
            Your information may be transferred to and processed in countries other than your country of
            residence. These countries may have data protection laws that are different from the laws of
            your country. We take appropriate measures to ensure that your information receives an adequate
            level of protection.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">12. Changes to This Privacy Policy</h2>
          <p className="text-neutral-700 mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any material changes
            by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage
            you to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">13. California Privacy Rights (CCPA)</h2>
          <p className="text-neutral-700 mb-4">
            If you are a California resident, you have additional rights under the California Consumer
            Privacy Act (CCPA), including:
          </p>
          <ul className="list-disc pl-6 text-neutral-700 mb-4">
            <li>The right to know what personal information we collect, use, and disclose</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to opt-out of the sale of your personal information (we do not sell personal information)</li>
            <li>The right to non-discrimination for exercising your CCPA rights</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">14. European Privacy Rights (GDPR)</h2>
          <p className="text-neutral-700 mb-4">
            If you are located in the European Economic Area (EEA), you have additional rights under the
            General Data Protection Regulation (GDPR), including the rights described in Section 7 above.
            We process your information based on the following legal grounds:
          </p>
          <ul className="list-disc pl-6 text-neutral-700 mb-4">
            <li>Your consent</li>
            <li>Performance of a contract with you</li>
            <li>Compliance with legal obligations</li>
            <li>Our legitimate business interests</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">15. Contact Us</h2>
          <p className="text-neutral-700 mb-4">
            If you have any questions or concerns about this Privacy Policy or our privacy practices,
            please contact us:
          </p>
          <ul className="list-none text-neutral-700 mb-4">
            <li><strong>Business Name:</strong> Kleva Handbags</li>
            <li><strong>WhatsApp:</strong> Available on our website</li>
            <li><strong>Email:</strong> Contact via website or social media</li>
          </ul>
          <p className="text-neutral-700 mb-4">
            For TikTok-specific data inquiries, you may also contact TikTok directly through their
            platform or reference their privacy policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">16. Data Processing Agreement</h2>
          <p className="text-neutral-700 mb-4">
            When we process personal information on behalf of our customers, we act as a data processor.
            We maintain appropriate technical and organizational measures to protect such data and process
            it only in accordance with documented instructions.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-600">
            By using our Service, you acknowledge that you have read and understood this Privacy Policy
            and agree to its terms.
          </p>
        </div>
      </div>
    </div>
  );
}
