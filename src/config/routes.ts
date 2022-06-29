type Routes = Readonly<
  {
    /** パスの正規表現 */
    pattern: string
    /** next/link, next/routerのhrefに当たる文字列 */
    href: string
    /** ログインが必要なパスかどうか true: ログイン必要, false: ログイン不要 */
    login: boolean
  }[]
>

/**
 * アプリケーションのパス一覧
 */
export const ROUTES: Routes = [
  /**
   * ログインが不要なパス
   */
  /** Home画面 */
  { pattern: '^/$', href: '/', login: false },

  /** ログイン画面 */
  { pattern: '^/login/?$', href: '/login', login: false }

  /**
   * ログインが必要なパス
   */
] as const
