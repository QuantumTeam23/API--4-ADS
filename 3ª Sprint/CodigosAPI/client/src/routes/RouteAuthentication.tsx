import { Link } from 'react-router-dom'


export function PrivateRouteAdmin({ children }: { children: React.ReactNode }) {
    const dados = {
        id: localStorage.getItem('id_usuario'),
        tipo: localStorage.getItem('tipo')
    }

    if (dados.tipo === "Administrador") {
        return <>{children}</>
    } else {
        return (
            <div>
              <p>Você precisa estar logado como administrador para acessar esta página.</p>
              <Link to="/login">Ir para a página de login</Link>
            </div>
        );
    }
}

export function PrivateRouteParceiro({ children }: { children: React.ReactNode }) {
    const dados = {
        id: localStorage.getItem('id_usuario'),
        tipo: localStorage.getItem('tipo')
    }

    if (dados.tipo === "ComumParceiro") {
        return <>{children}</>
    } else {
        return (
            <div>
              <p>Você precisa estar logado como parceiro para acessar esta página.</p>
              <Link to="/login">Ir para a página de login</Link>
            </div>
        );
    }
}

export function PrivateRouteEstabelecimento({ children }: { children: React.ReactNode }) {
    const dados = {
        id: localStorage.getItem('id_usuario'),
        tipo: localStorage.getItem('tipo')
    }

    if (dados.tipo === "ComumEstabelecimento") {
        return <>{children}</>
    } else {
        return (
            <div>
              <p>Você precisa estar logado como estabelecimento para acessar esta página.</p>
              <Link to="/login">Ir para a página de login</Link>
            </div>
        );
    }
}

export function PrivateRouteToken({ children }: { children: React.ReactNode }){
    const data = {
        email: localStorage.getItem('email'),
    }

    if (data.email !== null) {
        return <>{children}</>
    } else {
        return (
            <div>
              <p>Você precisa fornecer o seu e-mail para acessar essa página.</p>
              <Link to="/recuperacao">Ir para a página de recuperação de conta.</Link>
            </div>
        );
    }

}

export function PrivateRouteEditarUsuario({ children }: { children: React.ReactNode }){
    const data = {
        tipo: localStorage.getItem('tipo'),
    }

    if (data.tipo !== null) {
        return <>{children}</>
    } else {
        return (
            <div>
              <p>Você precisa estar logado para acessar essa página.</p>
              <Link to="/login">Ir para a página de login.</Link>
            </div>
        );
    }

}

export function PrivateRouteEditarSenha({ children }: { children: React.ReactNode }){
    const data = {
        email: localStorage.getItem('email'),
        validacao: localStorage.getItem('validacao')
    }

    if (data.email !== null && data.validacao !== null) {
        return <>{children}</>
    } else {
        return (
            <div>
              <p>Você precisa fornecer o seu e-mail e o Token de segurança para acessar essa página.</p>
              <Link to="/recuperacao">Ir para a página de recuperação de conta.</Link>
            </div>
        );
    }
}

export function PrivateRouteCredito({ children }: { children: React.ReactNode }) {
    const dados = {
        id: localStorage.getItem('id_usuario'),
        tipo: localStorage.getItem('tipo')
    }

    if (dados.tipo === "ComumParceiro") {
        return <>{children}</>
    } else {
        return (
            <div>
              <p>Você precisa estar logado como parceiro para acessar esta página.</p>
              <Link to="/login">Ir para a página de login</Link>
            </div>
        );
    }
}