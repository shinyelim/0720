// 서버 : 요청한 정보를 보내주는 프로그램
// HTTP 요청 방식 네가지
// 1. GET(읽기)
// 2. POST(쓰기)
// 3. PUT(수정)
// 4. DELETE(삭제)

// Node.js : Javascript runtime
// Javascript는 프로그래밍적 연산을 하기 위한 언어가 아니고, 
// HTML을 조작하기 위해 만들어진 언어다.
// Javascript는 브라우저가 해석한다. (크롬, 사파리, 엣지, 파이어폭스 등)
// 크롬 브라우저V8 엔진에서 브라우저 환경 외에 다른 환경에서도 
// 사용할 수 있도록 Node.js를 만들었다.

// Node.js 장단점
// 장점 : 가벼운 요청부터 먼저 처리
// 단점 : 이미지, 동영상, 연산처리가 필요한 서비스를 개발해야 될 경우,
// 속도가 떨어지고, 라이브러리도 부족하다. (-> python 사용)

// Express 라이브러리로 서버 구축
// 폴더 생성 -> cd로 해당 폴더로 경로 이동
// cd 폴더명
// cd(Change Directory), cd .., ls

// npm init => package.json 파일 생성된다.
// npm init 후 쭉 엔터 entry point 부분에 작성된 파일명과 
// package.json 파일에 작성된 "main": "index.js", 파일명이 동일해야한다.
// 다른 이름으로 파일 생성 했을 경우, package.josn 파일에서 파일명 수정!

// npm install express  => node_modules 생성된다.
// npm : 라이브러리를 설치하기 위한 도구
// node_modules : 라이브러리 사용할 때 필요한 것들이 담긴 폴더

// express로 서버 만드는 문법
const express =  require('express');
const app = express();

// port : 컴퓨터에는 외부 네트워크랑 통신을 할 수 있는 여러개의 구멍이 있는데,
//  그 중에 몇 번째 port로 접속할건지 지정 해줘야 한다.

// listen이라는 함수로 서버를 열어준다.
// listen(para1, para2)
// para1 : 서버를 띄울 포트 번호
// para2 : 실행 할 코드

// 내 컴퓨터에서 7000번 포트로 진입 했을 때,
// 콜백함수 안에 있는 코드 실행
// localhost:7000(port number)
// app.listen(7000, function(){
//   console.log('7000번 포트')
// })


// 폴더 내 모든 정적 파일 제공(js, css, image, fonts)
app.use(express.static(__dirname))


// 서버에 GET 요청하기
// localhost:7000으로 접속하면 send, sendFile() 안 내용을 보여준다.
// app.get('경로', function(){})
// requests(요청), response(응답)
// slash / 는 메인 경로 (localhost:7000)
// app.get('/', function(requests, response){
//   response.sendFile(__dirname + '/index.html');
// })

// // 'localhost:7000/test' 로 접속시 실행 할 코드
// app.get('/test', function(requests, response){
//   response.send('Test 페이지 입니다.')
// })


// 서버 종료 => ctrl + c
// 서버 재실행 자동화(nodemon)
// -g(global)로 컴퓨터 전역에서 이용 가능하도록 설치
// npm install -g nodemon
// node index.js => nodemon index.js


// powershell 보안 에러
// 에러 원인 : Restricted일 때 허가된 script외에 막아버리기 때문에 에러가 발생한다.

// 검색 -> powershell(관리자 권한으로 실행)
// executionpolicy 
// set-executionpolicy unrestricted => enter
// y => enter


// localhost:7000/login 으로 접속시 보여줄 화면 => login.html
app.get('/login', function(requests, response){
  response.sendFile(__dirname + '/login.html')
})

// localhost:7000/map 으로 접속시 보여줄 화면 => map.html
// map.html : 카카오 지도 OPEN API
// app.get('/map', function(requests, response){
//   response.sendFile(__dirname + '/map.html')
// })


// POST
// body-parser : 요청 데이터 해석을 도와주는 라이브러리
// body-parser 라이브러리 설치
// npm install body-perser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

// input 값을 서버에 전송하려면 input 태그에 name="" 속성 추가
// name="id", name="pw"

// app.post('경로', fucntion(){})
// input에 작성된 내용은 requests 파라미터가 가지고 있다.
// '/add'경로 => form 태그 action="/add" (add 경로로 post 요청)
// app.post('/add', function(requests, response){
//   response.send('전송완료!')
//   console.log(requests.body)
// })

// 서버한테 정보를 보내주는 코드
// 서버에 보낸 정보를 영구 저장 하려면 DB(Data Base)에 저장


// url 이름짓기
// 1. URL 명사로 작성 추천 '/명사'
// 2. 하위 문서를 나타낼 때 / slash (하위폴더 나누듯이 사용)
// 3. 파일 확장자 사용 X (.html, .css 등)
// 4. 띄어쓰기 대신 (-) 사용
// 5. 자료 하나당 하나의 URL 사용
// 6. URL을 봤을 때 어떤 페이지인지 알 수 있어야 한다.

// MongoDB
// npm install mongodb@3.6.4
const MongoClient = require('mongodb').MongoClient;

// 데이터를 저장할 변수 하나 선언
let db;

