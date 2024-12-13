import AnimacaoSaldo from '../Components/AnimacaoSaldo'

interface TotalConta {
    saldoDisponivel: number
}

export default function TotalConta({ saldoDisponivel }: TotalConta) {
    return (
        <>
            <section className="total-balance">


                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="total-balance-label" >Saldo contabilistico </p>
                        <p className="total-balance-amount flex-center gap-2 ">
                            <AnimacaoSaldo amount={saldoDisponivel} />
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="total-balance-label" >Saldo Toltal disponivel </p>
                        <p className="total-balance-amount flex-center gap-2 ">
                            <AnimacaoSaldo amount={saldoDisponivel} />

                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="total-balance-label" >Saldo Toltal disponivel </p>
                        <p className="total-balance-amount flex-center gap-2 ">
                            <AnimacaoSaldo amount={saldoDisponivel} />

                        </p>
                    </div>
                </div>


            </section>
        </>
    )
}