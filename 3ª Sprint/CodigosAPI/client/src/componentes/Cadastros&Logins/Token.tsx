import '../styles/Token.css';
import { Alert, Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

function Token() {
    const [token, setToken] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showEmptyFieldAlert, setShowEmptyFieldAlert] = useState(false);
    const [alertText, setAlertText] = useState('');

    const validaCampos = () => {
        let vazio = false
    
        if (token === "") {
          vazio = true
          return vazio
        }
    }

    const handleLogout = () => {
        localStorage.clear();
    };


    const handleReenviarToken = async () => {
        try {
            const email = localStorage.getItem('email')
            const response = await fetch('http://localhost:3001/enviarToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

            if ((await response).status === 200) {
                const responseData = await response.json();
                const { token } = responseData; 
                console.log('Token Reenviado com sucesso!', token);
            } else {
                console.error('Erro ao cadastrar parceiro:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao cadastrar parceiro:', error);
        }
    }

    const handleSubmit = async (event: any) => {
        
        if (!validaCampos()) {
            event.preventDefault()

            const emailEDIT = localStorage.getItem('email')

            fetch(`http://localhost:3001/verifica-email/${emailEDIT}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              if (data.idParceiro !== null) {
                localStorage.setItem('idUser', data.idParceiro);
                localStorage.setItem('tipo', 'Parceiro')
              } else if (data.idEstabelecimento !== null) {
                localStorage.setItem('idUser', data.idEstabelecimento);
                localStorage.setItem('tipo', 'Estabelecimento')
              }
            })
            .catch(error => {
              console.error('Erro ao buscar dados do parceiro:', error);
            });

            try {
                const response = await fetch('http://localhost:3001/VerificarToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });
    
                if (response.ok) {
                    setAlertText('Token válido.')
                    setShowSuccessAlert(true);

                    setTimeout(() => {
                        window.location.href = "/editar-senha";
                    }, 1100);
        
                    localStorage.setItem('validacao', 'Validado');
                } if (response.status === 401) {
                    setAlertText('Token inválido ou expirado.');
                    setShowErrorAlert(true);
                }
            } catch (error) {
                console.error('Erro ao verificar o token:', error);
            }
        } else {
            setAlertText('Preencha o campo.');
            setShowErrorAlert(true);
        }
    };

    return (
        <div className='container-geral-token'>
            <div className="container-janela-token">
                <div className='container-esquerda-token'>
                    <span className='logo-token'><img src="logo-greenneat.png" alt="" /></span>
                </div>
                <div className='container-direita-token'>
                    <div>
                        <span className='titulo-token'>
                            <h1>TOKEN</h1>
                        </span>
                    </div>
                    <Container>
                    {showSuccessAlert && (
                        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                            <p>{alertText}</p>
                        </Alert>
                        )}

                        {showErrorAlert && (
                        <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                            <p>{alertText}</p>
                        </Alert>
                        )}

                        {showEmptyFieldAlert && (
                        <Alert variant="warning" onClose={() => setShowEmptyFieldAlert(false)} dismissible>
                            <p>{alertText}</p>
                        </Alert>
                        )}
                        <div className='campo-token'>
                            <Form.Group controlId='email'>
                                <Form.Label>Insira o TOKEN</Form.Label>
                                <InputGroup >
                                    <FormControl
                                        type='text'
                                        value={token}
                                        required
                                        placeholder='Digite seu TOKEN'
                                        aria-label='Token'
                                        aria-describedby='email-addon'
                                        className='form-control-token'
                                        onChange={(e) => setToken(e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <span className='botao-token'>
                        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>{' '}
                    </span>
                    <span className='botao-reenviar-token'>
                        <Button variant="secundary" onClick={handleReenviarToken}>Reenviar token</Button>{' '}
                    </span>
                    <div className='volta-login-token'>
                        <p>Voltar para a página de <a href="/login" onClick={handleLogout}>Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Token;