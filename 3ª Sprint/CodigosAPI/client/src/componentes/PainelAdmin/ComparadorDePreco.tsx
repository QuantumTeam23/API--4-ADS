import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/ComparadorDePreco.css";
import "../styles/Grafico.css";
import Chart from "react-apexcharts";
import Footer from "../Footer/Footer";
import NavbarAdministrador from "../Navbars/NavbarAdministrador";
import { SetStateAction, useRef, useState, Component } from "react";



var valores: number[];
function Grafico() {
  const state = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ["Óleo virgem", "Óleo de Fritura", "Crédito Greenneat"]
      }
    },
    series: [
      {
        name: "series-1",
        data: valores
      }
    ]
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart ">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            min-width="300"
          />
        </div>
      </div>
    </div>
  );
}

function ComparadorPrecos() {


  const [inputValueFritura, setInputValueFritura] = useState('0,00');
  const [inputValueVirgem, setInputValueVirgem] = useState('0,00');
  const [inputValueCreditoGreenneat, setInputValueCreditoGreenneat] = useState('0,00');
  const [inputValueMedio, setInputValueMedio] = useState('0,00');
  const [labelRegiao, setLabelRegiao] = useState('Nenhuma');


  const handleInputChange = (e: {
    target: {
      value: SetStateAction<string>;
    };
  }) => {
    setInputValueFritura(e.target.value);
  };

  //=====================GRUPO DE BOTÕES DO MENU LATERAL ESQUERDO COM NOMES DE REGIÕES DO BRASIL==========================
  const botaoNorteClick = () => {
    fetch('http://localhost:3001/selectComparador/Norte')
      .then(response => response.json())
      .then(data => {
        const precoOleoVirgem = parseFloat(data.preco_oleo_virgem);
        const precoOleoUsado = parseFloat(data.preco_oleo_usado);
        const valorMedio = parseFloat(data.valor_medio);
        const valorCreditoGreenneat = 10;

        setInputValueVirgem(`R$${precoOleoVirgem}`);
        setInputValueFritura(`R$${precoOleoUsado}`);
        setInputValueMedio(`R$${valorMedio}`);
        setInputValueCreditoGreenneat(`R$${10}`)
        valores = [precoOleoVirgem, precoOleoUsado, valorCreditoGreenneat];
        Grafico()
      })
      .catch(error => {
        console.error("Erro ao buscar valores:", error);
      });
  }
  const botaoSulClick = () => {

    fetch('http://localhost:3001/selectComparador/Sul')
      .then(response => response.json())
      .then(data => {
        const precoOleoVirgem = parseFloat(data.preco_oleo_virgem);
        const precoOleoUsado = parseFloat(data.preco_oleo_usado);
        const valorMedio = parseFloat(data.valor_medio);
        const valorCreditoGreenneat = 10;

        setInputValueVirgem(`R$${precoOleoVirgem}`);
        setInputValueFritura(`R$${precoOleoUsado}`);
        setInputValueMedio(`R$${valorMedio}`);
        setInputValueCreditoGreenneat(`R$${10}`)
        valores = [precoOleoVirgem, precoOleoUsado, valorCreditoGreenneat];
        Grafico()
      })
      .catch(error => {
        console.error("Erro ao buscar valores:", error);
      });
  };
  const botaoSuldesteClick = () => {
    fetch('http://localhost:3001/selectComparador/Sudeste')
      .then(response => response.json())
      .then(data => {
        const precoOleoVirgem = parseFloat(data.preco_oleo_virgem);
        const precoOleoUsado = parseFloat(data.preco_oleo_usado);
        const valorMedio = parseFloat(data.valor_medio);
        const valorCreditoGreenneat = 10;

        setInputValueVirgem(`R$${precoOleoVirgem}`);
        setInputValueFritura(`R$${precoOleoUsado}`);
        setInputValueMedio(`R$${valorMedio}`);
        setInputValueCreditoGreenneat(`R$${10}`)
        valores = [precoOleoVirgem, precoOleoUsado, valorCreditoGreenneat];
        Grafico()
      })
      .catch(error => {
        console.error("Erro ao buscar valores:", error);
      });
  };
  const botaoNordesteClick = () => {
    fetch('http://localhost:3001/selectComparador/Nordeste')
      .then(response => response.json())
      .then(data => {
        const precoOleoVirgem = parseFloat(data.preco_oleo_virgem);
        const precoOleoUsado = parseFloat(data.preco_oleo_usado);
        const valorMedio = parseFloat(data.valor_medio);
        const valorCreditoGreenneat = 10;

        setInputValueVirgem(`R$${precoOleoVirgem}`);
        setInputValueFritura(`R$${precoOleoUsado}`);
        setInputValueMedio(`R$${valorMedio}`);
        setInputValueCreditoGreenneat(`R$${10}`)
        valores = [precoOleoVirgem, precoOleoUsado, valorCreditoGreenneat];
        Grafico()
      })
      .catch(error => {
        console.error("Erro ao buscar valores:", error);
      });
  };
  const botaoCentroOesteClick = () => {
    fetch('http://localhost:3001/selectComparador/Centro-Oeste')
      .then(response => response.json())
      .then(data => {
        const precoOleoVirgem = parseFloat(data.preco_oleo_virgem);
        const precoOleoUsado = parseFloat(data.preco_oleo_usado);
        const valorMedio = parseFloat(data.valor_medio);
        const valorCreditoGreenneat = 10;
  
        setInputValueVirgem(`R$${precoOleoVirgem}`);
        setInputValueFritura(`R$${precoOleoUsado}`);
        setInputValueMedio(`R$${valorMedio}`);
        setInputValueCreditoGreenneat(`R$${10}`)
        valores = [precoOleoVirgem, precoOleoUsado, valorCreditoGreenneat];
        Grafico()
        
      })
      .catch(error => {
        console.error("Erro ao buscar valores:", error);
      });
  };

  //===========================FIM DO GRUPO DE BOTÕES DE REGIÕES DO BRASIL===============================================

  return (
    <>
      <Row>
        <NavbarAdministrador />
      </Row>
      <Row className="" style={{ width: "flex", alignContent: "center" }}>
        <Container
          style={{ alignItems: "center", marginTop: "2%", padding: "2%" }}
        >
          <Row>
            <Col sm={3} style={{ textAlign: "center", paddingTop: "2%" }}>
              <Form.Label
                className="campos-textos"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h5>Região</h5>
              </Form.Label>
              <Button
                size="lg"
                style={{ width: "100%", marginBottom: "2%", marginLeft: "1%" }}
                className="botao"
                id="BotaoRegiaoNorte"
                onClick={botaoNorteClick}
              >
                Norte
              </Button>
              <Button
                size="lg"
                style={{ width: "100%", marginBottom: "2%", marginLeft: "1%" }}
                className="botao"
                id="BotaoRegiaoSul"
                onClick={botaoSulClick}
              >
                Sul
              </Button>
              <Button
                size="lg"
                style={{ width: "100%", marginBottom: "2%", marginLeft: "1%" }}
                className="botao"
                id="BotaoRegiaoSuldeste"
                onClick={botaoSuldesteClick}
              >
                Suldeste
              </Button>
              <Button
                size="lg"
                style={{ width: "100%", marginBottom: "2%", marginLeft: "1%" }}
                className="botao"
                id="BotaoRegiaoCentroOeste"
                onClick={botaoCentroOesteClick}
              >
                Centro-oeste
              </Button>
              <Button
                size="lg"
                style={{ width: "100%", marginBottom: "2%", marginLeft: "1%" }}
                className="botao"
                id="BotaoNordeste"
                onClick={botaoNordesteClick}
              >
                Nordeste
              </Button>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Form.Group controlId="card-preco-oleo-virgem">
                    <Form.Label
                      className="campos-textos"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h5>Óleo Virgem</h5>
                    </Form.Label>
                    <Form.Control
                      placeholder="R$5,00/L"
                      type="text"
                      name="preco-oleo-virgem"
                      className="cor-cards fontes-precos"
                      id="valorOleoVirgem"
                      value={inputValueVirgem}
                      onChange={handleInputChange}
                      disabled
                      readOnly
                      style={{
                        height: "10vh",
                        textAlign: "center",
                        fontSize: "1.8em",
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="card-preco-oleo-fritura">
                    <Form.Label
                      className="campos-textos "
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h5>Óleo de Fritura</h5>
                    </Form.Label>
                    <Form.Control
                      placeholder="R$5,99"
                      type="preco-oleo-fritura"
                      name="preco-oleo-fritura"
                      className="cor-cards fontes-precos"
                      id="valorOleoFritura"
                      value={inputValueFritura}
                      disabled
                      readOnly
                      style={{
                        height: "10vh",
                        textAlign: "center",
                        fontSize: "1.8em",
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="card-preco-credito-greenneat">
                    <Form.Label
                      className="campos-textos"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h5>Crédito Greenneat</h5>
                    </Form.Label>
                    <Form.Control
                      placeholder="$2,49/L"
                      type="preco-credito-greenneat"
                      name="preco-credito-greenneat"
                      className="cor-cards fontes-precos"
                      id="valorCreditoGreenneat"
                      value={inputValueCreditoGreenneat}
                      disabled
                      readOnly
                      style={{
                        height: "10vh",
                        textAlign: "center",
                        fontSize: "1.8em",
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col
                  sm={6}
                  className="size-grafic-bar"
                  style={{ marginTop: "2%", alignContent: "center" }}
                >
                  <Grafico />
                </Col>
                <Col style={{ marginTop: "2%", minWidth: "45vh" }}>
                  <Form.Group controlId="card-preco-preco-medio">
                    <Form.Label
                      className="campos-textos"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        height: "11vh",
                        margin: ""
                      }}
                    >
                      <Row style={{marginTop:"3%"}}>
                        <Col>
                          <h5>Preço Médio</h5>
                          <p>{labelRegiao}</p>
                        </Col>
                      </Row>


                    </Form.Label>
                    <Form.Control
                      placeholder="$2,49/L"
                      type="preco-credito-greenneat"
                      name="preco-credito-greenneat"
                      className="cor-cards fontes-precos"
                      id="valorPrecoMedio"
                      value={inputValueMedio}
                      disabled
                      readOnly
                      style={{
                        height: "35vh",
                        textAlign: "center",
                        fontSize: "4.2em",
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Row>
      <Footer />
    </>
  );
}

export default ComparadorPrecos;

