import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  return {
    title: t("cookiePolicy"),
  };
}

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-4">
          Last Updated: April 2, 2024
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            This Cookie Policy explains how launch-kit (&quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;) uses cookies and similar
            technologies to recognize you when you visit our website and
            application. It explains what these technologies are and why we use
            them, as well as your rights to control our use of them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or
            mobile device when you visit a website. Cookies are widely used by
            website owners to make their websites work, or to work more
            efficiently, as well as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, launch-kit) are
            called &quot;first-party cookies&quot;. Cookies set by parties other
            than the website owner are called &quot;third-party cookies&quot;.
            Third-party cookies enable third-party features or functionality to
            be provided on or through the website (e.g., advertising,
            interactive content, and analytics). The parties that set these
            third-party cookies can recognize your computer both when it visits
            the website in question and also when it visits certain other
            websites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Why Do We Use Cookies?
          </h2>
          <p>
            We use first-party and third-party cookies for several reasons. Some
            cookies are required for technical reasons in order for our
            application to operate, and we refer to these as
            &quot;essential&quot; or &quot;strictly necessary&quot; cookies.
            Other cookies allow us to track and target the interests of our
            users to enhance the experience on our application. Third parties
            may also serve cookies through our application for analytics and
            other purposes.
          </p>
          <p>
            The specific types of first and third-party cookies served through
            our application and the purposes they perform are described below:
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Types of Cookies We Use
          </h2>

          <h3 className="text-xl font-medium mt-6 mb-3">
            4.1 Essential Cookies
          </h3>
          <p>
            These cookies are strictly necessary to provide you with services
            available through our application and to use some of its features,
            such as access to secure areas. Because these cookies are strictly
            necessary to deliver the application, you cannot refuse them without
            impacting how our application functions.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Authentication cookies</strong>: These help us identify
              you when you log in to our application.
            </li>
            <li>
              <strong>Security cookies</strong>: These help us detect and
              prevent potential security risks.
            </li>
            <li>
              <strong>Session cookies</strong>: These enable our application to
              remember your preferences and settings.
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">
            4.2 Analytics Cookies
          </h3>
          <p>
            These cookies collect information that is used either in aggregate
            form to help us understand how our application is being used or how
            effective our marketing campaigns are, or to help us customize our
            application for you.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Performance cookies</strong>: These collect information
              about how visitors use our application, e.g., which pages visitors
              go to most often.
            </li>
            <li>
              <strong>Functionality cookies</strong>: These recognize you when
              you return to our application and enable personalized features.
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">
            4.3 Third-Party Cookies
          </h3>
          <p>We may use various third-party cookies, including those from:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Analytics providers</strong> (such as Google Analytics)
            </li>
            <li>
              <strong>Authentication providers</strong> (such as Auth0,
              NextAuth)
            </li>
            <li>
              <strong>Hosting and infrastructure services</strong>
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">
            4.4 Advertising Cookies
          </h3>
          <p>
            These cookies are used to make advertising messages more relevant to
            you. They perform functions like preventing the same ad from
            continuously reappearing, ensuring that ads are properly displayed,
            and in some cases selecting advertisements that are based on your
            interests.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Ad network cookies</strong>: Our advertising partners
              place cookies to help them deliver personalized ads and track
              their performance.
            </li>
            <li>
              <strong>Remarketing cookies</strong>: These allow our advertising
              partners to show you ads based on your previous visits to our site
              when you visit other websites.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. How Can You Control Cookies?
          </h2>
          <p>
            You have the right to decide whether to accept or reject cookies.
            You can exercise your cookie preferences as follows:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Browser Controls</strong>: You can set or amend your web
              browser controls to accept or refuse cookies. If you choose to
              reject cookies, you may still use our application though your
              access to some functionality and areas may be restricted.
            </li>
            <li>
              <strong>Cookie Consent Tool</strong>: We provide a cookie consent
              banner when you first visit our application, allowing you to
              accept or decline non-essential cookies.
            </li>
          </ul>
          <p>
            The specific way to control cookies for the most common web browsers
            are as follows:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Chrome</strong>:{" "}
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://support.google.com/chrome/answer/95647
              </a>
            </li>
            <li>
              <strong>Internet Explorer</strong>:{" "}
              <a
                href="https://support.microsoft.com/help/17442"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://support.microsoft.com/help/17442
              </a>
            </li>
            <li>
              <strong>Firefox</strong>:{" "}
              <a
                href="https://support.mozilla.org/kb/enable-and-disable-cookies-website-preferences"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://support.mozilla.org/kb/enable-and-disable-cookies-website-preferences
              </a>
            </li>
            <li>
              <strong>Safari</strong>:{" "}
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-sfri11471"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://support.apple.com/guide/safari/manage-cookies-sfri11471
              </a>
            </li>
            <li>
              <strong>Microsoft Edge</strong>:{" "}
              <a
                href="https://privacy.microsoft.com/privacystatement"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://privacy.microsoft.com/privacystatement
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. How Often Will We Update This Cookie Policy?
          </h2>
          <p>
            We may update this Cookie Policy from time to time in order to
            reflect, for example, changes to the cookies we use or for other
            operational, legal, or regulatory reasons. Please therefore revisit
            this Cookie Policy regularly to stay informed about our use of
            cookies and related technologies.
          </p>
          <p>
            The date at the top of this Cookie Policy indicates when it was last
            updated.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Where Can You Get Further Information?
          </h2>
          <p>
            If you have any questions about our use of cookies or other
            technologies, please contact us at:
          </p>
          <p>Email: osacryiu.lapsang@gmail.com</p>
        </section>
      </div>
    </div>
  );
}
