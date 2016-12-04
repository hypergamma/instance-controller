# Gamma - Instance Controller
function을 생성하고 Instance를 할당하면서 Gamma Instance pool을 auto scaling 하는 컴포넌트.

## Features
### Auto scaling Gamma Instance pool
* 전체 Instance 및 function 별 부하를 감지
* 리소스 사용량을 관제하면서 정해진 룰셋에 따라 instance 사용량 조절
### Create/Delete Gamma function
* Admin에서 설정할 수 있도록 rest api로 interface 노출
* Create은 Instance 사용 현황에 따라 최초 pool 할당
* function registry가 함께 수행
* Delete를 통해 registry 제거와 할당된 pool이 release

## Environments
## Installation
## Build