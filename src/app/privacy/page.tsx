
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Card className="max-w-4xl mx-auto bg-card border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-3xl text-primary-foreground">
              Privacy Policy for TechFest by NANITES
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <p>
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section>
            <h2 className="font-headline text-xl text-primary mb-2">1. Introduction</h2>
            <p>
              Welcome to the TechFest by NANITES website. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website to register for and participate in our tech festival. By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl text-primary mb-2">2. Information We Collect</h2>
            <p className="mb-2">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, registration number, college details (degree, branch, semester), and mobile number, that you voluntarily give to us when you register for an account or an event.
              </li>
              <li>
                <strong>Profile Data:</strong> Information you provide in your user profile, such as your interests and a brief "About You" description, which is used to provide AI-powered recommendations.
              </li>
              <li>
                <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-xl text-primary mb-2">3. How We Use Your Information</h2>
            <p className="mb-2">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Create and manage your account.</li>
              <li>Process your registrations for events and generate QR code tickets.</li>
              <li>Communicate with you regarding your account and event participation.</li>
              <li>Provide you with personalized AI-driven event recommendations and coaching.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              <li>Send you a password reset link or email verification link as requested.</li>
              <li>Post announcements and updates about the festival.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="font-headline text-xl text-primary mb-2">4. Data Sharing and Disclosure</h2>
            <p className="mb-2">We do not sell or rent your personal information to third parties. However, we may share information with third-party service providers that perform services for us or on our behalf, including:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong>Firebase (by Google):</strong> We use Firebase for authentication, database storage (Firestore), and hosting. Your data is stored securely on Firebase servers.
              </li>
              <li>
                <strong>Google AI (Genkit):</strong> For features like the AI Event Coach, we send anonymized or relevant data (such as event titles and descriptions) to Google's Generative AI models to generate responses. We do not send your personal identification data unless necessary for the feature (e.g., user profile for recommendations).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-xl text-primary mb-2">5. Data Security</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl text-primary mb-2">6. Your Data Rights</h2>
            <p>
              You have the right to access, update, or delete the information we have on you. You can update your profile information at any time through your user dashboard. If you wish to delete your account, please contact us directly.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl text-primary mb-2">7. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl text-primary mb-2">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us via the social media links provided in the footer.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
