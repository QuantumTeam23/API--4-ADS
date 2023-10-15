import React, { useState, ChangeEvent, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styles from '../styles/PainelAdmin.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from 'react-bootstrap/Alert';
import eyeIconOpen from '../Imagens/close.png';
import eyeIconClose from '../Imagens/open.png';
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';


interface FormDataUserParc {
  parceiro_razao_social: string;
  parceiro_nome_fantasia: string;
  parceiro_email: string;
  parceiro_senha: string;
  parceiro_cnpj: string;
  parceiro_logradouro: string;
  parceiro_logradouroNumero: string;
  parceiro_bairro: string;
  parceiro_cidade: string;
  parceiro_estado: string;
  parceiro_cep: string;
  parceiro_regiao: string;
  parceiro_telefone: string;
  parceiro_tipo: string;
  parceiro_cidades_atende: string;
  showEmptyFieldsAlertParc: boolean;
  cadastradoParc: boolean;
  cnpjEmUsoParc: boolean;
}

interface FormDataUserEstab {
  estabelecimento_razao_social: string;
  estabelecimento_nome_fantasia: string;
  estabelecimento_email: string;
  estabelecimento_senha: string;
  estabelecimento_cnpj: string;
  estabelecimento_logradouro: string;
  estabelecimento_logradouroNumero: string;
  estabelecimento_bairro: string;
  estabelecimento_cidade: string;
  estabelecimento_estado: string;
  estabelecimento_cep: string;
  estabelecimento_regiao: string;
  estabelecimento_telefone: string;
  estabelecimento_tipo: string;
  showEmptyFieldsAlertEstab: boolean;
  cadastradoEstab: boolean;
  cnpjEmUsoEstab: boolean;
}

export default function AdicionarUsuarioPopup({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [tabValue, setTabValue] = useState(0);
  const [emailInUse, setEmailInUse] = useState(false);
  const [formDataUserEstab, setFormDataUserEstab] = useState<FormDataUserEstab>({
    estabelecimento_razao_social: '',
    estabelecimento_nome_fantasia: '',
    estabelecimento_email: '',
    estabelecimento_senha: '',
    estabelecimento_cnpj: '',
    estabelecimento_logradouro: '',
    estabelecimento_logradouroNumero: '',
    estabelecimento_bairro: '',
    estabelecimento_cidade: '',
    estabelecimento_estado: '',
    estabelecimento_cep: '',
    estabelecimento_regiao: '',
    estabelecimento_telefone: '',
    estabelecimento_tipo: '',
    showEmptyFieldsAlertEstab: false,
    cadastradoEstab: false,
    cnpjEmUsoEstab: false,
  });
  const [formDataUserParc, setFormDataUserParc] = useState<FormDataUserParc>({
    parceiro_razao_social: '',
    parceiro_nome_fantasia: '',
    parceiro_email: '',
    parceiro_senha: '',
    parceiro_cnpj: '',
    parceiro_logradouro: '',
    parceiro_logradouroNumero: '',
    parceiro_bairro: '',
    parceiro_cidade: '',
    parceiro_estado: '',
    parceiro_cep: '',
    parceiro_regiao: '',
    parceiro_telefone: '',
    parceiro_tipo: '',
    parceiro_cidades_atende: '',
    showEmptyFieldsAlertParc: false,
    cadastradoParc: false,
    cnpjEmUsoParc: false,
  });

  const handleInputChangeEstab = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataUserEstab((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInputChangeParc = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataUserParc((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSelectChangeParc = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormDataUserParc((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSelectChangeEstab = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormDataUserEstab((prevState) => ({ ...prevState, [name]: value }));
  };

  const msgSucessoPost = () => {
    Swal.fire({
      title: "Sucesso",
      html: "Cadastrado realizado com sucesso.",
      icon: "success",
      showConfirmButton: true,
      confirmButtonColor: '#de940a',
      customClass: {
        container: 'swal-container',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }

  const handleSubmitParc = async () => {
    if (isFormValidParc(formDataUserParc)) {
      setFormDataUserParc({ ...formDataUserParc, showEmptyFieldsAlertParc: true });
      return
    }
    const email = formDataUserParc.parceiro_email
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

    else {
      try {
        const response = await fetch('http://localhost:3001/addParceiro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razao_social: formDataUserParc.parceiro_razao_social,
            nome_fantasia: formDataUserParc.parceiro_nome_fantasia,
            email: formDataUserParc.parceiro_email,
            senha: formDataUserParc.parceiro_senha,
            cnpj: formDataUserParc.parceiro_cnpj,
            logradouro: formDataUserParc.parceiro_logradouro,
            logradouroNumero: formDataUserParc.parceiro_logradouroNumero,
            bairro: formDataUserParc.parceiro_bairro,
            cidade: formDataUserParc.parceiro_cidade,
            estado: formDataUserParc.parceiro_estado,
            cep: formDataUserParc.parceiro_cep,
            regiao: formDataUserParc.parceiro_regiao,
            telefone: formDataUserParc.parceiro_telefone,
            tipo: formDataUserParc.parceiro_tipo,
            cidadesAtende: formDataUserParc.parceiro_cidades_atende,
          }),
        });

        if (response.status === 200) {
          handleClose()
          msgSucessoPost()
        } else if (response.status === 409) {
          console.log('Existe um parceiro com esse CNPJ.');
          setFormDataUserParc({ ...formDataUserParc, cnpjEmUsoParc: true });
          console.log('cnpjEmUso:', formDataUserParc.cnpjEmUsoParc);
          setTimeout(() => {
            setFormDataUserParc((prevState) => ({
              ...prevState,
              cnpjEmUsoParc: false,
            }));
          }, 5000);
        } else {
          console.error('Erro ao cadastrar parceiro:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao cadastrar parceiro:', error);
      }
    }


    console.log('Formulário enviado:', formDataUserParc);
  };


  const handleSubmitEstab = async () => {
    if (isFormValidEstab(formDataUserEstab)) {
      setFormDataUserEstab({ ...formDataUserEstab, showEmptyFieldsAlertEstab: true });
      return
    }

    const email = formDataUserEstab.estabelecimento_email
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
          razao_social: formDataUserEstab.estabelecimento_razao_social,
          nome_fantasia: formDataUserEstab.estabelecimento_nome_fantasia,
          email: formDataUserEstab.estabelecimento_email,
          senha: formDataUserEstab.estabelecimento_senha,
          cnpj: formDataUserEstab.estabelecimento_cnpj,
          logradouro: formDataUserEstab.estabelecimento_logradouro,
          logradouroNumero: formDataUserEstab.estabelecimento_logradouroNumero,
          bairro: formDataUserEstab.estabelecimento_bairro,
          cidade: formDataUserEstab.estabelecimento_cidade,
          estado: formDataUserEstab.estabelecimento_estado,
          cep: formDataUserEstab.estabelecimento_cep,
          regiao: formDataUserEstab.estabelecimento_regiao,
          telefone: formDataUserEstab.estabelecimento_telefone,
          tipo: formDataUserEstab.estabelecimento_tipo,
        }),
      });

      if (response.status === 200) {
        handleClose()
        msgSucessoPost()
      } else if (response.status === 409) {
        console.log('Existe um estabelecimento com esse CNPJ.');
        setFormDataUserEstab({ ...formDataUserEstab, cnpjEmUsoEstab: true });
        console.log('cnpjEmUso:', formDataUserEstab.cnpjEmUsoEstab);
        setTimeout(() => {
          setFormDataUserEstab((prevState) => ({
            ...prevState,
            cnpjEmUsoEstab: false,
          }));
        }, 5000);
      } else {
        console.error('Erro ao cadastrar estabelecimento:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao cadastrar estabelecimento:', error);
    }

    console.log('Formulário enviado:', formDataUserEstab);
  };

  const handleSubmit = () => {
    if (tabValue === 0) {
      handleSubmitParc();
    } else if (tabValue === 1) {
      handleSubmitEstab();
    }
  };

  const isFormValidParc = (formData: FormDataUserParc) => {
    const {
      parceiro_razao_social,
      parceiro_nome_fantasia,
      parceiro_email,
      parceiro_senha,
      parceiro_cnpj,
      parceiro_logradouro,
      parceiro_logradouroNumero,
      parceiro_bairro,
      parceiro_cidade,
      parceiro_estado,
      parceiro_cep,
      parceiro_regiao,
      parceiro_telefone,
      parceiro_tipo,
      parceiro_cidades_atende,
    } = formData;
    console.log(formData);
    if (parceiro_razao_social === '' ||
      parceiro_nome_fantasia === '' ||
      parceiro_cnpj === '' ||
      parceiro_email === '' ||
      parceiro_senha === '' ||
      parceiro_cep === '' ||
      parceiro_logradouro === '' ||
      parceiro_logradouroNumero === '' ||
      parceiro_bairro === '' ||
      parceiro_cidade === '' ||
      parceiro_estado === '' ||
      parceiro_regiao === '' ||
      parceiro_telefone === '' ||
      parceiro_tipo === '' ||
      parceiro_cidades_atende === ''
    ) {
      return true
    } else {
      return false
    }
  };


  const isFormValidEstab = (formData: FormDataUserEstab) => {
    const {
      estabelecimento_razao_social,
      estabelecimento_nome_fantasia,
      estabelecimento_email,
      estabelecimento_senha,
      estabelecimento_cnpj,
      estabelecimento_logradouro,
      estabelecimento_logradouroNumero,
      estabelecimento_bairro,
      estabelecimento_cidade,
      estabelecimento_estado,
      estabelecimento_cep,
      estabelecimento_regiao,
      estabelecimento_telefone,
      estabelecimento_tipo,
    } = formData;
    console.log(formData);
    if (estabelecimento_razao_social === '' ||
      estabelecimento_nome_fantasia === '' ||
      estabelecimento_cnpj === '' ||
      estabelecimento_email === '' ||
      estabelecimento_senha === '' ||
      estabelecimento_cep === '' ||
      estabelecimento_logradouro === '' ||
      estabelecimento_logradouroNumero === '' ||
      estabelecimento_bairro === '' ||
      estabelecimento_cidade === '' ||
      estabelecimento_estado === '' ||
      estabelecimento_regiao === '' ||
      estabelecimento_telefone === '' ||
      estabelecimento_tipo === ''
    ) {
      return true
    } else {
      return false
    }
  };



  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth  // Isso define a largura para 100%
      maxWidth="md"  // Isso define a largura máxima para média (pode ajustar para 'sm', 'lg', etc., conforme necessário)
    >
      <DialogTitle>Adicionar Usuário</DialogTitle>
      <DialogContent>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Parceiro" />
          <Tab label="Estabelecimento" />
        </Tabs>
        {tabValue === 0 && (
          <form>
            <div>
              {formDataUserParc.showEmptyFieldsAlertParc && (
                <Alert variant="danger">Preencha todos os campos do formulário.</Alert>
              )}
              {formDataUserParc.cadastradoParc && (
                <Alert variant="success">Parceiro cadastrado com sucesso!!</Alert>
              )}
              {formDataUserParc.cnpjEmUsoParc && (
                <Alert variant="danger">Já existe um parceiro com esse cnpj.</Alert>
              )}
              {emailInUse && (
                <Alert variant="danger">Já existe um usuário com esse email.</Alert>
              )}
              <label>Razão Social/Nome do Responsável:</label>
              <input type="text" id="parceiro_razao_social"
                name="parceiro_razao_social"
                value={formDataUserParc.parceiro_razao_social}
                onChange={handleInputChangeParc}
              />
            </div>
            <div>
              <label>Nome Fantasia:</label>
              <input type="text" id="parceiro_nome_fantasia"
                name="parceiro_nome_fantasia"
                value={formDataUserParc.parceiro_nome_fantasia}
                onChange={handleInputChangeParc}
              />
            </div>
            <div>
              <label>CNPJ/CPF:</label>
              <input type="text" id="parceiro_cnpj"
                name="parceiro_cnpj"
                value={formDataUserParc.parceiro_cnpj}
                onChange={handleInputChangeParc}
              />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" id="parceiro_email" className={styles.emailInput}
                name="parceiro_email"
                value={formDataUserParc.parceiro_email}
                onChange={handleInputChangeParc}
              />
            </div>
            <div>
              <label>Senha:</label>
              <input type="password" id="parceiro_senha" className={styles.passwordInput}
                name="parceiro_senha"
                value={formDataUserParc.parceiro_senha}
                onChange={handleInputChangeParc}
              />
            </div>
            <div>
              <label>CEP:</label>
              <input type="text" id="parceiro_cep"
                name="parceiro_cep"
                value={formDataUserParc.parceiro_cep}
                onChange={handleInputChangeParc}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between',height:"40px", marginBottom:'30px' }}>
              <div style={{ flex: '1' }}>
                <label>Logradouro:</label>
                <input type="text" id="parceiro_logradouro"
                  name="parceiro_logradouro"
                  value={formDataUserParc.parceiro_logradouro}
                  onChange={handleInputChangeParc}
                />
              </div>
              <div style={{ flex: '1', marginLeft: '20px' }}>
                <label>Número:</label>
                <input type="text" id="parceiro_logradouro_numero"
                  name="parceiro_logradouroNumero"
                  value={formDataUserParc.parceiro_logradouroNumero}
                  onChange={handleInputChangeParc}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', height:"40px", marginBottom:'30px' }}>
              <div style={{ flex: '60%' }}> {/* Bairro ocupando 60% da largura */}
                <label>Bairro:</label>
                <input type="text" id="parceiro_bairro"
                  name="parceiro_bairro"
                  value={formDataUserParc.parceiro_bairro}
                  onChange={handleInputChangeParc}
                />
              </div>
              <div style={{ flex: '30%', marginLeft: '20px' }}> {/* Cidade ocupando 30% da largura */}
                <label>Cidade:</label>
                <input type="text" id="parceiro_cidade"
                  name="parceiro_cidade"
                  value={formDataUserParc.parceiro_cidade}
                  onChange={handleInputChangeParc}
                />
              </div>
              <div style={{ flex: '10%', marginLeft: '20px' }}>
                <label>Estado:</label>
                <select
                  id="parceiro_estado"
                  name="parceiro_estado"
                  value={formDataUserParc.parceiro_estado}
                  onChange={handleSelectChangeParc}
                >
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
                </select>
              </div>
              <div style={{ flex: '20%', marginLeft: '20px' }}>
                <label>Região:</label>
                <select id="parceiro_regiao"
                  name="parceiro_regiao"
                  value={formDataUserParc.parceiro_regiao}
                  onChange={handleSelectChangeParc}
                >
                  <option value="Norte">Norte</option>
                  <option value="Nordeste">Nordeste</option>
                  <option value="Centro-Oeste">Centro-Oeste</option>
                  <option value="Sudeste">Sudeste</option>
                  <option value="Sul">Sul</option>
                </select>
              </div>
            </div>
            <div>
              <label>Telefone:</label>
              <input type="text" id="parceiro_telefone"
                name="parceiro_telefone"
                value={formDataUserParc.parceiro_telefone}
                onChange={handleInputChangeParc}
              />
            </div>

            <div>
              <label>Cidades em que Atende:</label>
              <input type="text" id="parceiro_cidades_atende"
                name="parceiro_cidades_atende"
                value={formDataUserParc.parceiro_cidades_atende}
                onChange={handleInputChangeParc}
              />
            </div>

            <div>
              <label>Tipos de parceiros:</label>
              <select id="parceiro_tipo"
                name="parceiro_tipo"
                value={formDataUserParc.parceiro_tipo}
                onChange={handleSelectChangeParc}
              >
                <option>Restaurantes</option>
                <option>Condomínios</option>
                <option>Lanchonetes</option>
                <option>Shoppings</option>
                <option>Residências</option>
                <option>Outros</option>
              </select>
            </div>

          </form>
        )}
        {tabValue === 1 && (
          <form>
            <div>
              {formDataUserEstab.showEmptyFieldsAlertEstab && (
                <Alert variant="danger">Preencha todos os campos do formulário.</Alert>
              )}
              {formDataUserEstab.cadastradoEstab && (
                <Alert variant="success">Parceiro cadastrado com sucesso!!</Alert>
              )}
              {formDataUserEstab.cnpjEmUsoEstab && (
                <Alert variant="danger">Já existe um parceiro com esse cnpj.</Alert>
              )}
              {emailInUse && (
                <Alert variant="danger">Já existe um usuário com esse email.</Alert>
              )}
              <label>Razão Social/Nome do Responsável:</label>
              <input
                type="text"
                id="estabelecimento_razao_social"
                name="estabelecimento_razao_social" // Deve ser "estabelecimento_razao_social"
                value={formDataUserEstab.estabelecimento_razao_social}
                onChange={handleInputChangeEstab}
              />

            </div>
            <div>
              <label>Nome Fantasia:</label>
              <input type="text" id="estabelecimento_nome_fantasia"
                name="estabelecimento_nome_fantasia"
                value={formDataUserEstab.estabelecimento_nome_fantasia}
                onChange={handleInputChangeEstab}
              />
            </div>
            <div>
              <label>CNPJ/CPF:</label>
              <input type="text" id="estabelecimento_cnpj"
                name="estabelecimento_cnpj"
                value={formDataUserEstab.estabelecimento_cnpj}
                onChange={handleInputChangeEstab} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" id="estabelecimento_email" className={styles.emailInput}
                name="estabelecimento_email"
                value={formDataUserEstab.estabelecimento_email}
                onChange={handleInputChangeEstab}
              />
            </div>
            <div>
              <label>Senha:</label>
              <input type="password" id="estabelecimento_senha" className={styles.passwordInput}
                name="estabelecimento_senha"
                value={formDataUserEstab.estabelecimento_senha}
                onChange={handleInputChangeEstab}
              />
            </div>
            <div>
              <label>CEP:</label>
              <input type="text" id="estabelecimento_cep"
                name="estabelecimento_cep"
                value={formDataUserEstab.estabelecimento_cep}
                onChange={handleInputChangeEstab}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', height:"40px", marginBottom:'30px' }}>
              <div style={{ flex: '1' }}>
                <label>Logradouro:</label>
                <input type="text" id="estabelecimento_logradouro"
                  name="estabelecimento_logradouro"
                  value={formDataUserEstab.estabelecimento_logradouro}
                  onChange={handleInputChangeEstab}
                />
              </div>
              <div style={{ flex: '1', marginLeft: '20px' }}>
                <label>Número:</label>
                <input type="text" id="estabelecimento_logradouro_numero"
                  name="estabelecimento_logradouroNumero" // Correção do nome do campo
                  value={formDataUserEstab.estabelecimento_logradouroNumero}
                  onChange={handleInputChangeEstab}

                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', height:"40px", marginBottom:'30px' }}>
              <div style={{ flex: '60%' }}> {/* Bairro ocupando 60% da largura */}
                <label>Bairro:</label>
                <input type="text" id="estabelecimento_bairro"
                  name="estabelecimento_bairro"
                  value={formDataUserEstab.estabelecimento_bairro}
                  onChange={handleInputChangeEstab}
                />
              </div>
              <div style={{ flex: '30%', marginLeft: '20px' }}> {/* Cidade ocupando 30% da largura */}
                <label>Cidade:</label>
                <input type="text" id="estabelecimento_cidade"
                  name="estabelecimento_cidade"
                  value={formDataUserEstab.estabelecimento_cidade}
                  onChange={handleInputChangeEstab}
                />
              </div>
              <div style={{ flex: '10%', marginLeft: '20px' }}>
                <label>Estado:</label>
                <select id="estabelecimento_estado"
                  name="estabelecimento_estado"
                  value={formDataUserEstab.estabelecimento_estado}
                  onChange={handleSelectChangeEstab}
                >
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
                </select>
              </div>
              <div style={{ flex: '20%', marginLeft: '20px' }}>
                <label>Região:</label>
                <select id="estabelecimento_regiao"
                  name="estabelecimento_regiao"
                  value={formDataUserEstab.estabelecimento_regiao}
                  onChange={handleSelectChangeEstab}
                >
                  <option value="Norte">Norte</option>
                  <option value="Nordeste">Nordeste</option>
                  <option value="Centro-Oeste">Centro-Oeste</option>
                  <option value="Sudeste">Sudeste</option>
                  <option value="Sul">Sul</option>
                </select>
              </div>
            </div>
            <div>
              <label>Telefone:</label>
              <input type="text" id="estabelecimento_telefone"
                name="estabelecimento_telefone"
                value={formDataUserEstab.estabelecimento_telefone}
                onChange={handleInputChangeEstab}
              />
            </div>

            <div>
              <label>Tipo de estabelecimento:</label>
              <select id="estabelecimento_tipo"
                name="estabelecimento_tipo"
                value={formDataUserEstab.estabelecimento_tipo}
                onChange={handleSelectChangeEstab}
              >
                <option>Cooperativas</option>
                <option>Profissional individual</option>
                <option>Reciclagem</option>
                <option>Restaurantes</option>
                <option>Condomínio</option>
                <option>Residência</option>
                <option>Estabelecimento em geral</option>
                <option>Outros</option>
              </select>
            </div>
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function EditarUsuarioPopup({ open, onClose }: { open: boolean, onClose: () => void }) {
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
    cidadesAtende: '',
  });
  const handleClose = () => {
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUsuarioDados((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

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

  const handleCloseEdit = () => {
    onClose();
  };

  useEffect(() => {
    if (open) {
      const DadosParceiro = localStorage.getItem('ParceiroData');
      const DadosEstabelecimento = localStorage.getItem('EstabelecimentoData');
      if (DadosParceiro) {
        try {
          const parsedData = JSON.parse(DadosParceiro);
          setUsuarioDados(parsedData);
          setDadosOriginais(parsedData)
        } catch (error) {
          console.error('Erro ao analisar os dados do localStorage:', error);
        }
      } else if (DadosEstabelecimento) {
        try {
          const parsedData = JSON.parse(DadosEstabelecimento);
          setUsuarioDados(parsedData);
          setDadosOriginais(parsedData)
        } catch (error) {
          console.error('Erro ao analisar os dados do localStorage:', error);
        }
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setUsuarioDados({
        email: '',
        senha: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        regiao: '',
        cidadesAtende: '',
      });
    }
  }, [open]);


  const handleEdit = () => {
    const tipoUsuario = localStorage.getItem('tipoEdit')
    const razaoSocial = localStorage.getItem('nomeEdit')

    const dadosEditados = usuarioDados;
    const dadosMudaram = JSON.stringify(dadosEditados) !== JSON.stringify(dadosOriginais);

    if (dadosMudaram) {
      if (tipoUsuario === "Parceiro") {
        fetch(`http://localhost:3001/editar-usuario-comum-parceiro-by-admin/${razaoSocial}/${tipoUsuario}`, {
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
          handleCloseEdit()
          msgSucessoPost()
      } else if (tipoUsuario === 'Estabelecimento') {
        fetch(`http://localhost:3001/editar-usuario-comum-parceiro-by-admin/${razaoSocial}/${tipoUsuario}`, {
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
          handleCloseEdit()
          msgSucessoPost()
      }
    } else {
      Swal.fire({
        title: 'Alerta',
        html: 'Forneça os novos dados.',
        icon: 'warning',
        confirmButtonColor: '#de940a'
      })
      onClose();
    }


  };

  const userType = localStorage.getItem('tipoEdit');

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Editar Usuário</DialogTitle>
      <DialogContent>
        <div>
          <label>Email:</label>
          <input type="email" id="email" className={styles.emailInput} defaultValue={usuarioDados.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Senha:</label>
          <input type='password' id="senha" className={styles.passwordInput} defaultValue={usuarioDados.senha} onChange={handleInputChange} />
        </div>
        <div>
          <label>Logradouro:</label>
          <input type="text" id="logradouro" defaultValue={usuarioDados.logradouro} onChange={handleInputChange} />
        </div>
        <div>
          <label>Número:</label>
          <input type="text" id="numero" defaultValue={usuarioDados.numero} onChange={handleInputChange} />
        </div>
        <div>
          <label>Bairro:</label>
          <input type="text" id="bairro" defaultValue={usuarioDados.bairro} onChange={handleInputChange} />
        </div>
        <div>
          <label>Cidade:</label>
          <input type="text" id="cidade" defaultValue={usuarioDados.cidade} onChange={handleInputChange} />
        </div>
        <div>
          <label>Estado:</label>
          <input type="text" id="estado" defaultValue={usuarioDados.estado} onChange={handleInputChange} />
        </div>
        <div>
          <label>CEP:</label>
          <input type="text" id="cep" defaultValue={usuarioDados.cep} onChange={handleInputChange} />
        </div>
        {userType === 'Parceiro' && (
          <div>
            <label>Cidades em que atende:</label>
            <input type="text" id="cidadesAtende" defaultValue={usuarioDados.cidadesAtende} onChange={handleInputChange} />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleEdit} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function EditarUsuarioAdminPopup({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [dadosOriginais, setDadosOriginais] = useState({})
  const [usuarioDados, setUsuarioDados] = useState({
    email: '',
    senha: '',
  });
  const handleClose = () => {
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUsuarioDados((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (open) {
      const DadosAdministrador = localStorage.getItem('AdministradorData');

      if (DadosAdministrador) {
        try {
          const parsedData = JSON.parse(DadosAdministrador);
          setUsuarioDados(parsedData);
          setDadosOriginais(parsedData)
        } catch (error) {
          console.error('Erro ao analisar os dados do localStorage:', error);
        }
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setUsuarioDados({
        email: '',
        senha: '',
      });
    }
  }, [open]);

  const msgSucessoPost = () => {
    Swal.fire({
      title: "Sucesso",
      html: "Cadastrado realizado com sucesso.",
      icon: "success",
      showConfirmButton: true,
      confirmButtonColor: '#de940a',
      customClass: {
        container: 'swal-container',
      },
    })
  }


  const handleEdit = () => {
    const tipoUsuario = localStorage.getItem('tipoEdit')
    const razaoSocial = localStorage.getItem('nomeEdit')

    const dadosEditados = usuarioDados;
    const dadosMudaram = JSON.stringify(dadosEditados) !== JSON.stringify(dadosOriginais);

    if (dadosMudaram) {
      if (tipoUsuario === "Administrador") {
        fetch(`http://localhost:3001/editar-usuario-comum-parceiro-by-admin/${razaoSocial}/${tipoUsuario}`, {
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
          msgSucessoPost()
          onClose();
      }
    } else {
      Swal.fire({
        title: 'Alerta',
        html: 'Forneça os novos dados.',
        icon: 'warning',
        confirmButtonColor: '#de940a'
      })
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Editar Usuário</DialogTitle>
      <DialogContent>
        <div>
          <label>Email:</label>
          <input type="email" id="email" className={styles.emailInput} defaultValue={usuarioDados.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" id="senha" className={styles.passwordInput} defaultValue={usuarioDados.senha} onChange={handleInputChange} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleEdit} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
