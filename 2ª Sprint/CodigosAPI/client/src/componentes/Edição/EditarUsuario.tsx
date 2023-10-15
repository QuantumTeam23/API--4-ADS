import React, { useEffect, useState } from 'react';
import '../styles/EditarUsuario.css';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import eyeIconOpen from '../Imagens/close.png';
import eyeIconClose from '../Imagens/open.png';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditarUsuario() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [dadosOriginais, setDadosOriginais] = useState({});
    const [usuarioDados, setUsuarioDados] = useState({
        email: '',
        senha: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        regiao: '',
        cidadesAtende: ''
    });
    

    useEffect(() => {
        const DadosParceiro = localStorage.getItem('parceiroData');
        const DadosEstabelecimento = localStorage.getItem('estabelecimentoData');
        if (DadosParceiro !== null) {
            try {
                const parsedData = JSON.parse(DadosParceiro);
                setUsuarioDados(parsedData);
                setDadosOriginais(parsedData);
            } catch (error) {
                console.error('Erro ao analisar os dados do localStorage:', error);
            }
        } else if (DadosEstabelecimento !== null) {
            try {
                const parsedData = JSON.parse(DadosEstabelecimento);
                setUsuarioDados(parsedData);
                setDadosOriginais(parsedData);
            } catch (error) {
                console.error('Erro ao analisar os dados do localStorage:', error);
            }
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUsuarioDados((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleBack = () => {

        if (localStorage.getItem('idParceiro') !== null) {
            setTimeout(() => {
                navigate('/painel-parceiro-historico-compra');
            }, 500);
            localStorage.removeItem('parceiroData')
        } else {
            setTimeout(() => {
                navigate('/painel-estabelecimento-historico-compras');
            }, 50);
            localStorage.removeItem('estabelecimentoData')
        }
    }

    const msgSucessoPost = () => {
        Swal.fire({
          title: "Sucesso",
          html: "Informações alteradas com sucesso.",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: '#de940a',
          customClass: {
            container: 'swal-container',
          },
        })
    }

    const backEdit = () => {
        navigate('/painel-parceiro-historico-compra')
    }

    const backEditEstab = () => {
        navigate('/painel-estabelecimento-historico-compras')
    }

    const handleEdit = () => {
        const idParceiro = localStorage.getItem('idParceiro')
        const idEstabelecimento = localStorage.getItem('idEstabelecimento')

        const dadosEditados = usuarioDados;
        const dadosMudaram = JSON.stringify(dadosEditados) !== JSON.stringify(dadosOriginais);


        if (dadosMudaram) {
            if (idParceiro !== null) {
                fetch(`http://localhost:3001/editar-usuario-comum-parceiro/${idParceiro}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ usuarioDados }),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro ao editar dados');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Dados editados com sucesso:', data);
                    })
                    .catch(error => {
                        console.error('Erro ao editar dados:', error);
                    });
    
                    backEdit()
                    msgSucessoPost()
            }
             else {
                fetch(`http://localhost:3001/editar-usuario-comum-estabelecimento/${idEstabelecimento}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ usuarioDados }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao editar dados');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Dados editados com sucesso:', data);
                })
                .catch(error => {
                    console.error('Erro ao editar dados:', error);
                });
    
                backEditEstab()
                msgSucessoPost()
            }
        } else {
            Swal.fire({
                title: 'Alerta',
                html: 'Forneça os novos dados.',
                icon: 'warning',
                confirmButtonColor: '#de940a'
            })
        }
    };

    const userType = localStorage.getItem('tipo')

    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
    };
    
    const passwordInputType = showPassword ? "text" : "password";
    const passwordIconSrc = showPassword ? eyeIconOpen : eyeIconClose;


    return (
        <div className='container-geral-editar-usuario'>
            <div className="container-janela-editar-usuario">
                <div className='container-direita-editar-usuario'>
                    <div className='titulo-editar-usuario'>
                        <h1>Editar Usuário</h1>
                    </div>
                    <div className='campos-editar-usuario'>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='email'
                                        required
                                        placeholder='Digite seu email'
                                        aria-label='email'
                                        aria-describedby='email-addon'
                                        className='form-control-editar-usuario'
                                        defaultValue={usuarioDados.email}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='senha'>
                                <Form.Label>Senha</Form.Label>
                                <InputGroup className='campo-senha'>
                                    <FormControl
                                        type={passwordInputType}
                                        required
                                        placeholder='Digite sua Senha'
                                        aria-label='senha'
                                        aria-describedby='senha-addon'
                                        className='form-control-editar-usuario'
                                        defaultValue={usuarioDados.senha}
                                        onChange={handleInputChange}
                                    />
                                <img src={passwordIconSrc} alt="eye icon" className='eyeIcon' onClick={showPasswordHandler}/>
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='logradouro'>
                                <Form.Label>Logradouro</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite seu logradouro'
                                        aria-label='logradouro'
                                        aria-describedby='logradouro-addon'
                                        className='form-control-editar-usuario'
                                        defaultValue={usuarioDados.logradouro}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='numero'>
                                <Form.Label>Número</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite o número'
                                        aria-label='numero'
                                        aria-describedby='numero-addon'
                                        className='form-control-editar-usuario'
                                        defaultValue={usuarioDados.numero}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='bairro'>
                                <Form.Label>Bairro</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite o bairro'
                                        aria-label='bairro'
                                        aria-describedby='bairro-addon'
                                        className='form-control-editar-usuario'
                                        defaultValue={usuarioDados.bairro}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='cidade'>
                                <Form.Label>Cidade</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite a cidade'
                                        aria-label='cidade'
                                        aria-describedby='cidade-addon'
                                        className='form-control-editar-usuario'
                                        defaultValue={usuarioDados.cidade}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='estado'>
                                <Form.Label>Estado</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite o estado'
                                        aria-label='estado'
                                        aria-describedby='estado-addon'
                                        className='form-control-editar-usuario'
                                        defaultValue={usuarioDados.estado}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='cep'>
                                <Form.Label>CEP</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite o CEP'
                                        aria-label='cep'
                                        aria-describedby='cep-addon'
                                        className='form-control-editar-usuario'
                                        defaultValue={usuarioDados.cep}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='campo-editar-usuario'>
                            <Form.Group controlId='regiao'>
                                <Form.Label>Região</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        required
                                        placeholder='Digite a região'
                                        aria-label='regiao'
                                        aria-describedby='regiao-addon'
                                        className='form-control-editar-usuario'
                                        defaultValue={usuarioDados.regiao}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </div>
                        {userType === 'ComumParceiro' && (
                            <div className='campo-editar-usuario'>
                                <Form.Group controlId='cidadesAtende'>
                                    <Form.Label>Cidades em que atende</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type='text'
                                            required
                                            placeholder='Digite as cidades em que atende'
                                            aria-label='cidadesAtende'
                                            aria-describedby='regiao-addon'
                                            className='form-control-editar-usuario'
                                            defaultValue={usuarioDados.cidadesAtende}
                                            onChange={handleInputChange}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </div>
                        )}
                    </div>
                    <div className='botoes-editar-usuario'>
                        <Button variant="danger" onClick={handleBack}>Cancelar</Button>
                        <Button variant="success" onClick={handleEdit}>Editar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarUsuario;