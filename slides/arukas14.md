### Blue-Green Deployment
今回はハンズオンのための構成だけど、実際はこんな感じになるんじゃないかな?

* コミットでは Docker Image が作られるだけ (捨てる)
* タグが打たれた時に Docker Hub に Push する
  - Arukas のアプリは `release` と `testing` で二つ用意する
  - タグが `release-*` の時は本番アプリで Arukas Update
  - タグが`testing-*` の時はテストアプリで Arukas Update
* `testing-*` でテストをして、`release-*` タグを打つ
  - 自動でアップデートされ、リリース完了!
