import '../styles/CadastroEstabelecimento.css';
import { Form, FormControl,  } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ChangeEvent, useEffect, useState,  } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

interface FormDataEstab {

  razao_social: string;
  nome_fantasia: string;
  email: string;
  senha: string;
  cnpj: string;
  logradouro: string;
  logradouroNumero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  regiao: string;
  telefone: string;
  tipo: string;
  showEmptyFieldsAlert: boolean;
  cadastrado: boolean;
  cnpjEmUso: boolean;
}



function CadastroEstabelecimento() {
    const [step, setStep] = useState(1);
    const [emptyFields, setEmptyFields] = useState<string[]>([]);
    const [formDataEstab, setFormDataEstab] = useState<FormDataEstab>({
      razao_social: '',
      nome_fantasia: '',
      email: '',
      senha: '',
      cnpj: '',
      logradouro: '',
      logradouroNumero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      regiao: '',
      telefone: '',
      tipo: '',
      showEmptyFieldsAlert: false,
      cadastrado: false,
      cnpjEmUso: false,
    });

    const {
      razao_social,
      nome_fantasia,
      email,
      senha,
      cnpj,
      logradouro,
      logradouroNumero,
      bairro,
      cidade,
      estado,
      cep,
      regiao,
      telefone,
      tipo,
      showEmptyFieldsAlert,
      cnpjEmUso,
    } = formDataEstab;
  
  
    const fieldsPerStep = 5;
    const [showFields, setShowFields] = useState(true);
    const navigate = useNavigate()
    const [emailInUse, setEmailInUse] = useState(false);
    const fieldMappings: Record<string, string> = {
      'campo-0': 'razao_social',
      'campo-1': 'nome_fantasia',
      'campo-2': 'email',
      'campo-3': 'senha',
      'campo-4': 'cnpj',
      'campo-5': 'logradouro',
      'campo-6': 'logradouroNumero',
      'campo-7': 'bairro',
      'campo-8': 'cidade',
      'campo-9': 'estado',
      'campo-10': 'cep',
      'campo-11': 'regiao',
      'campo-12': 'telefone',
      'campo-13': 'tipo',
    };
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const fieldName = fieldMappings[name] || name;
  
      setFormDataEstab((prevState) => ({ ...prevState, [fieldName]: value }));
    };

    useEffect(() => {
      localStorage.setItem('formDataEstab', JSON.stringify(formDataEstab));
    }, [formDataEstab]);

    const handleLogout = () => {
      localStorage.clear();
    };

    type FormDataKey = keyof FormDataEstab;

    const isStepFormValid = () => {
      const startIndex = (step - 1) * fieldsPerStep;
      const endIndex = Math.min(startIndex + fieldsPerStep, 15);
  
      const emptyFieldsInStep: string[] = [];
  
      for (let i = startIndex; i < endIndex; i++) {
        const fieldName = fieldMappings[`campo-${i}`] as FormDataKey;
        if (!formDataEstab[fieldName]) {
          emptyFieldsInStep.push(fieldName);
        }
      }
  
      setEmptyFields(emptyFieldsInStep);
  
      return emptyFieldsInStep.length === 0;
    }
    
    const handleNextStep = () => {
        if (step * fieldsPerStep < 15) {
          setStep(step + 1);
          setShowFields(false);
          setTimeout(() => {
            setShowFields(true);
          }, 250);
        } else {
          console.log('Formulário enviado:', formDataEstab);

        }
    };

    const handlePreviousStep = () => {
      if (step > 1) {
        setStep(step - 1);
        setShowFields(false);
        setTimeout(() => {
          setShowFields(true);
        }, 250);
      }
    };

    const handleSubmit = async () => {
      if (!isFormValid()) {
        setFormDataEstab({ ...formDataEstab, showEmptyFieldsAlert: true });
        return; 
      }

      const emailCheckResponse = await fetch('http://localhost:3001/checkEmailEstabelecimento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });
    
      if (emailCheckResponse.status === 409) {
        console.log('Email já está em uso.');
        setEmailInUse(true);
        setTimeout(() => {
          setEmailInUse(false);
        }, 5000);
        return;
      }
      try {
        const response = await fetch('http://localhost:3001/addEstabelecimento', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razao_social,
            nome_fantasia,
            email,
            senha,
            cnpj,
            logradouro,
            logradouroNumero,
            bairro,
            cidade,
            estado,
            cep,
            regiao,
            telefone,
            tipo,
          }),
        });
  
        if (response.status === 200) {
          Swal.fire({
            title: 'Sucesso',
            html: 'Cadastro realizado com sucesso.',
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: "Ir para Login",
            confirmButtonColor: '#de940a'
          }).then(() => (navigate('/login')))
        }  else if (response.status === 409) {
          console.log('Existe um estabelecimento com esse CNPJ.');
          setFormDataEstab({ ...formDataEstab, cnpjEmUso: true });
          console.log('cnpjEmUso:', formDataEstab.cnpjEmUso);
          setTimeout(() => {
            setFormDataEstab((prevState) => ({
              ...prevState,
              cnpjEmUso: false,
            }));
          }, 5000);
        } else {
          console.error('Erro ao cadastrar estabelecimento:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao cadastrar estabelecimento:', error);
      }
  
      console.log('Formulário enviado:', formDataEstab);
    };

    const isFormValid = () => {
      return (
        razao_social !== '' &&
        nome_fantasia !== '' &&
        email !== '' &&
        senha !== '' &&
        cnpj !== '' &&
        logradouro !== '' &&
        logradouroNumero !== '' &&
        bairro !== '' &&
        cidade !== '' &&
        estado !== '' &&
        cep !== '' &&
        regiao !== '' &&
        tipo !== ''
      );
    };
  
    const renderInputs = () => {
      const startIndex = (step - 1) * fieldsPerStep;
      const endIndex = Math.min(startIndex + fieldsPerStep, 14);
      const inputFields = [];
  
      for (let i = startIndex; i < endIndex; i++) {
        let label = '';
        let placeholder = '';
        let name = '';
        let type = '';
        let value;
        switch (i) {
          case 0:
            label = 'Razão Social/Nome do responsável';
            placeholder = 'Digite a Razão Social/Nome do responsável';
            name = 'razao_social';
            value = formDataEstab.razao_social || '';
            break;
          case 1:
            label = 'Nome Fantasia';
            placeholder = 'Digite o Nome Fantasia';
            name = 'nome_fantasia';
            value = formDataEstab.nome_fantasia || '';
            break;
          case 2:
            label = 'Email';
            placeholder = 'Digite o Email';
            name = 'email';
            type = 'email';
            value = formDataEstab.email || '';
            break;
          case 3:
            label = 'Senha';
            placeholder = 'Digite a Senha';
            name = 'senha';
            type = 'password'
            value = formDataEstab.senha || '';
            break;
          case 4:
            label = 'CNPJ/CPF';
            placeholder = 'Digite o CNPJ/CPF';
            name = 'cnpj';
            value = formDataEstab.cnpj || '';
            break;
          case 5:
            label = 'Logradouro';
            placeholder = 'Digite o Logradouro';
            name = 'logradouro';
            value = formDataEstab.logradouro || '';
            break;
          case 6:
            label = 'Número';
            placeholder = 'Digite o Número';
            name = 'logradouroNumero';
            value = formDataEstab.logradouroNumero || '';
            break;
          case 7:
            label = 'Bairro';
            placeholder = 'Digite o Bairro';
            name = 'bairro';
            value = formDataEstab.bairro || '';
            break;
          case 8:
            label = 'Cidade';
            placeholder = 'Digite a Cidade';
            name = 'cidade';
            value = formDataEstab.cidade || '';
            break;
          case 9:
            label = 'Estado';
            placeholder = 'Digite o Estado';
            name = 'estado';
            value = formDataEstab.estado || '';
            break;
          case 10:
            label = 'CEP';
            placeholder = 'Digite o CEP';
            name = 'cep';
            value = formDataEstab.cep || '';
            break;
          case 11:
            label = 'Região';
            placeholder = 'Digite a Região';
            name = 'regiao';
            value = formDataEstab.regiao || '';
            break;
          case 12:
            label = 'Telefone';
            placeholder = 'Digite o Telefone';
            name = 'telefone';
            value = formDataEstab.telefone || '';
            break;
          case 13:
            label = 'Tipo';
            name = 'tipo';
            value = formDataEstab.tipo || '';
            break;
          default:
            break;
        }
  
        if (i === 13) {
          inputFields.push(
            <Form.Group key={i} controlId={`campo-${i}`}>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                as='select'
                name={`campo-${i}`}
                required
                className='form-control-cadastro-estabelecimento'
                onChange={handleInputChange}
                value={value}
              >
                <option value=''>Selecione o tipo</option>
                <option value='Cooperativas'>Cooperativas</option>
                <option value='Profissional individual'>Profissional individual</option>
                <option value='Reciclagem'>Reciclagem</option>
                <option value='Restaurantes'>Restaurantes</option>
                <option value='Condomínio'>Condomínio</option>
                <option value='Residência'>Residência</option>
                <option value='Estabelecimento em geral'>Estabelecimento em geral</option>
                <option value='Outros'>Outros</option>
              </Form.Control>
            </Form.Group>
          );
        } else {
          inputFields.push(
            <Form.Group key={i} controlId={`campo-${i}`}>
              <Form.Label>{label}</Form.Label>
              <FormControl
                type={type}
                name={`campo-${i}`}
                required
                placeholder={placeholder}
                className='form-control-cadastro-estabelecimento'
                onChange={handleInputChange}
                value={value}
              />
            </Form.Group>
          );
        }
      }
  
      return inputFields.map((field, index) => (
            <div key={index} className={`form-group-transition ${showFields ? '' : 'hidden'}`}>
            {field}
            </div>
        ));
    };
  
    return (
      <div className='container-geral-cadastro-estabelecimento'>
        <div className='container-janela-cadastro-estabelecimento'>
          <div className='container-esquerda-cadastro-estabelecimento'>
            <span className='logo-cadastro-estabelecimento'>
              <img src='logo-greenneat.png' alt='' />
            </span>
          </div>
          <div className='container-direita-cadastro-estabelecimento'>
          {emptyFields.length > 0 && (
            <Alert variant="danger">
              Preencha todos os campos para prosseguir.
            </Alert>
          )}
          {showEmptyFieldsAlert && (
            <Alert variant="danger">Preencha todos os campos para finalizar o cadastro</Alert>
          )}
          {cnpjEmUso && (
            <Alert variant="danger">Já existe um parceiro com esse cnpj.</Alert>
          )}
          {emailInUse && (
            <Alert variant="danger">Já existe um usuário com esse email.</Alert>
          )}<div>
              <span className='titulo-cadastro-estabelecimento'>
                <h1>Cadastro Estabelecimento</h1>
              </span>
            </div>
            <div className='campo-cadastro-estabelecimento'>
              {renderInputs()}
            </div>
            <div className='botao-cadastro-estabelecimento'>
            {step > 1 ? (
              <Button
                variant='primary'
                onClick={handlePreviousStep}
              >
                Voltar
              </Button>
            ) : null}
            {step * fieldsPerStep < 15 ? (
              <Button
                variant='success'
                onClick={() => {
                  if (isStepFormValid()) {
                    handleNextStep();
                  }
                }}
              >
                Continuar
              </Button>
            ) : (
              <Button
                style={{ fontSize: 18 }}
                variant='success'
                onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                  event.preventDefault();
                  handleSubmit();
                }}
              >
                CADASTRAR
              </Button>
            )}
          </div>
            <div className='registro-cadastro-estabelecimento'>
              <p>Voltar para a página de <a href='/login' onClick={handleLogout}>Login</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default CadastroEstabelecimento;