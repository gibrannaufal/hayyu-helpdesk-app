import Layouts from "../components/layouts/Layouts";
import { Link } from "react-router-dom";

const AccountDelete = () => {
	return (
        <>
            <Layouts />
            <div className="container mx-auto px-4 mt-28 hidden md:block">
				<div className="section">
					<span className="flex justify-center items-center font-bold text-[40px] text-[#038D77] font-montserrat">
                        Hapus Akun
                    </span>
                    <div className="grid grid-cols-1">
                        <div className="col-start-1 col-end-7">
                            <h4 className="font-montserrat text-[26px] font-bold leading-[31.69px] text-left mt-12">
                                Langkah - langkah :
                            </h4>
                            <ul className="font-montserrat list-disc text-[20px] font-medium leading-[26px] text-left ml-8 mt-8">
                                <li>Inputkan nomor telepon yang digunakan pada aplikasi</li>
                                <li>Inputkan password yang digunakan pada aplikasi</li>
                                <li>Lanjut untuk mendapatkan kode verifikasi</li>
                                <li>Inputkan kode verifikasi, dan tunggu akun anda dalam masa hapus akun</li>
                                <li>Untuk membatalkan hapus akun, silahkan akses aplikasi dan klik Batalkan</li>
                            </ul>
                        </div>
						
                        <div className="flex justify-between items-center mt-12">
                            <Link to="/" className="w-[240px] h-[56px] px-6 py-4 rounded-xl bg-[#6c757d] border-none text-white font-bold btn-secondary inline-flex items-center justify-center">
                            <span>Kembali</span>
                            </Link>
                            <Link to="/informasi-akun" className="w-[240px] h-[56px] px-6 py-4 rounded-xl bg-[#038D77] border-none text-white font-montserrat text-[18px] font-bold inline-flex items-center justify-center">
                            <span>Mulai Hapus Akun</span>
                            </Link>
                        </div>
                    </div>
				</div>
			</div>
            <div className="container mx-auto px-4 h-[calc(100svh-62px)] mt-8 md:hidden">
				<div className="section">
					<span className="flex justify-center items-center font-bold text-[35px] text-[#038D77] font-montserrat">
                        Hapus Akun
                    </span>
                    <div className="grid grid-cols-1">
                        <div className="col-start-1 col-end-7">
                            <h4 className="font-montserrat text-[26px] font-bold leading-[31.69px] text-left mt-12">
                                Langkah - langkah :
                            </h4>
                            <ul className="font-montserrat list-disc text-[20px] font-medium leading-[26px] text-left ml-8 mt-8">
                                <li>Inputkan nomor telepon yang digunakan pada aplikasi</li>
                                <li>Inputkan password yang digunakan pada aplikasi</li>
                                <li>Lanjut untuk mendapatkan kode verifikasi</li>
                                <li>Inputkan kode verifikasi, dan tunggu akun anda dalam masa hapus akun</li>
                                <li>Untuk membatalkan hapus akun, silahkan akses aplikasi dan klik Batalkan</li>
                            </ul>
                        </div>
                        <div className="flex justify-between items-center mt-12">
                            <Link to="/" className="w-[40vw] h-[13vw] px-2 py-4 rounded-xl text-[13px] bg-[#6c757d] border-none text-white font-bold btn-secondary inline-flex items-center justify-center">
                            <span>Kembali</span>
                            </Link>
                            <Link to="/informasi-akun" className="w-[40vw] h-[13vw] px-2 py-4  text-[13px] rounded-xl bg-[#038D77] border-none text-white font-montserrat font-bold inline-flex items-center justify-center">
                            <span>Mulai Hapus Akun</span>
                            </Link>
                        </div>
                    </div>
				</div>
			</div>
        </>
	)
}

export default AccountDelete;   