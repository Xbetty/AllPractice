import '../css/a.css';
import '../css/b.css';

function add(x, y) {
  if (x == '2') {
    return x + y;
  }
  return x;
}
// 下一行eslint所有规则都失效（下一行不进行eslint检查）
// eslint-disable-next-line
console.log(add(2, 5));
