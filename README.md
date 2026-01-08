<div align="center">
<!-- logo -->
<h1>POPPOP - 팝업스토어 통합 플랫폼</h1>

[홈페이지](http://poppop.shop/popup-stores)  |  [swagger](http://localhost:8080/swagger-ui/index.html#/)  |  [notion](https://www.notion.so/ohgiraffers/Project-Null-27d649136c118006889bef26948eaded) | [wiki](https://github.com/POPPOPNull/POPPOP/wiki)

</div> 

# 추가해야 할 것
1. 메인이미지
2. 기능 시연 gif
3. 스웨거 작성

# 목차
<div>1. 프로젝트 개요</div>
<div>2. 프로젝트 소개</div>
<div>3. 프로젝트 목표</div>
<div>4. 화면 구성 및 주요 기능</div>
<div>5. 기술 스택</div>
<div>6. 팀원 소개</div>

## 📝 프로젝트 개요

<b>프로젝트 명 : </b> POPPOP
<br>
<b>프로젝트 기간 : </b> 25.09.26 ~ 25.12.12
<br>
<b>프로젝트 목표 : </b> 기존 팝업스토어 플랫폼과 달리 자체적인 예약시스템이 존재하고, 
<br>사용자 행동 데이터를 수집하여 팝업스토어 운영자 계층에 필요한 정보를 전달하는 서비스 개발.
<br>
<b>주요 타겟층 : </b> 팝업스토어 방문자 및 팝업스토어 운영자


## 📝 프로젝트 소개

#### 프로젝트 배경
기존 팝업스토어 플랫폼에는 예약을 진행하면 플랫폼 <b>자체적인 예약 방식이 아닌 다른 플랫폼에 의존</b>해야하는 불편함이 있습니다.
<br>
또한 <b>UI/UX의 자유도를 높여</b> 이용자의 재밌는 경험을 제공하고 싶었습니다.

따라서 <b>POPPOP</b>은 기존 팝업스토어 플랫폼의 디자인을 참고하여 <b>자체적인 예약 기능과 팝업스토어 정보를 제공하고</b>,
<br>
더 나은 사용자의 경험을 위해 <b>자유로운 UI/UX의 기능</b>을 반영한 팝업스토어 플랫폼입니다.



## 📝 프로젝트 목표
  1. 사용자 팝업 스토어 방문 데이터 기반의 개인화된 경험을 기반으로 맞춤형 UI/UX를 개발
  2. 사용자 경험을 수집해서 마케팅에 활용 가능한 데이터로 가공하여 기업 고객에게 제공<br>
  3. 프로젝트를 진행하면서 광고 플랫폼의 전반적인 서비스 흐름 및 개발자의 역할을 파악

## 📝 화면 구성 및 주요 기능

### 사용자(User)
    - 팝업 스토어 정보 조회 : 위치, 카테고리, 키워드 기반으로 팝업 스토어 정보를 조회하고 검색합니다.
    - 온라인 예약 : 원하는 날짜와 시간을 선택하여 방문 예약을 진행합니다.
    - 리뷰 : 방문했던 팝업 스토어에 대한 후기를 작성하고 다른 사람들의 리뷰를 조회합니다.
    - 관심 목록 : 마음에 드는 팝업 스토어를 관심 목록에 추가하여 개인화된 목록을 관리합니다.
      

 
|User계층|
|:---:|
|<img width="1920" height="918" alt="image" src="https://github.com/user-attachments/assets/19f3f1cd-c993-4563-9f0b-771af4d2cfe7" width="900"/>|

### 가맹점(Manager)
    - 팝업 스토어 등록/관리 : 팝업 스토어 정보를 직접 등록하고, 게시를 종료 할 수 있습니다.
    - 예약 관리 : 사용자들의 예약을 확인하고, 취소할 수 있습니다.
    - 리뷰 관리 : 사용자 리뷰를 조회하고, 삭제할 수 있습니다.
    - 대시보드 : 등록한 팝업 스토어에 관한 데이터를 요약 조회 합니다.
    
|Manager계층|
|:---:|
|<img src="https://github.com/user-attachments/assets/c555677e-3a59-425f-a41d-a1ade9da22e0" width="900"/>|

### 관리자(Admin)
    - 통합 관리 : 모든 사용자(User)와 가맹점(Manager) 계정 정보를 조회하고 관리합니다.
    - 콘텐츠 관리 : 플랫폼에 등록 요청된 모든 팝업 스토어의 상태(승인/반려)를 관리합니다.
    - 대시보드 : 모든 사용자와 가맹점에 관한 데이터를 요약 조회 합니다.
      
|Admin계층|
|:---:|
|<img src="https://github.com/user-attachments/assets/6d39a222-b283-4c32-91b1-7735e76bcc13" width="900"/>|

### 주요 기능
|컴포넌트 위치 조정 및 드래그 앤 드롭으로 관심목록 추가|
|:---:|
|![frontend - Chrome 2025-12-04 11-05-19](https://github.com/user-attachments/assets/c542bba0-e6ad-4648-904d-452d36ac3744)|


<br />

## ⚙ 기술 스택
> skills 폴더에 있는 아이콘을 이용할 수 있습니다.
### Back-end
<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/SpringBoot.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/SpringSecurity.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Java.png?raw=true" width="80">
</div>

### Front-end
<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/JavaScript.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/React.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/JWT.png?raw=true" width="80">
  <img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/HTMLCSS.png?raw=true" width="80">
</div>

### DB
<div>
  <img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Mysql.png?raw=true" width="80">
</div>

### Infra
<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/AWSEC2.png?raw=true" width="80">
</div>

### Tools
<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Github.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Notion.png?raw=true" width="80">
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Figma.png?raw=true" width="80">
</div>

<br />

## 🤔 기술적 이슈와 해결 과정


## 💁‍♂️ 프로젝트 팀원
|PM,admin 대시보드|DB,manager 대시보드|user 메인페이지,UI/UX|테스터|user 사용자페이지,JWT|
|:---:|:---:|:---:|:---:|:---:|
| ![](https://github.com/dgun1308.png?size=20) | ![](https://github.com/pcl9556.png?size=420) |![](https://github.com/dlrjsdn4433.png?size=420) |![](https://github.com/Lee-KyungChul.png?size=120) |![](https://github.com/eunseon12.png?size=120) |
|[장동건](https://github.com/dgun1308)|[박채린](https://github.com/pcl9556)|[이건우](https://github.com/dlrjsdn4433)|[이경철](https://github.com/Lee-KyungChul)|[조은선](https://github.com/eun-seon12)|

