import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  return {
    title: t("termsOfService"),
  };
}

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-4">
          Last Updated: April 2, 2024
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Welcome to StaffEcho. These Terms of Service govern your use of our
            web application and services. By accessing or using our application,
            you agree to be bound by these Terms. If you disagree with any part
            of the terms, you may not access the application.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Application</strong>: StaffEcho staff roster management
              system accessible via website
            </li>
            <li>
              <strong>User</strong>: Any individual who accesses or uses the
              Application
            </li>
            <li>
              <strong>Account</strong>: The registered profile required to
              access and use certain features of the Application
            </li>
            <li>
              <strong>Content</strong>: Any information, data, text, graphics,
              or other materials uploaded, downloaded, or appearing on the
              Application
            </li>
            <li>
              <strong>Services</strong>: All features, functions, tools, and
              capabilities provided through the Application
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Account Registration
          </h2>
          <p>
            To use certain features of the Application, you may be required to
            register for an account. When you register, you agree to provide
            accurate, current, and complete information about yourself.
          </p>
          <p>
            You are responsible for safeguarding your account credentials and
            for all activities that occur under your account. You agree to
            notify us immediately of any unauthorized use of your account.
          </p>
          <p>
            We reserve the right to disable any user account at our sole
            discretion if we believe you have violated these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. User Responsibilities
          </h2>
          <p>As a user of the Application, you agree to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Use the Application only for lawful purposes and in accordance
              with these Terms
            </li>
            <li>
              Not use the Application in any way that could disable, overburden,
              damage, or impair the Application
            </li>
            <li>
              Not attempt to gain unauthorized access to any part of the
              Application
            </li>
            <li>
              Not use the Application to transmit any harmful code or material
            </li>
            <li>
              Not interfere with other users&apos; use and enjoyment of the
              Application
            </li>
            <li>
              Ensure that all information you provide is accurate and up-to-date
            </li>
            <li>
              Be responsible for all content you submit, post, or display
              through the Application
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Intellectual Property Rights
          </h2>
          <p>
            The Application and its original content, features, and
            functionality are owned by StaffEcho and are protected by
            international copyright, trademark, patent, trade secret, and other
            intellectual property or proprietary rights laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works
            of, publicly display, publicly perform, republish, download, store,
            or transmit any of the material on our Application, except as
            follows:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Your computer may temporarily store copies of such materials
              incidental to your accessing and viewing those materials
            </li>
            <li>
              You may store files that are automatically cached by your web
              browser for display enhancement purposes
            </li>
            <li>
              You may print or download one copy of a reasonable number of pages
              of the Application for your own personal, non-commercial use and
              not for further reproduction, publication, or distribution
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. User Content</h2>
          <p>
            The Application may allow you to submit, post, or display content.
            By providing any content to the Application, you grant us a
            non-exclusive, transferable, sub-licensable, royalty-free, worldwide
            license to use, copy, modify, create derivative works based on,
            distribute, publicly display, publicly perform, and otherwise
            exploit in any manner such content in all formats and distribution
            channels now known or hereafter devised.
          </p>
          <p>
            You represent and warrant that you own or have the necessary rights
            to grant us the license to use the content you submit, and that such
            content does not violate the rights of any third party.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the
            Application immediately, without prior notice or liability, for any
            reason, including without limitation if you breach these Terms.
          </p>
          <p>
            Upon termination, your right to use the Application will immediately
            cease. If you wish to terminate your account, you may simply
            discontinue using the Application or request account deletion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Limitation of Liability
          </h2>
          <p>
            In no event shall StaffEcho, nor its directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Your access to or use of or inability to access or use the
              Application
            </li>
            <li>
              Any conduct or content of any third party on the Application
            </li>
            <li>Any content obtained from the Application</li>
            <li>
              Unauthorized access, use or alteration of your transmissions or
              content
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Disclaimer</h2>
          <p>
            Your use of the Application is at your sole risk. The Application is
            provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis.
            The Application is provided without warranties of any kind, whether
            express or implied, including, but not limited to, implied
            warranties of merchantability, fitness for a particular purpose,
            non-infringement, or course of performance.
          </p>
          <p>
            StaffEcho does not warrant that the Application will function
            uninterrupted, secure or available at any particular time or
            location, or that any errors or defects will be corrected.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the
            laws applicable in your jurisdiction, without regard to its conflict
            of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights. If any provision of
            these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will provide
            at least 30 days&apos; notice prior to any new terms taking effect.
            What constitutes a material change will be determined at our sole
            discretion.
          </p>
          <p>
            By continuing to access or use our Application after any revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, you are no longer authorized to use
            the Application.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>Email: osacryiu.lap@gmail.com</p>
        </section>
      </div>
    </div>
  );
}
