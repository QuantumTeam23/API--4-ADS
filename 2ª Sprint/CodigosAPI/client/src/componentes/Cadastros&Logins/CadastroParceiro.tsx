import '../styles/CadastroParceiro.css';
import { Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ChangeEvent, useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import eyeIconOpen from '../Imagens/close.png';
import eyeIconClose from '../Imagens/open.png';

interface FormData {
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
  cidadesAtende: string;
  tipo: string;
  showEmptyFieldsAlert: boolean;
  cadastrado: boolean;
  cnpjEmUso: boolean;
}

function CadastroParceiro() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
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
    cidadesAtende: '',
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
    cidadesAtende,
    showEmptyFieldsAlert,
    cnpjEmUso,
  } = formData;

  const fieldsPerStep = 5;
  const [showFields, setShowFields] = useState(true);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [emailInUse, setEmailInUse] = useState(false);
  const navigate = useNavigate()



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
    'campo-14': 'cidadesAtende',
  };

  const [password, setPassword] = useState("" as any);
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const passwordInputType = showPassword ? "text" : "password";
  const passwordIconSrc = showPassword ? eyeIconOpen : eyeIconClose;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = fieldMappings[name] || name;

    setFormData((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);


  const handleNextStep = () => {
    if (step * fieldsPerStep < 15) {
      setStep(step + 1);
      setShowFields(false);
      setTimeout(() => {
        setShowFields(true);
      }, 250);
    }
    else {
      console.log('Formulário enviado:', formData);
    }
  };

  type FormDataKey = keyof FormData;

  const isStepFormValid = () => {
    const startIndex = (step - 1) * fieldsPerStep;
    const endIndex = Math.min(startIndex + fieldsPerStep, 15);

    const emptyFieldsInStep: string[] = [];

    for (let i = startIndex; i < endIndex; i++) {
      const fieldName = fieldMappings[`campo-${i}`] as FormDataKey;
      if (!formData[fieldName]) {
        emptyFieldsInStep.push(fieldName);
      }
    }

    setEmptyFields(emptyFieldsInStep);

    return emptyFieldsInStep.length === 0;
  }

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
      setFormData({ ...formData, showEmptyFieldsAlert: true });
      return;
    }


    const emailCheckResponse = await fetch('http://localhost:3001/checkEmailParceiro', {
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
      const response = await fetch('http://localhost:3001/addParceiro', {
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
          cidadesAtende,
        }),
      });

      if (response.status === 200) {
        Swal.fire({
          title: 'Sucesso',
          html: 'Cadastrado realizado com sucesso.',
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: "Ir para Login",
          confirmButtonColor: '#de940a'
        }).then(() => (navigate('/login')))
      } else if (response.status === 409) {
        console.log('Existe um parceiro com esse CNPJ.');
        setFormData({ ...formData, cnpjEmUso: true });
        setTimeout(() => {
          setFormData((prevState) => ({
            ...prevState,
            cnpjEmUso: false,
          }));
        }, 5000);
      } else {
        console.error('Erro ao cadastrar parceiro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao cadastrar parceiro:', error);
    }

    console.log('Formulário enviado:', formData);
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
      tipo !== '' &&
      cidadesAtende !== ''
    );
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  const renderInputs = () => {
    const startIndex = (step - 1) * fieldsPerStep;
    const endIndex = Math.min(startIndex + fieldsPerStep, 15);
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
          value = formData.razao_social || '';
          break;
        case 1:
          label = 'Nome Fantasia';
          placeholder = 'Digite o Nome Fantasia';
          name = 'nome_fantasia';
          value = formData.nome_fantasia || '';
          break;
        case 2:
          label = 'Email';
          placeholder = 'Digite o Email';
          name = 'email';
          type = 'email';
          value = formData.email || '';
          break;
        case 3:
          label = 'Senha';
          placeholder = 'Digite a Senha';
          name = 'senha';
          type = 'password';
          value = formData.senha || '';
          break;
        case 4:
          label = 'CNPJ/CPF';
          placeholder = 'Digite o CNPJ/CPF';
          name = 'cnpj';
          value = formData.cnpj || '';
          break;
        case 5:
          label = 'Logradouro';
          placeholder = 'Digite o Logradouro';
          name = 'logradouro';
          value = formData.logradouro || '';
          break;
        case 6:
          label = 'Número';
          placeholder = 'Digite o Número';
          name = 'logradouroNumero';
          value = formData.logradouroNumero || '';
          break;
        case 7:
          label = 'Bairro';
          placeholder = 'Digite o Bairro';
          name = 'bairro';
          value = formData.bairro || '';
          break;
        case 8:
          label = 'Cidade';
          placeholder = 'Digite a Cidade';
          name = 'cidade';
          value = formData.cidade || '';
          break;
        case 9:
          label = 'Estado';
          placeholder = 'Digite o Estado';
          name = 'estado';
          value = formData.estado || '';
          break;
        case 10:
          label = 'CEP';
          placeholder = 'Digite o CEP';
          name = 'cep';
          value = formData.cep || '';
          break;
        case 11:
          label = 'Região';
          placeholder = 'Digite a Região';
          name = 'regiao';
          value = formData.regiao || '';
          break;
        case 12:
          label = 'Telefone';
          placeholder = 'Digite o Telefone';
          name = 'telefone';
          value = formData.telefone || '';
          break;
        case 13:
          label = 'Tipo';
          name = 'tipo';
          value = formData.tipo || '';
          break;
        case 14:
          label = 'Cidades em que atende:';
          placeholder = 'Digite as cidades em que atende';
          name = 'cidadesAtende';
          value = formData.cidadesAtende || '';
          break;
        default:
          break;
      }

      if (i === 3) {
        inputFields.push(
          <Form.Group key={i} controlId={`campo-${i}`} className='campo-senha'>
            <Form.Label>{label}</Form.Label>
            <FormControl
              type={passwordInputType}
              name={`campo-${i}`}
              required
              placeholder={placeholder}
              className='form-control-login-senha'
              onChange={handleInputChange}
              value={value}

            />
            <img src={passwordIconSrc} alt="eye icon" className='eyeIconParceiro' onClick={showPasswordHandler} />
          </Form.Group>
        );
      } else if (i === 13) {
        inputFields.push(
          <Form.Group key={i} controlId={`campo-${i}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
              as='select'
              name={`campo-${i}`}
              required
              className='form-control-cadastro-parceiro'
              onChange={handleInputChange}
              value={value}
            >
              <option value=''>Selecione o tipo</option>
              <option value='Restaurantes'>Restaurantes</option>
              <option value='Condomínios'>Condomínios</option>
              <option value='Lanchonetes'>Lanchonetes</option>
              <option value='Shoppings'>Shoppings</option>
              <option value='Residências'>Residências</option>
              <option value='Cooperativas'>Cooperativas</option>
              <option value='Profissional individual'>Profissional individual</option>
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
              className='form-control-cadastro-parceiro'
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
    <div className='container-geral-cadastro-parceiro'>
      <div className='container-janela-cadastro-parceiro'>
        <div className='container-esquerda-cadastro-parceiro'>
          <span className='logo-cadastro-parceiro'>
            <img src='logo-greenneat.png' alt='' />
          </span>
        </div>
        <div className='container-direita-cadastro-parceiro'>
          {emptyFields.length > 0 && (
            <Alert variant="danger">
              Preencha todos os campos para prosseguir.
            </Alert>
          )}
          {showEmptyFieldsAlert && (
            <Alert variant="danger">Preencha todos os campos para finalizar o cadastro.</Alert>
          )}
          {cnpjEmUso && (
            <Alert variant="danger">Já existe um parceiro com esse cnpj.</Alert>
          )}
          {emailInUse && (
            <Alert variant="danger">Já existe um usuário com esse email.</Alert>
          )}
          <div>
            <span className='titulo-cadastro-parceiro'>
              <h1>Cadastro Parceiro</h1>
            </span>
          </div>
          <div className='campo-cadastro-parceiro'>
            {renderInputs()}
            <div className='botao-cadastro-parceiro'>
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
          </div>
          <div className='registro-cadastro-parceiro'>
            <p>Voltar para a página de <a href='/login' onClick={handleLogout}>Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroParceiro;