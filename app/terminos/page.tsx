import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos de Uso',
  description: 'Lee los Términos de Uso del sitio web de Sair pro Mundo.',
  keywords: 'términos de uso, política de uso, sair pro mundo',
}

export default function TerminosDeUso() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Términos de Uso</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Términos</h2>
          <p>
            Al acceder al sitio web de Sair pro Mundo, aceptas cumplir con estos términos de servicio, todas las leyes y regulaciones aplicables, y aceptas que eres responsable del cumplimiento de cualquier ley local aplicable. Si no estás de acuerdo con alguno de estos términos, se te prohíbe usar o acceder a este sitio. Los materiales contenidos en este sitio web están protegidos por las leyes de derechos de autor y marcas comerciales aplicables.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Licencia de Uso</h2>
          <p>
            Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de Sair pro Mundo para visualización personal y no comercial transitoria únicamente. Esta es la concesión de una licencia, no una transferencia de título, y bajo esta licencia no puedes:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>modificar o copiar los materiales;</li>
            <li>usar los materiales para cualquier propósito comercial o para cualquier exhibición pública (comercial o no comercial);</li>
            <li>intentar descompilar o aplicar ingeniería inversa a cualquier software contenido en el sitio web de Sair pro Mundo;</li>
            <li>eliminar cualquier derecho de autor u otras notaciones de propiedad de los materiales;</li>
            <li>transferir los materiales a otra persona o</li>
          </ul>
          <p>
            Esta licencia terminará automáticamente si violas cualquiera de estas restricciones y puede ser terminada por Sair pro Mundo en cualquier momento. Al terminar tu visualización de estos materiales o al terminar esta licencia, debes destruir cualquier material descargado en tu posesión, ya sea en formato electrónico o impreso.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Descargo de Responsabilidad</h2>
          <p>
            Los materiales en el sitio web de Sair pro Mundo se proporcionan &apos;tal cual&apos;.
          </p>
          <p>
            Sair pro Mundo no ofrece garantías, expresas o implícitas, y por la presente renuncia y niega todas las otras garantías incluyendo, sin limitación, garantías implícitas o condiciones de comerciabilidad, idoneidad para un propósito particular, o no infracción de propiedad intelectual u otra violación de derechos.
          </p>
          <p>
            Además, Sair pro Mundo no garantiza ni hace ninguna representación con respecto a la precisión, los resultados probables, o la confiabilidad del uso de los materiales en su sitio web o de otra manera relacionados con tales materiales o en sitios vinculados a este sitio.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Limitaciones</h2>
          <p>
            En ningún caso Sair pro Mundo o sus proveedores serán responsables por cualquier daño (incluyendo, sin limitación, daños por pérdida de datos o beneficios, o debido a interrupción del negocio) que surja del uso o la imposibilidad de usar los materiales en el sitio web de Sair pro Mundo, incluso si Sair pro Mundo o un representante autorizado de Sair pro Mundo ha sido notificado oralmente o por escrito de la posibilidad de tal daño. Debido a que algunas jurisdicciones no permiten limitaciones en garantías implícitas, o limitaciones de responsabilidad por daños consecuentes o incidentales, estas limitaciones pueden no aplicarse a ti.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Precisión de los materiales</h2>
          <p>
            Los materiales que aparecen en el sitio web de Sair pro Mundo podrían incluir errores técnicos, tipográficos o fotográficos. Sair pro Mundo no garantiza que ninguno de los materiales en su sitio web sea preciso, completo o actual. Sair pro Mundo puede realizar cambios en los materiales contenidos en su sitio web en cualquier momento sin previo aviso. Sin embargo, Sair pro Mundo no se compromete a actualizar los materiales.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Enlaces</h2>
          <p>
            Sair pro Mundo no ha revisado todos los sitios vinculados a su sitio web y no es responsable por el contenido de ningún sitio vinculado. La inclusión de cualquier enlace no implica respaldo por parte de Sair pro Mundo del sitio. El uso de cualquier sitio web vinculado es bajo el propio riesgo del usuario.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Modificaciones</h2>
          <p>
            Sair pro Mundo puede revisar estos términos de servicio para su sitio web en cualquier momento sin previo aviso. Al usar este sitio web, aceptas estar sujeto a la versión actual de estos términos de servicio.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Ley Aplicable</h2>
          <p>
            Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de Sair pro Mundo y te sometes irrevocablemente a la jurisdicción exclusiva de los tribunales en ese Estado o ubicación.
          </p>
        </section>
      </div>
    </main>
  )
}

