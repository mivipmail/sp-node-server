const rp = require('request-promise');
import {capitalizeFirst} from '../utils/helpers'


class CdekIntegrator {
    authorization: string | null | undefined

    getToken = async (): Promise<boolean> => {
        try {
            const options = {
                method: 'POST',
                uri: process.env.CDEK_AUTH_URL,
                form: {
                    grant_type: 'client_credentials',
                    client_id: process.env.CDEK_ACCOUNT,
                    client_secret: process.env.CDEK_SECURE_PASSWORD
                },
                json: true // Automatically parse the body to JSON
            };

            const data = await rp(options)

            this.authorization = `${capitalizeFirst(data.token_type)} ${data.access_token}`
        } catch (e) {
            this.authorization = null
        }

        return !!this.authorization
    }

    getAddresses = async () => {
        try {
            const options = {
                method: 'GET',
                uri: `${process.env.CDEK_URL}/v2/deliverypoints`,
                headers: {
                    authorization: this.authorization,
                    accept: 'application/json',
                },
                qs: {
                    type: 'PVZ',
                    have_cash: 'true',
                    allowed_cod: 'true',
                    is_handout: 'true',
                },
                json: true // Automatically parse the body to JSON
            };

            const data = await rp(options)

            if (!!data.length)
                return data
        } catch (e) {
            console.log(e)
        }

        return null
    }

    getCourierPrice = async (cityId: number): Promise<number | null> => {
        try {
            const options = {
                method: 'POST',
                uri: `${process.env.CDEK_URL}/v2/calculator/tariff`,
                headers: {
                    'authorization': this.authorization,
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: {
                    'tariff_code': 137,
                    'from_location': {
                        'code': 431,
                    },
                    'to_location': {
                        'code': cityId,
                    },
                    'packages': [
                        {
                            'weight': 600,
                            'length': 78,
                            'width': 38,
                            'height': 1,
                        }
                    ],
                },
                json: true // Automatically parse the body to JSON
            };

            const data = await rp(options)

            return data.delivery_sum ?? null
        } catch (e) {
            console.log(e)
        }

        return null
    }
}

module.exports = {
    cdekIntegrator: new CdekIntegrator()
}