import axios, { AxiosRequestHeaders, AxiosResponseHeaders } from 'axios'

import { getConfig } from './config'

type MutateMethod = 'post' | 'put' | 'patch' | 'delete'

export type Success<T> = {
  status: number
  body: T
  headers: AxiosResponseHeaders
  error: false
}

type Error = {
  status: number
  body?: any
  headers?: AxiosResponseHeaders
  error: true
}

/**
 * WebAPIからデータを取得する
 *
 * @param path APIのパス（先頭の'/'は含める）
 * @param headers HTTPリクエストのヘッダー
 * @param params Queryパラメータ
 */
export const fetch = async <R>(
  path: string,
  headers?: AxiosRequestHeaders,
  params?: Record<string, string>
): Promise<Success<R> | Error> => {
  const { apiHost } = getConfig()
  if (!apiHost) {
    return {
      status: 0,
      error: true
    }
  }
  const url = `${apiHost}${path}`
  try {
    const r = await axios.get<R>(url, { headers, params })
    return {
      status: r.status,
      body: r.data,
      headers: r.headers,
      error: false
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status ?? 0,
        headers: err.response?.headers,
        error: true
      }
    }
    return {
      status: 0,
      error: true
    }
  }
}

/**
 * WebAPIを通じてデータを作成・更新・置換・削除する
 *
 * @param method HTTPメソッド（post, put, patch, deleteのみ）
 * @param path APIのパス（先頭の'/'は含める）
 * @param headers HTTPリクエストヘッダー
 * @param body HTTPリクエストボディ
 */
export const mutate = async <B, R>(
  method: MutateMethod,
  path: string,
  headers?: AxiosRequestHeaders,
  body?: B
): Promise<Success<R> | Error> => {
  const { apiHost } = getConfig()
  if (!apiHost) {
    return {
      status: 0,
      error: true
    }
  }
  const url = `${apiHost}${path}`
  try {
    const r = await axios({
      method,
      url,
      headers,
      data: body
    })
    return {
      status: r.status,
      body: r.data,
      headers: r.headers,
      error: false
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        status: err.response?.status ?? 0,
        headers: err.response?.headers,
        error: true
      }
    }
    return {
      status: 0,
      error: true
    }
  }
}
