import Head from 'next/head';

const TermosDeUso = () => {
  return (
    <>
      <Head>
        <title>Termos de Uso</title>
        <meta name="description" content="Conheça os Termos de Uso do site Sair pro Mundo." />
        <meta name="keywords" content="termos de uso, política de uso, sair pro mundo" />
      </Head>

      <main className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white rounded-lg p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Termos de Uso</h1>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">1. Termos</h2>
            <p>
              Ao acessar ao site Sair pro Mundo, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">2. Uso de Licença</h2>
            <p>
              É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Sair pro Mundo, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>modificar ou copiar os materiais;</li>
              <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
              <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Sair pro Mundo;</li>
              <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais;</li>
              <li>transferir os materiais para outra pessoa ou</li>
            </ul>
            <p>
              Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Sair pro Mundo a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">3. Isenção de responsabilidade</h2>
            <p>
              Os materiais no site da Sair pro Mundo são fornecidos
            </p>
            <p>
              Além disso, o Sair pro Mundo não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">4. Limitações</h2>
            <p>
              Em nenhum caso o Sair pro Mundo ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Sair pro Mundo, mesmo que Sair pro Mundo ou um representante autorizado da Sair pro Mundo tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">5. Precisão dos materiais</h2>
            <p>
              Os materiais exibidos no site da Sair pro Mundo podem incluir erros técnicos, tipográficos ou fotográficos. Sair pro Mundo não garante que qualquer material em seu site seja preciso, completo ou atual. Sair pro Mundo pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Sair pro Mundo não se compromete a atualizar os materiais.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">6. Links</h2>
            <p>
              O Sair pro Mundo não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Sair pro Mundo do site. O uso de qualquer site vinculado é por conta e risco do usuário.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Modificações</h2>
            <p>
              O Sair pro Mundo pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Lei aplicável</h2>
            <p>
              Estes termos e condições são regidos e interpretados de acordo com as leis do Sair pro Mundo e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default TermosDeUso;