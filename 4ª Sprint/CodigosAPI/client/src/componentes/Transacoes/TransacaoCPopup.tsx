import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

export default function TransacaoCPopup({ open, onClose }: { open: boolean; onClose: () => void }) {

    const handleClose = () => {
        onClose();
    };

    const acaoConfirmada = () => {
        Swal.fire({
            title: 'Compra realizado com sucesso.',
            icon: 'success',
            color: 'black',
            confirmButtonColor: '#de940a',
        })
        handleClose();
    }


    let credito = 100;

    return (

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogContent
                style={{fontSize: 24, color: 'black'}}
                >
                Você está comprando {credito} créditos Greennneat:
            </DialogContent>

            <DialogActions>

                <Button
                    onClick={acaoConfirmada}
                    style={{color: 'white', backgroundColor: '#136935', fontSize: 18, textTransform: 'initial'}}
                >
                    Confirmar
                </Button>

                <Button
                    onClick={handleClose}
                    style={{color: 'white', backgroundColor: '#FF0000', fontSize: 18, textTransform: 'initial'}}
                >
                    Cancelar
                </Button>

            </DialogActions>
        </Dialog>
    );
}

