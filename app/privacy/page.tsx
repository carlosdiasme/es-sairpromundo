import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Sair pro Mundo handles your information and protects your privacy.',
  keywords: 'privacy, privacy policy, data protection, sair pro mundo',
  openGraph: {
    title: 'Privacy Policy',
    description: 'Learn how Sair pro Mundo handles your information and protects your privacy.',
    url: 'https://en.sairpromundo.com/privacy',
    images: [
      {
        url: 'https://en.sairpromundo.com/images/sair-pro-mundo-og.jpg',
        alt: 'Sair pro Mundo',
      },
    ],
    siteName: 'Sair pro Mundo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Sair pro Mundo',
    description: 'Learn how Sair pro Mundo handles your information and protects your privacy.',
    images: ['https://en.sairpromundo.com/images/sair-pro-mundo-og.jpg'],
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Privacy Policy</h1>
        
        <p className="text-lg text-gray-600 mb-4">
          Your privacy is important to us. It is <span className="font-semibold">Sair pro Mundo</span>&apos;s policy to respect your privacy regarding any information we may collect from you across our website, <Link href="https://en.sairpromundo.com" className="text-blue-600 hover:underline">Sair pro Mundo</Link>, and other sites we own and operate.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we&apos;re collecting it and how it will be used.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          We don&apos;t share any personally identifying information publicly or with third-parties, except when required to by law.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          The Google AdSense service we use to serve advertising uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times that a given ad is shown to you.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          For more information on Google AdSense see the official Google AdSense privacy FAQ.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          We use advertisements to offset the costs of running this site and provide funding for further development. The behavioral advertising cookies used by this site have been designed to ensure that we provide you with the most relevant adverts where possible by anonymously tracking your interests and presenting similar things that may be of interest.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Several partners advertise on our behalf and affiliate tracking cookies simply allow us to see if our customers have come to the site through one of our partner sites so that we can credit them appropriately and where applicable allow our affiliate partners to provide any bonus that they may provide you for making a purchase.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">User Commitment</h2>

        <p className="text-lg text-gray-600 mb-4">
          The user commits to make appropriate use of the contents and information that Sair pro Mundo offers on the site and with an enunciative, but not limiting, character:
        </p>

        <ul className="list-disc list-inside text-lg text-gray-600 mb-4">
          <li>Not to engage in activities that are illegal or contrary to good faith and public order;</li>
          <li>Not to spread propaganda or content of a racist, xenophobic nature, bbebbet or gambling, any type of illegal pornography, terrorist advocacy or against human rights;</li>
          <li>Not to cause damage to the physical (hardware) and logical (software) systems of Sair pro Mundo, its suppliers or third parties, to introduce or disseminate computer viruses or any other hardware or software systems that are capable of causing damage mentioned above.</li>
        </ul>

        <p className="text-lg text-gray-600 mb-4">
          More information: We hope this is clear and, as mentioned above, if there is something that you aren&apos;t sure whether you need or not, it&apos;s usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          This policy is effective as of 17/10/2024.
        </p>
      </div>
    </div>
  )
}

