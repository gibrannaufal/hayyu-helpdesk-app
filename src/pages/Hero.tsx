import Layouts from "../components/layouts/Layouts"
import { HelpFormData } from "../entities/Form";
import { useHelpMutation } from "../query/help";
import { useState } from "react";
import Swal from "sweetalert2";

const Hero = () => {
	const mutation = useHelpMutation();

	const initialFormData: HelpFormData = {
		judul: '',
		deskripsi: '',
		tipe: 'bantuan'
	  };
	const [FormData, setFormData] = useState<HelpFormData>(initialFormData);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutation.mutate(FormData, {
			onSuccess: () => {
				setFormData(initialFormData);
				Swal.fire({
				  icon: 'success',
				  title: 'Berhasil!',
				  text: 'Bantuan Anda telah berhasil dikirim.',
				  confirmButtonColor: '#038D77',
				});
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prevData => ({
		  ...prevData,
		  [name]: value
		}));
	};

    return <>
        <Layouts />
        <div className="container mx-auto px-4 mt-16">
            <div className="pt-[156px] ml-9 h-screen bg-white overflow-hidden relative flex flex-col item-left">
                <span className="text-[#038D77] font-montserrat font-bold text-[70px] text-left">
                    Helpdesk
                </span>
                <span className="w-[641px] text-[#3e3e3e] font-montserrat font-normal text-[32px] -mt-3 mb-4 text-left">Selamat Datang di Pusat Bantuan Kami</span>
                <span className="text-[#6c6c6c] font-montserrat font-medium text-2xl text-left max-w-[50vw] ">
                    Tempat di mana kami berkomitmen untuk memberikan layanan terbaik
                    kepada Anda. Silakan sampaikan keluhan atau pertanyaan Anda.
                </span>
            </div>
			<div className="w-[600px] h-[80vh] absolute bottom-0 right-0 overflow-hidden">
				<div className="w-[1200px] h-[1200px] bg-[#038D77] opacity-100 absolute top-0 left-0 rounded-[9999999px]"></div>
				<div className="w-[410px] h-[708px] absolute top-0 right-0 overflow-hidden bg-[url('./assets/images/v6347_806.png')] bg-no-repeat bg-center bg-cover"></div>
            </div>
            <section className="py-12" id="faq">
                <h2 className="text-center font-bold text-[40px] text-[#038D77] font-montserrat">
                    FAQ
                </h2>
                <div className="p-9">
                    <span className="text-[#1f1f1f] font-montserrat font-bold text-2xl text-left">Akun User</span>
                    <div className="m-5 opacity-100 overflow-hidden">
                        <p className="text-[#3e3e3e] font-montserrat font-semibold text-xl text-left">
							Apakah bisa mengganti Profile pada Aplikasi?
						</p>
                        <ul className="text-[#6c6c6c] font-montserrat font-medium text-lg my-4 list-disc pl-5">
							<li>Login Apps Hayyu Doc</li>
							<li>Klik gambar member</li>
							<li>Edit Profile</li>
						</ul>
                        <p className="text-[#3e3e3e] font-montserrat font-semibold text-xl text-left">
							Bagimana cara daftar akun melalui aplikasi HAYYUDoc
						</p>
                        <ul className="text-[#6c6c6c] font-montserrat font-medium text-lg my-4 list-disc pl-5">
                            <li>
                                Bisa melakukan download aplikasi HAYYUDoc terlebih dahulu,
                                kemudian pilih MASUK/DAFTAR dan masukkan nomor telepon.
                            </li>
						</ul>
                        <p className="text-[#3e3e3e] font-montserrat font-semibold text-xl text-left">
                            Bagaimana Cara Login Aplikasi
                        </p>
                        <ul className="text-[#6c6c6c] font-montserrat font-medium text-lg my-4 list-disc pl-5">
                            <li>
                                Sliahkan ketik nomor telepon yang terdaftar pada kolom yang
									tersedia dan masukkan passwordnya.
							</li>
						</ul>
					</div>
				</div>
                <div className="p-9">
                    <span className="text-[#1f1f1f] font-montserrat font-bold text-2xl text-left">
                        Konsultasi Online
                    </span>
                    <div className="m-5 opacity-100 overflow-hidden">
					    <p className="text-[#3e3e3e] font-montserrat font-semibold text-xl text-left">
							Bagimana untuk mengetahui history transaksi?
						</p>
						<ul className="text-[#6c6c6c] font-montserrat font-medium text-lg my-4 list-disc pl-5">
							<li>
								History transaksi hanya dapat dimiliki oleh pemilik akun. Bisa
								klik menu profile pada aplikasi lalu pilih “Riwayat Transaski”
							</li>
						</ul>
						<p className="text-[#3e3e3e] font-montserrat font-semibold text-xl text-left">
                            Bagimana melakukan konsultasi online?
                        </p>
                        <ul className="text-[#6c6c6c] font-montserrat font-medium text-lg my-4 list-disc pl-5">
                            <li>
								Konsultasi dokter bisa menggunakan fitur video call maupun
								chat personal dengan dokter yang bertugas. Anda dapat
								mengirimkan foto atau gambar untuk menunjukkan kondisi kulit.
							</li>
						</ul>
						<p className="text-[#3e3e3e] font-montserrat font-semibold text-xl text-left">
							Bagimana jika dokter yang dicari tidak ada di HayyuDoc?
						</p>
                        <ul className="text-[#6c6c6c] font-montserrat font-medium text-lg my-4 list-disc pl-5">
                            <li>
                                Untuk jadwal dokter online HAYYUDoc, bisa dilihat pada menu
                                konsultasi Online.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="py-12" id="kebijakan">
                <h2 className="text-center font-bold text-[40px] text-[#038D77] font-montserrat">
                    KEBIJAKAN
                </h2>
                <div className="m-12 opacity-100 overflow-hidden grid">
					<div className="grid">
                        <h4 className="text-[#1f1f1f] font-montserrat font-bold text-2xl opacity-100 mb-4 justify-self-start">
                            Syarat dan Ketentuan
                        </h4>
                        <p className="text-[#6c6c6c] font-montserrat font-semibold text-xl opacity-100 max-w-[70vw] mb-16 justify-self-start">
							a. Platform adalah aplikasi (versi Android atau iOS), yang
							    dikelola oleh Kami sebagaimana diperbarui dari waktu ke waktu.
							<br />
							b. Koneksi internet diperlukan untuk dapat menggunakan Layanan
							    dan biaya terkait penggunaan koneksi internet tersebut
								ditanggung sepenuhnya oleh Anda. <br />
								c. Platform berfungsi sebagai sarana untuk menghubungkan Anda
								dengan kami yang menyediakan layanan atau menjual produk kepada
								Anda. <br />
							<br /><i>Lihat Selengkapnya</i>
						</p>
					</div>
					<div className="grid">
                        <h4 className="text-[#1f1f1f] font-montserrat font-bold text-2xl opacity-100 mb-4 justify-self-end text-rght">
                            Privacy
                        </h4>
						<p className="text-[#6c6c6c] font-montserrat font-semibold text-xl opacity-100 max-w-[70vw] mb-16 justify-self-end text-right">
								We are committed to maintaining the accuracy, confidentiality,
								and security of your personally identifiable information
								("Personal Information"). As part of this commitment, our
								privacy policy governs our actions as they relate to the
								collection, use and disclosure of Personal Information. Our
								privacy policy is based upon the values set by the Canadian
								Standards Association's Model Code for the Protection of
								Personal Information and Canada's Personal Information
								Protection and Electronic Documents Act.<br /><br /><i
									>Lihat Selengkapnya</i
								>
						</p>
					</div>
					<div className="grid">
						<h4 className="text-[#1f1f1f] font-montserrat font-bold text-2xl opacity-100 mb-4">
                            Delivery
                        </h4>
						<p className="text-[#6c6c6c] font-montserrat font-semibold text-xl opacity-100 max-w-[70vw] mb-16">
								All orders are subject to product availability. If an item is
								not in stock at the time you place your order, we will notify
								you and refund you the total amount of your order, using the
								original method of payment. <br /><br /><i
									>Lihat Selengkapnya</i
								>
							</p>
					</div>
					<div className="grid">
					    <h4 className="text-[#1f1f1f] font-montserrat font-bold text-2xl opacity-100 mb-4 justify-self-end text-rght">
                            Refund
                        </h4>
						<p className="text-[#6c6c6c] font-montserrat font-semibold text-xl opacity-100 max-w-[70vw] mb-16 justify-self-end text-right">
								We do not accept returns or exchanges unless the item you
								purchased is defective. If you receive a defective item, please
								contact us at [•] with details of the product and the defect.
								You can send the item you consider defective to:<br /><br /><i
									>Lihat Selengkapnya</i
								>
						</p>
					</div>
				</div>
			</section>
        </div>
		<div className="relative bg-[#dcdcdc] opacity-100"  >
			<div className="py-12" id="bantuan">
				<h2 className="text-center font-bold text-[40px] text-[#038D77] font-montserrat">
						BANTUAN
				</h2>
				<span className="block text-center font-montserrat text-[25px] font-medium leading-[30.48px]">
						Apa yang bisa kami bantu hari ini? Silahkan tulis kendala anda disini
				</span>
				<form className="grid grid-cols-1 gap-4 mt-4 max-w-6xl  mx-auto" onSubmit={handleSubmit}>
					<div className="col-start-1 col-end-7">
						<input 
							className="w-full h-[72px] px-6 py-6 rounded-xl bg-[#f0f0f0] border border-[#bebebe] focus:outline-none focus:ring-2 focus:ring-[#038D77]" 
							placeholder="Judul"  
							name="judul" 
							value={FormData.judul} 
							onChange={handleInputChange}
							type="text" 
						/>
					</div>
						<div className="col-start-1 col-end-7 mt-2">
							<textarea 
								className="w-full h-[346px] px-6 py-6 rounded-xl bg-[#f0f0f0] border border-[#bebebe] resize-none focus:outline-none focus:ring-2 focus:ring-[#038D77]"  
								placeholder="Deskripsi" 
								name="deskripsi"
								value={FormData.deskripsi} 
								onChange={handleInputChange}
							></textarea>
						</div>

						<div className="col-end-7 mt-3">
							<button type="submit" className="w-[150px] h-[68px] px-6 py-6 rounded-xl bg-[#038D77]">
								<span className="font-montserrat text-xl font-bold text-white flex items-center justify-center cursor-pointer transition-colors duration-300">
									Kirim 
								</span>
							</button>
						</div>
				</form>
			</div>
		</div>
    </>
}

export default Hero