import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  return {
    title: t("privacyPolicy"),
  };
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-4">
          Last Updated: April 2, 2024
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Welcome to launch-kit (&quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;). We respect your privacy and are committed to
            protecting your personal data. This privacy policy explains how we
            collect, use, disclose, and safeguard your information when you use
            our staff roster application and website.
          </p>
          <p>
            Please read this privacy policy carefully. If you do not agree with
            the terms of this privacy policy, please do not access the
            application.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>

          <h3 className="text-xl font-medium mt-6 mb-3">2.1 Personal Data</h3>
          <p>
            We may collect personal identification information from users in
            various ways, including, but not limited to when users:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Register for an account</li>
            <li>Create or respond to timetables</li>
            <li>Update their profile information</li>
            <li>Communicate with us</li>
          </ul>
          <p>The personal information we may collect includes:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Profile image (if provided)</li>
            <li>Role preferences</li>
            <li>Time availability</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">
            2.2 Non-Personal Data
          </h3>
          <p>
            We may collect non-personal identification information about users
            whenever they interact with our application. Non-personal
            identification information may include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Browser name</li>
            <li>Type of computer or device</li>
            <li>
              Technical information about users&apos; means of connection to our
              application
            </li>
            <li>Operating system</li>
            <li>Usage patterns and interaction data</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">
            2.3 Cookies and Tracking Technologies
          </h3>
          <p>
            Our application may use &quot;cookies&quot; and other tracking
            technologies to enhance user experience. A cookie is a small file
            placed on your device. You can instruct your browser to refuse all
            cookies or to indicate when a cookie is being sent. However, if you
            do not accept cookies, you may not be able to use some portions of
            our application.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">
            2.4 Advertising and Analytics
          </h3>
          <p>
            Our application displays advertisements provided by third-party ad
            networks. These ad providers may use cookies, web beacons, and
            similar technologies to collect information about your activities on
            our site and other websites to provide you with targeted advertising
            based on your browsing activities and interests.
          </p>
          <p>The information collected may include:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device type and identifiers</li>
            <li>Pages visited and interactions</li>
            <li>Geographic location</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Use Your Information
          </h2>
          <p>
            We may use the information we collect from you in the following
            ways:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>To provide, operate, and maintain our application</li>
            <li>To improve, personalize, and expand our application</li>
            <li>To understand and analyze how you use our application</li>
            <li>
              To develop new products, services, features, and functionality
            </li>
            <li>To process timetable creation and staff assignment</li>
            <li>
              To communicate with you about updates, security alerts, and
              support
            </li>
            <li>
              To send you important information regarding the application,
              changes to our terms, conditions, and policies
            </li>
            <li>To respond to your comments or inquiries</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Data Protection and Security
          </h2>
          <p>
            We adopt appropriate data collection, storage, and processing
            practices and security measures to protect against unauthorized
            access, alteration, disclosure, or destruction of your personal
            information, username, password, transaction information, and data
            stored in our application.
          </p>
          <p>
            Your personal information is contained behind secured networks and
            is only accessible by a limited number of persons who have special
            access rights to such systems and are required to keep the
            information confidential.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Sharing Your Personal Information
          </h2>
          <p>
            We do not sell, trade, or rent users&apos; personal identification
            information to others. We may share generic aggregated demographic
            information not linked to any personal identification information
            regarding visitors and users with our business partners and trusted
            affiliates.
          </p>
          <p>
            We may use third-party service providers to help us operate our
            application or administer activities on our behalf, such as sending
            out newsletters or surveys. We may share your information with these
            third parties for those limited purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Third-Party Services
          </h2>
          <p>
            Our application may use third-party services for various
            functionalities. These services may collect information sent by your
            browser as part of their operations. Their data collection practices
            are subject to their own privacy policies.
          </p>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Authentication providers</li>
            <li>Database and storage services</li>
            <li>Hosting and infrastructure services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Your Data Protection Rights
          </h2>
          <p>
            Depending on your location, you may have rights regarding your
            personal data. These may include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>The right to access personal data we hold about you</li>
            <li>The right to request correction of inaccurate data</li>
            <li>The right to request deletion of your data</li>
            <li>The right to withdraw consent at any time</li>
            <li>The right to request restriction of processing</li>
            <li>The right to data portability</li>
            <li>The right to object to processing in certain circumstances</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information
            provided in the &quot;Contact Us&quot; section.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Children&apos;s Privacy
          </h2>
          <p>
            Our application is not intended for children under 13 years of age.
            We do not knowingly collect personal information from children under
            13. If we learn we have collected personal information from a child
            under 13, we will delete this information promptly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            9. Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;Last Updated&quot; date.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p>Email: osacryiu.lapsang@gmail.com</p>
        </section>
      </div>
    </div>
  );
}
