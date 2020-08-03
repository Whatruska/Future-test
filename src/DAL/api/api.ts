import axios, { AxiosInstance } from 'axios'
import { User } from '../../types/types'
const BASE_URL = 'http://www.filltext.com/'
const SMALL_SET_URL = '?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
const BIG_SET_URL = '?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
class API {
    private api :AxiosInstance
    constructor () {
      this.api = axios.create({
        baseURL: BASE_URL
      })
    }

    private getSet = (url:typeof BIG_SET_URL | typeof SMALL_SET_URL): Promise<Array<User>> => {
      return this.api.get(url).then(resp => resp.data)
    }

    public getBigSet = (): Promise<Array<User>> => {
      return this.getSet(BIG_SET_URL)
    }

    public getSmallSet = (): Promise<Array<User>> => {
      return this.getSet(SMALL_SET_URL)
    }
}

export default new API()
