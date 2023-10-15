import '../styles/Usuario.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Usuario() {
    return (
        <div className='container-geral-user'>
            <div className="container-janela-user">
                <div className='container-esquerda-user'>
                    <span className='logo-user'><img src="logo-greenneat.png" alt="" /></span>
                </div>
                <div className='container-direita-user'>
                    <div>
                        <span className='titulo-user'>
                            <h1>Usuário</h1>
                        </span>
                    </div>
                    <div className='subtitulo-user'>
                        <h3>Selecione o tipo de usuário</h3>
                    </div>
                    <span className='botao-usuario-user-1'>
                        <Link to="/cadastro-parceiro">
                            <Button variant="success">Parceiro Greenneat</Button>
                        </Link>
                    </span>
                    <span className='botao-usuario-user-2'>
                        <Link to="/cadastro-estabelecimento">
                            <Button variant="success">Estabelecimento</Button>
                        </Link>
                    </span>
                    <div className='volta-login-user'>
                        <p>Voltar para a página de <a href="/login">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Usuario;