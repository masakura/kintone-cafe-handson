### circle.yml
* デプロイの部分
  1. `docker login` でログイン
  2. `docker push` でイメージを Docker Hub にプッシュ
  
```
deployment:
  hub:
    commands:
      - docker login -e $DOCKER_EMAIL -u $DOCKER_USER -p $DOCKER_PASS
      - docker push $DOCKER_USER/shopping:`git rev-parse --short HEAD`
```
