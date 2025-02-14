import AnimacaoSaldo from '../Components/AnimacaoSaldo'
import styles from '@/styles/dasbodrd.module.css'
interface TotalConta {
    saldoDisponivel: number,
    legenda?: string
}

export default function TotalConta({ legenda, saldoDisponivel }: TotalConta) {
    return (
        <>
            <div className={styles.balaco}>
                <h1 className={`${styles.balacotitle}`} >{legenda} </h1>
                <p className={`${styles.balacovalor}`}>
                    <AnimacaoSaldo amount={saldoDisponivel} />
                </p>
            </div>
        </>
    )
}