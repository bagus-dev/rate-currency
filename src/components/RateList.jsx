import React, { useEffect, useState } from "react";
import axios from "axios";

const RateList = () => {
    const [rates, setRates] = useState([])

    useEffect(() => {
        const fetchRate = async () => {
            const result = await axios.get('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=0feb0ef1807b45bca0b2d969b80af039')
                                .then(response => {
                                    const obj = Object.keys(response.data.rates)
                                                    .filter(key => key ==="CAD" || key === "EUR" || key ==="IDR" || key === "JPY" || key === "CHF" || key ==="GBP")
                                                    .reduce((obj, key) => {
                                                        return Object.assign(obj, {
                                                            [key]: response.data.rates[key]
                                                        })
                                                    }, {})
                                    
                                    setRates(Object.keys(obj).map(key => ({curr: key, rate: obj[key], buy: parseFloat(obj[key]) + (parseFloat(obj[key]) * 0.05), sell: parseFloat(obj[key]) - (parseFloat(obj[key]) * 0.05)})))
                                })
        }

        fetchRate()
        
    }, [])

    console.log(rates)

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col text-center">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Currency</th>
                                    <th>We Buy</th>
                                    <th>Exchange Rate</th>
                                    <th>We Sell</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rates.map((rate, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{rate.curr}</td>
                                                <td>{rate.buy}</td>
                                                <td>{rate.rate}</td>
                                                <td>{rate.sell}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                        <p>
                            Rates are based from 1 USD.
                            <br />
                            This application uses API from <a href="https://currencyfreaks.com" target="_blank">https://currencyfreaks.com</a>.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RateList