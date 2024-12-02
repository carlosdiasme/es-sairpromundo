import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Read the Terms of Use for the Sair pro Mundo website.',
  keywords: 'terms of use, usage policy, sair pro mundo',
}

export default function TermsOfUse() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Terms of Use</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Terms</h2>
          <p>
            By accessing the Sair pro Mundo website, you agree to comply with these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on Sair pro Mundo&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on Sair pro Mundo&apos;s website;</li>
            <li>remove any copyright or other proprietary notations from the materials;</li>
            <li>transfer the materials to another person or</li>
          </ul>
          <p>
            This license shall automatically terminate if you violate any of these restrictions and may be terminated by Sair pro Mundo at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Disclaimer</h2>
          <p>
            The materials on Sair pro Mundo&apos;s website are provided on an &apos;as is&apos; basis.
          </p>
          <p>
            Sair pro Mundo makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <p>
            Further, Sair pro Mundo does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Limitations</h2>
          <p>
            In no event shall Sair pro Mundo or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Sair pro Mundo&apos;s website, even if Sair pro Mundo or a Sair pro Mundo authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Accuracy of materials</h2>
          <p>
            The materials appearing on Sair pro Mundo&apos;s website could include technical, typographical, or photographic errors. Sair pro Mundo does not warrant that any of the materials on its website are accurate, complete or current. Sair pro Mundo may make changes to the materials contained on its website at any time without notice. However Sair pro Mundo does not make any commitment to update the materials.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Links</h2>
          <p>
            Sair pro Mundo has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Sair pro Mundo of the site. Use of any such linked website is at the user&apos;s own risk.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Modifications</h2>
          <p>
            Sair pro Mundo may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of Sair pro Mundo and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </section>
      </div>
    </main>
  )
}

