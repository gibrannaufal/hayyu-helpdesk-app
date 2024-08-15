import Layouts from "../components/layouts/Layouts";
import hapusAkunImage from "../assets/images/hapus_akun.webp";
import { deleteAccountMutation, verifyOtpMutation } from "../query/DeleteAccount";
import Swal from "sweetalert2";
import useAccountVerifyStore from "../store/AccountVerify";
import { useEffect, useState } from "react";
import { useResendOtp } from "../store/ResendOtpStore";
import { Link } from "react-router-dom";

const AccountVerify = () => {
	const mutation = verifyOtpMutation();
    const mutationDelete = deleteAccountMutation();

    const { otpValues, FormData, setOtpValues, setFormData } = useAccountVerifyStore();

    const [countdown, setCountdown] = useState(120);
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    const [isVerification, setIsVerification] = useState(true);

    const {FormResendOtp, setResendOtp} = useResendOtp();

   
    const handleOtpChange = (index: number, value: string) => {
        setOtpValues(index, value);
    };

    useEffect(() => {
        startCountdown();
        const storedAccountData = localStorage.getItem('account-storage');
        if (storedAccountData) {
            const accountData = JSON.parse(storedAccountData);
            setFormData({ telp: accountData.state.FormData.telp });
            setResendOtp({ 
                telp: accountData.state.FormData.telp,
                password: accountData.state.FormData.password 
            });
        }
    }, [setFormData]);

    const startCountdown = () => {
        setCountdown(120);
        setIsResendDisabled(true);
        const timer = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount <= 1) {
                    clearInterval(timer);
                    setIsResendDisabled(false);
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000);
    };
    
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleResendOTP = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
		mutationDelete.mutate(FormResendOtp, {
			onSuccess: (data) => {
                console.log(data);
                if (!isResendDisabled) {
                    startCountdown();
                }
			},
			onError: (error) => {
				Swal.fire({
				  icon: 'error',
				  title: 'Oops...',
				  text: 'Terjadi kesalahan saat mengirim bantuan. Silakan coba lagi.',
				  confirmButtonColor: '#038D77',
				});
				console.error("Error:", error);
			  }
		  });
       
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if (FormData.kode_otp.length !== 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Silakan masukkan kode OTP lengkap (6 digit).',
                confirmButtonColor: '#038D77',
            });
            return;
        }
        mutation.mutate(FormData, {
            onSuccess: (data) => {
                setIsVerification(false);
                console.log('berhasil', data);
                
            },
            onError: (error: any) => {
                setIsVerification(true);
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

    return (
    <>
        <Layouts />
        <div className="container mx-auto px-4 mt-28 hidden md:block">
        {isVerification ? (
            <div className="section">
                <span className="flex justify-center items-center font-bold text-[40px] text-[#038D77] font-montserrat">
                    Verifikasi
                </span>
                <div className="grid grid-cols-1">
                    <div className="col-start-1 col-end-7">
                        <span className="block text-center font-montserrat text-2xl font-medium leading-[29.26px]">
                            Kode Verifikasi Anda telah dikirimkan pada nomor
                        </span>
                    </div>
                    <div className="col-start-1 col-end-7">
                        <span className="block text-center font-montserrat text-2xl font-semibold leading-[29.26px]">
                           +62{FormData.telp}
                        </span>
                    </div>
                    <div className="col-start-1 col-end-7 flex justify-center space-x-4 mt-12">
                        {otpValues.map((value, index) => (
                            <input
                                className="w-[90px] h-[90px] px-[22px] py-[10px] rounded-lg border border-[#d3d3d3] text-center focus:outline-none focus:ring-0  text-5xl"
                                key={index}
                                type="text"
                                maxLength={1}
                                value={value}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                            />
                        ))}
                    </div>
                    <div className="col-start-1 col-end-7 flex justify-center mt-12">
                        <span className="font-montserrat text-2xl font-medium leading-[29.26px] text-center text-[#3e3e3e] ">
                            {formatTime(countdown)}
                        </span>
                    </div>
                    <div className="col-start-1 col-end-7 flex justify-center mt-4">
                        <a className={`font-montserrat text-2xl font-medium leading-[29.26px] text-center ${
                            isResendDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-[#3e3e3e] hover:underline'}`}
                            onClick={handleResendOTP}
                            href=""
                        >
                            Kirim Ulang Kode OTP
                        </a>
                    </div>

                    <div className="col-start-1 col-end-7 flex justify-between items-center mt-12 mb-12">
                        <Link to="/informasi-akun" className="w-[240px] h-[56px] px-6 py-4 rounded-xl bg-[#6c757d] border-none text-white text-center font-bold btn-secondary">
                            <span>Kembali</span>
                        </Link>
                        <button  onClick={handleSubmit}  className="w-[240px] h-[56px] px-6 py-4 rounded-xl bg-[#038D77] border-none text-white font-montserrat text-[18px] font-bold inline-block text-center ">
                            <span>Mulai Hapus Akun</span>
                        </button>
                    </div>
                   
                </div>
            </div>
        ) : (
            <div className="end-hapus-akun grid grid-cols-1">
                <div className="col-start-1 col-end-7 flex justify-center items-center">
                    <span className=" font-bold text-[40px] text-[#038D77] font-montserrat">
                        Hapus Akun
                    </span>
                </div>
                

                <div className="col-start-1 col-end-7 flex justify-center items-center">
                    <img 
                        className="w-[380px] h-[380px] p-[16.22px_11.74px_16.27px_11.8px]" 
                        src={hapusAkunImage} 
                        alt="hapus akun" 
                    />
                </div>
                
                <div className="col-start-1 col-end-7 flex justify-center items-center mt-8">
                    <span className="font-montserrat text-2xl font-medium leading-[29.26px] text-center block text-[#7A7A7A]">
                        Permintaan Hapus Akun Anda berhasil dilakukan 
                    </span>
                </div>
                
                <div className="col-start-1 col-end-7 flex justify-center items-center mt-8">
                    <Link to="/" className="w-[240px] h-[56px] px-6 py-4 text-center rounded-xl bg-[#6c757d] border-none text-white font-bold btn-secondary">
                        <span>Kembali</span>
                    </Link>
                </div>

               
            </div>
        )}
        </div>
        <div className="container  h-[calc(100svh-62px)] mx-auto px-4 mt-8  md:hidden">
        {isVerification ? (
            <div className="section">
                <span className="flex justify-center items-center font-bold text-[35px] text-[#038D77] font-montserrat">
                    Verifikasi
                </span>
                <div className="grid grid-cols-1">
                    <div className="col-start-1 col-end-7">
                        <span className="block text-center font-montserrat text-1xl font-medium leading-[29.26px]">
                            Kode Verifikasi Anda telah dikirimkan pada nomor
                        </span>
                    </div>
                    <div className="col-start-1 col-end-7">
                        <span className="block text-center font-montserrat text-1xl font-semibold leading-[29.26px]">
                           +62{FormData.telp}
                        </span>
                    </div>
                    <div className="col-start-1 col-end-7 flex justify-center space-x-4 mt-12">
                        {otpValues.map((value, index) => (
                            <input
                                className="w-[45px] h-[45px]  flex items-center justify-center rounded-lg border border-[#d3d3d3] text-center focus:outline-none focus:ring-0  text-[24px]"
                                key={index}
                                type="text"
                                maxLength={1}
                                value={value}
                                onChange={(e) => {
                                    handleOtpChange(index, e.target.value);
                                    if (e.target.value) { // Jika ada input
                                        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
                                        if (nextInput) {
                                            (nextInput as HTMLInputElement).focus(); 
                                        }
                                    }
                                }}
                                data-index={index}
                            />
                        ))}
                    </div>
                    <div className="col-start-1 col-end-7 flex justify-center mt-12">
                        <span className="font-montserrat text-xl font-medium leading-[29.26px] text-center text-[#3e3e3e] ">
                            {formatTime(countdown)}
                        </span>
                    </div>
                    <div className="col-start-1 col-end-7 flex justify-center mt-4">
                        <a className={`font-montserrat text-xl font-medium leading-[29.26px] text-center ${
                            isResendDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-[#3e3e3e] hover:underline'}`}
                            onClick={handleResendOTP}
                            href=""
                        >
                            Kirim Ulang Kode OTP
                        </a>
                    </div>

                    <div className="col-start-1 col-end-7 flex justify-between items-center mt-12 mb-12">
                        <Link to="/informasi-akun" className="w-[40vw] h-[13vw] px-2 py-4 rounded-xl text-[13px] bg-[#6c757d] border-none text-white text-center font-bold btn-secondary">
                            <span>Kembali</span>
                        </Link>
                        <button  onClick={handleSubmit}  className="w-[40vw] h-[13vw] px-2 py-4 rounded-xl bg-[#038D77] border-none text-white font-montserrat text-[13px] font-bold inline-block text-center ">
                            <span>Mulai Hapus Akun</span>
                        </button>
                    </div>
                   
                </div>
            </div>
        ) : (
            <div className="end-hapus-akun grid grid-cols-1 h-[calc(100svh-62px)]">
                    <div className="col-start-1 col-end-7 flex justify-center items-center">
                        <span className=" font-bold text-[35px] text-[#038D77] font-montserrat">
                            Hapus Akun
                        </span>
                    </div>
                    

                    <div className="col-start-1 col-end-7 flex justify-center items-center">
                        <img 
                            className="w-[280px] h-[280px] p-[16.22px_11.74px_16.27px_11.8px]" 
                            src={hapusAkunImage} 
                            alt="hapus akun" 
                        />
                    </div>
                    
                    <div className="col-start-1 col-end-7 flex justify-center items-center mt-8">
                        <span className="font-montserrat text-xl font-medium leading-[29.26px] text-center block text-[#7A7A7A]">
                            Permintaan Hapus Akun Anda berhasil dilakukan 
                        </span>
                    </div>
                    
                    <div className="col-start-1 col-end-7 flex justify-center items-center mt-8">
                        <Link to="/" className="w-[240px] h-[56px] px-6 py-4 text-center rounded-xl bg-[#6c757d] border-none text-white font-bold btn-secondary">
                            <span>Kembali</span>
                        </Link>
                    </div>
            </div>
        )}
        </div>


    </>
    )
}

export default AccountVerify;