//封装一个函数:获取一个结果判断是：早上|上午|中午|下午|晚上
export const getTime = () => {
  // 用一个容器来存储提示信息
  let message = ''
  // 通过内置构造函数Date获得当前小时
  let hours = new Date().getHours()
  if (hours < 9) {
    message = '早上'
  } else if (hours >= 9 && hours < 12) {
    message = '中午'
  } else if (hours >= 12 && hours < 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}
