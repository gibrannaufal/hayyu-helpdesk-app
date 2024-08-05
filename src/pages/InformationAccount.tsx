import Layouts from "../components/layouts/Layouts";
import { deleteAccountMutation } from "../query/DeleteAccount";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { useAccountStore } from "../store/AccountDataStore";

const InformationAccount = () => {
    const navigate = useNavigate();
	const mutation = deleteAccountMutation();

	const {FormData, setFormData, resetFormData} = useAccountStore();

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		mutation.mutate(FormData, {
			onSuccess: (data) => {
				setFormData(data);
                navigate('/verifikasi-akun');
			},
			onError: (error: any) => {
				Swal.fire({
				  icon: 'error',
				  title: 'Oops...',
				  text: error.response?.data?.errors?.[0],
				  confirmButtonColor: '#038D77',
				});
				console.error("Error:", error);
			  }
		  });
	};

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({ [name]: value });
	};

    return (
        <>
        <Layouts />
        <div className="container mx-auto px-4 mt-28">
            <div className="section">
                <span className="flex justify-center items-center font-bold text-[40px] text-[#038D77] font-montserrat">
                    Informasi Akun
                </span>
                <div className="grid grid-cols-1">
                    <div className="col-start-1 col-end-7">
                        <span className="label-form">Inputkan nomor telepon anda*</span>
                    </div>
                    <div className="col-start-1 col-end-7 mt-4">
                        <input 
                            className="w-[5%] h-[62px] px-o font-bold text-center rounded-l-lg border border-[#d3d3d3] bg-[#e4e4e4]" 
                            type="text" 
                            disabled
                            name="jenis_nomor" 
                            value="+62"
                        />
                        <input 
                            className="flex-1 w-[95%] h-[62px] px-6 py-5 rounded-r-lg border border-[#d3d3d3] focus:outline-none focus:ring-0 border-l-0"
                            type="text" 
                            name="telp" 
							value={FormData.telp} 
							onChange={handleInputChange}

                        />
                       
                    </div>
                    <div className="col-start-1 col-end-7 mt-8">
                        <span className="label-form">Inputkan password anda*</span>
                    </div>
                    <div className="col-start-1 col-end-7 mt-4">
                         <input 
                            className="flex-1 w-[100%] h-[62px] px-6 py-5 rounded-lg border border-[#d3d3d3] focus:outline-none focus:ring-0  focus:border-[#d3d3d3]"
                            type="text" 
                            name="password" 
							value={FormData.password}
							onChange={handleInputChange}

                        />
                    </div>
                    
                    <div className="col-start-1 col-end-7 flex justify-between items-center mt-12">   
                        <Link to="/hapus-akun" className="w-[240px] h-[56px] px-6 py-4 rounded-xl bg-[#6c757d] border-none text-center text-white font-bold btn-secondary">
                            <span>Kembali</span>
                        </Link>
                        <button  onClick={handleSubmit}  className="w-[240px] h-[56px] px-6 py-4 rounded-xl bg-[#038D77] border-none text-white font-montserrat text-[18px] font-bold inline-block text-center ">
                            <span>Mulai Hapus Akun</span>
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    </>
    )
}

export default InformationAccount;