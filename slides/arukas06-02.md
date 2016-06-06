### circle.yml
* デプロイの部分
  - `docker login` でログインしている
  - `docker push` でイメージを Docker Hub にプッシュ
  
```
deployment:
  hub:
    commands:
      - docker login -e $DOCKER_EMAIL -u $DOCKER_USER -p $DOCKER_PASS
      - docker push masakura/prototype1:`git rev-parse --short HEAD`
```
