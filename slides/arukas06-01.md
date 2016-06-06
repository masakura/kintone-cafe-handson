### circle.yml
* ビルドの部分
  - `docker build` で Docker Image 作ってる
  - `masakura/shopping:4cefaec` こんな名前
  
```
dependencies:
  override:
    - docker build -t masakura/shopping:`git rev-parse --short HEAD` .
```
