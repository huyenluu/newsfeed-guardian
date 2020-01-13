import qs from 'query-string'
import axios from 'axios'
import {GUARDIAN_API_KEY} from './variables'

export const GUARDIAN_API_URL = 'https://content.guardianapis.com'
export const API_KEY =  GUARDIAN_API_KEY

export function search (params) {
    
    const searchString = qs.stringify(params)
    const url = GUARDIAN_API_URL + '/search?' + searchString

    return axios(url,{
        'Access-Control-Allow-Origin': GUARDIAN_API_URL
    })
}
export function searchItem(id,params) {

    const searchString = qs.stringify(params)
    
    const url = GUARDIAN_API_URL +`/${id}?`+searchString
    return axios(url,{
        'Access-Control-Allow-Origin': GUARDIAN_API_URL
    })
} 