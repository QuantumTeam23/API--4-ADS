import { useState } from 'react';
import '../styles/Login.css';
import { Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import eyeIconOpen from '../Imagens/close.png';
import eyeIconClose from '../Imagens/open.png';
import Swal from "sweetalert2";

function Login() {
    const [email, setEmail] = useState("" as any);
    const [password, setPassword] = useState("" as any);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const validaCampos = () => {
        let vazio = false
    
        if (email === "" || password === "") {
          vazio = true
          return vazio
        }
    }
    
    function msgValidaCampos() {
        Swal.fire({
            title: 'Alerta',
            html: 'Preencha todos os campos.',
            icon: 'warning',
            confirmButtonColor: '#de940a'
        })
    }
    

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        if (!validaCampos()) {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),

            })
            const data = await response.json()

            if (data.msg === "Parceiro logado com sucesso." && data.idParceiro !== null) {
                Swal.fire({
                    title: "Sucesso",
                    icon: 'success',
                    text: 'Usuário autenticado com sucesso',
                    confirmButtonColor: '#de940a'
                })
                setTimeout(() => {
                    navigate('/painel-parceiro-historico-compra');
                }, 1100);
                localStorage.setItem('tipo', 'ComumParceiro')
                localStorage.setItem('idParceiro', data.idParceiro)
            }

            else if (data.msg === "Estabelecimento logado com sucesso." && data.idEstabelecimento !== null) {
                Swal.fire({
                    title: "Sucesso",
                    icon: 'success',
                    text: 'Usuário autenticado com sucesso',
                    confirmButtonColor: '#de940a'
                })
                setTimeout(() => {
                    navigate('/painel-estabelecimento-historico-compras');
                }, 1100);
                localStorage.setItem('tipo', 'ComumEstabelecimento')
                localStorage.setItem('idEstabelecimento', data.idEstabelecimento)
            }

            else if (data.msg === "Administrador logado com sucesso." && data.idAdministrador !== null) {
                Swal.fire({
                    title: "Sucesso",
                    icon: 'success',
                    text: 'Usuário autenticado com sucesso',
                    confirmButtonColor: '#de940a'
                })
                setTimeout(() => {
                    navigate('/painel-administrador-usuario');
                }, 1100);
                localStorage.setItem('tipo', 'Administrador')
                localStorage.setItem('idAdministrador', data.idAdministrador)
            } else if (data.msg === "Usuário não encontrado") {
                Swal.fire({
                    title: "Erro",
                    icon: 'error',
                    text: 'Usuário não cadastrado no sistema',
                    confirmButtonColor: '#de940a'
                })
                setTimeout(() => {
                    navigate('/login');
                }, 1100); 
            } else {
                Swal.fire({
                    title: "Erro",
                    icon: 'error',
                    text: 'Email ou senha incorretos',
                    confirmButtonColor: '#de940a'
                })
            }
        } else {
            msgValidaCampos()
        }
    }


    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
      };
    
    const passwordInputType = showPassword ? "text" : "password";
    const passwordIconSrc = showPassword ? eyeIconOpen : eyeIconClose;



    return (
        <div className='container-geral-login'>
            <div className="container-janela-login">
                <div className='container-esquerda-login'>
                    <span className='logo-login'><img src="logo-greenneat.png" alt="" /></span>
                </div>
                <div className='container-direita-login'>
                    <div>
                        <span className='titulo-login'>
                            <h1>Acesse a Plataforma</h1>
                        </span>
                    </div>
                    <div className='subtitulo-login'>
                        <h3>Faça login ou registre-se para acessar <p>nossa plataforma</p></h3>
                    </div>
                    <Container>
                        <div className='campo-login-1'>
                            <Form.Group controlId='email' >
                                <Form.Label>E-mail</Form.Label>
                                <InputGroup className='campo-login'>
                                    <FormControl
                                        type='email'
                                        required
                                        placeholder='Digite seu e-mail'
                                        aria-label='E-mail'
                                        aria-describedby='email-addon'
                                        className='form-control-login-1'
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <Container>
                        <div className='campo-login-2'>
                            <Form.Group controlId='senha'>
                                <Form.Label>Senha</Form.Label>
                                <InputGroup className='campo-login'>
                                    <FormControl
                                        type={passwordInputType}
                                        required
                                        placeholder='Digite sua senha'
                                        aria-label='Senha'
                                        aria-describedby='senha-addon'
                                        className='form-control-login-2'
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                    <img src={passwordIconSrc} alt="eye icon" className='eyeIcon' onClick={showPasswordHandler}/>
                                </InputGroup>
                            </Form.Group>
                        </div>
                    </Container>
                    <div className='esqueceu-senha-login'>
                        <a href="/recuperacao">Esqueceu a senha?</a>
                    </div>
                    <span className='botao-login'>
                    <Button variant="success" onClick={handleSubmit}>Entrar</Button>{' '}
                    </span>
                    <div className='registro-login'>
                        <p>Ainda não tem conta? <a href="/usuario">Registre-se</a></p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;