const input = document.querySelector("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

input.addEventListener("input", (e) => {
  defaultText.textContent = e.target.value;
  updateDebounceText(e.target.value);
  updateThrottleText(e.target.value);
});

const updateDebounceText = debounce((text) => {
  debounceText.textContent = text;
}, 2000);

function debounce(cb, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

const updateThrottleText = throttle((text) => {
  throttleText.textContent = text;
}, 3000);

function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    //判断是否存在冷却期
    if (isThrottled) {
      //1
      //冷却期间，才会有savedArgs和savedThis
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    isThrottled = true;

    //执行所需调用的函数
    func.apply(this, arguments); // arguments在这里就是输入的text

    //冷却结束ms后
    setTimeout(function () {
      isThrottled = false; //清除冷却,就不会执行1

      //如果还存在冷却期间的信息未使用，还会调用一次wrapper，
      //TODO 为什么没有重复调用wrapper()，因为这时候再调用wrapper()，isThrottled就会变成ture，就会return
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

// function throttle(cb, delay) {
//   let shouldWait = false;
//   let waitingArgs;
//   let timeoutFunc = function () {

//     if (waitingArgs == null) {
//       shouldWait = false;
//       console.log('37 ' + waitingArgs);
//     } else {
//       cb(...waitingArgs);
//       console.log(waitingArgs);
//       waitingArgs = null;
//       setTimeout(timeoutFunc);
//       console.log('42');

//     }
//   };
//   return function (...args) {
//     //只有存在需要等待的参数时，才会用到waitingArgs
//     if (shouldWait) {
//       waitingArgs = args;
//       return
//     }
//     cb(...args);
//     shouldWait = true;
//     console.log(...args, shouldWait);

//     setTimeout(timeoutFunc, delay);
//   };
// }

// function debounce(cb, delay = 1000) {
//   let timeout;

//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       cb(...args);
//     }, delay);
//   };
// }

// function throttle(cb, delay = 1000) {
//   let shouldWait = false;
//   let waitingArgs;
//   const timeoutFunc = () => {
//     if (waitingArgs == null) {
//       shouldWait = false;
//     } else {
//       cb(...waitingArgs);
//       waitingArgs = null;
//       setTimeout(timeoutFunc, delay);
//     }
//   };

//   return (...args) => {
//     if (shouldWait) {
//       waitingArgs = args;
//       return;
//     }

//     cb(...args);
//     shouldWait = true;

//     setTimeout(timeoutFunc, delay);
//   };
// }
