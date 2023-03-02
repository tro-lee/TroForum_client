// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function dateDiff(hisTime: any, nowTime: any) {
  if (!arguments.length) return '';
  let arg = arguments,
    now = arg[1] ? arg[1] : new Date().getTime(),
    diffValue = now - new Date(arg[0].replace(/-/g, '/')).getTime(),
    result = '',
    minute = 1000 * 60,
    hour = minute * 60,
    day = hour * 24,
    month = day * 30,
    _month = diffValue / month,
    _week = diffValue / (7 * day),
    _day = diffValue / day,
    _hour = diffValue / hour,
    _min = diffValue / minute;
  if (_month >= 2) result = hisTime;
  else if (_month >= 1) result = Math.round(_month) + '个月前';
  else if (_week >= 1) result = Math.round(_week) + '周前';
  else if (_day >= 1) result = Math.round(_day) + '天前';
  else if (_hour >= 1) result = Math.round(_hour) + '个小时前';
  else if (_min >= 1) result = Math.round(_min) + '分钟前';
  else result = '刚刚';
  return result;
}
