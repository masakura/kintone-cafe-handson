### Dockerfile
* アプリに必要なライブラリをインストール
  - Node.js Express とか...
  - 何が必要なライブラリかは `package.json` にある

```
ADD package.json package.json
RUN npm install --no-progress && rm -rf /root/.npm
```
