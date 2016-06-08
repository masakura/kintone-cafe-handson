### circle.yml
* ビルドの部分
  - `docker build` で Docker Image 作ってる
  - `masakura/shopping:4cefaec` こんな名前
  
```
dependencies:
  override:
    - docker build -t $DOCKER_USER/shopping:`git rev-parse --short HEAD` .
```
