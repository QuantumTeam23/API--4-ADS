import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "../componentes/Cadastros&Logins/Login";
import EditarUsuario from "../componentes/Edição/EditarUsuario";
import CadastroEstabelecimento from "../componentes/Cadastros&Logins/CadastroEstabelecimento";
import CadastroParceiro from "../componentes/Cadastros&Logins/CadastroParceiro";
import Recuperacao from "../componentes/Cadastros&Logins/Recuperacao";
import Token from "../componentes/Cadastros&Logins/Token";
import {
  PrivateRouteAdmin,
  PrivateRouteParceiro,
  PrivateRouteEstabelecimento,
  PrivateRouteToken,
  PrivateRouteEditarUsuario,
  PrivateRouteEditarSenha,
  PrivateRouteCredito,
} from "./RouteAuthentication";
import Usuario from "../componentes/Cadastros&Logins/Usuario";
import EditarSenha from "../componentes/Cadastros&Logins/EditarSenha";
import PainelAdminControlUser from "../componentes/PainelAdmin/PainelAdminControlUser";
import Requisicoes from "../componentes/PainelAdmin/TabelaRequisicoes"
import HistoricoTransacoes from "../componentes/PainelAdmin/PainelAdminHistTransacoes";
import PainelParceiroCarteiraEstab from "../componentes/PainelParceiro/PainelCarteiraEstab";
import PainelParceiroColetas from "../componentes/PainelParceiro/PainelColetas";
import PainelHistoricoCompra from "../componentes/PainelParceiro/PainelHistóricoCompra";
import PainelEstabelecimentoHistorico from "../componentes/PainelEstabelecimento/PainelEstabelecimentoHistoricoCompras";
import PainelEstabelecimentoExtrato from "../componentes/PainelEstabelecimento/PainelEstabelecimentoExtrato";
import PainelParceiroSaldoCredito from "../componentes/PainelParceiro/PainelSaldoCredito";
import TransacaoCompraCredito from "../componentes/Transacoes/TransacaoCompraCredito";
import TransacaoDoacao from "../componentes/Transacoes/TransacaoDoacao";
import ComparadorPrecos from "../componentes/PainelAdmin/ComparadorDePreco";
import PainelPrecoPorRegiao from "../componentes/PainelAdmin/PainelPrecoRegiao";
import DashboardRanking from "../componentes/PainelAdmin/DashboardRanking";
import PainelRequisicoes from "../componentes/PainelAdmin/PainelRequisicoes";

export const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROTA ADM */}
        <Route
          path="/painel-administrador-usuario"
          element={
            <PrivateRouteAdmin>
              <PainelAdminControlUser />
            </PrivateRouteAdmin>
          }
        />

        {/* ROTA ADM */}
        <Route
          path="/painel-administrador-transacoes"
          element={
            <PrivateRouteAdmin>
              <HistoricoTransacoes />
            </PrivateRouteAdmin>
          }
        />

        {/* ROTA ADM */}
        <Route
          path="/painel-administrador-preco-regiao"
          element={
            <PrivateRouteAdmin>
              <PainelPrecoPorRegiao />
            </PrivateRouteAdmin>
          }
        />

        {/* ROTA ADM */}
        <Route
          path="/painel-administrador-dashboard-ranking"
          element={
            <PrivateRouteAdmin>
              <DashboardRanking />
            </PrivateRouteAdmin>
          }
        />

        {/* ROTA ADM */}
        <Route
          path="/painel-administrador-requisicoes"
          element={
            <PrivateRouteAdmin>
              <PainelRequisicoes />
            </PrivateRouteAdmin>
          }
        />

        {/* ROTA Comparador de Preços*/}
        <Route
          path="/painel-administrador-comparador-precos"
          element={
            <PrivateRouteAdmin>
              <ComparadorPrecos />
            </PrivateRouteAdmin>
          }
        />

        {/* ROTA PARCEIRO */}
        <Route
          path="/painel-parceiro-carteira-estabelecimento"
          element={
            <PrivateRouteParceiro>
              <PainelParceiroCarteiraEstab />
            </PrivateRouteParceiro>
          }
        />

        {/* ROTA PARCEIRO */}
        <Route
          path="/painel-parceiro-coleta"
          element={
            <PrivateRouteParceiro>
              <PainelParceiroColetas />
            </PrivateRouteParceiro>
          }
        />

        {/* ROTA PARCEIRO */}
        <Route
          path="/painel-parceiro-historico-compra"
          element={
            <PrivateRouteParceiro>
              <PainelHistoricoCompra />
            </PrivateRouteParceiro>
          }
        />

        {/* ROTA PARCEIRO */}
        <Route
          path="/painel-parceiro-saldo-credito"
          element={
            <PrivateRouteParceiro>
              <PainelParceiroSaldoCredito />
            </PrivateRouteParceiro>
          }
        />

        {/* ROTA ESTABELECIMENTO */}
        <Route
          path="/painel-estabelecimento-historico-compras"
          element={
            <PrivateRouteEstabelecimento>
              <PainelEstabelecimentoHistorico />
            </PrivateRouteEstabelecimento>
          }
        />

        {/* ROTA ESTABELECIMENTO */}
        <Route
          path="/painel-estabelecimento-extrato"
          element={
            <PrivateRouteEstabelecimento>
              <PainelEstabelecimentoExtrato />
            </PrivateRouteEstabelecimento>
          }
        />

        {/* ROTA EDITAR USUÁRIO */}
        <Route
          path="/editar-usuario"
          element={
            <PrivateRouteEditarUsuario>
              <EditarUsuario />
            </PrivateRouteEditarUsuario>
          }
        />

        {/* ROTA TOKEN */}
        <Route
          path="/token"
          element={
            <PrivateRouteToken>
              <Token />
            </PrivateRouteToken>
          }
        />

        {/* ROTA EDITAR SENHA */}
        <Route
          path="/editar-senha"
          element={
            <PrivateRouteEditarSenha>
              <EditarSenha />
            </PrivateRouteEditarSenha>
          }
        />

        {/* ROTA TRANSACAO COMPRA CREDITO */}
        <Route
          path="/transacao-compra-credito"
          element={
            <PrivateRouteCredito>
              <TransacaoCompraCredito />
            </PrivateRouteCredito>
          }
        />

        {/* ROTA TRANSACAO DOACAO */}
        <Route
          path="/transacao-doacao"
          element={
            <PrivateRouteCredito>
              <TransacaoDoacao />
            </PrivateRouteCredito>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/cadastro-parceiro" element={<CadastroParceiro />} />
        <Route
          path="/cadastro-estabelecimento"
          element={<CadastroEstabelecimento />}
        />
        <Route path="/recuperacao" element={<Recuperacao />} />

        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="*" element={<h1>PÁGINA NÃO ENCONTRADA</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
