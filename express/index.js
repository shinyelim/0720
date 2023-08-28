//Express 라이브러리 사용해서 서버 구축
//폴더생성 => cd로 해당 폴더로 경로 이동
//cd, cd .., ls
//npm init => npm install express (express 라이브러리 설치 명령어)
//express로 서버 만드는 문법
const express = require('express');
const app = express();

//port(컴퓨터에는 외부 네트워크랑 통신을 할 수 있는 여러개의 구멍이 있는데, 그 중에 내가 몇번째 port로 접속할건지 번호)
//7천~8천사이를 많이 씀
//listen이라는 함수를 사용해서 서버를 오픈해준다.
//listen(para1,para2)
//para1:서버를 띄울 포트 번호
//para2:콜백함수를 받아서 실행할 코드를 작성
//내 컴퓨터에서 7000 포트로 진입했을때 콜백함수 안에 있는 코드로 실행
//locoalhost:7000(port, number(숫자))
app.listen(7000,function () {
  console.log('7000번 포트')

})
//서버에 Get이라는 요청으로 정보 받아오기

app.get('/',function (requests,respones) {
  respones.sendFile(__dirname + '/index.html')
})
//서버를 잘 불려오는 확인하고 싶을때 함수
//유저가 localhost:7000으로 접속하면 send,sendFilp() 안 내용을 '보여준다.'
//sub페이지에도 사용할수있다.
//app.get('경로',Function('요청'){'응답'})
//slach/ 는 메인경로 의미한다.(localhost:7000 => /7000)
app.get('/test' , function (requests, respones) {
  respones.send('text 페이지 입니다.')
})

app.get('/login', function (requests, respones) {
  respones.sendFile(__dirname + '/login.html')
})

//
app.get('/map',function (requests, respones) {
  respones.sendFile(__dirname + '/map.html')
})
app.get('/0828', function (requests,respones) {
  respones.sendFile(__dirname + '/0828.html')
})

//./login 경로로 접속했을때 login.html 파일이 보이게 화면

//서버 종료 => crtrl + C
//서버 재실행 자동화
//npm install -g nodemon
//node index.js => nodemon index.js
//-g(global)의 약자로서, 컴퓨터 전역에서 이용 가능하게 설치
//서버:요청한 정보를 보내주는 프로그램
//HTTP 요청 방식 4가지
//get(읽기) 2.post(쓰기) 3.put(수정) 4.Delete(삭제)

//node.js
//node.js = javascript runtime 
//javascript는 프로그래밍적 연산을 하기 위한 언어가 아니고, HTML 조작하기 위해 만들어진 언어임.
//javascript 언어는 브라우저(인터넷서버들)가 해석한다.
//크롬 브라우저에 V8 엔진에서 브라우저 환경 외에 다른환경에서도 사용할수있도록 node.js를 만들었음
//node의 큰 장점
//가벼운 요청부터 먼저 처리해줌
//단점
//이미지,동영상,연산처리가 필요한 서비스를 개발해야 될 경우, 속도도 떨어지고, 라이브러리도 부족해짐 ->파이썬으로 주로 사용

