// src/app/privacy-policy/page.js

import React from 'react';
import Head from 'next/head';

const PrivacyPolicyPage = () => {
  const seo = {
    title: 'Política de Privacidade',
    description: 'Saiba como o Sair pro Mundo lida com suas informações e protege sua privacidade.',
    keywords: 'privacidade, política de privacidade, proteção de dados, sair pro mundo',
    openGraph: {
      title: 'Política de Privacidade',
      description: 'Saiba como o Sair pro Mundo lida com suas informações e protege sua privacidade.',
      url: 'https://sairpromundo.com/privacidade',
      images: [
        {
          url: 'https://sairpromundo.com/images/sair-pro-mundo-og.jpg', // ajuste conforme necessário
          alt: 'Sair pro Mundo',
        },
      ],
      site_name: 'Sair pro Mundo',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Política de Privacidade - Sair pro Mundo',
      description: 'Saiba como o Sair pro Mundo lida com suas informações e protege sua privacidade.',
      image: 'https://sairpromundo.com/images/sair-pro-mundo-og.jpg', // ajuste conforme necessário
    },
  };

  return (
    <>
      <Head>
        <title>Política de Privacidade</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta property="og:title" content={seo.openGraph.title} />
        <meta property="og:description" content={seo.openGraph.description} />
        <meta property="og:url" content={seo.openGraph.url} />
        <meta property="og:image" content={seo.openGraph.images[0].url} />
        <meta property="og:image:alt" content={seo.openGraph.images[0].alt} />
        <meta property="og:site_name" content={seo.openGraph.site_name} />
        <meta name="twitter:card" content={seo.twitter.card} />
        <meta name="twitter:title" content={seo.twitter.title} />
        <meta name="twitter:description" content={seo.twitter.description} />
        <meta name="twitter:image" content={seo.twitter.image} />
      </Head>
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white rounded-lg p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Política de Privacidade</h1>
          
          <p className="text-lg text-gray-600 mb-4">
            A sua privacidade é importante para nós. É política do <span className="font-semibold">Sair pro Mundo</span> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site <a href="https://sairpromundo.com" className="text-blue-600 hover:underline">Sair pro Mundo</a>, e outros sites que possuímos e operamos.
          </p>

          <p className="text-lg text-gray-600 mb-4">
            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
          </p>

          <p className="text-lg text-gray-600 mb-4">
            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
          </p>

          <p className="text-lg text-gray-600 mb-4">
            Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
          </p>

          <p className="text-lg text-gray-600 mb-4">
            O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
          </p>

          <p className="text-lg text-gray-600 mb-4">
            Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
          </p>

          <p className="text-lg text-gray-600 mb-4">
            O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.
          </p>

          <p className="text-lg text-gray-600 mb-4">
            O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.
          </p>

          <p className="text-lg text-gray-600 mb-4">
            Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.
          </p>

          <p className="text-lg text-gray-600 mb-4">
            Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados ​​por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.
          </p>

          <p className="text-lg text-gray-600 mb-4">
            Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Compromisso do Usuário</h2>

          <p className="text-lg text-gray-600 mb-4">
            O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Sair pro Mundo oferece no site e com caráter enunciativo, mas não limitativo:
          </p>

          <ul className="list-disc list-inside text-lg text-gray-600 mb-4">
            <li>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</li>
            <li>Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, bbebbet ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
            <li>Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Sair pro Mundo, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</li>
          </ul>

          <p className="text-lg text-gray-600 mb-4">
            Mais informações: Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
          </p>

          <p className="text-lg text-gray-600 mb-4">
            Esta política é efetiva a partir de 17/10/2024.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;