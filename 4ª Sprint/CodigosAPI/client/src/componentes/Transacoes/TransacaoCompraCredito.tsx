import { Form, FormControl, InputGroup, Button } from "react-bootstrap";
import NavbarCompraCredito from "../Navbars/NavbarCompraCredito";
import { useState } from "react";
import TransacaoPopup from "./TransacaoCPopup";
import Footer from "../Footer/Footer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function TransacaoCompraCredito() {

  const [valorCreditos, setValorCreditos] = useState("");
  const navigate = useNavigate()

  const msgSucesso = () => {
    Swal.fire({
      title: "Sucesso",
      icon: 'success',
      text: 'Solicitação Enviada',
      confirmButtonColor: '#de940a'
    })
  }

  const handleConfirm = () => {
    // Verifique se os campos foram preenchidos
    if (!valorCreditos) {
      Swal.fire("Erro", "Por favor, preencha todos os campos.", "error");
      return;
    }
  
    const idParceiro = localStorage.getItem("idParceiro");
  
    // Exibir uma janela de confirmação usando Swal
    Swal.fire({
      title: "Confirmar Requisição",
      text: `Você está solicitando ${valorCreditos} Créditos Greennneat.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#198754',
      cancelButtonColor: '#ffc107'
    }).then((result) => {
      if (result.isConfirmed) {
        // O usuário confirmou, execute a função fetch
        fetch(`http://localhost:3001/transacaoGreenneatParc/${idParceiro}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            valorCreditos: parseFloat(valorCreditos), // Converter para número
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Sucesso", "Transação concluída com sucesso.", "success");
            } else {
              console.log("Erro", "Ocorreu um erro ao processar a transação.", "error");
            }
          })
          .catch((error) => {
            console.error("Erro ao enviar os dados:", error);
          });
          setValorCreditos("");
          msgSucesso()
      }
    });
  };
  return (
    <>
      <NavbarCompraCredito />
      <div className="container" style={{ marginTop: "5%", width: "60%" }}>
        <div className="campo-inserir-valor">
          <div style={{ marginBottom: "3%" }}>
            <h3>Informe a quantidade de Créditos Greenneat que deseja adquirir:</h3>
          </div>
          <Form.Group
            controlId="campo-valor"
            style={{ marginBottom: "3%" }}
          >
            <InputGroup className="form-control-transacao-compra" >
              <FormControl
                type="campo-valor"
                required
                placeholder="Ex: 100"
                aria-label="campo-valor"
                aria-describedby="campo-valor-addon"
                style={{ backgroundColor: "#ddffda" }}
                value={valorCreditos}
                onChange={(e) => setValorCreditos(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <div style={{ textAlign: "center" }}>
            <Button
              style={{ fontSize: 18, marginRight: "2%" }}
              variant="success"
              onClick={handleConfirm}
            >
              Confirmar
            </Button>
            <Button style={{ fontSize: 18, color: 'white' }} variant="warning" onClick={ () => navigate('/painel-parceiro-saldo-credito')}>
              Voltar
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default TransacaoCompraCredito;
