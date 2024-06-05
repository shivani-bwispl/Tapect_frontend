// services/sweetalertService.js
import Swal from 'sweetalert2';

const swalService = {
    success: (title, text) => {
        return Swal.fire({
            icon: 'success',
            title,
            text,
        });
    },
    error: (title, text) => {
        return Swal.fire({
            icon: 'error',
            title,
            text,
        });
    },
    info: (title, text) => {
        return Swal.fire({
            icon: 'info',
            title,
            text,
        });
    },
    warning: (title, text) => {
        return Swal.fire({
            icon: 'warning',
            title,
            text,
        });
    },
};

export default swalService;
