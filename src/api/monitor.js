import http from '../utils/request';



function getList(){
  return  http("get",'/watch/list', {});
}

function add(data){
  return  http("post",'/info/insert', data);
}

export {
  getList, add
}

