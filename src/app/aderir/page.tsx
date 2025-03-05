import { Header } from "@/Components/Header";
import Link from "next/link";
import styles from "@/styles/escolher_adesao.module.css";

const AderirPage = () => {
  return (
    <div className="relative">
      <Header />
      <div className="bg-gradient-to-br from-blue-200 to-blue-100 min-h-screen">
        <div className="max-w-[1000px] mx-auto px-6 flex flex-col items-center md:flex-row gap-4 py-6 min-h-96  ">
          <Link href="/email" className={styles.cartao}>
            <div className={styles.informacaoCartao}>
              <h1>Abrir Conta Bancária</h1>
              <p>O seu banco na palma da sua mão.</p>
            </div>
            <div className={styles.iconeContainer}>
              <svg data-v-3dbd7524="" fill="none" viewBox="0 0 115 120" className={styles.icone}>
                <path
                  fill="var(--secondary-light-3)"
                  fillRule="evenodd"
                  d="M57.5 1.91 2.672 43.077v7.933H17.7v55.175H3c-.552 0-1 .444-1 .993v9.357c0 .548.448.993 1 .993h109c.552 0 1-.445 1-.993v-9.357a.996.996 0 0 0-1-.993H97.301V51.011h15.027v-7.933L57.5 1.91Z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="var(--color-primary)"
                  fillRule="evenodd"
                  d="M56.595.721a1.508 1.508 0 0 1 1.81 0l54.827 41.17c.375.281.596.72.596 1.188v7.932c0 .823-.672 1.49-1.5 1.49H98.801v52.195H112c1.381 0 2.5 1.112 2.5 2.483v9.357a2.492 2.492 0 0 1-2.5 2.483H3c-1.38 0-2.5-1.112-2.5-2.483v-9.357a2.492 2.492 0 0 1 2.5-2.483h13.2V52.501H2.671c-.828 0-1.5-.667-1.5-1.49V43.08c0-.467.22-.907.596-1.188L56.595.72ZM4.172 43.82v5.702H17.7c.829 0 1.5.667 1.5 1.49v55.174c0 .823-.671 1.489-1.5 1.489H3.5v8.365h108v-8.365H97.301c-.828 0-1.5-.666-1.5-1.489V51.011c0-.822.672-1.49 1.5-1.49h13.527V43.82L57.5 3.777 4.172 43.82Z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="var(--secondary-light-3)"
                  d="M67.006 28.635c0 5.213-4.256 9.44-9.506 9.44s-9.506-4.227-9.506-9.44c0-5.213 4.256-9.44 9.506-9.44s9.506 4.227 9.506 9.44Z"
                ></path>
                <path
                  fill="var(--color-primary)"
                  fillRule="evenodd"
                  d="M57.5 20.684c-4.422 0-8.006 3.56-8.006 7.95 0 4.391 3.584 7.95 8.006 7.95 4.421 0 8.006-3.559 8.006-7.95 0-4.39-3.585-7.95-8.006-7.95Zm-11.006 7.95c0-6.036 4.928-10.929 11.006-10.929s11.006 4.893 11.006 10.93c0 6.035-4.928 10.929-11.006 10.929s-11.006-4.894-11.006-10.93ZM39.278 52.08a2.491 2.491 0 0 1 2.5-2.482h31.444c1.38 0 2.5 1.111 2.5 2.482v52.821a2.492 2.492 0 0 1-2.5 2.483H41.778c-1.38 0-2.5-1.112-2.5-2.483v-52.82Zm3 .497v51.828h30.444V52.577H42.278Z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="var(--secondary-light-3)"
                  fillRule="evenodd"
                  d="M57.5 63.204a.99.99 0 0 1 .428-.814L72.65 52.18c.663-.46 1.572.012 1.572.815v52.384c0 .325-.16.629-.427.815l-14.722 10.209c-.663.46-1.573-.011-1.573-.814V63.204Z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="var(--color-primary)"
                  fillRule="evenodd"
                  d="M72.722 53.947 59 63.463v51.174l13.722-9.517V53.947Zm-.931-2.988c1.657-1.149 3.931.028 3.931 2.036v52.384a2.48 2.48 0 0 1-1.068 2.036l-14.722 10.209c-1.658 1.15-3.932-.028-3.932-2.035V63.204c0-.81.4-1.57 1.069-2.035l14.722-10.21Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </Link>
          <Link href="/adesao/email" className={styles.cartao}>
            <div className={styles.informacaoCartao}>
              <h1>Aderir ao BPA Net</h1>
              <p>Se já é cliente BPA pode aderir ao BPA Net sem ir ao balcão.</p>
            </div>
            <div className={styles.iconeContainer}>
            <svg data-v-3dbd7524="" fill="none" viewBox="0 0 115 118" className={styles.icone}>
                <path
                  fill="var(--color-primary)"
                  d="M56.832.844a1.2 1.2 0 1 1 1.437 1.923L56.832.844ZM2.672 42.837l.72.961a1.2 1.2 0 0 1-.72.24v-1.2Zm-.172 0H1.3a1.2 1.2 0 0 1 1.2-1.2v1.2Zm0 7.727v1.2a1.2 1.2 0 0 1-1.2-1.2h1.2Zm15.213 0v-1.2a1.2 1.2 0 0 1 1.2 1.2h-1.2Zm0 54.838h1.2a1.2 1.2 0 0 1-1.2 1.2v-1.2Zm-15.713 0H.8a1.2 1.2 0 0 1 1.2-1.2v1.2Zm0 11.274v1.2a1.2 1.2 0 0 1-1.2-1.2H2Zm55.55-1.2a1.2 1.2 0 0 1 0 2.4v-2.4Zm-8.787-64.912v-1.2a1.2 1.2 0 0 1 1.2 1.2h-1.2Zm0 54.838h1.2a1.2 1.2 0 0 1-1.2 1.2v-1.2Zm-13.476 0v1.2a1.2 1.2 0 0 1-1.2-1.2h1.2Zm0-54.838h-1.2a1.2 1.2 0 0 1 1.2-1.2v1.2ZM58.269 2.767 3.39 43.798l-1.437-1.922L56.832.844l1.437 1.923ZM2.673 44.037H2.5v-2.4h.173v2.4Zm1.027-1.2v7.727H1.3v-7.727h2.4Zm-1.2 6.527h15.213v2.4H2.5v-2.4Zm16.413 1.2v54.838h-2.4V50.564h2.4Zm-1.2 56.038H2v-2.4h15.713v2.4Zm-14.513-1.2v11.274H.8v-11.274h2.4ZM2 115.476h55.55v2.4H2v-2.4Zm47.963-64.912v54.838h-2.4V50.564h2.4Zm-1.2 56.038H35.287v-2.4h13.476v2.4Zm-14.676-1.2V50.564h2.4v54.838h-2.4Zm1.2-56.038h13.476v2.4H35.287v-2.4Z"
                ></path>
                <path
                  stroke="var(--color-primary)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.4"
                  d="M57.68 18.946c-5.256 0-9.515 4.201-9.515 9.383 0 5.181 4.26 9.382 9.514 9.382v0"
                ></path>
                <path
                  fill="var(--secondary-light-3)"
                  fillRule="evenodd"
                  d="m58 1.806 54.877 41.031h.173v7.727H97.837v54.838h15.713v11.274H58m8.787-66.112v54.838h13.476V50.564H66.787Z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="var(--color-primary)"
                  d="M58.718.844a1.2 1.2 0 0 0-1.437 1.923L58.72.844Zm54.159 41.993-.718.961c.207.155.459.24.718.24v-1.2Zm.173 0h1.2a1.2 1.2 0 0 0-1.2-1.2v1.2Zm0 7.727v1.2a1.2 1.2 0 0 0 1.2-1.2h-1.2Zm-15.213 0v-1.2a1.2 1.2 0 0 0-1.2 1.2h1.2Zm0 54.838h-1.2a1.2 1.2 0 0 0 1.2 1.2v-1.2Zm15.713 0h1.2a1.2 1.2 0 0 0-1.2-1.2v1.2Zm0 11.274v1.2a1.2 1.2 0 0 0 1.2-1.2h-1.2Zm-55.55-1.2a1.2 1.2 0 0 0 0 2.4v-2.4Zm8.787-64.912v-1.2a1.2 1.2 0 0 0-1.2 1.2h1.2Zm0 54.838h-1.2a1.2 1.2 0 0 0 1.2 1.2v-1.2Zm13.476 0v1.2a1.2 1.2 0 0 0 1.2-1.2h-1.2Zm0-54.838h1.2a1.2 1.2 0 0 0-1.2-1.2v1.2ZM57.281 2.767l54.878 41.031 1.437-1.922L58.718.844l-1.437 1.923Zm55.596 41.27h.173v-2.4h-.173v2.4Zm-1.027-1.2v7.727h2.4v-7.727h-2.4Zm1.2 6.527H97.837v2.4h15.213v-2.4Zm-16.413 1.2v54.838h2.4V50.564h-2.4Zm1.2 56.038h15.713v-2.4H97.837v2.4Zm14.513-1.2v11.274h2.4v-11.274h-2.4Zm1.2 10.074H58v2.4h55.55v-2.4ZM65.587 50.564v54.838h2.4V50.564h-2.4Zm1.2 56.038h13.476v-2.4H66.787v2.4Zm14.676-1.2V50.564h-2.4v54.838h2.4Zm-1.2-56.038H66.787v2.4h13.476v-2.4Z"
                ></path>
                <path
                  fill="var(--color-primary)"
                  d="M57.786 36.507a1.2 1.2 0 1 0 .03 2.4l-.03-2.4Zm.015-17.564h-1.2a1.2 1.2 0 0 0 1.185 1.2l.015-1.2ZM59 1.806a1.2 1.2 0 0 0-2.4 0H59Zm-2.4 114.871a1.2 1.2 0 1 0 2.4 0h-2.4Zm2.4-78.97a1.2 1.2 0 0 0-2.4 0H59ZM56.6 6.09a1.2 1.2 0 1 0 2.4 0h-2.4Zm2.4 8.569a1.2 1.2 0 1 0-2.4 0H59Zm1.92 6.129a1.2 1.2 0 0 0 .925-2.215l-.924 2.215Zm6.66 3.488a1.2 1.2 0 0 0-2.213.928l2.213-.928Zm-2.213 7.17a1.2 1.2 0 1 0 2.213.928l-2.213-.929Zm-3.522 6.63a1.2 1.2 0 1 0-.924-2.214l.924 2.215ZM56.6 40.999a1.2 1.2 0 1 0 2.4 0h-2.4Zm2.4 6.58a1.2 1.2 0 1 0-2.4 0H59Zm-2.4 6.581a1.2 1.2 0 1 0 2.4 0h-2.4ZM59 60.74a1.2 1.2 0 0 0-2.4 0H59Zm-2.4 6.58a1.2 1.2 0 1 0 2.4 0h-2.4Zm2.4 6.582a1.2 1.2 0 0 0-2.4 0H59Zm-2.4 6.58a1.2 1.2 0 1 0 2.4 0h-2.4Zm2.4 6.581a1.2 1.2 0 1 0-2.4 0H59Zm-2.4 6.581a1.2 1.2 0 1 0 2.4 0h-2.4Zm2.4 6.581a1.2 1.2 0 0 0-2.4 0H59Zm-2.4 6.581a1.2 1.2 0 1 0 2.4 0h-2.4Zm2.4 6.581a1.2 1.2 0 1 0-2.4 0H59ZM56.6 1.806V6.09H59V1.806h-2.4Zm0 12.853v4.284H59V14.66h-2.4Zm1.185 5.484a8.394 8.394 0 0 1 3.136.645l.924-2.215a10.794 10.794 0 0 0-4.03-.83l-.03 2.4Zm7.582 5.061c.403.96.625 2.014.625 3.12h2.4c0-1.431-.288-2.8-.812-4.048l-2.213.928Zm.625 3.12c0 1.108-.222 2.161-.625 3.121l2.213.93a10.44 10.44 0 0 0 .812-4.05h-2.4Zm-5.071 7.538a8.394 8.394 0 0 1-3.136.645l.03 2.4a10.794 10.794 0 0 0 4.03-.83l-.924-2.215ZM56.6 37.707v3.29H59v-3.29h-2.4Zm0 9.871v6.581H59v-6.58h-2.4Zm0 13.162v6.58H59v-6.58h-2.4Zm0 13.162v6.58H59v-6.58h-2.4Zm0 13.161v6.581H59v-6.58h-2.4Zm0 13.162v6.581H59v-6.581h-2.4Zm0 13.162v3.29H59v-3.29h-2.4Z"
                ></path>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};



{/* <div>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold">Email</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Bem-vindo ao nosso Internet Banking! Vamos configurar sua conta em poucos passos
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Para começar sua adesão, informe o e-mail vinculado à sua conta BPA
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Seu email"
          />
        </div>
      </div>
    </div> */}

export default AderirPage;
