import React, { useState } from 'react';
import '../styles/TelaInicial.css';
import Footer from '../Footer/Footer';
import NavbarParceiro from '../Navbars/NavbarTelaInicial';

export default function TelaInicial() {
  return (
    <>
      <NavbarParceiro />
      <main className="conteudo">
        <section className="conteudo-principal">
          <div className="conteudo-principal-escrito">
            <h1 className="conteudo-principal-escrito-titulo">Greenneat</h1>
            <h2 className="conteudo-principal-escrito-subtitulo">Conectando Estabelecimentos, Parceiros e Meio Ambiente em uma Economia Circular Sustentável.</h2>
            <a href="/login"><button className="conteudo-principal-escrito-botao" type='button'>Participar</button></a>
          </div>
          <img className="conteudo-principal-escrito-img" src={require('../Imagens/economiaCircular.png')} alt="Sistema circular" />
        </section>
        <section className='conteudo-secundario'>
          <div className="conteudo-secundario-informacoes">
            <h3 className='conteudo-secundario-informacoes-titulo'>Nosso Desafio</h3>
            <p className='conteudo-secundario-informacoes-paragrafo'>-Redefinir o ciclo de vida do óleo de fritura usado, transformando-o em uma valiosa moeda de troca.</p>
            <p className='conteudo-secundario-informacoes-paragrafo'>-Superar o desafio ambiental atual, incentivando a reciclagem do óleo e promovendo práticas sustentáveis em estabelecimentos por todo o país.</p>
          </div>
          <div className="conteudo-secundario-informacoes">
            <h3 className='conteudo-secundario-informacoes-titulo'>Como Funciona</h3>
            <p className='conteudo-secundario-informacoes-paragrafo'>-<strong>Coleta Responsável:</strong> Parceiros da Greenneat coletam o óleo de fritura usado de estabelecimentos cadastrados.</p>
            <p className='conteudo-secundario-informacoes-paragrafo'>-<strong>Créditos Sustentáveis:</strong> Cada litro de óleo coletado se transforma em créditos, uma recompensa para estabelecimentos comprometidos com a sustentabilidade.</p>
            <p className='conteudo-secundario-informacoes-paragrafo'>-<strong>Loja Virtual Verde:</strong> Utilize esses créditos na nossa loja virtual para adquirir produtos sustentáveis, como nossos incríveis saneantes produzidos a partir de óleo recuperado.</p>
          </div>
          <div className="conteudo-secundario-informacoes">
            <h3 className='conteudo-secundario-informacoes-titulo'>Por que Participar</h3>
            <p className='conteudo-secundario-informacoes-paragrafo'>-<strong>Impacto Ambiental Positivo:</strong> Ao participar, você contribui diretamente para reduzir o descarte inadequado de óleo, promovendo a sustentabilidade.</p>
            <p className='conteudo-secundario-informacoes-paragrafo'>-<strong>Benefícios para Seu Estabelecimento:</strong> Além de ajudar o meio ambiente, você ganha créditos para investir em produtos sustentáveis.</p>
            <p>‎</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
