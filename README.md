## 概要
Firebase x Next.js App

## 備考
### storyShotsについて
mswでのstoryshotsを行うため少々ハック気味の実装を行っています。
- 各handlers.ts にて下記方法でloading状態を実現 <br>通常何かしらの値を返すべきところ、何も返さないことでloadingの挙動を偽装しています
- storybook.test.ts にて再描画を待ってからsnapshotを行う<br>DOMはloadingの後にsuccess/errorをrenderするので、2回目のrenderが終わってからsnapshotを行っています