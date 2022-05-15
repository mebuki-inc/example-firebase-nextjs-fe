/**
 * ToDo: 適宜修正する
 */
export type Config = {
  /**
   * REST APIのhostを指定
   * 形式: https://api.example.com
   * ※ 末尾の / は入れない
   */
  apiHost: string

  /**
   * ToDo: 以下を参考にFirebaseの設定を記載する
   * https://firebase.google.com/docs/web/learn-more#config-object
   */
  firebase: {
    apiKey: string
    authDomain: string
    databaseURL: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
  }
}