// Database access에서 만든 아이디 : 비밀번호
MongoClient.connect('mongodb+srv://admin:o9yu&t6*@cluster0.qtstpwq.mongodb.net/?retryWrites=true&w=majority', function(error, client){
  // 커넥션 에러의 99.9%가 url 오타
  if(error) {
    return console.log(error)
  }

  db = client.db('DataBase');
  app.listen('7070', function(){
    console.log('전송 완료!')
  })
})
app.post('/add', function(requests, response){
  console.log(requests.body)
  response.send('전송 완료!')

  // DB에서 total collection 총 데이터 수 꺼내오기.
  // 데이터를 전부 찾고 싶다면 find(), 하나만 찾고 싶으면 findOne()
  // name이 totalData인 데이터를 찾아달라는 쿼리문
  db.collection('wrap').findOne({name : 'wrapLength'}, function(error, result){
    console.log(result.wrapData) // total collection있는 총 데이터 수
    let wrapDataLength = result.wrapData;

    db.collection('post').insertOne({_id : wrapDataLength + 1 ,아이디 : requests.body.id, 비밀번호 : requests.body.pw}, function(error, result){
      console.log('db에 저장완료!')
    })
  
    // 새로운 데이터가 저장 됐을 때 total collection에 있는 totalData + 1
    // .updateOne({변경 할 데이터}, {$inc : {수정값}})
    // update operator(연산자) $set, $inc(증가) 등 여러가지 
    // {$set : {totalData : 변경 할 값}}
    // {$inc : {totalData : 기존값에 더해줄 값}}
    db.collection('wrap').updateOne({name : 'wrapLength'}, { $inc : { wrapData : 1}},function(error, result){
      if(error) {
        return console.log(error)
      }
    })
  })
})

// /add로 접속하면 GET 요청으로 DB에 저장된 데이터를 보여준다.
// npm install ejs
// .html -> .ejs
app.set('view engine', 'ejs');

app.get('/add', function(requests, response){
  // post라는 collection에 저장된 데이터를 꺼낸다.
  db.collection('post').find().toArray(function(error, result){
    console.log(result)
    response.render('data.ejs', {log : result})
  })


})
app.delete('/delete', function (requests,response) {
  console.log(requests.body)
  //close 버튼을 클릭했을때 삭제되는것을 저장
  requests.body._id = parseInt(requests.body._id)
  db.collection('post').deleteOne({_id : requests.body._id }, function (error,result) {
    if (error) {
      console.log(error)
    }
    console.log('삭제완료!')
  })
  response.status(200).send({message : '성공적'})
  //서버에서 응답코드로 요청의 상태를 표시함//
  //200번호는 에러없이 요청을 성공적인 상태를 표시하는 응답코드
  //404는 이용자의 문제로 요청 실패 응답코드
  //500는 서버문제로 요청실패 응답코드
  //삭제버튼이 클릭된 해당요소의 데이터가 삭제
})

//데이터를 전부 찾고싶으면 find()
//하나만 찾고싶으면 findOne()
//name wrapData 인 데이터를 찾아달라는 쿼리문 
//db에서 데이터를 찾는것을 쿼리문이라고 불림
// app.post('/add', function(requests, response){
//   console.log(requests.body)
//   response.send('전송 완료!')
//   //from에서 /add 경로로 post 요청을 하면, DB에서 'db명' collection에 있는 총 데이터 수를 찾아서
//   //wrapDataLength 라는 변수에 그 값을 저장
//   //post라는 collection에 새로운 데이터가 들어올 경우 
//   //_id 값을 wrapDataLength에 1 증가한 값으로 넣어주고
//   //wrap collection의 wrapData + 1씩 증가해준다.
//   db.collection('wrap').findOne({name : 'wrapLength'}), function (error,result) {
//     console.log(result.wrapData) //db명 collection있는 총 데이터 수를 확인하는것
//     let wrapDateLength = result.wrapData;


//   }

//   db.collection('post').insertOne({  _id : 1,아이디 : requests.body.id, 비밀번호 : requests.body.pw}, function(error, result){
//     console.log('db에 저장완료!')
 
// //UpdateOne({변경할데이터},{$inc{수정값}})
// //update operator(연산자)
// //$set, $inc(증가) 등 여러가지
// //{$set: {totalData : 변경 할 값}}
// //$set: 어느숫자든 1로 리셋시킨다. 
// //{$inc: {totalData : 변경 할 값}} EX)inc과 달리 문자도 적용된다.
// //$inc: 데이터가 들어올때마다 기존에 있는 값을 더해줌 EX)단 숫자만 적용됨 
// //$inc,$set 둘 다 연산자이다.


//   db.collection('wrap').updateOne({name : 'wrapLength'}, { $inc : { wrapData : 1}},function(error, result){
//     if(error) {
//       return console.log(error)
//     }
//   })
// })
// })

// // /add로 접속하면 GET 요청으로 DB에 저장된 데이터를 보여준다.
// // npm install ejs
// // .html -> .ejs
// app.set('view engine', 'ejs');

// app.get('/add', function(requests, response){
//   // post라는 collection에 저장된 데이터를 꺼낸다.
//   db.collection('post').find().toArray(function(error, result){
//     console.log(result)
//     response.render('data.ejs', {log : result})
//   })
// //   db.collection('wrap').updataOne({name : 'datalength'}),{$inc : {wrapData : 1}},function (error,result) {
// //     if (error) {
// //        return console.log(error)
// //     }
// //   }
//  })
 


