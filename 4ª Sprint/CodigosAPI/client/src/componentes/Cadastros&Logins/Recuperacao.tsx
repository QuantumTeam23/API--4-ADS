import '../styles/Recuperacao.css';
import React, { ChangeEvent, useState } from 'react';
import { Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

interface FormDataRec {
    email: string;
    showEmptyFieldsAlert: boolean;
    enviado: boolean;
}

function Recuperacao() {
    const [formDataRec, setFormDataRec] = useState<FormDataRec>({
        email: '',
        showEmptyFieldsAlert: false,
        enviado: false,
    });

    const { email, showEmptyFieldsAlert, enviado } = formDataRec;

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setFormDataRec((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (email === '') {
            setFormDataRec((prevState) => ({
                ...prevState,
                showEmptyFieldsAlert: true,
            }));

            setTimeout(() => {
                setFormDataRec((prevState) => ({
                    ...prevState,
                    showEmptyFieldsAlert: false,
                }));
            }, 5000);
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/enviarToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

            if (response.status === 200) {
                const responseData = await response.json();
                const { token } = responseData;
                console.log('Token enviado com sucesso!', token);

                localStorage.setItem('email', email);
                setFormDataRec((prevState) => ({
                    ...prevState,
                    enviado: true,
                }));


                setTimeout(() => {
                    window.location.href = "/token";
                }, 100);
            } else {
                console.error('Erro ao cadastrar parceiro:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao cadastrar parceiro:', error);
        }
    };


    return (
        <div className='container-geral-recuperacao'>
            <div className="container-janela-recuperacao">
                <div className='container-esquerda-recuperacao'>
                    <img className='logo-recuperacao' src="logo-greenneat.png" alt="" />
                </div>
                <div className='container-direita-recuperacao'>
                    <span className='titulo-recuperacao'>
                        <h1>Recuperação de senha</h1>
                    </span>
                    <Container>
                        {showEmptyFieldsAlert && (
                            <Alert variant="danger">Preencha o campo do formulário.</Alert>
                        )}
                        {enviado && (
                            <Alert variant="success">Token enviado com sucesso!</Alert>
                        )}
                        <div className='campo-recuperacao'>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId='email'>
                                    <Form.Label>E-mail</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type='email'
                                            name='email'
                                            value={email}
                                            required
                                            placeholder='Digite seu e-mail'
                                            aria-label='E-mail'
                                            aria-describedby='email-addon'
                                            className='form-control-recuperacao'
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                                        />
                                    </InputGroup>
                                    <h3>Enviaremos um código de verificação a este e-mail se corresponder a uma conta da Greenneat.</h3>
                                </Form.Group>
                                <div className='volta-login-recuperacao'>
                                    <span className='botao-recuperacao'>
                                        <Button type="submit" variant="success">Confirmar</Button>
                                    </span>
                                    <p>Voltar para a página de <a href="/login">Login</a></p>
                                </div>
                            </Form>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default Recuperacao;